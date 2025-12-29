import type { ModelInfo } from "../model.js"

// https://console.groq.com/docs/models
export type GroqModelId =
	| "llama-3.1-8b-instant"
	| "llama-3.3-70b-versatile"
	| "meta-llama/llama-4-scout-17b-16e-instruct"
	| "qwen/qwen3-32b"
	| "moonshotai/kimi-k2-instruct-0905"
	| "openai/gpt-oss-120b"
	| "openai/gpt-oss-20b"

export const groqDefaultModelId: GroqModelId = "moonshotai/kimi-k2-instruct-0905"

export const groqModels = {
	"llama-4-scout": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Llama 4 Scout - Experimental meta model, 4K context (limited for free tier compatibility).",
	},
	"llama-4-maverick": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Llama 4 Maverick - Experimental meta model, 4K context (limited for free tier compatibility).",
	},
	"whisper-large-v3": {
		maxTokens: 2048,
		contextWindow: 2048,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: false,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Whisper Large v3 - Audio transcription.",
	},
	"whisper-large-v3-turbo": {
		maxTokens: 2048,
		contextWindow: 2048,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: false,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "Whisper Large v3 Turbo - Fast audio transcription.",
	},
	"playai-tts": {
		maxTokens: 1024,
		contextWindow: 8192,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: false,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "PlayAI TTS - Text to Speech.",
	},
	"playai-tts-arabic": {
		maxTokens: 1024,
		contextWindow: 8192,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: false,
		defaultToolProtocol: "native",
		inputPrice: 0,
		outputPrice: 0,
		description: "PlayAI TTS Arabic - Text to Speech.",
	},
	// Models based on API response: https://api.groq.com/openai/v1/models
	"llama-3.1-8b-instant": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0.05,
		outputPrice: 0.08,
		description: "Meta Llama 3.1 8B Instant model, 4K context (limited for free tier compatibility).",
	},
	"llama-3.3-70b-versatile": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0.59,
		outputPrice: 0.79,
		description: "Meta Llama 3.3 70B Versatile model, 4K context (limited for free tier compatibility).",
	},
	"meta-llama/llama-4-scout-17b-16e-instruct": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0.11,
		outputPrice: 0.34,
		description: "Meta Llama 4 Scout 17B Instruct model, 4K context (limited for free tier compatibility).",
	},
	"qwen/qwen3-32b": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0.29,
		outputPrice: 0.59,
		description: "Alibaba Qwen 3 32B model, 4K context (limited for free tier compatibility).",
	},
	"moonshotai/kimi-k2-instruct-0905": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: true,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0.6,
		outputPrice: 2.5,
		cacheReadsPrice: 0.15,
		description:
			"Kimi K2 model gets a new version update: Agentic coding: more accurate, better generalization across scaffolds. Frontend coding: improved aesthetics and functionalities on web, 3d, and other tasks. Context length: 4K (limited for free tier compatibility), providing better long-horizon support.",
	},
	"openai/gpt-oss-120b": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0.15,
		outputPrice: 0.75,
		description:
			"GPT-OSS 120B is OpenAI's flagship open source model, built on a Mixture-of-Experts (MoE) architecture with 20 billion parameters and 128 experts.",
	},
	"openai/gpt-oss-20b": {
		maxTokens: 4096,
		contextWindow: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		supportsNativeTools: true,
		defaultToolProtocol: "native",
		inputPrice: 0.1,
		outputPrice: 0.5,
		description:
			"GPT-OSS 20B is OpenAI's flagship open source model, built on a Mixture-of-Experts (MoE) architecture with 20 billion parameters and 32 experts.",
	},
} as const satisfies Record<string, ModelInfo>
