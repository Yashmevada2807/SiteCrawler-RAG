import axios from "axios";
import { ArrowUp } from "lucide-react";

const ChatInput = ({
  loading,
  setLoading,
  userPrompt,
  setUserPrompt,
  setAiResponse,
  setMessages,
}) => {
  const sendUserPrompt = async () => {
    if (!userPrompt.trim()) return;

    const userMessage = { role: "user", content: userPrompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}v1/api/chat`,
        { userInput: userPrompt }
      );
      setAiResponse(response.data.data);

      const aiMessage = {
        role: "assistent",
        content: response.data.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setUserPrompt("");
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendUserPrompt();
  };

  return (
    <div className="flex items-center gap-3">
      <input
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Ask something about the crawled site"
        className="flex-1 rounded-lg border border-line bg-paper-3 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-indigo"
      />

      <button
        onClick={sendUserPrompt}
        disabled={loading}
        aria-label="Send question"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo text-paper-2 hover:bg-indigo-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
