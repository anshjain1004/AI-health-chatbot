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
    };

    let current = "";

    text.split("\n").forEach((line) => {
      if (line.includes("Possible Conditions")) current = "conditions";
      else if (line.includes("Prevention Tips")) current = "prevention";
      else if (line.includes("Diet Advice")) current = "diet";
      else if (line.includes("Red Flags")) current = "redFlags";
      else if (line.trim() !== "") sections[current] += line + "\n";
    });

    return sections;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await axios.post("http://localhost:5000/chat", {
      message: input,
    });

    const parsed = parseAIResponse(res.data.reply);
    setReply(parsed);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col px-8 pt-16">

      {/* Page Title */}
      <div className="max-w-6xl mx-auto w-full mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          AI Symptom Checker
        </h1>
        <p className="text-slate-600 mt-2">
          Describe your symptoms and receive structured health guidance.
        </p>
      </div>

      {/* Response Cards */}
      <div className="flex-1">
        {reply && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-10">

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

          </div>
        )}
      </div>

      {/* Input Box (Bottom) */}
      <div className="max-w-6xl mx-auto w-full flex gap-4 pb-10">
        <input
          type="text"
          placeholder="Ask health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          onClick={sendMessage}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
        >
          Send
        </button>
      </div>

    </div>
  );
}