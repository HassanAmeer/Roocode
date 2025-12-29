import { aimlApiModels, aimlApiDefaultModelId } from "@roo-code/types"
import type { ApiHandlerOptions } from "../../shared/api"
import { getModelParams } from "../transform/model-params"
import { OpenAiHandler } from "./openai"

export class AimlApiHandler extends OpenAiHandler {
	constructor(options: ApiHandlerOptions) {
		super({
			...options,
			openAiApiKey: options.aimlApiKey ?? "not-provided",
			openAiModelId: options.apiModelId ?? aimlApiDefaultModelId,
			openAiBaseUrl: "https://api.aimlapi.com/v1",
			openAiStreamingEnabled: true,
			includeMaxTokens: true,
		})
	}

	override getModel() {
		const id = this.options.apiModelId ?? aimlApiDefaultModelId
		const info = aimlApiModels[id as keyof typeof aimlApiModels] || aimlApiModels[aimlApiDefaultModelId]
		const params = getModelParams({ format: "openai", modelId: id, model: info, settings: this.options })
		return { id, info, ...params }
	}
}
