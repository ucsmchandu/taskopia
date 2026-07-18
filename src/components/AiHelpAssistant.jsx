import React, { useState } from "react";
import ragChat from "../services/ragChat";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// pre questions
const suggestedQuestions = [
  "How do i post a task?",
  "Can i chat before acceptance?",
  "How do i report a problem?",
  "Is Taskopia safe to use?",
];

const AiHelpAssistant = () => {
  // state to store the messages.
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Taskopia AI Support. Ask me anything about the platform.",
    //   sources: [],
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  // fun to send the question
  const handleSend = async (inputQuestion) => {
    // get the question (or) inputQuestion
    const finalQuestion = (inputQuestion ?? question).trim();

    if (!finalQuestion || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: finalQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      // get the data fron the bot
      const data = await ragChat(finalQuestion);

      // store the msgs
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data?.answer || "I could not generate an answer.",
        //   sources: data?.sources || [],
        },
      ]);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to get an answer. Please try again.",
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I could not answer that right now.",
        //   sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-40">
      <div className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-5 flex items-center gap-3">
          <Sparkles className="w-5 h-5" />
          <div>
            <h2 className="text-lg font-semibold">Taskopia AI Support</h2>
            <p className="text-sm text-gray-300">
              Ask questions about posting, applying, chat, safety, or support.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[520px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* {msg.role === "assistant" && msg.sources?.length > 0 && (
                  <div className="mt-3 border-t border-gray-300 pt-3 text-xs text-gray-600">
                    <p className="font-semibold mb-2">Sources</p>
                    <div className="space-y-1">
                      {msg.sources.map((source, i) => (
                        <p key={i}>
                          {source.source} | chunk {source.chunkIndex} | score{" "}
                          {Number(source.score).toFixed(2)}
                        </p>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSend(item)}
                className="px-3 py-2 text-xs rounded-full border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 min-h-[52px] max-h-36 resize-none rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={loading || !question.trim()}
              className="h-[52px] px-5 rounded-2xl bg-gray-900 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiHelpAssistant;
