import anthropic from "@/lib/anthropic";

import { AnthropicStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Extract the `prompt` from the body of the request
    const { messages } = await req.json();

    // Ask Claude for a streaming chat completion given the prompt
    const response = await anthropic.messages.create({
      messages,
      model: "claude-3-haiku-20240307",
      stream: true,
      max_tokens: 300,
    });

    // Convert the response into a friendly text-stream
    const stream = AnthropicStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
