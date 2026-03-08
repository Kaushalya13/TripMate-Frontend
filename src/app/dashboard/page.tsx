"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { 
  Map, Calendar, LayoutDashboard, Users, 
  Settings, LogOut, Search, Bell, Plus, Filter,
  ArrowRight, MapPin, TrendingUp, User as UserIcon
} from "lucide-react";

export default function AdminDashboard() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("dashboard");
  const [trips, setTrips] = useState<any[]>([]);
  const [stats, setStats] = useState({ userCount: 0, tripCount: 0, totalBudget: 0 });
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  // --- SUPABASE CLIENT ---
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchAdminData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/dashboard");
        return;
      }

      // 1. Fetch Admin Profile
      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);

      // 2. Fetch All Trips
      const { data: allTrips, count: tripCount } = await supabase
        .from("trips")
        .select("*", { count: 'exact' })
        .order('created_at', { ascending: false });
      
      // 3. Fetch Total User Count
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true });

      if (allTrips) setTrips(allTrips);
      
      const totalBudget = allTrips?.reduce((acc, curr) => acc + (Number(curr.total_budget) || 0), 0) || 0;
      setStats({ userCount: userCount || 0, tripCount: tripCount || 0, totalBudget });
    };
    
    fetchAdminData();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    // PARENT CONTAINER: "flex" makes children sit side-by-side
    <div className="flex min-h-screen bg-[#f8fafc] w-full">
      
      {/* 1. SIDEBAR (LEFT SIDE) */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0 h-screen overflow-y-auto shrink-0">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Map size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">TriMate</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-8">
          <div>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-4 px-2">Main Menu</p>
            <div className="space-y-1">
              <SidebarItem 
                icon={<LayoutDashboard size={20}/>} 
                label="Dashboard" 
                active={activeTab === 'dashboard'} 
                onClick={() => setActiveTab('dashboard')} 
              />
              <SidebarItem 
                icon={<Users size={20}/>} 
                label="User Directory" 
                active={activeTab === 'users'} 
                onClick={() => setActiveTab('users')} 
              />
              <SidebarItem 
                icon={<Calendar size={20}/>} 
                label="Itineraries" 
                active={activeTab === 'trips'} 
                onClick={() => setActiveTab('trips')} 
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em] mb-4 px-2">System</p>
            <div className="space-y-1">
              <SidebarItem icon={<Settings size={20}/>} label="Settings" />
              <SidebarItem icon={<Bell size={20}/>} label="Notifications" badge="3" />
            </div>
          </div>
        </nav>

        {/* User Profile & Logout at Bottom */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <UserIcon size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{profile?.full_name || 'Admin User'}</p>
                <p className="text-[10px] text-slate-400 truncate">Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 font-bold text-sm hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT (RIGHT SIDE) */}
      <main className="flex-1 p-8 md:p-12 overflow-x-hidden">
        
        {/* Top Navbar */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
               Database analytics for Trip Planning System
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative hidden xl:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search trips or users..." 
                  className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 ring-indigo-500/5 w-80 transition-all shadow-sm"
                />
             </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<Users size={24} className="text-blue-600"/>} label="Total Users" value={stats.userCount} color="bg-blue-50" />
          <StatCard icon={<MapPin size={24} className="text-emerald-600"/>} label="Trips Planned" value={stats.tripCount} color="bg-emerald-50" />
          <StatCard icon={<TrendingUp size={24} className="text-orange-600"/>} label="Total Value" value={`${stats.totalBudget.toLocaleString()} LKR`} color="bg-orange-50" />
        </section>

        {/* Table Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Recent Journey Logs</h3>
            <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors border border-slate-100">
                   <Filter size={18} className="text-slate-500" />
                </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="px-8 py-4">Destination</th>
                  <th className="px-8 py-4">Date Created</th>
                  <th className="px-8 py-4">Duration</th>
                  <th className="px-8 py-4">Budget</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {trips.length > 0 ? trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-indigo-100 group-hover:text-green-500 transition-colors">
                          <Map size={18} />
                        </div>
                        <span className="font-bold text-slate-700 uppercase text-sm italic tracking-tight">
                          {trip.destination || 'Unmapped Location'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium font-mono">
                      {new Date(trip.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-indigo-50 text-green-500 rounded-full text-[10px] font-black uppercase tracking-tight">
                        {trip.total_days} Days
                      </span>
                    </td>
                    <td className="px-8 py-5 font-mono text-sm font-bold text-slate-600">
                      {trip.total_budget} LKR
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-full border border-transparent hover:border-slate-200 transition-all text-slate-300 hover:text-green-500">
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-24 text-center">
                        <div className="flex flex-col items-center gap-3 opacity-20">
                            <MapPin size={48} />
                            <p className="font-black uppercase tracking-widest text-xs">Database is empty</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- REUSABLE UI COMPONENTS ---

function SidebarItem({ icon, label, active = false, onClick, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
        active 
        ? "bg-green-400 text-white shadow-lg shadow-indigo-100" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-green-500"}`}>
          {icon}
        </span>
        <span className="text-sm font-bold tracking-tight">{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-1">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}