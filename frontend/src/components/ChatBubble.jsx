import { Bot, User, ExternalLink } from "lucide-react";

const ChatBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex w-[70%] gap-3 ${isUser ? "flex-row-reverse" : ""
          }`}
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isUser
            ? "bg-ink text-paper-2"
            : "border border-line bg-paper-3 text-indigo"
            }`}
        >
          {isUser ? <User size={15} /> : <Bot size={15} />}
        </div>

        <div
          className={`rounded-xl px-4 py-3 max-w-[115%] text-[15px] leading-7 ${isUser
            ? "bg-ink text-paper-2"
            : "border border-line bg-paper-3 text-ink"
            }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {!isUser &&
            message.sources &&
            message.sources.length > 0 && (
              message.content !== "I cannot find the answer in the provided context." &&
              message.content !== "I cannot find the answer in the provided text." &&
              message.content !== "I cannot find the answer in the provided information.") ? (
            <div className="mt-4 border-t border-line pt-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
                Sources
              </p>
              <div className="space-y-2">
                {message.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-paper-2 px-3 py-2 text-sm text-indigo transition hover:bg-paper-1 hover:underline"
                  >
                    <ExternalLink size={14} />
                    <span className="truncate">{source}</span>
                  </a>
                ))}
              </div>
            </div>
          ) :
            null
          }
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;