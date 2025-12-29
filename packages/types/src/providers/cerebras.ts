import type { ModelInfo } from "../model.js"

// https://inference-docs.cerebras.ai/api-reference/chat-completions
export type CerebrasModelId = keyof typeof cerebrasModels

export const cerebrasDefaultModelId: CerebrasModelId = "gpt-oss-120b"

export const cerebrasModels = {
	"llama3.1-8b": {
		maxTokens: 8192,
		contextWindow: 8192,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Llama 3.1 8B model, ultra-fast and efficient.",
	},
	"llama3.1-70b": {
		maxTokens: 8192,
		contextWindow: 8192,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Llama 3.1 70B model, powerful and fast.",
	},
	"zai-glm-4.6": {
		maxTokens: 8192, // Conservative default to avoid premature rate limiting (Cerebras reserves quota upfront)
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Highly intelligent general purpose model with up to 1,000 tokens/s",
	},
	"qwen-3-235b-a22b-instruct-2507": {
		maxTokens: 8192, // Conservative default to avoid premature rate limiting
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Intelligent model with ~1400 tokens/s",
	},
	"llama-3.3-70b": {
		maxTokens: 8192, // Conservative default to avoid premature rate limiting
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Powerful model with ~2600 tokens/s",
	},
	"qwen-3-32b": {
		maxTokens: 8192, // Conservative default to avoid premature rate limiting
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "SOTA coding performance with ~2500 tokens/s",
	},
	"gpt-oss-120b": {
		maxTokens: 8192, // Conservative default to avoid premature rate limiting
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description:
			"OpenAI GPT OSS model with ~2800 tokens/s\n\n• 64K context window\n• Excels at efficient reasoning across science, math, and coding",
	},
} as const satisfies Record<string, ModelInfo>
