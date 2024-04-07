import { AnthropicStream, StreamingTextResponse } from "ai";
import anthropic from "@/lib/anthropic";
import { structureSystemPrompt } from "./prompts";

export const runtime = "edge";

export interface Message {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const messages = data.messages as Message[];

    const time = data.time as string;
    const character = data.character as string;

    const systemPrompt = await structureSystemPrompt(messages, time, character);

    const response = await anthropic.messages.create({
      messages: data.messages,
      model: "claude-3-haiku-20240307",
      stream: true,
      max_tokens: 400,
      system: systemPrompt,
    });

    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
