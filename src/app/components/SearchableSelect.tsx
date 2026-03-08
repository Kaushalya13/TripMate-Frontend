"use client";
import { useState, useEffect, useRef } from "react";
// 1. Using GeoPoint to avoid conflict with browser window.Location
import { GeoPoint } from "../lib/types"; 
import { Search, MapPin, ChevronDown, X, Compass } from "lucide-react";

interface Props {
  label: string;
  options: GeoPoint[];
  onSelect: (value: string) => void;
  placeholder: string;
  defaultValue?: string; // Added for Discovery mode syncing
}

export default function SearchableSelect({ label, options = [], onSelect, placeholder, defaultValue = "" }: Props) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Sync local state if parent value changes (Essential for 'Explore Next' button)
  useEffect(() => {
    setSearchTerm(defaultValue);
    setSelectedName(defaultValue);
  }, [defaultValue]);

  // 🛡️ Safety Filter: Search by Name or City
  const filtered = (options || []).filter((loc) => {
    const name = String(loc?.Name || "").toLowerCase();
    const city = String(loc?.City || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || city.includes(search);
  }).slice(0, 15); // Slightly increased limit for better discovery

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name: string) => {
    setSelectedName(name);
    setSearchTerm(name);
    onSelect(name);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSearchTerm("");
    setSelectedName("");
    onSelect("");
    setIsOpen(true);
  };

  return (
    <div className="relative space-y-2" ref={containerRef}>
      <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
        {label}
      </label>
      
      <div className="relative group">
        <input
          type="text"
          className={`w-full p-4 pl-11 pr-12 bg-slate-50 border-2 rounded-[20px] font-bold text-slate-700 outline-none transition-all
            ${isOpen ? 'border-blue-400 bg-white shadow-lg shadow-blue-50' : 'border-transparent hover:border-slate-200'}
            ${selectedName ? 'text-blue-600' : 'text-slate-700'}`}
          placeholder={placeholder}
          value={searchTerm}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />
        
        <Search className={`absolute left-4 top-4.5 w-4 h-4 transition-colors ${isOpen ? 'text-blue-500' : 'text-slate-400'}`} />
        
        <div className="absolute right-4 top-4 flex items-center gap-2">
            {searchTerm && (
                <button type="button" onClick={clearSelection} className="text-slate-300 hover:text-slate-500 transition-colors">
                    <X size={16} />
                </button>
            )}
            <ChevronDown size={16} className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-100 w-full mt-2 bg-white border border-slate-100 rounded-24px shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <ul className="max-h-300px overflow-y-auto py-2 custom-scrollbar">
            {filtered.length > 0 ? (
              filtered.map((loc) => (
                <li
                  key={loc.POI_ID}
                  className="px-5 py-4 hover:bg-blue-50 cursor-pointer flex items-center justify-between group transition-colors"
                  onClick={() => handleSelect(loc.Name)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                        <MapPin size={14} className="text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <div>
                        <p className={`text-sm font-bold leading-none mb-1 ${selectedName === loc.Name ? 'text-blue-600' : 'text-slate-800'}`}>
                            {loc.Name}
                        </p>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                            {loc.City || "Sri Lanka"}
                        </p>
                    </div>
                  </div>
                  
                  {loc.Category && (
                      <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-500 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        {loc.Category}
                      </span>
                  )}
                </li>
              ))
            ) : (
              <div className="p-10 text-center">
                <Compass size={32} className="mx-auto text-slate-200 mb-2 animate-spin-slow" />
                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">
                    No matching places
                </p>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}