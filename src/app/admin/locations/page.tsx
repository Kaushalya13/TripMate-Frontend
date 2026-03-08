"use client";
import { useState, useEffect, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { 
  Trash2, RefreshCw, Search, Plus, MapPin, 
  DollarSign, Clock, ChevronLeft, ChevronRight, Edit3 
} from "lucide-react";

export default function ManageLocations() {
  const [locations, setLocations] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  useEffect(() => { fetchLocs(); }, []);

  const fetchLocs = async () => {
    const { data } = await supabase.from("locations").select("*").order("poi_id", { ascending: true });
    if (data) setLocations(data);
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sync-model`, { method: "POST" });
      const data = await res.json();
      alert(data.message);
    } catch (e) { alert("Sync failed!"); }
    setSyncing(false);
  };

  const filtered = locations.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.category.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">GEOGRAPHIC ASSETS</h2>
          <p className="text-slate-500 font-medium">Manage and Sync {locations.length} POIs</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-white border border-slate-200 p-3 rounded-2xl hover:bg-slate-50 transition-all text-slate-600 shadow-sm">
                <Plus size={20} />
            </button>
            <button onClick={handleSync} disabled={syncing} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                <RefreshCw className={syncing ? "animate-spin" : ""} size={16} />
                {syncing ? "Retraining..." : "Sync Engine"}
            </button>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-200 flex items-center px-6 focus-within:ring-2 focus:ring-blue-100 transition-all">
        <Search className="text-slate-400" size={20} />
        <input 
            type="text" 
            placeholder="Search by name, category, or city..." 
            className="w-full p-4 border-0 focus:ring-0 font-bold text-slate-700" 
            onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}} 
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-32px shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="px-8 py-5">Location</th>
              <th className="px-8 py-5">Details</th>
              <th className="px-8 py-5">Financials</th>
              <th className="px-8 py-5">Interest Mapping</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.map(loc => (
              <tr key={loc.poi_id} className="hover:bg-blue-50/30 transition-all group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xs">#{loc.poi_id}</div>
                    <div>
                        <div className="font-black text-slate-800">{loc.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                            <MapPin size={10} /> {loc.city || 'National'}
                        </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-blue-100">{loc.category}</span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-3 text-slate-600">
                        <div className="flex items-center gap-1 text-xs font-bold"><DollarSign size={12}/>{loc.cost_lkr}</div>
                        <div className="flex items-center gap-1 text-xs font-bold"><Clock size={12}/>{loc.time_minutes}m</div>
                   </div>
                </td>
                <td className="px-8 py-6">
                    <div className="flex gap-1">
                        {loc.descriptive_tags.split(',').map((tag: string) => (
                            <span key={tag} className="w-2 h-2 rounded-full bg-slate-200" title={tag}></span>
                        ))}
                    </div>
                </td>
                <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm"><Edit3 size={16}/></button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm"><Trash2 size={16}/></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION CONTROLS */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-30"
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={18} />
                </button>
                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-30"
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}