import type { ExtensionContext } from "vscode"

export function getUserAgent(context?: ExtensionContext): string {
	return `Vibex ${context?.extension?.packageJSON?.version || "unknown"}`
}
