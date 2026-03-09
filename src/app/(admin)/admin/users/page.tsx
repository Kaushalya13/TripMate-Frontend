
"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { UserCheck, Mail, Shield, Trash2 } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setUsers(data);
  }

  const toggleAdmin = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await supabase.from("profiles").update({ role: newRole }).eq("id", id);
    fetchUsers();
  };

  return (
    <div className="p-12">
      <h2 className="text-3xl font-black text-slate-900 uppercase italic mb-10">User Directory</h2>
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="px-10 py-6">Member</th>
              <th className="px-10 py-6">Authorization</th>
              <th className="px-10 py-6">Join Date</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                <td className="px-10 py-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">
                    {user.full_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-800">{user.full_name}</p>
                    <p className="text-xs text-slate-400 font-medium tracking-tight">{user.email}</p>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${user.role === 'admin' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-10 py-6 text-xs font-bold text-slate-400">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="px-10 py-6 text-right">
                    <button onClick={() => toggleAdmin(user.id, user.role)} className="p-3 text-slate-300 hover:text-green-500 hover:bg-white rounded-xl transition-all shadow-sm">
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