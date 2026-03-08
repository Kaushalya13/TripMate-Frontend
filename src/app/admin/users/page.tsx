"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Users, Mail, Shield, Trash2, Search, UserCheck } from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      // If you haven't run the SQL above yet, comment out the line below to stop the 400 error
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error:", error.message);
      // Fallback: fetch without ordering if created_at is missing
      const { data: fallbackData } = await supabase
        .from("profiles")
        .select("*");
      if (fallbackData) setUsers(fallbackData);
    } else if (data) {
      setUsers(data);
    }
  };

  const toggleAdmin = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);
    if (!error) fetchUsers();
  };

  const filtered = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-black tracking-tighter text-slate-900">
          USER BASE
        </h2>
        <p className="text-slate-500 font-medium tracking-tight">
          Access Control & Profile Management
        </p>
      </header>

      <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-200 flex items-center px-6 transition-all">
        <Search className="text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full p-4 border-0 focus:ring-0 font-bold text-slate-700"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="px-10 py-6">Member</th>
              <th className="px-10 py-6">Authorization</th>
              <th className="px-10 py-6">Joined</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="group hover:bg-slate-50/50 transition-all"
              >
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black">
                      {user.full_name?.charAt(0) || <Users size={20} />}
                    </div>
                    <div>
                      <div className="font-black text-slate-800">
                        {user.full_name}
                      </div>
                      <div className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                        <Mail size={12} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${user.role === "admin" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-10 py-6 text-xs font-bold text-slate-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-10 py-6 text-right">
                  <button
                    onClick={() => toggleAdmin(user.id, user.role)}
                    className="p-3 text-slate-300 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm"
                    title="Toggle Admin Rights"
                  >
                    <UserCheck size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
