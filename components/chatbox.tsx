import { useChat, Message } from "ai/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { XCircle } from "lucide-react";

interface ChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatBox({ open, onClose }: ChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] xl:right-36",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex h-[600px] flex-col rounded bg-background border shadow-xl">
        <div className="h-full">Messages</div>
        <div className="h-full">
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything!"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
  return (
    <div className="mb-3">
      <div>{role}</div>
      <div>{content}</div>
    </div>
  );
}
