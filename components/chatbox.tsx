import { useChat, Message } from "ai/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XCircle, Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import { CharacterPromptData } from "@/app/api/chat/prompts";
import characterPrompts from "@/public/characterPrompts.json";

interface ChatBoxProps {
  open: boolean;
  onClose: () => void;
  time: string;
  character: string;
}

export default function ChatBox({
  open,
  onClose,
  time,
  character,
}: ChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat({
    body: {
      time: time,
      character: character,
    },
  }); // default routes to /api/chat

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompts: CharacterPromptData = characterPrompts;

  // scroll to bottom when receiving new messages (works with streaming)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // highlight input field upon opening the chat box
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // boolean will only be true if the AI has not started streaming responses; used to show AI loading state (before streaming starts)
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        open ? "visible" : "invisible"
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      ></div>
      <div
        className={cn(
          "bg-background rounded shadow-xl w-full max-w-[900px] h-[700px] flex flex-col z-10",
          open ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300"
        )}
      >
        <div className="flex justify-end p-2">
          <button onClick={onClose}>
            <XCircle size={24} />
          </button>
        </div>
        <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Loading...",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content:
                  "Uh oh, something went wrong on our side. Please try again.",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <ConversationStarter
              message={{
                content: prompts[time][character]["user"],
              }}
            />
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => {
              setMessages([]);
            }}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything!"
            ref={inputRef}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end"
      )}
    >
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
        )}
      >
        {content}
      </p>
    </div>
  );
}

function ConversationStarter({
  message: { content },
}: {
  message: Pick<Message, "content">;
}) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        "justify-center items-center min-h-screen"
      )}
    >
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          "bg-primary text-primary-foreground"
        )}
      >
        {content}
      </p>
    </div>
  );
}
