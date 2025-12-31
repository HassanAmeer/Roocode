import { Anthropic } from "@anthropic-ai/sdk"

/**
 * Rough token estimation: assumes ~4 characters per token
 * This is a conservative estimate that works reasonably well for most text
 */
export function estimateTokenCount(text: string): number {
	return Math.ceil(text.length / 4)
}

/**
 * Estimate total token count for all messages in a conversation
 */
export function estimateMessagesTokenCount(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): number {
	let totalTokens = estimateTokenCount(systemPrompt)

	for (const message of messages) {
		if (typeof message.content === "string") {
			totalTokens += estimateTokenCount(message.content)
		} else if (Array.isArray(message.content)) {
			for (const content of message.content) {
				if (content.type === "text") {
					totalTokens += estimateTokenCount(content.text)
				} else if (content.type === "tool_use") {
					totalTokens += estimateTokenCount(JSON.stringify(content.input))
				} else if (content.type === "tool_result") {
					if (typeof content.content === "string") {
						totalTokens += estimateTokenCount(content.content)
					} else if (Array.isArray(content.content)) {
						for (const c of content.content) {
							if (c.type === "text") {
								totalTokens += estimateTokenCount(c.text)
							}
						}
					}
				}
			}
		}
	}

	return totalTokens
}

/**
 * Truncate messages to fit within a maximum token limit
 * Removes older messages first, keeping the most recent conversation
 */
export function truncateMessages(
	systemPrompt: string,
	messages: Anthropic.Messages.MessageParam[],
	maxInputTokens: number,
): {
	truncatedMessages: Anthropic.Messages.MessageParam[]
	tokensRemoved: number
	messagesRemoved: number
} {
	const systemTokens = estimateTokenCount(systemPrompt)
	let availableTokens = maxInputTokens - systemTokens

	if (availableTokens <= 0) {
		throw new Error(
			`System prompt (${systemTokens} tokens) exceeds max input tokens (${maxInputTokens}). Please reduce the system prompt length.`,
		)
	}

	// Calculate token count for each message
	const messageTokenCounts: number[] = []
	for (const message of messages) {
		let msgTokens = 0
		if (typeof message.content === "string") {
			msgTokens = estimateTokenCount(message.content)
		} else if (Array.isArray(message.content)) {
			for (const content of message.content) {
				if (content.type === "text") {
					msgTokens += estimateTokenCount(content.text)
				} else if (content.type === "tool_use") {
					msgTokens += estimateTokenCount(JSON.stringify(content.input))
				} else if (content.type === "tool_result") {
					if (typeof content.content === "string") {
						msgTokens += estimateTokenCount(content.content)
					} else if (Array.isArray(content.content)) {
						for (const c of content.content) {
							if (c.type === "text") {
								msgTokens += estimateTokenCount(c.text)
							}
						}
					}
				}
			}
		}
		messageTokenCounts.push(msgTokens)
	}

	// Keep messages from the end until we run out of tokens
	const truncatedMessages: Anthropic.Messages.MessageParam[] = []
	let messagesRemoved = 0
	let tokensRemoved = 0

	for (let i = messages.length - 1; i >= 0; i--) {
		const msgTokens = messageTokenCounts[i]
		if (msgTokens <= availableTokens) {
			truncatedMessages.unshift(messages[i])
			availableTokens -= msgTokens
		} else {
			messagesRemoved++
			tokensRemoved += msgTokens
		}
	}

	return {
		truncatedMessages,
		tokensRemoved,
		messagesRemoved,
	}
}
