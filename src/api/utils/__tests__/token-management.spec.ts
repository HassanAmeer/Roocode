import { describe, expect, it } from "vitest"
import { estimateTokenCount, estimateMessagesTokenCount, truncateMessages } from "../token-management"
import type { Anthropic } from "@anthropic-ai/sdk"

describe("Token Management", () => {
	describe("estimateTokenCount", () => {
		it("should estimate tokens for short text", () => {
			const text = "Hello world"
			const tokens = estimateTokenCount(text)
			expect(tokens).toBe(3) // 11 chars / 4 = 2.75, rounded up to 3
		})

		it("should estimate tokens for longer text", () => {
			const text = "This is a longer piece of text that should use more tokens"
			const tokens = estimateTokenCount(text)
			expect(tokens).toBeGreaterThan(10)
		})

		it("should handle empty string", () => {
			const tokens = estimateTokenCount("")
			expect(tokens).toBe(0)
		})
	})

	describe("estimateMessagesTokenCount", () => {
		it("should count system prompt tokens", () => {
			const systemPrompt = "You are a helpful assistant"
			const tokens = estimateMessagesTokenCount(systemPrompt, [])
			expect(tokens).toBeGreaterThan(0)
		})

		it("should count text message tokens", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{
					role: "user",
					content: "Hello, how are you doing today?",
				},
			]
			const tokens = estimateMessagesTokenCount(systemPrompt, messages)
			expect(tokens).toBeGreaterThan(estimateTokenCount(systemPrompt))
		})

		it("should count multi-part message tokens", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: "First part",
						},
						{
							type: "text",
							text: "Second part",
						},
					],
				},
			]
			const tokens = estimateMessagesTokenCount(systemPrompt, messages)
			expect(tokens).toBeGreaterThan(0)
		})

		it("should count tool use tokens", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{
					role: "assistant",
					content: [
						{
							type: "tool_use",
							id: "tool_1",
							name: "search",
							input: { query: "test query" },
						},
					],
				},
			]
			const tokens = estimateMessagesTokenCount(systemPrompt, messages)
			expect(tokens).toBeGreaterThan(0)
		})

		it("should count tool result tokens", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{
					role: "user",
					content: [
						{
							type: "tool_result",
							tool_use_id: "tool_1",
							content: "Search results here",
						},
					],
				},
			]
			const tokens = estimateMessagesTokenCount(systemPrompt, messages)
			expect(tokens).toBeGreaterThan(0)
		})
	})

	describe("truncateMessages", () => {
		it("should not truncate when under limit", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{ role: "user", content: "Message 1" },
				{ role: "assistant", content: "Response 1" },
			]
			const { truncatedMessages, messagesRemoved, tokensRemoved } = truncateMessages(systemPrompt, messages, 1000)

			expect(truncatedMessages).toHaveLength(2)
			expect(messagesRemoved).toBe(0)
			expect(tokensRemoved).toBe(0)
		})

		it("should truncate oldest messages when over limit", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{ role: "user", content: "A".repeat(100) }, // ~25 tokens
				{ role: "assistant", content: "B".repeat(100) }, // ~25 tokens
				{ role: "user", content: "C".repeat(100) }, // ~25 tokens
				{ role: "assistant", content: "D".repeat(100) }, // ~25 tokens
			]

			// System is ~2 tokens, limit to 60 total tokens
			// Should keep last 2 messages (~50 tokens + 2 system = 52 tokens)
			const { truncatedMessages, messagesRemoved } = truncateMessages(systemPrompt, messages, 60)

			expect(truncatedMessages.length).toBeLessThan(messages.length)
			expect(messagesRemoved).toBeGreaterThan(0)
			// Most recent messages should be preserved
			expect((truncatedMessages[truncatedMessages.length - 1].content as string).includes("D")).toBe(true)
		})

		it("should throw error if system prompt exceeds limit", () => {
			const systemPrompt = "A".repeat(1000) // ~250 tokens
			const messages: Anthropic.Messages.MessageParam[] = [{ role: "user", content: "Hello" }]

			expect(() => {
				truncateMessages(systemPrompt, messages, 100) // Limit is 100 tokens
			}).toThrow("System prompt")
		})

		it("should preserve most recent messages", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{ role: "user", content: "Old message " + "A".repeat(400) },
				{ role: "assistant", content: "Old response " + "B".repeat(400) },
				{ role: "user", content: "Recent message " + "C".repeat(100) },
				{ role: "assistant", content: "Recent response " + "D".repeat(100) },
			]

			const { truncatedMessages } = truncateMessages(systemPrompt, messages, 100)

			// Should preserve the most recent messages
			const lastMessage = truncatedMessages[truncatedMessages.length - 1].content as string
			expect(lastMessage.includes("D")).toBe(true)
		})

		it("should handle complex multi-part messages", () => {
			const systemPrompt = "System"
			const messages: Anthropic.Messages.MessageParam[] = [
				{
					role: "user",
					content: [
						{ type: "text", text: "A".repeat(400) },
						{ type: "text", text: "B".repeat(400) },
					],
				},
				{
					role: "assistant",
					content: [{ type: "text", text: "C".repeat(100) }],
				},
			]

			const { truncatedMessages, messagesRemoved } = truncateMessages(systemPrompt, messages, 100)

			expect(truncatedMessages.length).toBeGreaterThan(0)
			// First big message should be removed
			if (messagesRemoved > 0) {
				expect(truncatedMessages[0].role).toBe("assistant")
			}
		})
	})
})
