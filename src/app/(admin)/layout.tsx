"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Map, Calendar, LayoutDashboard, Users, 
  Settings, LogOut, Bell, User as UserIcon, Database
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/");

      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (prof?.role !== 'admin') return router.push("/admin");
      setProfile(prof);
    }
    checkAdmin();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] w-full">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0 h-screen overflow-y-auto shrink-0 z-50">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Map size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">TriMate</span>
        </div>

        <nav className="flex-1 space-y-8">
          <div>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-4 px-2">Main Menu</p>
            <div className="space-y-1">
              <SidebarLink href="/admin" icon={<LayoutDashboard size={20}/>} label="Dashboard" active={pathname === '/admin'} />
              <SidebarLink href="/admin/users" icon={<Users size={20}/>} label="Users" active={pathname === '/admin/users'} />
              <SidebarLink href="/admin/locations" icon={<Database size={20}/>} label="Locations" active={pathname === '/admin/locations'} />
            </div>
          </div>
        </nav>

        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <UserIcon size={16} />
            </div>
            <div className="flex-1 overflow-hidden text-ellipsis">
                <p className="text-xs font-bold text-slate-900 truncate">{profile?.full_name || 'Admin'}</p>
                <p className="text-[10px] text-slate-400">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 font-bold text-sm hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}

function SidebarLink({ href, icon, label, active }: any) {
  return (
    <Link href={href} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
        active ? "bg-green-500 text-white shadow-lg shadow-green-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}>
      <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-green-500"}`}>{icon}</span>
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </Link>
  );
}