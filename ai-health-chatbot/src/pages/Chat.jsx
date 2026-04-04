import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState(null);

  const parseAIResponse = (text) => {
    const sections = {
      conditions: "",
      prevention: "",
      diet: "",
      redFlags: "",
      followUp: "",
    };

    let current = "";

    text.split("\n").forEach((line) => {
      if (line.includes("Possible Conditions")) current = "conditions";
      else if (line.includes("Prevention Tips")) current = "prevention";
      else if (line.includes("Diet Advice")) current = "diet";
      else if (line.includes("Red Flags")) current = "redFlags";
      else if (line.includes("Follow-up Questions")) current = "followUp";
      else if (line.includes("Disclaimer")) current = ""; // ignore disclaimer
      else if (line.trim() !== "") sections[current] += line + "\n";
    });

    return sections;
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    if (reply) {
      // The user is answering the follow-up questions.
      // Append their answer to the followUp box to create a chat-like history
      setReply((prev) => ({
        ...prev,
        followUp: prev.followUp + "\n\n---\n**Your Reply:** " + input + "\n\n*✅ Thank you for these extra details. Since I am an AI analyzing generalized symptom patterns, my primary assessment stands. Please share these specific details with your doctor.*"
      }));
      setInput("");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await axios.post(`${API_URL}/chat`, {
      message: input,
    });

    const parsed = parseAIResponse(res.data.reply);
    setReply(parsed);
    setInput("");
  };

  const startNewQuery = () => {
    setReply(null);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col px-8">
      
      {/* If no reply yet, show centered simplified layout */}
      {!reply ? (
        <div className="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 text-center">
            AI Symptom Checker
          </h1>
          <p className="text-slate-600 mb-8 text-center text-lg">
            Describe your symptoms and receive structured health guidance.
          </p>
          
          <form className="w-full flex gap-4" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="E.g., I have a headache and mild fever..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-4 outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-lg"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition font-medium shadow-sm text-lg"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        /* If reply exists, show results and keep input at the bottom */
        <div className="flex-1 flex flex-col pt-16 max-w-6xl mx-auto w-full">
          {/* Page Title */}
          <div className="mb-10 w-full flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                AI Symptom Checker
              </h1>
              <p className="text-slate-600 mt-2">
                Showing result for your symptoms.
              </p>
            </div>
          </div>

          {/* Response Cards */}
          <div className="flex-1 grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-2">
                🩺 Possible Conditions
              </h3>
              <p className="text-slate-600 whitespace-pre-line">
                {reply.conditions}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-2">
                💊 Prevention Tips
              </h3>
              <p className="text-slate-600 whitespace-pre-line">
                {reply.prevention}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-2">
                🍲 Diet Advice
              </h3>
              <p className="text-slate-600 whitespace-pre-line">
                {reply.diet}
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm">
              <h3 className="font-semibold text-red-600 mb-2">
                🚨 Red Flags
              </h3>
              <p className="text-slate-700 whitespace-pre-line">
                {reply.redFlags}
              </p>
            </div>
            
            {reply.followUp && (
              <div className="md:col-span-2 bg-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-sm mt-4">
                <h3 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                  <span>❓</span> Follow-up Questions for You
                </h3>
                <p className="text-indigo-900 whitespace-pre-line font-medium">
                  {reply.followUp}
                </p>
              </div>
            )}
          </div>

          {/* Input Box (Bottom) */}
          <form className="w-full flex gap-4 pb-10 mt-auto items-center" onSubmit={sendMessage}>
            <button
               type="button"
               onClick={startNewQuery}
               className="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-300 transition shrink-0 font-medium whitespace-nowrap"
            >
              Start New Query
            </button>
            <input
              type="text"
              placeholder="Reply to the follow-up questions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition shrink-0"
            >
              Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}