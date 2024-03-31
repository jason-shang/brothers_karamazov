import anthropic from "@/lib/anthropic";

import { AnthropicStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await anthropic.messages.create({
      messages,
      model: "claude-3-haiku-20240307",
      stream: true,
      max_tokens: 300,
    });

    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}