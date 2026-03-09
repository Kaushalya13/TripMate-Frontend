"use client";
import { useState, useEffect, useCallback } from "react";
import { locationService } from "@/lib/services/locationService";
import { 
  Search, Plus, MapPin, Trash2, Edit3, 
  Loader2, RefreshCw, X, Save 
} from "lucide-react";
import { motion } from "framer-motion";

export default function LocationsPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  
  // State for Editing
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const PAGE_LIMIT = 20;

  const loadData = useCallback(async (isInitial = false) => {
    try {
      setLoading(true);
      const currentPage = isInitial ? 0 : page;
      const { data, count } = await locationService.getPaginated(currentPage, PAGE_LIMIT, searchTerm);
      
      if (data) {
        setLocations(prev => isInitial ? data : [...prev, ...data]);
        setTotalCount(count || 0);
        setHasMore(data.length === PAGE_LIMIT);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => { loadData(true); }, [searchTerm]);

  useEffect(() => {
    if (page > 0) loadData();
  }, [page, loadData]);

  // --- DELETE FUNCTION ---
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure? This will remove the asset from the AI Engine.");
    if (!confirmed) return;

    try {
      await locationService.deleteLocation(id);
      setLocations(prev => prev.filter(loc => loc.poi_id !== id));
      setTotalCount(prev => prev - 1);
    } catch (err) {
      alert("Error deleting location");
    }
  };

  // --- EDIT FUNCTIONS ---
  const openEditModal = (loc: any) => {
    setEditingItem({ ...loc });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    setLoading(true);
    try {
      await locationService.updateLocation(editingItem.poi_id, {
        name: editingItem.name,
        city: editingItem.city,
        type: editingItem.type,
        cost_lkr: editingItem.cost_lkr
      });
      
      // Update local state without refreshing everything
      setLocations(prev => prev.map(loc => 
        loc.poi_id === editingItem.poi_id ? editingItem : loc
      ));
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase leading-none">Geographic Assets</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">
            Audit Mode: {locations.length} / {totalCount} POIs Loaded
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter by name or city..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-80 outline-none focus:ring-4 ring-green-500/5 transition-all"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mb-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
              <th className="px-8 py-5">Identity</th>
              <th className="px-8 py-5">Regional Info</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5 text-right">Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {locations.map((loc) => (
              <tr key={loc.poi_id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                        <MapPin size={18} />
                      </div>
                      <span className="font-black text-slate-800 text-sm italic uppercase tracking-tighter">{loc.name}</span>
                   </div>
                </td>
                <td className="px-8 py-6 text-slate-500 font-bold text-xs uppercase tracking-tight">{loc.city}</td>
                <td className="px-8 py-6">
                   <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                    {loc.type}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openEditModal(loc)} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:shadow-md transition-all">
                        <Edit3 size={18}/>
                      </button>
                      <button onClick={() => handleDelete(loc.poi_id)} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:shadow-md transition-all">
                        <Trash2 size={18}/>
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION FOOTER */}
        <div className="p-10 flex flex-col items-center justify-center border-t border-slate-50 bg-slate-50/30">
          {hasMore && !loading && (
            <button 
              onClick={() => setPage(prev => prev + 1)}
              className="px-10 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-600 hover:bg-green-500 hover:text-white transition-all shadow-sm"
            >
              Load More POIs
            </button>
          )}
          {loading && <Loader2 className="animate-spin text-green-500" />}
        </div>
      </div>

      {/* EDIT MODAL OVERLAY */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative"
          >
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900">
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-black text-slate-900 italic uppercase mb-8">Edit Asset</h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Asset Name</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 ring-green-500/20"
                  value={editingItem?.name} 
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">City</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-slate-50 rounded-2xl font-bold"
                    value={editingItem?.city} 
                    onChange={e => setEditingItem({...editingItem, city: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Cost (LKR)</label>
                  <input 
                    type="number" 
                    className="w-full p-4 bg-slate-50 rounded-2xl font-bold"
                    value={editingItem?.cost_lkr} 
                    onChange={e => setEditingItem({...editingItem, cost_lkr: +e.target.value})}
                  />
                </div>
              </div>
              
              <button 
                onClick={handleUpdate}
                className="w-full bg-green-500 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-green-100 hover:bg-green-600 mt-4"
              >
                <Save size={18} /> Update Asset Data
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}