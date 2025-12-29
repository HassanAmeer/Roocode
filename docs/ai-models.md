<!-- 


# https://vercel.com/pricing
1M / month request
100 GB / month data transferd .

const axios = require('axios');
const fs = require('fs');
const vercelToken = 'yourtokenvalue'; //Replace with your token
const apiEndPt = 'https://api.vercel.com/v9/projects';

let config = {
  method: 'get',
  url: apiEndPt,
  headers: {
    Authorization: 'Bearer ' + vercelToken,
  },
};
let results = [];

(function loop() {
  axios(config)
    .then(function (response) {
      results.push(...response.data.projects);
      if (response.data.pagination.next !== null) {
        config.url = `${apiEndPt}?until=${response.data.pagination.next}`;
        loop();
      } else {
        //you can use the final results object and for example save it to a json file
        fs.writeFileSync('projects.json', JSON.stringify(results));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
})();



__________________________________________________________________________________________

https://mistral.ai/pricing
https://docs.mistral.ai/getting-started/models
https://docs.mistral.ai/api
monthly free tokens:  100k

086a8e82-bdc2-420c-b60a-94629db6393f

import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({
  apiKey: "MISTRAL_API_KEY",
});

async function run() {
  const result = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: [
      {
        content: "Who is the best French painter? Answer in one short sentence.",
        role: "user",
      },
    ],
  });

  console.log(result);
}

run();


- models: 
Mistral Large 3 icon
Mistral Small 3.2
Ministral 3 14B
Ministral 3 8B
Ministral 3 3B
Magistral Small 1.2









__________________________________________________________________________________________

# https://aistudio.google.com/api-keys
-AIzaSyD5o3jmrNy0aXn3WjFRyvx8pDNDuf81SVw
-AIzaSyAlZqroIZALwMvu5z4MEz-FSN6pPPDV8r4

__________________________________________________________________________________________

# https://openrouter.ai/models?fmt=cards&max_price=0
25+ free models

https://openrouter.ai/settings/keys

sk-or-v1
: remove colon
-1694aab7c648d98ff30077f6b25f525109c83d82045498d365a785a1b525309f

- https://openrouter.ai/models?fmt=cards&max_price=0

allenai/olmo-3.1-32b-think:free
xiaomi/mimo-v2-flash:free
nvidia/nemotron-3-nano-30b-a3b:free
mistralai/devstral-2512:free
nex-agi/deepseek-v3.1-nex-n1:free
arcee-ai/trinity-mini:free
tngtech/tng-r1t-chimera:free
allenai/olmo-3-32b-think:free
kwaipilot/kat-coder-pro:free
nvidia/nemotron-nano-12b-v2-vl:free
nvidia/nemotron-nano-9b-v2:free
openai/gpt-oss-120b:free
openai/gpt-oss-20b:free
z-ai/glm-4.5-air:free
qwen/qwen3-coder:free
moonshotai/kimi-k2:free
cognitivecomputations/dolphin-mistral-24b-venice-edition:free
google/gemma-3n-e2b-it:free
tngtech/deepseek-r1t2-chimera:free
deepseek/deepseek-r1-0528:free
google/gemma-3n-e4b-it:free
qwen/qwen3-4b:free
tngtech/deepseek-r1t-chimera:free
mistralai/mistral-small-3.1-24b-instruct:free
google/gemma-3-4b-it:free
google/gemma-3-12b-it:free
google/gemma-3-27b-it:free
google/gemini-2.0-flash-exp:free
meta-llama/llama-3.3-70b-instruct:free
meta-llama/llama-3.2-3b-instruct:free
qwen/qwen-2.5-vl-7b-instruct:free
nousresearch/hermes-3-llama-3.1-405b:free
meta-llama/llama-3.1-405b-instruct:free
mistralai/mistral-7b-instruct:free

- api example
// First API call with reasoning
let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${<OPENROUTER_API_KEY>}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "allenai/olmo-3.1-32b-think:free",
    "messages": [
      {
        "role": "user",
        "content": "How many r's are in the word 'strawberry'?"
      }
    ],
    "reasoning": {"enabled": true}
  })
});

// Extract the assistant message with reasoning_details and save it to the response variable
const result = await response.json();
response = result.choices[0].message;

// Preserve the assistant message with reasoning_details
const messages = [
  {
    role: 'user',
    content: "How many r's are in the word 'strawberry'?",
  },
  {
    role: 'assistant',
    content: response.content,
    reasoning_details: response.reasoning_details, // Pass back unmodified
  },
  {
    role: 'user',
    content: "Are you sure? Think carefully.",
  },
];

// Second API call - model continues reasoning from where it left off
const response2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${<OPENROUTER_API_KEY>}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "model": "allenai/olmo-3.1-32b-think:free",
    "messages": messages  // Includes preserved reasoning_details
  })
});


__________________________________________________________________________________________


# aimlapi.com
10 request per hour: 

1. 592788de88c2449c8a7bbd88c6641fcf
2. 06331b4a290541099805f5a982dbce7c

https://aimlapi.com/app/keys
https://docs.aimlapi.com/quickstart/setting-up#nodejs


const { OpenAI } = require("openai");

const baseURL = "https://api.aimlapi.com/v1";

// Insert your AIML API Key in the quotation marks instead of my_key:
const apiKey = "<YOUR_AIMLAPI_KEY>"; 

const systemPrompt = "You are a travel agent. Be descriptive and helpful";
const userPrompt = "Tell me about San Francisco";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const main = async () => {
  const completion = await api.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
  });

  const response = completion.choices[0].message.content;

  console.log("User:", userPrompt);
  console.log("AI:", response);
};

main();


- async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-max',
      messages:[
          {
              role:'user',
              content: 'Hello'
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();

- response: 
{
  "id": "chatcmpl-CQ9FPg3osank0dx0k46Z53LTqtXMl",
  "object": "chat.completion",
  "created": 1762343744,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I'm just a program, so I don't have feelings, but I'm here and ready to help you. How can I assist you today?",
        "refusal": null,
        "annotations": null,
        "audio": null,
        "tool_calls": null
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "model": "qwen-max",
  "usage": {
    "prompt_tokens": 137,
    "completion_tokens": 914,
    "total_tokens": 1051,
    "completion_tokens_details": null,
    "prompt_tokens_details": null
  }
}



- all these models:
qwen-max
qwen-plus
qwen-turbo
Qwen2.5-7B-Instruct-Turbo
Qwen2.5-72B-Instruct-Turbo
Qwen2.5-Coder-32B-Instruct
Qwen3-235B-A22B
qwen3-32b
qwen3-coder-480b-a35b-instruct
qwen3-235b-a22b-thinking-2507
qwen3-next-80b-a3b-instruct
qwen3-next-80b-a3b-thinking
qwen3-max-preview
qwen3-max-instruct
qwen3-omni-30b-a3b-captioner
qwen3-vl-32b-instruct
qwen3-vl-32b-thinking

glm-4.5-air
glm-4.5
glm-4.6
glm-4.7 

grok-3-beta
grok-3-mini-beta
grok-4
grok-code-fast-1
grok-4-fast-non-reasoning
grok-4-fast-reasoning
grok-4.1-fast-non-reasoning
grok-4.1-fast-reasoning

sonar
sonar-pro

gpt-3.5-turbo
gpt-4
gpt-4-preview
gpt-4-turbo
gpt-4o
gpt-4o-mini
gpt-4o-audio-preview
gpt-4o-mini-audio-preview
gpt-4o-search-preview
gpt-4o-mini-search-preview
o1
o3
o3-mini
o3-pro
gpt-4.1
gpt-4.1-mini
gpt-4.1-nano
o4-mini
gpt-oss-20b
gpt-oss-120b
gpt-5
gpt-5-mini
gpt-5-nano
gpt-5-chat
gpt-5-pro
gpt-5.1
gpt-5.1-chat-latest
gpt-5.1-codex
gpt-5.1-codex-mini
gpt-5.2
gpt-5.2-chat-latest
gpt-5.2-pro

llama-3.1-nemotron-70b
nemotron-nano-9b-v2
nemotron-nano-12b-v2-vl

kimi-k2-preview
kimi-k2-turbo-preview

Llama-3-chat-hf
Llama-3-8B-Instruct-Lite
Llama-3.1-8B-Instruct-Turbo
Llama-3.1-70B-Instruct-Turbo
Llama-3.1-405B-Instruct-Turbo
Llama-3.2-3B-Instruct-Turbo
Llama-3.3-70B-Instruct-Turbo
Llama-3.3-70B-Versatile
Llama-4-scout
Llama-4-maverick

gemini-2.0-flash-exp
gemini-2.0-flash
gemini-2.5-flash-lite-preview
gemini-2.5-flash
gemini-2.5-pro
gemini-3-pro-preview
gemma-3
gemma-3n-4b
gemini-3-flash-preview

DeepSeek V3
DeepSeek R1
DeepSeek Prover V2
DeepSeek Chat V3.1
DeepSeek Reasoner V3.1
Deepseek Non-reasoner V3.1 Terminus
Deepseek Reasoner V3.1 Terminus
DeepSeek V3.2 Exp Non-thinking
DeepSeek V3.2 Exp Thinking

Claude 3 Haiku
Claude 3 Opus
Claude 3.5 Haiku
Claude 3.7 Sonnet
Claude 4 Opus
Claude 4 Sonnet
Claude 4.1 Opus
Claude 4.5 Sonnet
Claude 4.5 Haiku
Claude 4.5 Opus

- for image
qwen-image
qwen-image-edit
z-image-turbo
z-image-turbo-lora

Imagen 4 Fast Generate
Imagen 4 Ultra Generate
Gemini 2.5 Flash Image (Nano Banana)
Gemini 2.5 Flash Image Edit (Nano Banana)
Nano Banana Pro (Gemini 3 Pro Image)
Nano Banana Pro Edit (Gemini 3 Pro Image Edit)

grok-2-image

__________________________________________________________________________________________

# btez


also add bytez also:

import Bytez from "bytez.js"

const key = "bc43859be40c03ddac31402481d5613c"
const sdk = new Bytez(key)

// choose gemma-3-4b-it
const model = sdk.model("google/gemma-3-4b-it")

// send input to model
const { error, output } = await model.run([
  {
    "role": "user",
    "content": "Hello"
  }
])

console.log({ error, output });

for image :
/*
  npm i bytez.js || yarn add bytez.js
*/

import Bytez from "bytez.js"

const key = "bc43859be40c03ddac31402481d5613c"
const sdk = new Bytez(key)

// choose stable-diffusion-xl-base-1.0
const model = sdk.model("stabilityai/stable-diffusion-xl-base-1.0")

// send input to model
const { error, output } = await model.run("A cat in a wizard hat")

console.log({ error, output });

models names is :
- sentence-transformers/all-MiniLM-L6-v2
- stabilityai/stable-diffusion-xl-base-1.0
- Qwen/Qwen3-0.6B
- openai/whisper-large-v3
- google/gemma-3-1b-it
- openai-community/gpt2
- TinyLlama/TinyLlama-1.1B-Chat-v1.0
- openai/clip-vit-large-patch14 (for images generation).
example api :
/*
  npm i bytez.js || yarn add bytez.js
*/

import Bytez from "bytez.js"

const key = "bc43859be40c03ddac31402481d5613c"
const sdk = new Bytez(key)

// choose clip-vit-large-patch14
const model = sdk.model("openai/clip-vit-large-patch14")

// send input to model
const { error, output } = await model.run({
  "candidate_labels": [
    "squid",
    "octopus",
    "human",
    "cat"
  ],
  "url": "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp"
})

console.log({ error, output });

- BAAI/bge-m3
- stable-diffusion-v1-5/stable-diffusion-v1-5 (for image).
- openai/whisper-large-v3-turbo
- Qwen/Qwen3-1.7B
- Qwen/Qwen3-4B-Thinking-2507
- Qwen/Qwen3-4B-Thinking-2507
- Qwen/Qwen3-4B-Instruct-2507
- ibm-granite/granite-docling-258M
- microsoft/Phi-3-mini-4k-instruct
- facebook/bart-large-mnli
- suno/bark (for text to audio).
- google/siglip-so400m-patch14-384 for image

- sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
- sentence-transformers/paraphrase-multilingual-mpnet-base-v2
- nomic-ai/nomic-embed-text-v1.5
- google/madlad400-3b-mt (for translation)
- facebook/bart-large-cnn (for text to summary).








# groq.com
- https://console.groq.com/keys
https://console.groq.com/docs/rate-limits
-gsk_
:remove colon
CyWwjeqfbPHeH15E7gcXWGdyb3FYShnJyCYdfb8lX5tProFSbElw
rMYtZhEqtxhiWdqhL57kWGdyb3FYtxOiao0SzWhWdr9zU3xdD9W6


import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: "Explain the importance of fast language models",
});
console.log(response.output_text);




# cerebras

- csk
: remove colon
-5pmk8d42rjn3jmj2wm3n49c8net4hfyd8ffpr33y4m8xv4pm

// Backend API route (e.g., Next.js API route or Express server)
const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY}`
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b',
    messages: [{ role: 'user', content: 'Why is fast inference important?' }]
  })
});

const data = await response.json();

# x-ai (Grok).
- https://console.x.ai/team/22920fbe-fe1c-4560-8ab0-c16aad928317/api-keys/create

- xai-
: remove colon
s9S6rNoRdcsk255z8N8Xlr77djJIxA6rNz42kIY3Ux8942dh62D2ZKLkU3MoViGGrtDZFyGFkpormAQ0


curl https://api.x.ai/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc" \
    -d '{
      "messages": [
        {
          "role": "system",
          "content": "You are a test assistant."
        },
        {
          "role": "user",
          "content": "Testing. Just say hi and hello world and nothing else."
        }
      ],
      "model": "grok-4-latest",
      "stream": false,
      "temperature": 0
    }'



# OpenAI: 
- platform.openai.com/api-keys

- part 1: sk
: remove colon
- part2: -proj-
: remove colon
- part 3: dMazK9kk7_V6JUdThJxBSPKahGsnoydjYUvZkIzy4ZftRC4XH9r1QCjynlk1NSaxzTQpu30K5zT3BlbkFJdU12JkwAbDJBLlfouDZIygoWE_utuOJpEqWSQL2QgAafnLY0pgpueRbR2aafxqhp-OLmKNoWAA

please attach part 1+ part 2 + part 3. its seperate due to restrictions and detection.


- javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.2",
  input: "Write a short bedtime story about a unicorn.",
});

console.log(response.output_text);



# novita

- kat coder

- sk_
: remove colon
F2zrb8JBU0TbM-4hajBCU3yvGNhDXus683tceTpWItA
- sk_
: remove colon
lbTzaHnetvnFxQ0AG-ezWvdFdFaTNy9dsw3YSH8_ZKw

https://novita.ai/settings/key-management

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '<Your API Key>',
  baseURL: 'https://api.novita.ai/openai'
});

const response = await openai.chat.completions.create({
  model: 'kat-coder',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, how are you?' }
  ],
  max_tokens: 1000,
  temperature: 0.7
});

console.log(response.choices[0].message.content);
``` -->





import { ModelInfo } from '../types';

export const MODEL_REGISTRY: { [provider: string]: ModelInfo[] } = {
    groq: [
        {
            id: 'llama-3.3-70b-versatile',
            name: 'Llama 3.3 70B',
            provider: 'groq',
            contextWindow: 128000,
            maxTokens: 32768,
            features: ['fast', 'versatile', 'reasoning'],
            freeTier: {
                limit: '14,400 requests/day',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'llama-3.1-8b-instant',
            name: 'Llama 3.1 8B Instant',
            provider: 'groq',
            contextWindow: 128000,
            maxTokens: 8192,
            features: ['ultra-fast', 'instant'],
            freeTier: {
                limit: '30 requests/min',
                resetPeriod: 'minute'
            }
        },
        {
            id: 'allam-2-7b',
            name: 'Allam 2 7B',
            provider: 'groq',
            contextWindow: 32768,
            maxTokens: 4096,
            features: ['arabic', 'fast'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'canopylabs/orpheus-arabic-saudi',
            name: 'Orpheus Arabic Saudi',
            provider: 'groq',
            contextWindow: 32768,
            maxTokens: 4096,
            features: ['arabic', 'specialized'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'canopylabs/orpheus-v1-english',
            name: 'Orpheus v1 English',
            provider: 'groq',
            contextWindow: 32768,
            maxTokens: 4096,
            features: ['english', 'specialized'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'groq/compound',
            name: 'Groq Compound',
            provider: 'groq',
            contextWindow: 70000,
            maxTokens: 8192,
            features: ['compound', 'efficient'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'groq/compound-mini',
            name: 'Groq Compound Mini',
            provider: 'groq',
            contextWindow: 70000,
            maxTokens: 8192,
            features: ['mini', 'efficient'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
            name: 'Llama 4 Maverick 17B',
            provider: 'groq',
            contextWindow: 128000,
            maxTokens: 8192,
            features: ['experimental', 'new'],
            freeTier: {
                limit: 'Limited',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'meta-llama/llama-4-scout-17b-16e-instruct',
            name: 'Llama 4 Scout 17B',
            provider: 'groq',
            contextWindow: 128000,
            maxTokens: 8192,
            features: ['experimental', 'scout'],
            freeTier: {
                limit: 'Limited',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'meta-llama/llama-guard-4-12b',
            name: 'Llama Guard 4 12B',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['safety', 'guard'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'meta-llama/llama-prompt-guard-2-22m',
            name: 'Llama Prompt Guard 2 22M',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['safety', 'lightweight'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'meta-llama/llama-prompt-guard-2-86m',
            name: 'Llama Prompt Guard 2 86M',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['safety', 'standard'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'moonshotai/kimi-k2-instruct',
            name: 'Kimi k2 Instruct',
            provider: 'groq',
            contextWindow: 200000,
            maxTokens: 8192,
            features: ['long-context', 'chinese'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'moonshotai/kimi-k2-instruct-0905',
            name: 'Kimi k2 Instruct 0905',
            provider: 'groq',
            contextWindow: 200000,
            maxTokens: 8192,
            features: ['long-context', 'chinese', 'snapshot'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'openai/gpt-oss-120b',
            name: 'GPT OSS 120B',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['oss', 'large'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'openai/gpt-oss-20b',
            name: 'GPT OSS 20B',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['oss', 'medium'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'openai/gpt-oss-safeguard-20b',
            name: 'GPT OSS Safeguard 20B',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['oss', 'safeguard'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'playai-tts',
            name: 'PlayAI TTS',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 1024,
            features: ['audio', 'tts'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'playai-tts-arabic',
            name: 'PlayAI TTS Arabic',
            provider: 'groq',
            contextWindow: 8192,
            maxTokens: 1024,
            features: ['audio', 'tts', 'arabic'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'qwen/qwen3-32b',
            name: 'Qwen 3 32B',
            provider: 'groq',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['fast', 'multilingual'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'whisper-large-v3',
            name: 'Whisper Large v3',
            provider: 'groq',
            contextWindow: 2048,
            maxTokens: 2048,
            features: ['audio', 'transcription'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'whisper-large-v3-turbo',
            name: 'Whisper Large v3 Turbo',
            provider: 'groq',
            contextWindow: 2048,
            maxTokens: 2048,
            features: ['audio', 'transcription', 'fast'],
            freeTier: {
                limit: 'Standard',
                resetPeriod: 'daily'
            }
        }
    ],
    google: [
        {
            id: 'gemini-2.0-flash-exp',
            name: 'Gemini 2.0 Flash',
            provider: 'google',
            contextWindow: 1000000,
            maxTokens: 8192,
            features: ['multimodal', 'fast', 'experimental'],
            freeTier: {
                limit: '1500 requests/day',
                resetPeriod: 'daily'
            }
        },
        {
            id: 'gemini-1.5-flash',
            name: 'Gemini 1.5 Flash',
            provider: 'google',
            contextWindow: 1000000,
            maxTokens: 8192,
            features: ['multimodal', 'fast'],
            freeTier: {
                limit: '1500 requests/day',
                resetPeriod: 'daily'
            }
        }
    ],
    cerebras: [
        {
            id: 'llama3.1-8b',
            name: 'Llama 3.1 8B',
            provider: 'cerebras',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['ultra-fast', 'efficient'],
            freeTier: {
                limit: 'Unlimited (rate limited)',
                resetPeriod: 'none'
            }
        },
        {
            id: 'llama3.1-70b',
            name: 'Llama 3.1 70B',
            provider: 'cerebras',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['powerful', 'fast'],
            freeTier: {
                limit: 'Unlimited (rate limited)',
                resetPeriod: 'none'
            }
        },
        {
            id: 'qwen-3-32b',
            name: 'Qwen 3 32B',
            provider: 'cerebras',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['fast', 'efficient'],
            freeTier: {
                limit: 'Unlimited (rate limited)',
                resetPeriod: 'none'
            }
        },
        {
            id: 'gpt-oss-120b',
            name: 'OpenAI GPT OSS 120B',
            provider: 'cerebras',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['large', 'powerful'],
            freeTier: {
                limit: 'Unlimited (rate limited)',
                resetPeriod: 'none'
            }
        },
        {
            id: 'zai-glm-4.6',
            name: 'Z.ai GLM 4.6',
            provider: 'cerebras',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['advanced', 'reasoning'],
            freeTier: {
                limit: 'Unlimited (rate limited)',
                resetPeriod: 'none'
            }
        },
        {
            id: 'qwen-3-235b-instruct',
            name: 'Qwen 3 235B (Instruct)',
            provider: 'cerebras',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['mammoth', 'instruct', 'powerful'],
            freeTier: {
                limit: 'Unlimited (rate limited)',
                resetPeriod: 'none'
            }
        }
    ],
    sambanova: [
        {
            id: 'Meta-Llama-3.1-8B-Instruct',
            name: 'Llama 3.1 8B',
            provider: 'sambanova',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['fast', 'efficient'],
            freeTier: {
                limit: 'Generous free tier',
                resetPeriod: 'monthly'
            }
        },
        {
            id: 'Meta-Llama-3.1-70B-Instruct',
            name: 'Llama 3.1 70B',
            provider: 'sambanova',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['powerful', 'accurate'],
            freeTier: {
                limit: 'Generous free tier',
                resetPeriod: 'monthly'
            }
        }
    ],
    openai: [
        {
            id: 'gpt-4o-mini',
            name: 'GPT-4o Mini',
            provider: 'openai',
            contextWindow: 128000,
            maxTokens: 16384,
            features: ['fast', 'affordable', 'multimodal'],
            pricing: {
                input: 0.00015,
                output: 0.0006
            }
        },
        {
            id: 'gpt-4o',
            name: 'GPT-4o',
            provider: 'openai',
            contextWindow: 128000,
            maxTokens: 16384,
            features: ['powerful', 'multimodal', 'latest'],
            pricing: {
                input: 0.0025,
                output: 0.01
            }
        }
    ],
    anthropic: [
        {
            id: 'claude-3-5-sonnet-20241022',
            name: 'Claude 3.5 Sonnet',
            provider: 'anthropic',
            contextWindow: 200000,
            maxTokens: 8192,
            features: ['powerful', 'reasoning', 'coding'],
            pricing: {
                input: 0.003,
                output: 0.015
            }
        },
        {
            id: 'claude-3-5-haiku-20241022',
            name: 'Claude 3.5 Haiku',
            provider: 'anthropic',
            contextWindow: 200000,
            maxTokens: 8192,
            features: ['fast', 'affordable'],
            pricing: {
                input: 0.0008,
                output: 0.004
            }
        }
    ],
    xai: [
        {
            id: 'grok-4-latest',
            name: 'Grok 4 (Latest)',
            provider: 'xai',
            contextWindow: 128000,
            maxTokens: 4096,
            features: ['intelligence', 'latest'],
            pricing: {
                input: 0,
                output: 0
            }
        },
        {
            id: 'grok-beta',
            name: 'Grok Beta',
            provider: 'xai',
            contextWindow: 128000,
            maxTokens: 4096,
            features: ['beta', 'reasoning'],
            pricing: {
                input: 0,
                output: 0
            }
        },
        {
            id: 'grok-3',
            name: 'Grok 3',
            provider: 'xai',
            contextWindow: 128000,
            maxTokens: 4096,
            features: ['fast', 'stable'],
            pricing: {
                input: 0,
                output: 0
            }
        },
        {
            id: 'grok-2',
            name: 'Grok 2',
            provider: 'xai',
            contextWindow: 128000,
            maxTokens: 4096,
            features: ['standard', 'efficient'],
            pricing: {
                input: 0,
                output: 0
            }
        }
    ],
    novita: [
        {
            id: 'kat-coder',
            name: 'Kat Coder',
            provider: 'novita',
            contextWindow: 32000,
            maxTokens: 1000,
            features: ['coding', 'efficient'],
            pricing: {
                input: 0,
                output: 0
            }
        }
    ],
    bytez: [
        {
            id: 'google/gemma-3-4b-it',
            name: 'Gemma 3 4B',
            provider: 'bytez',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['google', 'chat'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'sentence-transformers/all-MiniLM-L6-v2',
            name: 'All MiniLM L6 v2',
            provider: 'bytez',
            contextWindow: 512,
            maxTokens: 512,
            features: ['embedding', 'fast'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'stabilityai/stable-diffusion-xl-base-1.0',
            name: 'Stable Diffusion XL 1.0',
            provider: 'bytez',
            contextWindow: 77,
            maxTokens: 1024,
            features: ['image', 'generation'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen/Qwen3-0.6B',
            name: 'Qwen 3 0.6B',
            provider: 'bytez',
            contextWindow: 32768,
            maxTokens: 4096,
            features: ['qwen', 'chat', 'lightweight'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'openai/whisper-large-v3',
            name: 'Whisper Large v3',
            provider: 'bytez',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['audio', 'transcription'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'google/gemma-3-1b-it',
            name: 'Gemma 3 1B',
            provider: 'bytez',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['google', 'chat', 'lightweight'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'openai-community/gpt2',
            name: 'GPT-2',
            provider: 'bytez',
            contextWindow: 1024,
            maxTokens: 1024,
            features: ['classic', 'chat'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
            name: 'TinyLlama 1.1B',
            provider: 'bytez',
            contextWindow: 2048,
            maxTokens: 2048,
            features: ['tiny', 'chat'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'openai/clip-vit-large-patch14',
            name: 'CLIP ViT Large',
            provider: 'bytez',
            contextWindow: 77,
            maxTokens: 512,
            features: ['vision', 'embedding'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'BAAI/bge-m3',
            name: 'BGE M3',
            provider: 'bytez',
            contextWindow: 8192,
            maxTokens: 512,
            features: ['embedding', 'multilingual'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'stable-diffusion-v1-5/stable-diffusion-v1-5',
            name: 'Stable Diffusion v1.5',
            provider: 'bytez',
            contextWindow: 77,
            maxTokens: 1024,
            features: ['image', 'generation'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'openai/whisper-large-v3-turbo',
            name: 'Whisper Large v3 Turbo',
            provider: 'bytez',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['audio', 'transcription', 'fast'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen/Qwen3-1.7B',
            name: 'Qwen 3 1.7B',
            provider: 'bytez',
            contextWindow: 32768,
            maxTokens: 4096,
            features: ['qwen', 'chat'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen/Qwen3-4B-Thinking-2507',
            name: 'Qwen 3 4B Thinking',
            provider: 'bytez',
            contextWindow: 32768,
            maxTokens: 4096,
            features: ['qwen', 'chat', 'reasoning'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen/Qwen3-4B-Instruct-2507',
            name: 'Qwen 3 4B Instruct',
            provider: 'bytez',
            contextWindow: 32768,
            maxTokens: 4096,
            features: ['qwen', 'chat', 'instruct'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'ibm-granite/granite-docling-258M',
            name: 'Granite Docling',
            provider: 'bytez',
            contextWindow: 8192,
            maxTokens: 4096,
            features: ['document', 'processing'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'microsoft/Phi-3-mini-4k-instruct',
            name: 'Phi-3 Mini 4k',
            provider: 'bytez',
            contextWindow: 4096,
            maxTokens: 4096,
            features: ['microsoft', 'chat', 'small'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'facebook/bart-large-mnli',
            name: 'BART Large MNLI',
            provider: 'bytez',
            contextWindow: 1024,
            maxTokens: 1024,
            features: ['classification', 'nli'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'suno/bark',
            name: 'Suno Bark',
            provider: 'bytez',
            contextWindow: 1024,
            maxTokens: 1024,
            features: ['audio', 'generation'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'google/siglip-so400m-patch14-384',
            name: 'SigLIP SO400M',
            provider: 'bytez',
            contextWindow: 77,
            maxTokens: 512,
            features: ['vision', 'embedding'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
            name: 'Paraphrase Multi L12',
            provider: 'bytez',
            contextWindow: 512,
            maxTokens: 512,
            features: ['embedding', 'multilingual'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'sentence-transformers/paraphrase-multilingual-mpnet-base-v2',
            name: 'Paraphrase Multi MPNet',
            provider: 'bytez',
            contextWindow: 512,
            maxTokens: 512,
            features: ['embedding', 'multilingual'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'nomic-ai/nomic-embed-text-v1.5',
            name: 'Nomic Embed 1.5',
            provider: 'bytez',
            contextWindow: 8192,
            maxTokens: 8192,
            features: ['embedding'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'google/madlad400-3b-mt',
            name: 'MADLAD-400 3B MT',
            provider: 'bytez',
            contextWindow: 2048,
            maxTokens: 2048,
            features: ['translation'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'facebook/bart-large-cnn',
            name: 'BART Large CNN',
            provider: 'bytez',
            contextWindow: 1024,
            maxTokens: 1024,
            features: ['summarization'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        }
    ],
    aimlapi: [
        {
            id: 'qwen-max',
            name: 'Qwen Max',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['advanced', 'reasoning'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen-plus',
            name: 'Qwen Plus',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['balanced', 'fast'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen-turbo',
            name: 'Qwen Turbo',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['fast', 'efficient'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen2.5-7B-Instruct-Turbo',
            name: 'Qwen 2.5 7B Turbo',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['fast', 'instruct'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen2.5-72B-Instruct-Turbo',
            name: 'Qwen 2.5 72B Turbo',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['powerful', 'instruct'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen2.5-Coder-32B-Instruct',
            name: 'Qwen 2.5 Coder 32B',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['coding', 'instruct'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'Qwen3-235B-A22B',
            name: 'Qwen 3 235B',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['mammoth', 'powerful'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-32b',
            name: 'Qwen 3 32B',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['balanced', 'latest'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-coder-480b-a35b-instruct',
            name: 'Qwen 3 Coder 480B',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['coding', 'massive'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-235b-a22b-thinking-2507',
            name: 'Qwen 3 235B Thinking',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['reasoning', 'thinking'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-next-80b-a3b-instruct',
            name: 'Qwen 3 Next 80B',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['next-gen', 'instruct'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-next-80b-a3b-thinking',
            name: 'Qwen 3 Next 80B Thinking',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['next-gen', 'thinking'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-max-preview',
            name: 'Qwen 3 Max Preview',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['preview', 'advanced'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-max-instruct',
            name: 'Qwen 3 Max Instruct',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['instruct', 'max'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-omni-30b-a3b-captioner',
            name: 'Qwen 3 Omni 30B',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['multimodal', 'captioner'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-vl-32b-instruct',
            name: 'Qwen 3 VL 32B',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['vision', 'instruct'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        {
            id: 'qwen3-vl-32b-thinking',
            name: 'Qwen 3 VL 32B Thinking',
            provider: 'aimlapi',
            contextWindow: 32768,
            maxTokens: 8192,
            features: ['vision', 'thinking'],
            freeTier: { limit: 'Standard', resetPeriod: 'none' }
        },
        // GLM
        { id: 'glm-4.5-air', name: 'GLM 4.5 Air', provider: 'aimlapi', contextWindow: 32768, maxTokens: 8192, features: ['fast'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'glm-4.5', name: 'GLM 4.5', provider: 'aimlapi', contextWindow: 32768, maxTokens: 8192, features: ['standard'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'glm-4.6', name: 'GLM 4.6', provider: 'aimlapi', contextWindow: 32768, maxTokens: 8192, features: ['advanced'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'glm-4.7', name: 'GLM 4.7', provider: 'aimlapi', contextWindow: 32768, maxTokens: 8192, features: ['latest'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Grok
        { id: 'grok-3-beta', name: 'Grok 3 Beta', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['beta'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-3-mini-beta', name: 'Grok 3 Mini Beta', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['mini', 'beta'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-4', name: 'Grok 4', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['latest'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-code-fast-1', name: 'Grok Code Fast 1', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['coding', 'fast'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-4-fast-non-reasoning', name: 'Grok 4 Fast (Non-Reasoning)', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['fast'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-4-fast-reasoning', name: 'Grok 4 Fast (Reasoning)', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['fast', 'reasoning'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-4.1-fast-non-reasoning', name: 'Grok 4.1 Fast (Non-Reasoning)', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['fast', 'latest'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-4.1-fast-reasoning', name: 'Grok 4.1 Fast (Reasoning)', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['fast', 'reasoning'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Sonar
        { id: 'sonar', name: 'Sonar', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['search'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'sonar-pro', name: 'Sonar Pro', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['search', 'pro'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // OpenAI
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'aimlapi', contextWindow: 16384, maxTokens: 4096, features: ['classic'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4', name: 'GPT-4', provider: 'aimlapi', contextWindow: 8192, maxTokens: 8192, features: ['powerful'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4-preview', name: 'GPT-4 Preview', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['preview'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'aimlapi', contextWindow: 128000, maxTokens: 4096, features: ['turbo'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4o', name: 'GPT-4o', provider: 'aimlapi', contextWindow: 128000, maxTokens: 4096, features: ['omni'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['omni', 'mini'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4o-audio-preview', name: 'GPT-4o Audio Preview', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['audio', 'preview'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4o-mini-audio-preview', name: 'GPT-4o Mini Audio Preview', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['audio', 'preview'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4o-search-preview', name: 'GPT-4o Search Preview', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['search', 'preview'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4o-mini-search-preview', name: 'GPT-4o Mini Search Preview', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['search', 'preview'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'o1', name: 'OpenAI o1', provider: 'aimlapi', contextWindow: 128000, maxTokens: 32768, features: ['reasoning'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'o3', name: 'OpenAI o3', provider: 'aimlapi', contextWindow: 128000, maxTokens: 32768, features: ['reasoning', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'o3-mini', name: 'OpenAI o3 Mini', provider: 'aimlapi', contextWindow: 128000, maxTokens: 32768, features: ['reasoning', 'mini'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'o3-pro', name: 'OpenAI o3 Pro', provider: 'aimlapi', contextWindow: 128000, maxTokens: 32768, features: ['reasoning', 'pro'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['experimental'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['experimental', 'mini'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['experimental', 'nano'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'o4-mini', name: 'OpenAI o4 Mini', provider: 'aimlapi', contextWindow: 128000, maxTokens: 32768, features: ['future', 'mini'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-oss-20b', name: 'GPT OSS 20B', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['oss'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-oss-120b', name: 'GPT OSS 120B', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['oss'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5', name: 'GPT-5', provider: 'aimlapi', contextWindow: 200000, maxTokens: 32768, features: ['future'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5-mini', name: 'GPT-5 Mini', provider: 'aimlapi', contextWindow: 200000, maxTokens: 32768, features: ['future', 'mini'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5-nano', name: 'GPT-5 Nano', provider: 'aimlapi', contextWindow: 128000, maxTokens: 16384, features: ['future', 'nano'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5-chat', name: 'GPT-5 Chat', provider: 'aimlapi', contextWindow: 200000, maxTokens: 32768, features: ['future'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5-pro', name: 'GPT-5 Pro', provider: 'aimlapi', contextWindow: 200000, maxTokens: 64000, features: ['future', 'pro'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5.1', name: 'GPT-5.1', provider: 'aimlapi', contextWindow: 200000, maxTokens: 32768, features: ['future', 'advanced'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5.1-chat-latest', name: 'GPT-5.1 Chat Latest', provider: 'aimlapi', contextWindow: 200000, maxTokens: 32768, features: ['future'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5.1-codex', name: 'GPT-5.1 Codex', provider: 'aimlapi', contextWindow: 128000, maxTokens: 32768, features: ['coding', 'future'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5.1-codex-mini', name: 'GPT-5.1 Codex Mini', provider: 'aimlapi', contextWindow: 128000, maxTokens: 32768, features: ['coding', 'mini'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5.2', name: 'GPT-5.2', provider: 'aimlapi', contextWindow: 200000, maxTokens: 32768, features: ['future', 'advanced'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5.2-chat-latest', name: 'GPT-5.2 Chat Latest', provider: 'aimlapi', contextWindow: 200000, maxTokens: 32768, features: ['future'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gpt-5.2-pro', name: 'GPT-5.2 Pro', provider: 'aimlapi', contextWindow: 200000, maxTokens: 64000, features: ['future', 'pro'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Nemotron
        { id: 'llama-3.1-nemotron-70b', name: 'Llama 3.1 Nemotron 70B', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['nvidia', 'custom'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'nemotron-nano-9b-v2', name: 'Nemotron Nano 9B v2', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['nvidia', 'nano'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'nemotron-nano-12b-v2-vl', name: 'Nemotron Nano 12B VL', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['nvidia', 'vision'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Kimi
        { id: 'kimi-k2-preview', name: 'Kimi K2 Preview', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['chinese', 'long-context'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'kimi-k2-turbo-preview', name: 'Kimi K2 Turbo Preview', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['chinese', 'turbo'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Llama
        { id: 'Llama-3-chat-hf', name: 'Llama 3 Chat HF', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['meta'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-3-8B-Instruct-Lite', name: 'Llama 3 8B Lite', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['meta', 'lite'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Turbo', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'turbo'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-3.1-70B-Instruct-Turbo', name: 'Llama 3.1 70B Turbo', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'turbo'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-3.1-405B-Instruct-Turbo', name: 'Llama 3.1 405B Turbo', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'turbo', 'massive'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-3.2-3B-Instruct-Turbo', name: 'Llama 3.2 3B Turbo', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'small', 'turbo'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-3.3-70B-Instruct-Turbo', name: 'Llama 3.3 70B Turbo', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'new', 'turbo'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-3.3-70B-Versatile', name: 'Llama 3.3 70B Versatile', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-4-scout', name: 'Llama 4 Scout', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'experimental'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Llama-4-maverick', name: 'Llama 4 Maverick', provider: 'aimlapi', contextWindow: 128000, maxTokens: 8192, features: ['meta', 'experimental'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Gemini
        { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash Exp', provider: 'aimlapi', contextWindow: 1000000, maxTokens: 8192, features: ['google', 'flash'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'aimlapi', contextWindow: 1000000, maxTokens: 8192, features: ['google', 'flash'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemini-2.5-flash-lite-preview', name: 'Gemini 2.5 Flash Lite', provider: 'aimlapi', contextWindow: 1000000, maxTokens: 8192, features: ['google', 'lite'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'aimlapi', contextWindow: 1000000, maxTokens: 8192, features: ['google', 'flash', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'aimlapi', contextWindow: 2000000, maxTokens: 8192, features: ['google', 'pro', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro Preview', provider: 'aimlapi', contextWindow: 2000000, maxTokens: 8192, features: ['google', 'future'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemma-3', name: 'Gemma 3', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['google', 'open'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemma-3n-4b', name: 'Gemma 3n 4B', provider: 'aimlapi', contextWindow: 8192, maxTokens: 4096, features: ['google', 'small'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview', provider: 'aimlapi', contextWindow: 1000000, maxTokens: 8192, features: ['google', 'future'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // DeepSeek
        { id: 'DeepSeek V3', name: 'DeepSeek V3', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'DeepSeek R1', name: 'DeepSeek R1', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek', 'reasoning'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'DeepSeek Prover V2', name: 'DeepSeek Prover V2', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek', 'math'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'DeepSeek Chat V3.1', name: 'DeepSeek Chat V3.1', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek', 'chat'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'DeepSeek Reasoner V3.1', name: 'DeepSeek Reasoner V3.1', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek', 'reasoning'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Deepseek Non-reasoner V3.1 Terminus', name: 'DeepSeek V3.1 Terminus', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Deepseek Reasoner V3.1 Terminus', name: 'DeepSeek Reasoner V3.1 T', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek', 'reasoning'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'DeepSeek V3.2 Exp Non-thinking', name: 'DeepSeek V3.2 Exp', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek', 'experimental'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'DeepSeek V3.2 Exp Thinking', name: 'DeepSeek V3.2 Exp Think', provider: 'aimlapi', contextWindow: 32768, maxTokens: 4096, features: ['deepseek', 'experimental', 'reasoning'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Claude
        { id: 'Claude 3 Haiku', name: 'Claude 3 Haiku', provider: 'aimlapi', contextWindow: 200000, maxTokens: 4096, features: ['anthropic', 'fast'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 3 Opus', name: 'Claude 3 Opus', provider: 'aimlapi', contextWindow: 200000, maxTokens: 4096, features: ['anthropic', 'powerful'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 3.5 Haiku', name: 'Claude 3.5 Haiku', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['anthropic', 'fast', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 3.7 Sonnet', name: 'Claude 3.7 Sonnet', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['anthropic', 'balanced'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 4 Opus', name: 'Claude 4 Opus', provider: 'aimlapi', contextWindow: 200000, maxTokens: 4096, features: ['anthropic', 'powerful'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 4 Sonnet', name: 'Claude 4 Sonnet', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['anthropic', 'balanced'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 4.1 Opus', name: 'Claude 4.1 Opus', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['anthropic', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 4.5 Sonnet', name: 'Claude 4.5 Sonnet', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['anthropic', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 4.5 Haiku', name: 'Claude 4.5 Haiku', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['anthropic', 'fast', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Claude 4.5 Opus', name: 'Claude 4.5 Opus', provider: 'aimlapi', contextWindow: 200000, maxTokens: 8192, features: ['anthropic', 'powerful', 'new'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },

        // Image
        { id: 'qwen-image', name: 'Qwen Image', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['image'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'qwen-image-edit', name: 'Qwen Image Edit', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['image', 'edit'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'z-image-turbo', name: 'Z Image Turbo', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['image', 'fast'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'z-image-turbo-lora', name: 'Z Image Turbo LoRA', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['image', 'lora'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Imagen 4 Fast Generate', name: 'Imagen 4 Fast', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['google', 'image'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Imagen 4 Ultra Generate', name: 'Imagen 4 Ultra', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['google', 'image'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Gemini 2.5 Flash Image (Nano Banana)', name: 'Gemini 2.5 Flash Image', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['google', 'image'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Gemini 2.5 Flash Image Edit (Nano Banana)', name: 'Gemini 2.5 Image Edit', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['google', 'edit'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Nano Banana Pro (Gemini 3 Pro Image)', name: 'Gemini 3 Pro Image', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['google', 'image', 'pro'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'Nano Banana Pro Edit (Gemini 3 Pro Image Edit)', name: 'Gemini 3 Pro Edit', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['google', 'edit', 'pro'], freeTier: { limit: 'Standard', resetPeriod: 'none' } },
        { id: 'grok-2-image', name: 'Grok 2 Image', provider: 'aimlapi', contextWindow: 0, maxTokens: 0, features: ['xai', 'image'], freeTier: { limit: 'Standard', resetPeriod: 'none' } }
    ],
    openrouter: [
        { id: 'allenai/olmo-3.1-32b-think:free', name: 'Olmo 3.1 32B Think', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free', 'thinking'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'xiaomi/mimo-v2-flash:free', name: 'Mimo v2 Flash', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'nvidia/nemotron-3-nano-30b-a3b:free', name: 'Nemotron 3 Nano 30B', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'mistralai/devstral-2512:free', name: 'Devstral 2512', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'nex-agi/deepseek-v3.1-nex-n1:free', name: 'Deepseek v3.1 Nex N1', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'arcee-ai/trinity-mini:free', name: 'Trinity Mini', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'tngtech/tng-r1t-chimera:free', name: 'TNG R1T Chimera', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'allenai/olmo-3-32b-think:free', name: 'Olmo 3 32B Think', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free', 'thinking'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'kwaipilot/kat-coder-pro:free', name: 'Kat Coder Pro', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free', 'coding'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'nvidia/nemotron-nano-12b-v2-vl:free', name: 'Nemotron Nano 12B VL', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free', 'vision'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'nvidia/nemotron-nano-9b-v2:free', name: 'Nemotron Nano 9B', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'openai/gpt-oss-120b:free', name: 'GPT OSS 120B', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'openai/gpt-oss-20b:free', name: 'GPT OSS 20B', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'z-ai/glm-4.5-air:free', name: 'GLM 4.5 Air', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'qwen/qwen3-coder:free', name: 'Qwen 3 Coder', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free', 'coding'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'moonshotai/kimi-k2:free', name: 'Kimi k2', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free', name: 'Dolphin Mistral 24B Venice', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'google/gemma-3n-e2b-it:free', name: 'Gemma 3n 2B IT', provider: 'openrouter', contextWindow: 8192, maxTokens: 4096, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'tngtech/deepseek-r1t2-chimera:free', name: 'Deepseek R1T2 Chimera', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'deepseek/deepseek-r1-0528:free', name: 'Deepseek R1 0528', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'google/gemma-3n-e4b-it:free', name: 'Gemma 3n 4B IT', provider: 'openrouter', contextWindow: 8192, maxTokens: 4096, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'qwen/qwen3-4b:free', name: 'Qwen 3 4B', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'tngtech/deepseek-r1t-chimera:free', name: 'Deepseek R1T Chimera', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: 'Mistral Small 3.1 24B', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'google/gemma-3-4b-it:free', name: 'Gemma 3 4B IT', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'google/gemma-3-12b-it:free', name: 'Gemma 3 12B IT', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'google/gemma-3-27b-it:free', name: 'Gemma 3 27B IT', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash Exp', provider: 'openrouter', contextWindow: 1000000, maxTokens: 8192, features: ['free', 'google'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B Instruct', provider: 'openrouter', contextWindow: 128000, maxTokens: 8192, features: ['free', 'meta'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B Instruct', provider: 'openrouter', contextWindow: 128000, maxTokens: 8192, features: ['free', 'meta'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'qwen/qwen-2.5-vl-7b-instruct:free', name: 'Qwen 2.5 VL 7B', provider: 'openrouter', contextWindow: 32768, maxTokens: 8192, features: ['free', 'vision'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'nousresearch/hermes-3-llama-3.1-405b:free', name: 'Hermes 3 Llama 3.1 405B', provider: 'openrouter', contextWindow: 128000, maxTokens: 8192, features: ['free', 'hermes'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'meta-llama/llama-3.1-405b-instruct:free', name: 'Llama 3.1 405B Instruct', provider: 'openrouter', contextWindow: 128000, maxTokens: 8192, features: ['free', 'meta'], freeTier: { limit: 'Free', resetPeriod: 'none' } },
        { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B Instruct', provider: 'openrouter', contextWindow: 32768, maxTokens: 4096, features: ['free'], freeTier: { limit: 'Free', resetPeriod: 'none' } }
    ]
};

export function getModelById(modelId: string): ModelInfo | undefined {
    for (const provider in MODEL_REGISTRY) {
        const model = MODEL_REGISTRY[provider].find(m => m.id === modelId);
        if (model) { return model; }
    }
    return undefined;
}

export function getProviderModels(provider: string): ModelInfo[] {
    return MODEL_REGISTRY[provider] || [];
}

