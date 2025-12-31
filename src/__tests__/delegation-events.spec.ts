// npx vitest run __tests__/delegation-events.spec.ts

import { VibexEventName, vibexCodeEventsSchema, taskEventSchema } from "@vibex-code/types"

describe("delegation event schemas", () => {
	test("vibexCodeEventsSchema validates tuples", () => {
		expect(() => (vibexCodeEventsSchema.shape as any)[VibexEventName.TaskDelegated].parse(["p", "c"])).not.toThrow()
		expect(() =>
			(vibexCodeEventsSchema.shape as any)[VibexEventName.TaskDelegationCompleted].parse(["p", "c", "s"]),
		).not.toThrow()
		expect(() =>
			(vibexCodeEventsSchema.shape as any)[VibexEventName.TaskDelegationResumed].parse(["p", "c"]),
		).not.toThrow()

		// invalid shapes
		expect(() => (vibexCodeEventsSchema.shape as any)[VibexEventName.TaskDelegated].parse(["p"])).toThrow()
		expect(() =>
			(vibexCodeEventsSchema.shape as any)[VibexEventName.TaskDelegationCompleted].parse(["p", "c"]),
		).toThrow()
		expect(() => (vibexCodeEventsSchema.shape as any)[VibexEventName.TaskDelegationResumed].parse(["p"])).toThrow()
	})

	test("taskEventSchema discriminated union includes delegation events", () => {
		expect(() =>
			taskEventSchema.parse({
				eventName: VibexEventName.TaskDelegated,
				payload: ["p", "c"],
				taskId: 1,
			}),
		).not.toThrow()

		expect(() =>
			taskEventSchema.parse({
				eventName: VibexEventName.TaskDelegationCompleted,
				payload: ["p", "c", "s"],
				taskId: 1,
			}),
		).not.toThrow()

		expect(() =>
			taskEventSchema.parse({
				eventName: VibexEventName.TaskDelegationResumed,
				payload: ["p", "c"],
				taskId: 1,
			}),
		).not.toThrow()
	})
})
