"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe2, Landmark, Plane, Send } from "lucide-react";
import { useRouter } from "next/navigation";  

const suggestions = [
  { title: "Create a New Trip", icon: <Globe2 className="text-blue-400 h-5 w-5"/>, path: "/create-trip" },
  { title: "Explore Places", icon: <Landmark className="text-orange-500 h-5 w-5"/>, path: "/explore-sri-lanka" },
  { title: "My Adventures", icon: <Plane className="text-green-500 h-5 w-5"/>, path: "/my-trips" },
  { title: "Discover Hidden gems", icon: <Landmark className="text-orange-500 h-5 w-5"/>, path: "" },
  
]

export default function Hero() {
  const router = useRouter();
  
  return (
    <section id="home" className="relative w-full h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('/images/hero.jpg')` }}>
      <div className="absolute inset-0 bg-black/15" />
      <div className="relative z-10 mt-6 w-full flex justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Plan Less. Travel More.
            <br />
            <span className="text-white">Your Next Adventure Begins with <span className="text-muted">Explorea.</span></span>
          </h1>

          <p className="text-lg sm:text-xl text-white">Tell me your travel idea - Explorea will plan your perfect trip in seconds.</p>

          <div className="border rounded-2xl p-3 md:p-4 relative bg-white/10 backdrop-blur-md w-full">
            <Textarea
              placeholder="Tell me your travel idea… I'll plan the perfect trip."
              className="w-full h-24 md:h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base md:text-xl text-white placeholder:text-gray-300"
            />
            <Button size="icon" className="absolute bottom-3 md:bottom-6 right-3 md:right-6 bg-muted hover:opacity-90">
              <Send className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-black rounded-full p-2 px-4 md:p-3 cursor-pointer bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                {suggestion.icon}
                <h2 className="text-[10px] md:text-xs text-black font-medium">{suggestion.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>  
  );
}