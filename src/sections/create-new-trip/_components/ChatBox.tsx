"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import TripDurationUi from "./TripDurationUi";
import FinalUi from "./FinalUi";
import { on } from "events";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
}



function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetails, setTripDetails] = useState(null);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;
    setIsLoading(true);

    const newMsg: Message = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    try {
      const result = await axios.post("/api/aimodel", {
        messages: updatedMessages,
        isFinal: isFinal,
      });

      const assistantMsg: Message = {
        role: "assistant",
        content: result?.data?.resp,
        ui: result?.data?.ui,
      };

      console.log("Trip",result.data);

      !isFinal && setMessages((prev) => [...prev, assistantMsg]);
      if(isFinal){
        setTripDetails(result?.data?.trip_plan);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {      
      setIsLoading(false);
    }



  };

  const onSend = async () => {
    await sendMessage(userInput);
    setUserInput("");
  };

    const RenderGenerativeUi = (ui: string) => {
    if (ui === "budget") {
        return <BudgetUi onSelect={(v: string) => sendMessage(v)} />;
    }
    if (ui === "groupSize") {
        return <GroupSizeUi onSelect={(v: string) => sendMessage(v)} />;
    }
    if (ui === "tripDuration") {
      return <TripDurationUi onSelect={(v: string) => sendMessage(v)} />;
    }
    if (ui === "final") {
        return <FinalUi viewTrip={() => console.log()} 
          disable={!tripDetails}
        />;
    }
    return null;
    };

    useEffect(() =>{
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.ui=== "final") {
        setIsFinal(true);
        setUserInput("ok, Great");
        onSend();
      }
    }, [messages]);

  return (
    <div className="h-[80vh] flex flex-col rounded-2xl shadow-md">
      {messages.length === 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            sendMessage(v);
          }}
        />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div className="flex justify-end" key={index}>
              <div className="max-w-lg bg-green-800 text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start" key={index}>
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                {msg.content}
                <div className="mt-2">{msg.ui && RenderGenerativeUi(msg.ui)}</div>
              </div>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-200 rounded-2xl">
        <div className="flex items-center gap-2 bg-white rounded-2xl p-2">
          <textarea
            placeholder="Start typing here..."
            className="flex-1 h-16 resize-none outline-none px-2 py-1 text-black"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button className="bg-green-500 hover:bg-green-600" size="icon" onClick={onSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;