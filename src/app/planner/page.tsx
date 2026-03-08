"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { tripService } from "../lib/api";
import { GeoPoint, Stop } from "../lib/types";
import SearchableSelect from "../components/SearchableSelect";
import { 
  Sparkles, RefreshCw, Compass, Plus, ChevronRight, Check, X, Palmtree, Trees, History, Church
} from "lucide-react";

const TripMap = dynamic(() => import("../components/TripMap"), { ssr: false });

export default function PlannerPage() {
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea") || "";

  const [view, setView] = useState<"locations" | "prefs" | "planning" | "selection">("locations");
  const [activeMode, setActiveMode] = useState<"route" | "city" | "discover">("route");
  const [locations, setLocations] = useState<GeoPoint[]>([]);
  const [rawPool, setRawPool] = useState<Stop[]>([]); 
  const [itinerary, setItinerary] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    start_location: "", end_location: "", days: 3, budget: 50000, age: 25,
    interest_beach: 0, interest_nature: 0, interest_history: 0, interest_religious: 0,
  });

  // Pre-fill form logic based on Hero input
  useEffect(() => {
    tripService.getLocations().then(setLocations);
    
    if (idea) {
      const lowerIdea = idea.toLowerCase();
      const newForm = { ...form };
      if (lowerIdea.includes("beach")) newForm.interest_beach = 1;
      if (lowerIdea.includes("nature")) newForm.interest_nature = 1;
      if (lowerIdea.includes("history")) newForm.interest_history = 1;
      
      const dayMatch = lowerIdea.match(/(\d+)\s*day/);
      if (dayMatch) newForm.days = parseInt(dayMatch[1]);
      
      setForm(newForm);
    }
  }, [idea]);

  const startPlanning = async () => {
    if (!form.start_location) return alert("Please select a starting point.");
    setView("planning");
    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        executeAI();
      }
    }, 50); 
  };

  const executeAI = async () => {
    try {
      const res = await tripService.generateTrip(form);
      const allSpots = Object.values(res.itinerary || {}).flat().map(s => ({ ...s, selected: true }));
      setRawPool(allSpots as Stop[]);
      setView("selection");
    } catch (err) {
      alert("AI Engine error. Check backend.");
      setView("prefs");
    }
  };

  const finalizeAIOptimize = () => {
    const selected = rawPool.filter(s => s.selected);
    const organized: any = {};
    selected.forEach((stop, index) => {
      const dayNum = Math.floor(index / 3) + 1; 
      const key = `day_${dayNum}`;
      if (!organized[key]) organized[key] = [];
      organized[key].push(stop);
    });
    setItinerary(organized);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#f8fafc] overflow-hidden">
      <aside className="w-full lg:w-480px bg-white h-full shadow-2xl z-20 flex flex-col border-r">
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <h1 className="text-2xl font-black italic text-blue-600">TRIPMATE AI</h1>
          <button onClick={() => window.location.href='/'} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {view === "locations" && (
            <div className="space-y-8 animate-in slide-in-from-right-10">
              <h3 className="text-3xl font-black italic uppercase text-slate-800">Setting Route</h3>
              <SearchableSelect label="Start Point" options={locations} defaultValue={form.start_location} placeholder="Search origin..." onSelect={(v) => setForm({...form, start_location: v})} />
              <SearchableSelect label="Destination" options={locations} defaultValue={form.end_location} placeholder="Search destination..." onSelect={(v) => setForm({...form, end_location: v})} />
              <button onClick={() => setView("prefs")} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] shadow-lg">
                Continue to Profile <ChevronRight size={16} />
              </button>
            </div>
          )}

          {view === "prefs" && (
            <div className="space-y-8 animate-in slide-in-from-right-10">
              <h3 className="text-3xl font-black italic uppercase text-slate-800">AI Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Days" className="p-4 bg-black rounded-2xl font-bold" value={form.days} onChange={e => setForm({...form, days: +e.target.value})} />
                <input type="number" placeholder="Budget" className="p-4 bg-black rounded-2xl font-bold" value={form.budget} onChange={e => setForm({...form, budget: +e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <PrefToggle active={form.interest_beach === 1} label="Beach" icon={<Palmtree size={14}/>} onClick={() => setForm({...form, interest_beach: form.interest_beach ? 0 : 1})} />
                <PrefToggle active={form.interest_nature === 1} label="Nature" icon={<Trees size={14}/>} onClick={() => setForm({...form, interest_nature: form.interest_nature ? 0 : 1})} />
                <PrefToggle active={form.interest_history === 1} label="History" icon={<History size={14}/>} onClick={() => setForm({...form, interest_history: form.interest_history ? 0 : 1})} />
                <PrefToggle active={form.interest_religious === 1} label="Religious" icon={<Church size={14}/>} onClick={() => setForm({...form, interest_religious: form.interest_religious ? 0 : 1})} />
              </div>
              <button onClick={startPlanning} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase text-[10px] shadow-2xl">
                Execute AI Planning
              </button>
            </div>
          )}

          {view === "planning" && (
            <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in">
              <Sparkles className="text-blue-600 animate-bounce" size={48} />
              <h4 className="text-xl font-black uppercase italic text-slate-800">Processing Route</h4>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {view === "selection" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-10">
              {itinerary ? (
                <div className="space-y-8">
                  {Object.entries(itinerary).map(([day, stops]: any) => (
                    <div key={day} className="bg-blue-50/50 p-6 rounded-32px border border-blue-100">
                      <h4 className="font-black text-blue-600 uppercase text-xs mb-4">{day.replace("_", " ")}</h4>
                      <div className="space-y-2">
                        {stops.map((s: Stop) => (
                          <div key={s.POI_ID} className="bg-white p-4 rounded-2xl text-sm font-bold shadow-sm">{s.Name}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 pb-32">
                  {rawPool.map((stop) => (
                    <div key={stop.POI_ID} onClick={() => setRawPool(prev => prev.map(s => s.POI_ID === stop.POI_ID ? {...s, selected: !s.selected} : s))} className={`flex items-center gap-4 p-5 rounded-[28px] border-2 transition-all cursor-pointer ${stop.selected ? 'border-blue-500 bg-white shadow-xl' : 'opacity-50'}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${stop.selected ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                        {stop.selected ? <Check size={18} /> : <Plus size={18} />}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-black text-slate-800 text-sm mb-1">{stop.Name}</h5>
                        <p className="text-[9px] font-black text-slate-400 uppercase">{stop.City} • {stop.Category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!itinerary && (
                <div className="fixed bottom-0 left-0 w-full lg:w-480px p-6 bg-white/80 backdrop-blur-xl border-t flex gap-3">
                  <button onClick={finalizeAIOptimize} className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase shadow-xl">Yes, Plan for Me</button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      <section className="flex-1 relative bg-slate-200">
        <TripMap stops={rawPool.filter(s => s.selected)} />
      </section>
    </div>
  );
}

function PrefToggle({ active, label, icon, onClick }: { active: boolean, label: string, icon: any, onClick: any }) {
  return (
    <button type="button" onClick={onClick} className={`flex flex-col items-center justify-center gap-2 py-5 rounded-3xl border-2 font-black text-[9px] uppercase transition-all ${active ? 'bg-slate-900 border-slate-900 text-white scale-105' : 'bg-white border-slate-100 text-slate-400'}`}>
      {icon} {label}
    </button>
  );
}