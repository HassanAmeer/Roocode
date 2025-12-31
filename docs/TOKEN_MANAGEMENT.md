# Token Limit Management for AI Models

## Overview

To prevent errors like "Current length is 8662 while limit is 8192", we've implemented comprehensive token limit management for all AI models, with special attention to providers like Cerebras that have strict combined input+output token limits.

## What Changed

### 1. New Model Configuration Fields

Each AI model now supports fine-grained token limit controls:

- **`maxInputTokens`**: Maximum number of tokens for input messages (conversation history)
- **`maxOutputTokens`**: Maximum number of tokens for model output/completion
- **`contextWindow`**: Total context window size (input + output combined)

### 2. Automatic Message Truncation

When your conversation history exceeds the `maxInputTokens` limit:

1. The system automatically removes older messages (from the beginning of the conversation)
2. Keeps the most recent messages that fit within the limit
3. Shows you a warning message indicating:
    - How many messages were removed
    - How many tokens were removed
    - The current token limit

**Example warning:**

```
⚠️ Message history truncated: Removed 3 older message(s) (2518 tokens) to fit within 6144 token limit.
```

### 3. Cerebras Models Updated

All Cerebras models have been configured with appropriate limits:

#### Small Context Models (8K)

- **llama3.1-8b** and **llama3.1-70b**
    - Context Window: 8,192 tokens
    - Max Input: 6,144 tokens (75%)
    - Max Output: 2,048 tokens (25%)

#### Medium Context Models (64K)

- **llama-3.3-70b**, **qwen-3-32b**, **gpt-oss-120b**, **qwen-3-235b-a22b-instruct-2507**
    - Context Window: 64,000 tokens
    - Max Input: 55,000 tokens (~86%)
    - Max Output: 8,192 tokens (~14%)

#### Large Context Models (131K)

- **zai-glm-4.6**
    - Context Window: 131,072 tokens
    - Max Input: 120,000 tokens (~92%)
    - Max Output: 8,192 tokens (~8%)

## How Token Estimation Works

Token counts are estimated using a conservative approach:

- **~4 characters = 1 token** (average for English text)
- System prompts, user messages, and assistant responses all count toward the total
- Tool calls and tool results are also counted

## Best Practices

### 1. Monitor Your Conversation Length

Long conversations will naturally accumulate tokens. Be aware that:

- Each back-and-forth exchange adds to the total
- Code snippets and detailed responses use more tokens
- Images and attachments also consume tokens

### 2. Choose the Right Model

- For **long conversations** → Use models with larger context windows (64K or 131K)
- For **quick tasks** → Smaller models (8K) are faster and sufficient
- For **code-heavy work** → Consider models with higher max output tokens

### 3. Clear Context When Needed

If you see frequent truncation warnings, consider:

- Starting a new conversation for unrelated topics
- Summarizing previous context instead of keeping full history
- Using models with larger context windows

## Customizing Token Limits (Future Enhancement)

In future versions, you'll be able to customize these limits through:

1. **Settings UI** - Slider controls for:

    - Maximum input tokens
    - Maximum output tokens
    - Token reservation strategy

2. **Per-Model Overrides** - Set custom limits for specific models

3. **Conversation-Level Controls** - Adjust limits mid-conversation

## Technical Details

### For Developers

The token management system is implemented in two layers:

1. **Model Configuration** (`packages/types/src/providers/*.ts`)

    ```typescript
    {
      maxTokens: 8192,
      maxInputTokens: 6144,
      maxOutputTokens: 2048,
      contextWindow: 8192,
      // ...
    }
    ```

2. **Runtime Truncation** (`src/api/providers/cerebras.ts`)
    ```typescript
    if (modelInfo.maxInputTokens) {
    	const estimatedTokens = estimateMessagesTokenCount(systemPrompt, messages)
    	if (estimatedTokens > modelInfo.maxInputTokens) {
    		const { truncatedMessages } = truncateMessages(systemPrompt, messages, modelInfo.maxInputTokens)
    		// Use truncatedMessages...
    	}
    }
    ```

### Token Estimation Function

Located in `src/api/utils/token-management.ts`:

- `estimateTokenCount(text)` - Estimates tokens for a single text string
- `estimateMessagesTokenCount(systemPrompt, messages)` - Total tokens for conversation
- `truncateMessages(systemPrompt, messages, maxTokens)` - Removes older messages to fit limit

## Troubleshooting

### "Message history truncated" appears frequently

**Solution:** Use a model with a larger context window, or start a new conversation.

### "System prompt exceeds max input tokens"

**Solution:** Your system prompt is too long. Reduce custom instructions or mode-specific prompts.

### Still getting "exceeds limit" errors

**Solution:** This shouldn't happen with the new system, but if it does:

1. Check if you're using a custom model configuration
2. Verify the model's actual limits on the provider's documentation
3. Report the issue with model name and conversation length

## FAQ

**Q: Will truncation affect my conversation quality?**
A: Truncation removes only the oldest messages. Recent context is preserved, which is typically most relevant to ongoing tasks.

**Q: Can I disable truncation?**
A: Currently, truncation is automatic for your protection. Manual control will be added in future updates.

**Q: Do all providers use this system?**
A: Currently implemented for Cerebras. Other providers will be updated gradually.

**Q: How accurate is the token estimation?**
A: Our estimation is conservative (~4 chars per token). Actual token counts may be slightly different, but we build in safety margins.

## See Also

- [AI Models Documentation](./ai-models.md)
- [Provider-Specific Settings](../docs/providers/README.md)
- [Cerebras Documentation](https://inference-docs.cerebras.ai/)
