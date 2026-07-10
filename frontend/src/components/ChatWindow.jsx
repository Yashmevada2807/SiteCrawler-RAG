import { Waypoints } from "lucide-react";
import ChatBubble from "./ChatBubble";

const ChatWindow = ({ messages }) => {
  if (!messages.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper-3 text-indigo">
          <Waypoints className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-base font-semibold text-ink">
            No questions yet
          </p>
          <p className="mt-1 max-w-xs text-sm text-ink-2">
            Crawl a site on the left, then ask what you want to know about it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto pr-1">
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg} />
      ))}
    </div>
  );
};

export default ChatWindow;
