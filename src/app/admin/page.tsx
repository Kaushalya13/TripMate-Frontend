"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Database, Users, Map as MapIcon, RefreshCw, Zap } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ locations: 0, users: 0, trips: 0 });
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getStats = async () => {
      const { count: lCount } = await supabase.from("locations").select("*", { count: 'exact', head: true });
      const { count: uCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true });
      setStats({ locations: lCount || 0, users: uCount || 0, trips: 0 });
    };
    getStats();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-black text-slate-900">System Overview</h2>
        <p className="text-slate-500 font-medium">Real-time status of your AI Travel Engine</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Database className="text-blue-600" />} label="Total POIs" value={stats.locations} color="bg-blue-50" />
        <StatCard icon={<Users className="text-purple-600" />} label="Total Users" value={stats.users} color="bg-purple-50" />
        <StatCard icon={<Zap className="text-amber-600" />} label="AI Readiness" value="100%" color="bg-amber-50" />
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-black mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            Add New Location
          </button>
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            Review Trip Logs
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{label}</p>
      <h4 className="text-4xl font-black text-slate-900 mt-1">{value}</h4>
    </div>
  );
}