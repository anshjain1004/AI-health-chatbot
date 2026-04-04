import React from 'react';

export function ChatHistory() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Chat History</h2>
      <p className="text-slate-600 mb-6">
        Your conversation history is securely stored here. Check back soon for previous interactions with the AI Health Assistant.
      </p>
      <div className="text-slate-500">
        No previous chat history found.
      </div>
    </div>
  );
}

export function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">About Us</h2>
      <p className="text-slate-600 mb-6 max-w-3xl">
        We are dedicated to making health information accessible and understandable using advanced Artificial Intelligence. Our AI Health Assistant provides preliminary symptom checking and disease information to help you make informed decisions.
      </p>
      
      <h3 className="text-xl font-semibold text-slate-800 mb-2">Features</h3>
      <ul className="list-disc pl-5 text-slate-600 space-y-2 mb-8">
        <li>Fast: Instant AI responses</li>
        <li>Secure: Private interactions</li>
        <li>Smart: Powered by modern AI</li>
      </ul>

      <h3 className="text-xl font-semibold text-slate-800 mb-4">Developed By</h3>
      <div className="flex gap-4 flex-wrap">
        <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg border border-teal-200 font-medium">Anshul Pandey</span>
        <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg border border-teal-200 font-medium">Ansh Jain</span>
        <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg border border-teal-200 font-medium">Chandraprakash Patidar</span>
      </div>
    </div>
  );
}

export function ModelStats() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Model Statistics</h2>
      <p className="text-slate-600 mb-6">System performance and capabilities</p>
      
      <div className="max-w-md space-y-4 text-slate-700">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Model Type:</span>
          <span>Gemini API</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Uptime:</span>
          <span>99.9%</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Knowledge Cutoff:</span>
          <span>Continuously Updated</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Average Latency:</span>
          <span>~1.2s</span>
        </div>
      </div>
    </div>
  );
}