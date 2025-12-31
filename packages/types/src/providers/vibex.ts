import { z } from "zod"

import type { ModelInfo } from "../model.js"

/**
 * Vibex Cloud is a dynamic provider - models are loaded from the /v1/models API endpoint.
 * Default model ID used as fallback when no model is specified.
 */
export const vibexDefaultModelId = "xai/grok-code-fast-1"

/**
 * Empty models object maintained for type compatibility.
 * All model data comes dynamically from the API.
 */
export const vibexModels = {} as const satisfies Record<string, ModelInfo>

/**
 * Vibex Cloud API response schemas
 */

export const VibeXPricingSchema = z.object({
	input: z.string(),
	output: z.string(),
	input_cache_read: z.string().optional(),
	input_cache_write: z.string().optional(),
})

export const VibeXModelSchema = z.object({
	id: z.string(),
	object: z.literal("model"),
	created: z.number(),
	owned_by: z.string(),
	name: z.string(),
	description: z.string(),
	context_window: z.number(),
	max_tokens: z.number(),
	type: z.literal("language"),
	tags: z.array(z.string()).optional(),
	pricing: VibeXPricingSchema,
	deprecated: z.boolean().optional(),
	default_temperature: z.number().optional(),
	// Dynamic settings that map directly to ModelInfo properties
	// Allows the API to configure model-specific defaults like includedTools, excludedTools, reasoningEffort, etc.
	// These are always direct values (e.g., includedTools: ['search_replace']) for backward compatibility with old clients.
	settings: z.record(z.string(), z.unknown()).optional(),
	// Versioned settings keyed by version number (e.g., '3.36.4').
	// Each version key maps to a settings object that is used when plugin version >= that version.
	// New clients find the highest version key <= current version and use those settings.
	// Old clients ignore this field and use plain values from `settings`.
	// Example: { '3.36.4': { includedTools: ['search_replace'] }, '3.35.0': { ... } }
	versionedSettings: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
})

export const VibeXModelsResponseSchema = z.object({
	object: z.literal("list"),
	data: z.array(VibeXModelSchema),
})

export type VibeXModel = z.infer<typeof VibeXModelSchema>
export type VibeXModelsResponse = z.infer<typeof VibeXModelsResponseSchema>
