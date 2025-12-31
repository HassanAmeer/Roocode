import { EventEmitter } from "events"
import fs from "fs/promises"
import * as path from "path"
import * as os from "os"

import * as vscode from "vscode"

import {
	type VibexAPI,
	type VibexSettings,
	type VibexEvents,
	type ProviderSettings,
	type ProviderSettingsEntry,
	type TaskEvent,
	type CreateTaskOptions,
	VibexEventName,
	TaskCommandName,
	isSecretStateKey,
	IpcOrigin,
	IpcMessageType,
} from "@vibex-code/types"
import { IpcServer } from "@vibex-code/ipc"

import { Package } from "../shared/package"
import { ClineProvider } from "../core/webview/ClineProvider"
import { openClineInNewTab } from "../activate/registerCommands"

export class API extends EventEmitter<VibexEvents> implements VibexAPI {
	private readonly outputChannel: vscode.OutputChannel
	private readonly sidebarProvider: ClineProvider
	private readonly context: vscode.ExtensionContext
	private readonly ipc?: IpcServer
	private readonly taskMap = new Map<string, ClineProvider>()
	private readonly log: (...args: unknown[]) => void
	private logfile?: string

	constructor(
		outputChannel: vscode.OutputChannel,
		provider: ClineProvider,
		socketPath?: string,
		enableLogging = false,
	) {
		super()

		this.outputChannel = outputChannel
		this.sidebarProvider = provider
		this.context = provider.context

		if (enableLogging) {
			this.log = (...args: unknown[]) => {
				this.outputChannelLog(...args)
				console.log(args)
			}

			this.logfile = path.join(os.tmpdir(), "vibex-code-messages.log")
		} else {
			this.log = () => {}
		}

		this.registerListeners(this.sidebarProvider)

		if (socketPath) {
			const ipc = (this.ipc = new IpcServer(socketPath, this.log))

			ipc.listen()
			this.log(`[API] ipc server started: socketPath=${socketPath}, pid=${process.pid}, ppid=${process.ppid}`)

			ipc.on(IpcMessageType.TaskCommand, async (_clientId, { commandName, data }) => {
				switch (commandName) {
					case TaskCommandName.StartNewTask:
						this.log(`[API] StartNewTask -> ${data.text}, ${JSON.stringify(data.configuration)}`)
						await this.startNewTask(data)
						break
					case TaskCommandName.CancelTask:
						this.log(`[API] CancelTask -> ${data}`)
						await this.cancelTask(data)
						break
					case TaskCommandName.CloseTask:
						this.log(`[API] CloseTask -> ${data}`)
						await vscode.commands.executeCommand("workbench.action.files.saveFiles")
						await vscode.commands.executeCommand("workbench.action.closeWindow")
						break
					case TaskCommandName.ResumeTask:
						this.log(`[API] ResumeTask -> ${data}`)
						try {
							await this.resumeTask(data)
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : String(error)
							this.log(`[API] ResumeTask failed for taskId ${data}: ${errorMessage}`)
							// Don't rethrow - we want to prevent IPC server crashes
							// The error is logged for debugging purposes
						}
						break
					case TaskCommandName.SendMessage:
						this.log(`[API] SendMessage -> ${data.text}`)
						await this.sendMessage(data.text, data.images)
						break
				}
			})
		}
	}

	public override emit<K extends keyof VibexEvents>(
		eventName: K,
		...args: K extends keyof VibexEvents ? VibexEvents[K] : never
	) {
		const data = { eventName: eventName as VibexEventName, payload: args } as TaskEvent
		this.ipc?.broadcast({ type: IpcMessageType.TaskEvent, origin: IpcOrigin.Server, data })
		return super.emit(eventName, ...args)
	}

	public async startNewTask({
		configuration,
		text,
		images,
		newTab,
	}: {
		configuration: VibexSettings
		text?: string
		images?: string[]
		newTab?: boolean
	}) {
		let provider: ClineProvider

		if (newTab) {
			await vscode.commands.executeCommand("workbench.action.files.revert")
			await vscode.commands.executeCommand("workbench.action.closeAllEditors")

			provider = await openClineInNewTab({ context: this.context, outputChannel: this.outputChannel })
			this.registerListeners(provider)
		} else {
			await vscode.commands.executeCommand(`${Package.name}.SidebarProvider.focus`)

			provider = this.sidebarProvider
		}

		await provider.removeClineFromStack()
		await provider.postStateToWebview()
		await provider.postMessageToWebview({ type: "action", action: "chatButtonClicked" })
		await provider.postMessageToWebview({ type: "invoke", invoke: "newChat", text, images })

		const options: CreateTaskOptions = {
			consecutiveMistakeLimit: Number.MAX_SAFE_INTEGER,
		}

		const task = await provider.createTask(text, images, undefined, options, configuration)

		if (!task) {
			throw new Error("Failed to create task due to policy restrictions")
		}

		return task.taskId
	}

	public async resumeTask(taskId: string): Promise<void> {
		const { historyItem } = await this.sidebarProvider.getTaskWithId(taskId)
		await this.sidebarProvider.createTaskWithHistoryItem(historyItem)
		await this.sidebarProvider.postMessageToWebview({ type: "action", action: "chatButtonClicked" })
	}

	public async isTaskInHistory(taskId: string): Promise<boolean> {
		try {
			await this.sidebarProvider.getTaskWithId(taskId)
			return true
		} catch {
			return false
		}
	}

	public getCurrentTaskStack() {
		return this.sidebarProvider.getCurrentTaskStack()
	}

	public async clearCurrentTask(_lastMessage?: string) {
		// Legacy finishSubTask removed; clear current by closing active task instance.
		await this.sidebarProvider.removeClineFromStack()
		await this.sidebarProvider.postStateToWebview()
	}

	public async cancelCurrentTask() {
		await this.sidebarProvider.cancelTask()
	}

	public async cancelTask(taskId: string) {
		const provider = this.taskMap.get(taskId)

		if (provider) {
			await provider.cancelTask()
			this.taskMap.delete(taskId)
		}
	}

	public async sendMessage(text?: string, images?: string[]) {
		await this.sidebarProvider.postMessageToWebview({ type: "invoke", invoke: "sendMessage", text, images })
	}

	public async pressPrimaryButton() {
		await this.sidebarProvider.postMessageToWebview({ type: "invoke", invoke: "primaryButtonClick" })
	}

	public async pressSecondaryButton() {
		await this.sidebarProvider.postMessageToWebview({ type: "invoke", invoke: "secondaryButtonClick" })
	}

	public isReady() {
		return this.sidebarProvider.viewLaunched
	}

	private registerListeners(provider: ClineProvider) {
		provider.on(VibexEventName.TaskCreated, (task) => {
			// Task Lifecycle

			task.on(VibexEventName.TaskStarted, async () => {
				this.emit(VibexEventName.TaskStarted, task.taskId)
				this.taskMap.set(task.taskId, provider)
				await this.fileLog(`[${new Date().toISOString()}] taskStarted -> ${task.taskId}\n`)
			})

			task.on(VibexEventName.TaskCompleted, async (_, tokenUsage, toolUsage) => {
				this.emit(VibexEventName.TaskCompleted, task.taskId, tokenUsage, toolUsage, {
					isSubtask: !!task.parentTaskId,
				})

				this.taskMap.delete(task.taskId)

				await this.fileLog(
					`[${new Date().toISOString()}] taskCompleted -> ${task.taskId} | ${JSON.stringify(tokenUsage, null, 2)} | ${JSON.stringify(toolUsage, null, 2)}\n`,
				)
			})

			task.on(VibexEventName.TaskAborted, () => {
				this.emit(VibexEventName.TaskAborted, task.taskId)
				this.taskMap.delete(task.taskId)
			})

			task.on(VibexEventName.TaskFocused, () => {
				this.emit(VibexEventName.TaskFocused, task.taskId)
			})

			task.on(VibexEventName.TaskUnfocused, () => {
				this.emit(VibexEventName.TaskUnfocused, task.taskId)
			})

			task.on(VibexEventName.TaskActive, () => {
				this.emit(VibexEventName.TaskActive, task.taskId)
			})

			task.on(VibexEventName.TaskInteractive, () => {
				this.emit(VibexEventName.TaskInteractive, task.taskId)
			})

			task.on(VibexEventName.TaskResumable, () => {
				this.emit(VibexEventName.TaskResumable, task.taskId)
			})

			task.on(VibexEventName.TaskIdle, () => {
				this.emit(VibexEventName.TaskIdle, task.taskId)
			})

			// Subtask Lifecycle

			task.on(VibexEventName.TaskPaused, () => {
				this.emit(VibexEventName.TaskPaused, task.taskId)
			})

			task.on(VibexEventName.TaskUnpaused, () => {
				this.emit(VibexEventName.TaskUnpaused, task.taskId)
			})

			task.on(VibexEventName.TaskSpawned, (childTaskId) => {
				this.emit(VibexEventName.TaskSpawned, task.taskId, childTaskId)
			})

			task.on(VibexEventName.TaskDelegated as any, (childTaskId: string) => {
				;(this.emit as any)(VibexEventName.TaskDelegated, task.taskId, childTaskId)
			})

			task.on(VibexEventName.TaskDelegationCompleted as any, (childTaskId: string, summary: string) => {
				;(this.emit as any)(VibexEventName.TaskDelegationCompleted, task.taskId, childTaskId, summary)
			})

			task.on(VibexEventName.TaskDelegationResumed as any, (childTaskId: string) => {
				;(this.emit as any)(VibexEventName.TaskDelegationResumed, task.taskId, childTaskId)
			})

			// Task Execution

			task.on(VibexEventName.Message, async (message) => {
				this.emit(VibexEventName.Message, { taskId: task.taskId, ...message })

				if (message.message.partial !== true) {
					await this.fileLog(`[${new Date().toISOString()}] ${JSON.stringify(message.message, null, 2)}\n`)
				}
			})

			task.on(VibexEventName.TaskModeSwitched, (taskId, mode) => {
				this.emit(VibexEventName.TaskModeSwitched, taskId, mode)
			})

			task.on(VibexEventName.TaskAskResponded, () => {
				this.emit(VibexEventName.TaskAskResponded, task.taskId)
			})

			// Task Analytics

			task.on(VibexEventName.TaskToolFailed, (taskId, tool, error) => {
				this.emit(VibexEventName.TaskToolFailed, taskId, tool, error)
			})

			task.on(VibexEventName.TaskTokenUsageUpdated, (_, tokenUsage, toolUsage) => {
				this.emit(VibexEventName.TaskTokenUsageUpdated, task.taskId, tokenUsage, toolUsage)
			})

			// Let's go!

			this.emit(VibexEventName.TaskCreated, task.taskId)
		})
	}

	// Logging

	private outputChannelLog(...args: unknown[]) {
		for (const arg of args) {
			if (arg === null) {
				this.outputChannel.appendLine("null")
			} else if (arg === undefined) {
				this.outputChannel.appendLine("undefined")
			} else if (typeof arg === "string") {
				this.outputChannel.appendLine(arg)
			} else if (arg instanceof Error) {
				this.outputChannel.appendLine(`Error: ${arg.message}\n${arg.stack || ""}`)
			} else {
				try {
					this.outputChannel.appendLine(
						JSON.stringify(
							arg,
							(key, value) => {
								if (typeof value === "bigint") return `BigInt(${value})`
								if (typeof value === "function") return `Function: ${value.name || "anonymous"}`
								if (typeof value === "symbol") return value.toString()
								return value
							},
							2,
						),
					)
				} catch (error) {
					this.outputChannel.appendLine(`[Non-serializable object: ${Object.prototype.toString.call(arg)}]`)
				}
			}
		}
	}

	private async fileLog(message: string) {
		if (!this.logfile) {
			return
		}

		try {
			await fs.appendFile(this.logfile, message, "utf8")
		} catch (_) {
			this.logfile = undefined
		}
	}

	// Global Settings Management

	public getConfiguration(): VibexSettings {
		return Object.fromEntries(
			Object.entries(this.sidebarProvider.getValues()).filter(([key]) => !isSecretStateKey(key)),
		)
	}

	public async setConfiguration(values: VibexSettings) {
		await this.sidebarProvider.contextProxy.setValues(values)
		await this.sidebarProvider.providerSettingsManager.saveConfig(values.currentApiConfigName || "default", values)
		await this.sidebarProvider.postStateToWebview()
	}

	// Provider Profile Management

	public getProfiles(): string[] {
		return this.sidebarProvider.getProviderProfileEntries().map(({ name }) => name)
	}

	public getProfileEntry(name: string): ProviderSettingsEntry | undefined {
		return this.sidebarProvider.getProviderProfileEntry(name)
	}

	public async createProfile(name: string, profile?: ProviderSettings, activate: boolean = true) {
		const entry = this.getProfileEntry(name)

		if (entry) {
			throw new Error(`Profile with name "${name}" already exists`)
		}

		const id = await this.sidebarProvider.upsertProviderProfile(name, profile ?? {}, activate)

		if (!id) {
			throw new Error(`Failed to create profile with name "${name}"`)
		}

		return id
	}

	public async updateProfile(
		name: string,
		profile: ProviderSettings,
		activate: boolean = true,
	): Promise<string | undefined> {
		const entry = this.getProfileEntry(name)

		if (!entry) {
			throw new Error(`Profile with name "${name}" does not exist`)
		}

		const id = await this.sidebarProvider.upsertProviderProfile(name, profile, activate)

		if (!id) {
			throw new Error(`Failed to update profile with name "${name}"`)
		}

		return id
	}

	public async upsertProfile(
		name: string,
		profile: ProviderSettings,
		activate: boolean = true,
	): Promise<string | undefined> {
		const id = await this.sidebarProvider.upsertProviderProfile(name, profile, activate)

		if (!id) {
			throw new Error(`Failed to upsert profile with name "${name}"`)
		}

		return id
	}

	public async deleteProfile(name: string): Promise<void> {
		const entry = this.getProfileEntry(name)

		if (!entry) {
			throw new Error(`Profile with name "${name}" does not exist`)
		}

		await this.sidebarProvider.deleteProviderProfile(entry)
	}

	public getActiveProfile(): string | undefined {
		return this.getConfiguration().currentApiConfigName
	}

	public async setActiveProfile(name: string): Promise<string | undefined> {
		const entry = this.getProfileEntry(name)

		if (!entry) {
			throw new Error(`Profile with name "${name}" does not exist`)
		}

		await this.sidebarProvider.activateProviderProfile({ name })
		return this.getActiveProfile()
	}
}
