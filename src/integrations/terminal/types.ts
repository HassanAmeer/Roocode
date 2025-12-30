import EventEmitter from "events"

export type VibeXTerminalProvider = "vscode" | "execa"

export interface VibeXTerminal {
	provider: VibeXTerminalProvider
	id: number
	busy: boolean
	running: boolean
	taskId?: string
	process?: VibeXTerminalProcess
	getCurrentWorkingDirectory(): string
	isClosed: () => boolean
	runCommand: (command: string, callbacks: VibeXTerminalCallbacks) => VibeXTerminalProcessResultPromise
	setActiveStream(stream: AsyncIterable<string> | undefined, pid?: number): void
	shellExecutionComplete(exitDetails: ExitCodeDetails): void
	getProcessesWithOutput(): VibeXTerminalProcess[]
	getUnretrievedOutput(): string
	getLastCommand(): string
	cleanCompletedProcessQueue(): void
}

export interface VibeXTerminalCallbacks {
	onLine: (line: string, process: VibeXTerminalProcess) => void
	onCompleted: (output: string | undefined, process: VibeXTerminalProcess) => void
	onShellExecutionStarted: (pid: number | undefined, process: VibeXTerminalProcess) => void
	onShellExecutionComplete: (details: ExitCodeDetails, process: VibeXTerminalProcess) => void
	onNoShellIntegration?: (message: string, process: VibeXTerminalProcess) => void
}

export interface VibeXTerminalProcess extends EventEmitter<VibeXTerminalProcessEvents> {
	command: string
	isHot: boolean
	run: (command: string) => Promise<void>
	continue: () => void
	abort: () => void
	hasUnretrievedOutput: () => boolean
	getUnretrievedOutput: () => string
}

export type VibeXTerminalProcessResultPromise = VibeXTerminalProcess & Promise<void>

export interface VibeXTerminalProcessEvents {
	line: [line: string]
	continue: []
	completed: [output?: string]
	stream_available: [stream: AsyncIterable<string>]
	shell_execution_started: [pid: number | undefined]
	shell_execution_complete: [exitDetails: ExitCodeDetails]
	error: [error: Error]
	no_shell_integration: [message: string]
}

export interface ExitCodeDetails {
	exitCode: number | undefined
	signal?: number | undefined
	signalName?: string
	coreDumpPossible?: boolean
}
