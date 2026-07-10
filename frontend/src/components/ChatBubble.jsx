import { Bot, User } from "lucide-react";

const ChatBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[80%] gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            isUser ? "bg-ink text-paper-2" : "border border-line bg-paper-3 text-indigo"
          }`}
        >
          {isUser ? <User size={15} /> : <Bot size={15} />}
        </div>

        <div
          className={`rounded-xl px-4 py-3 text-[15px] leading-7 ${
            isUser
              ? "bg-ink text-paper-2"
              : "border border-line bg-paper-3 text-ink"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
