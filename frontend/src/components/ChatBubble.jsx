import { Bot, User } from "lucide-react";

const ChatBubble = ({ message }) => {

  const isUser = message.role === "user"
  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`flex max-w-[80%] gap-3 ${isUser ? "flex-row-reverse" : ""
          }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${isUser
            ? "bg-blue-600"
            : "bg-slate-800 border border-slate-700"
            }`}
        >
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} />
          )}
        </div>

        <div
          className={`rounded-2xl p-4 ${isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-700 bg-slate-800 text-slate-100"
            }`}
        >
          <p className="whitespace-pre-wrap leading-7">
            {message.content}
          </p>

          {/* <p className="mt-2 text-xs opacity-60">
            {timestamp}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;