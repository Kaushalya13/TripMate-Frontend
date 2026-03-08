"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { 
  LayoutDashboard, Database, Users, Map as MapIcon, 
  Settings, LogOut, ShieldAlert, Loader2, Sparkles 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();
  
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setTimeout(() => router.push("/"), 3000);
      }
    };
    checkAuth();
  }, [router, supabase]);

  if (isAdmin === null) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );
  
  if (isAdmin === false) return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-50 text-red-600 p-8 text-center">
      <ShieldAlert size={80} className="mb-6 opacity-20" />
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Access Denied</h1>
      <p className="font-bold text-slate-500">This area is reserved for TripMate Administrators only.<br/>Redirecting you home...</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 fixed h-full flex flex-col shadow-2xl shadow-slate-200/50 z-50">
        <div className="p-10">
          <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            ADMIN<span className="text-blue-600 italic underline decoration-4 underline-offset-4">PRO</span>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <SidebarLink href="/admin" icon={<LayoutDashboard size={20}/>} label="System Metrics" />
          <SidebarLink href="/admin/locations" icon={<Database size={20}/>} label="Geographic Assets" />
          <SidebarLink href="/admin/users" icon={<Users size={20}/>} label="User Base" />
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={() => supabase.auth.signOut().then(() => router.push("/login"))}
            className="w-full flex items-center gap-3 px-6 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-4 px-6 py-4 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] transition-all border border-transparent hover:border-blue-100"
    >
      {icon} {label}
    </Link>
  );
}