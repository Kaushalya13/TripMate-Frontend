"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import ChatBox from "./_components/ChatBox";
import { useRouter } from "next/navigation";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSend = () => {
    // navigate to the trip creation page
    router.push("/create-new-trip");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div className="bg-black w-95 h-550px rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-linear-to-r from-green-500 to-white">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
              <span className="font-semibold text-white text-sm">TripMate AI</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all hover:rotate-90"
            >
              <X className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-neutral-900 p-2">
            <ChatBox />
          </div>
        </div>
      ) : (
        /* Compact FAB */
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-4 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 text-white flex items-center justify-center group"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -right-2 bottom-full mb-2 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
            Chat with AI
          </span>
        </button>
      )}
    </div>
  );
}