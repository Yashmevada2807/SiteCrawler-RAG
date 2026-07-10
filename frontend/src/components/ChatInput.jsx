import axios from "axios";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ loading, setLoading, userPrompt, setUserPrompt, setAiResponse, setMessages }) => {

  const sendUserPrompt = async () => {
    if (!userPrompt.trim()) return

    const userMessage = {
      role: "user",
      content: userPrompt
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER_URL}v1/api/chat`, {
        userInput: userPrompt
      })
      console.log(response.data.data)
      setAiResponse(response.data.data)

      const aiMessage = {
        role: "assistent",
        content: response.data.data.answer
      }

      setMessages((prev) => [...prev, aiMessage])
      setUserPrompt("")
      return response.data
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-4">
      <input
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        type="text"
        placeholder="Ask anything about the crawled website..."
        className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition-all focus:border-blue-500"
      />

      <button
        onClick={sendUserPrompt}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold transition-all hover:bg-blue-700">
        <SendHorizontal size={18} />
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;