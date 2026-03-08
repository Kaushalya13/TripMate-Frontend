"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function TripDurationUi({ onSelect }: any) {
  const [days, setDays] = useState(3);

  const increase = () => {
    setDays((prev) => prev + 1);
  };

  const decrease = () => {
    if (days > 1) {
      setDays((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 rounded-3xl 
                   backdrop-blur-lg bg-white/70 
                   border border-white/40 
                   shadow-2xl"
      >

        {/* Title */}
        <h2 className="text-md font-semibold text-gray-800 text-center mb-6">
          How many days do you want to travel?
        </h2>

        {/* Counter Section */}
        <div className="flex items-center justify-center gap-8 mb-8">

          {/* Minus Button */}
          <button
            onClick={decrease}
            className="w-5 h-5 flex items-center justify-center
                       rounded-full bg-gray-100
                       hover:bg-green-100
                       text-md font-bold
                       transition-all duration-300"
          >
            −
          </button>

          {/* Days Display */}
          <div className="px-10 py-4 text-sm font-medium
                          rounded-xl
                          bg-linear-to-r from-green-500 to-emerald-500
                          text-white shadow-lg">
            {days}
          </div>

          {/* Plus Button */}
          <button
            onClick={increase}
            className="w-5 h-5 flex items-center justify-center
                       rounded-full bg-gray-100
                       hover:bg-green-100
                       text-md font-bold
                       transition-all duration-300"
          >
            +
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => onSelect(`${days} days`)}
          className="w-full py-3 rounded-xl
                     bg-green-500 hover:bg-green-600
                     text-white font-semibold
                     shadow-md transition-all duration-300
                     hover:scale-105"
        >
          Confirm Trip Duration
        </button>

      </motion.div>
    </div>
  );
}

export default TripDurationUi;