import { StreamingTextResponse } from "ai";
import together from "@/lib/together_ai";
import ChatCompletionMessageParam from "together-ai";
import { ChatCompletionChunk } from "together-ai/resources/chat/completions";

import { structureSystemPrompt } from "./prompts";

export const runtime = "edge";

export interface Message {
  role: string;
  content: string;
}

export function TogetherStream(
  response: AsyncIterable<ChatCompletionChunk>
): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            controller.enqueue(encoder.encode(delta));
          }
        }
      } catch (err) {
        console.error("Stream error:", err);
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}


export async function POST(req: Request) {
  try {
    const data = await req.json();
    const messages = data.messages as Message[];

    const scene = data.scene as string;
    const character = data.character as string;

    const systemPrompt = await structureSystemPrompt(messages, scene, character);
    const messagesWithSystemPrompt: ChatCompletionMessageParam[] = [
      { "role": "system", "content": systemPrompt },
      ...data.messages,
    ];

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: [
        {"role": "system", "content": systemPrompt},
        ...data.messages,
      ],
      max_tokens: 400,
      stream: true,
    });

    const stream = TogetherStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
