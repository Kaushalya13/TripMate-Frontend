"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Users, Mail, Search, UserCheck, Shield, ArrowRight } from "lucide-react";
import Link from "next/link"; 

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setUsers(data);
  };

  const toggleAdmin = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);
    if (!error) fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 p-4">
      <header>
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">User Directory</h2>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Manage platform members and permissions</p>
      </header>

      {/* SEARCH BAR */}
      <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-200 flex items-center px-6">
        <Search className="text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-4 border-0 focus:ring-0 font-bold text-slate-700 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USER TABLE */}
      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-100">
              <th className="px-10 py-6">Member Details</th>
              <th className="px-10 py-6">Role</th>
              <th className="px-10 py-6">Joined</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="group hover:bg-slate-50/50 transition-all">
                {/* USER INFO */}
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-all font-black">
                      {user.full_name?.charAt(0) || <Users size={20} />}
                    </div>
                    <div>
                      <div className="font-black text-slate-800 uppercase italic">{user.full_name}</div>
                      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                        <Mail size={12} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* ROLE BADGE */}
                <td className="px-10 py-6">
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                    user.role === "admin" 
                    ? "bg-green-50 text-green-600 border-green-100" 
                    : "bg-slate-50 text-slate-400 border-slate-100"
                  }`}>
                    {user.role}
                  </span>
                </td>

                {/* DATE */}
                <td className="px-10 py-6 text-xs font-bold text-slate-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>

                {/* ACTIONS CELL */}
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end items-center gap-3">
                    {/* View Profile Link - Dynamic Route */}
                    <Link 
                      href={`/admin/users/${user.id}`} 
                      className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all shadow-sm group-hover:border-green-600 flex items-center gap-2"
                    >
                      View Profile <ArrowRight size={14} />
                    </Link>

                    {/* Toggle Admin Button */}
                    <button
                      onClick={() => toggleAdmin(user.id, user.role)}
                      className="p-3 text-slate-300 hover:text-green-600 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                      title="Change Permissions"
                    >
                      <UserCheck size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}