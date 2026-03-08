"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe2, Plane, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export const suggestions = [
  { title: "Create a New Trip", icon: <Globe2 className="text-blue-500 h-5 w-5" /> }
];

function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleStartPlanning = () => {
    // We pass the travel idea to the next page as a query parameter
    const params = new URLSearchParams();
    if (query) params.set("idea", query);
    router.push(`/planner?${params.toString()}`);
  };

  return (
    <section id="home" className="relative w-full h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('/images/hero.jpg')` }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 mt-6 w-full flex justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Plan Less. Travel More.
            <br />
            <span className="text-white">Your Next Adventure Begins with <span className="font-black text-green-500">TripMate.</span></span>
          </h1>

          <p className="text-lg sm:text-xl text-white">Tell me your travel idea - We'll plan your perfect trip in seconds.</p>

          <div className="border rounded-2xl p-3 md:p-4 relative bg-white/10 backdrop-blur-md w-full">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. A 3-day beach trip from Moratuwa to Colombo for a nature lover..."
              className="w-full h-24 md:h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base md:text-xl text-white placeholder:text-gray-300"
            />
            <Button 
              onClick={handleStartPlanning}
              size="icon" 
              className="absolute bottom-3 md:bottom-6 right-3 md:right-6 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={handleStartPlanning}
                className="flex items-center gap-2 px-4 py-2 bg-white/90 border border-gray-200 rounded-full shadow-sm hover:bg-blue-50 hover:scale-105 transition transform duration-200 cursor-pointer"
              >
                {suggestion.icon}
                <span className="text-sm font-medium text-gray-800">{suggestion.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;