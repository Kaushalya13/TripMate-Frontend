"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Search, Map, MapPin, TrendingUp, Users, ArrowRight, Filter } from "lucide-react";

export default function AdminPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [stats, setStats] = useState({ userCount: 0, tripCount: 0, totalBudget: 0 });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchData() {
      const { data: allTrips, count: tripCount } = await supabase.from("trips").select("*", { count: 'exact' }).order('created_at', { ascending: false });
      const { count: userCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true });
      
      if (allTrips) {
        setTrips(allTrips);
        const total = allTrips.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
        setStats({ userCount: userCount || 0, tripCount: tripCount || 0, totalBudget: total });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-8 md:p-12">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">System Overview</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">Database Analytics Dashboard <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span></p>
        </div>
        <div className="relative hidden xl:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Audit logs..." className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-80 shadow-sm outline-none" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Users size={24} className="text-blue-600"/>} label="Total Users" value={stats.userCount} color="bg-blue-50" />
        <StatCard icon={<MapPin size={24} className="text-emerald-600"/>} label="Trips Planned" value={stats.tripCount} color="bg-emerald-50" />
        <StatCard icon={<TrendingUp size={24} className="text-orange-600"/>} label="Budget Value" value={`${stats.totalBudget.toLocaleString()} LKR`} color="bg-orange-50" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Recent Journey Logs</h3>
            <button className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all"><Filter size={18} className="text-slate-500" /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-5">Destination</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Budget</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50/50 group transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-all"><Map size={18}/></div>
                      <span className="font-black text-slate-700 uppercase text-xs italic tracking-tighter">{trip.trip_name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-bold">{new Date(trip.created_at).toLocaleDateString()}</td>
                  <td className="px-8 py-6"><span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase">Active</span></td>
                  <td className="px-8 py-6 text-sm font-black text-slate-800">{trip.budget} LKR</td>
                  <td className="px-8 py-6 text-right"><button className="text-slate-300 hover:text-green-500"><ArrowRight size={20}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 transition-all hover:scale-[1.02]">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}