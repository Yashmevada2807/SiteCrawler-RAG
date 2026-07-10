import ChatBubble from "./ChatBubble";


const ChatWindow = ({ messages }) => {


  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto pr-2">
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          message={msg}
        />
      ))}
    </div>
  );
};

export default ChatWindow;