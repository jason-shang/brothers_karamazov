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
  } = useChat(); // default routes to /api/chat

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
        <div className="flex-1 overflow-y-auto p-4">
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