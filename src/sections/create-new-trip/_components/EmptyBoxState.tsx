import { suggestions } from "@/sections/Hero";

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className="mt-3 px-2">
      {/* Title */}
      <h2 className="font-semibold text-xl text-center leading-snug">
        Start Planning a new{" "}
        <span className="text-green-400 font-bold">Trip</span> using AI
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-400 text-sm mt-2">
        Discover personalized travel recommendations powered by AI
      </p>

      {/* Suggestions */}
      <div className="flex flex-col gap-3 mt-5">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(suggestion.title)}
            className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-green-50 hover:border-green-300 transition"
          >
            <div className="text-lg">{suggestion.icon}</div>

            <span className="text-sm font-medium text-gray-700">
              {suggestion.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;