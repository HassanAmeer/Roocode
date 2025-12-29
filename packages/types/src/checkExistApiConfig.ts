import { SECRET_STATE_KEYS, GLOBAL_SECRET_KEYS } from "./global-settings.js"
import { ProviderSettings } from "./provider-settings.js"

export function checkExistKey(config: ProviderSettings | undefined) {
	if (!config) {
		return false
	}

	// Special case for human-relay, fake-ai, claude-code, qwen-code, and roo providers which don't need any configuration.
	if (
		config.apiProvider &&
		["human-relay", "fake-ai", "claude-code", "qwen-code", "roo"].includes(config.apiProvider)
	) {
		return true
	}

	// Check all secret keys from the centralized SECRET_STATE_KEYS array.
	// Filter out keys that are not part of ProviderSettings (global secrets are stored separately)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const providerSecretKeys = SECRET_STATE_KEYS.filter((key) => !GLOBAL_SECRET_KEYS.includes(key as any))
	const hasSecretKey = providerSecretKeys.some((key) => config[key as keyof ProviderSettings] !== undefined)

	// Check additional non-secret configuration properties
	const hasOtherConfig = [
		config.awsRegion,
		config.vertexProjectId,
		config.ollamaModelId,
		config.lmStudioModelId,
		config.vsCodeLmModelSelector,
	].some((value) => value !== undefined)

	return hasSecretKey || hasOtherConfig
}
