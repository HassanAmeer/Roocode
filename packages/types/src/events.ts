import { z } from "zod"

import { clineMessageSchema, tokenUsageSchema } from "./message.js"
import { toolNamesSchema, toolUsageSchema } from "./tool.js"

/**
 * VibexEventName
 */

export enum VibexEventName {
	// Task Provider Lifecycle
	TaskCreated = "taskCreated",

	// Task Lifecycle
	TaskStarted = "taskStarted",
	TaskCompleted = "taskCompleted",
	TaskAborted = "taskAborted",
	TaskFocused = "taskFocused",
	TaskUnfocused = "taskUnfocused",
	TaskActive = "taskActive",
	TaskInteractive = "taskInteractive",
	TaskResumable = "taskResumable",
	TaskIdle = "taskIdle",

	// Subtask Lifecycle
	TaskPaused = "taskPaused",
	TaskUnpaused = "taskUnpaused",
	TaskSpawned = "taskSpawned",
	TaskDelegated = "taskDelegated",
	TaskDelegationCompleted = "taskDelegationCompleted",
	TaskDelegationResumed = "taskDelegationResumed",

	// Task Execution
	Message = "message",
	TaskModeSwitched = "taskModeSwitched",
	TaskAskResponded = "taskAskResponded",
	TaskUserMessage = "taskUserMessage",

	// Task Analytics
	TaskTokenUsageUpdated = "taskTokenUsageUpdated",
	TaskToolFailed = "taskToolFailed",

	// Configuration Changes
	ModeChanged = "modeChanged",
	ProviderProfileChanged = "providerProfileChanged",

	// Evals
	EvalPass = "evalPass",
	EvalFail = "evalFail",
}

/**
 * VibexEvents
 */

export const rooCodeEventsSchema = z.object({
	[VibexEventName.TaskCreated]: z.tuple([z.string()]),

	[VibexEventName.TaskStarted]: z.tuple([z.string()]),
	[VibexEventName.TaskCompleted]: z.tuple([
		z.string(),
		tokenUsageSchema,
		toolUsageSchema,
		z.object({
			isSubtask: z.boolean(),
		}),
	]),
	[VibexEventName.TaskAborted]: z.tuple([z.string()]),
	[VibexEventName.TaskFocused]: z.tuple([z.string()]),
	[VibexEventName.TaskUnfocused]: z.tuple([z.string()]),
	[VibexEventName.TaskActive]: z.tuple([z.string()]),
	[VibexEventName.TaskInteractive]: z.tuple([z.string()]),
	[VibexEventName.TaskResumable]: z.tuple([z.string()]),
	[VibexEventName.TaskIdle]: z.tuple([z.string()]),

	[VibexEventName.TaskPaused]: z.tuple([z.string()]),
	[VibexEventName.TaskUnpaused]: z.tuple([z.string()]),
	[VibexEventName.TaskSpawned]: z.tuple([z.string(), z.string()]),
	[VibexEventName.TaskDelegated]: z.tuple([
		z.string(), // parentTaskId
		z.string(), // childTaskId
	]),
	[VibexEventName.TaskDelegationCompleted]: z.tuple([
		z.string(), // parentTaskId
		z.string(), // childTaskId
		z.string(), // completionResultSummary
	]),
	[VibexEventName.TaskDelegationResumed]: z.tuple([
		z.string(), // parentTaskId
		z.string(), // childTaskId
	]),

	[VibexEventName.Message]: z.tuple([
		z.object({
			taskId: z.string(),
			action: z.union([z.literal("created"), z.literal("updated")]),
			message: clineMessageSchema,
		}),
	]),
	[VibexEventName.TaskModeSwitched]: z.tuple([z.string(), z.string()]),
	[VibexEventName.TaskAskResponded]: z.tuple([z.string()]),
	[VibexEventName.TaskUserMessage]: z.tuple([z.string()]),

	[VibexEventName.TaskToolFailed]: z.tuple([z.string(), toolNamesSchema, z.string()]),
	[VibexEventName.TaskTokenUsageUpdated]: z.tuple([z.string(), tokenUsageSchema, toolUsageSchema]),

	[VibexEventName.ModeChanged]: z.tuple([z.string()]),
	[VibexEventName.ProviderProfileChanged]: z.tuple([z.object({ name: z.string(), provider: z.string() })]),
})

export type VibexEvents = z.infer<typeof rooCodeEventsSchema>

/**
 * TaskEvent
 */

export const taskEventSchema = z.discriminatedUnion("eventName", [
	// Task Provider Lifecycle
	z.object({
		eventName: z.literal(VibexEventName.TaskCreated),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskCreated],
		taskId: z.number().optional(),
	}),

	// Task Lifecycle
	z.object({
		eventName: z.literal(VibexEventName.TaskStarted),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskStarted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskCompleted),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskCompleted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskAborted),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskAborted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskFocused),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskFocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskUnfocused),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskUnfocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskActive),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskActive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskInteractive),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskInteractive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskResumable),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskResumable],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskIdle),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskIdle],
		taskId: z.number().optional(),
	}),

	// Subtask Lifecycle
	z.object({
		eventName: z.literal(VibexEventName.TaskPaused),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskPaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskUnpaused),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskUnpaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskSpawned),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskSpawned],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskDelegated),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskDelegated],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskDelegationCompleted),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskDelegationCompleted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskDelegationResumed),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskDelegationResumed],
		taskId: z.number().optional(),
	}),

	// Task Execution
	z.object({
		eventName: z.literal(VibexEventName.Message),
		payload: rooCodeEventsSchema.shape[VibexEventName.Message],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskModeSwitched),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskModeSwitched],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskAskResponded),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskAskResponded],
		taskId: z.number().optional(),
	}),

	// Task Analytics
	z.object({
		eventName: z.literal(VibexEventName.TaskToolFailed),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskToolFailed],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.TaskTokenUsageUpdated),
		payload: rooCodeEventsSchema.shape[VibexEventName.TaskTokenUsageUpdated],
		taskId: z.number().optional(),
	}),

	// Evals
	z.object({
		eventName: z.literal(VibexEventName.EvalPass),
		payload: z.undefined(),
		taskId: z.number(),
	}),
	z.object({
		eventName: z.literal(VibexEventName.EvalFail),
		payload: z.undefined(),
		taskId: z.number(),
	}),
])

export type TaskEvent = z.infer<typeof taskEventSchema>
