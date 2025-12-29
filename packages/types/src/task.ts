import { z } from "zod"

import { VibexEventName } from "./events.js"
import type { RooCodeSettings } from "./global-settings.js"
import type { ClineMessage, QueuedMessage, TokenUsage } from "./message.js"
import type { ToolUsage, ToolName } from "./tool.js"
import type { StaticAppProperties, GitProperties, TelemetryProperties } from "./telemetry.js"
import type { TodoItem } from "./todo.js"

/**
 * TaskProviderLike
 */

export interface TaskProviderLike {
	// Tasks
	getCurrentTask(): TaskLike | undefined
	getRecentTasks(): string[]
	createTask(
		text?: string,
		images?: string[],
		parentTask?: TaskLike,
		options?: CreateTaskOptions,
		configuration?: RooCodeSettings,
	): Promise<TaskLike>
	cancelTask(): Promise<void>
	clearTask(): Promise<void>
	resumeTask(taskId: string): void

	// Modes
	getModes(): Promise<{ slug: string; name: string }[]>
	getMode(): Promise<string>
	setMode(mode: string): Promise<void>

	// Provider Profiles
	getProviderProfiles(): Promise<{ name: string; provider?: string }[]>
	getProviderProfile(): Promise<string>
	setProviderProfile(providerProfile: string): Promise<void>

	// Telemetry
	readonly appProperties: StaticAppProperties
	readonly gitProperties: GitProperties | undefined
	getTelemetryProperties(): Promise<TelemetryProperties>
	readonly cwd: string

	// Event Emitter
	on<K extends keyof TaskProviderEvents>(
		event: K,
		listener: (...args: TaskProviderEvents[K]) => void | Promise<void>,
	): this

	off<K extends keyof TaskProviderEvents>(
		event: K,
		listener: (...args: TaskProviderEvents[K]) => void | Promise<void>,
	): this

	// @TODO: Find a better way to do this.
	postStateToWebview(): Promise<void>
}

export type TaskProviderEvents = {
	[VibexEventName.TaskCreated]: [task: TaskLike]
	[VibexEventName.TaskStarted]: [taskId: string]
	[VibexEventName.TaskCompleted]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]
	[VibexEventName.TaskAborted]: [taskId: string]
	[VibexEventName.TaskFocused]: [taskId: string]
	[VibexEventName.TaskUnfocused]: [taskId: string]
	[VibexEventName.TaskActive]: [taskId: string]
	[VibexEventName.TaskInteractive]: [taskId: string]
	[VibexEventName.TaskResumable]: [taskId: string]
	[VibexEventName.TaskIdle]: [taskId: string]

	[VibexEventName.TaskPaused]: [taskId: string]
	[VibexEventName.TaskUnpaused]: [taskId: string]
	[VibexEventName.TaskSpawned]: [taskId: string]
	[VibexEventName.TaskDelegated]: [parentTaskId: string, childTaskId: string]
	[VibexEventName.TaskDelegationCompleted]: [parentTaskId: string, childTaskId: string, summary: string]
	[VibexEventName.TaskDelegationResumed]: [parentTaskId: string, childTaskId: string]

	[VibexEventName.TaskUserMessage]: [taskId: string]

	[VibexEventName.TaskTokenUsageUpdated]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]

	[VibexEventName.ModeChanged]: [mode: string]
	[VibexEventName.ProviderProfileChanged]: [config: { name: string; provider?: string }]
}

/**
 * TaskLike
 */

export interface CreateTaskOptions {
	enableDiff?: boolean
	enableCheckpoints?: boolean
	fuzzyMatchThreshold?: number
	consecutiveMistakeLimit?: number
	experiments?: Record<string, boolean>
	initialTodos?: TodoItem[]
	/** Initial status for the task's history item (e.g., "active" for child tasks) */
	initialStatus?: "active" | "delegated" | "completed"
}

export enum TaskStatus {
	Running = "running",
	Interactive = "interactive",
	Resumable = "resumable",
	Idle = "idle",
	None = "none",
}

export const taskMetadataSchema = z.object({
	task: z.string().optional(),
	images: z.array(z.string()).optional(),
})

export type TaskMetadata = z.infer<typeof taskMetadataSchema>

export interface TaskLike {
	readonly taskId: string
	readonly rootTaskId?: string
	readonly parentTaskId?: string
	readonly childTaskId?: string
	readonly metadata: TaskMetadata
	readonly taskStatus: TaskStatus
	readonly taskAsk: ClineMessage | undefined
	readonly queuedMessages: QueuedMessage[]
	readonly tokenUsage: TokenUsage | undefined

	on<K extends keyof TaskEvents>(event: K, listener: (...args: TaskEvents[K]) => void | Promise<void>): this
	off<K extends keyof TaskEvents>(event: K, listener: (...args: TaskEvents[K]) => void | Promise<void>): this

	approveAsk(options?: { text?: string; images?: string[] }): void
	denyAsk(options?: { text?: string; images?: string[] }): void
	submitUserMessage(text: string, images?: string[], mode?: string, providerProfile?: string): Promise<void>
	abortTask(): void
}

export type TaskEvents = {
	// Task Lifecycle
	[VibexEventName.TaskStarted]: []
	[VibexEventName.TaskCompleted]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]
	[VibexEventName.TaskAborted]: []
	[VibexEventName.TaskFocused]: []
	[VibexEventName.TaskUnfocused]: []
	[VibexEventName.TaskActive]: [taskId: string]
	[VibexEventName.TaskInteractive]: [taskId: string]
	[VibexEventName.TaskResumable]: [taskId: string]
	[VibexEventName.TaskIdle]: [taskId: string]

	// Subtask Lifecycle
	[VibexEventName.TaskPaused]: [taskId: string]
	[VibexEventName.TaskUnpaused]: [taskId: string]
	[VibexEventName.TaskSpawned]: [taskId: string]

	// Task Execution
	[VibexEventName.Message]: [{ action: "created" | "updated"; message: ClineMessage }]
	[VibexEventName.TaskModeSwitched]: [taskId: string, mode: string]
	[VibexEventName.TaskAskResponded]: []
	[VibexEventName.TaskUserMessage]: [taskId: string]

	// Task Analytics
	[VibexEventName.TaskToolFailed]: [taskId: string, tool: ToolName, error: string]
	[VibexEventName.TaskTokenUsageUpdated]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]
}
