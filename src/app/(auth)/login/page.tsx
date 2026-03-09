"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Mail, Lock, User, X, Loader2, Palmtree, Trees, History, Church } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  // Interest State
  const [interests, setInterests] = useState({
    beach: 0, nature: 0, history: 0, religious: 0
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const toggleInterest = (key: keyof typeof interests) => {
    setInterests(prev => ({ ...prev, [key]: prev[key] === 1 ? 0 : 1 }));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error, data } = isRegister
      ? await supabase.auth.signUp({
          email,
          password,
          options: { 
            data: { 
              full_name: fullName,
              interest_beach: interests.beach,
              interest_nature: interests.nature,
              interest_history: interests.history,
              interest_religious: interests.religious
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      if (isRegister) alert("successfully register");
      else onClose(); // Close modal on successful sign in
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center p-4 top-80 z-[100] backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[900px] h-auto min-h-[550px] bg-white rounded-[40px] overflow-hidden flex shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-none"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-black hover:scale-110 transition-transform cursor-pointer"
        >
          <X size={28} />
        </button>

        <div className="hidden lg:block w-1/2 relative">
          <img
            src="https://i.pinimg.com/736x/d2/f5/ab/d2f5ab5ee124bef9e541df35f1b9a2e4.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Travel"
          />
        </div>

        <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="absolute top-0 -left-1 h-full w-10 bg-white hidden lg:block" style={{ clipPath: `polygon(100% 0%, 0% 0%, 25% 5%, 0% 10%, 20% 15%, 0% 20%, 15% 25%, 0% 30%, 30% 35%, 0% 40%, 20% 45%, 0% 50%, 25% 55%, 0% 60%, 15% 65%, 0% 70%, 30% 75%, 0% 80%, 20% 85%, 0% 90%, 25% 95%, 0% 100%, 100% 100%)` }} />

          <h2 className="text-4xl font-black text-[#1a2b4b] mb-6 uppercase tracking-tight">
            {isRegister ? "Sign Up" : "Sign In"}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {isRegister && (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4ecdc4]" size={20} />
                  <input
                    type="text"
                    placeholder="name"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-[#cbf3f0] border-none rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-[#4ecdc4]"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="py-2">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Select Interests</p>
                  <div className="grid grid-cols-4 gap-2">
                    <InterestBtn active={interests.beach === 1} icon={<Palmtree size={18}/>} onClick={() => toggleInterest('beach')} />
                    <InterestBtn active={interests.nature === 1} icon={<Trees size={18}/>} onClick={() => toggleInterest('nature')} />
                    <InterestBtn active={interests.history === 1} icon={<History size={18}/>} onClick={() => toggleInterest('history')} />
                    <InterestBtn active={interests.religious === 1} icon={<Church size={18}/>} onClick={() => toggleInterest('religious')} />
                  </div>
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4ecdc4]" size={20} />
              <input
                type="email"
                placeholder="e-mail"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-[#cbf3f0] border-none rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-[#4ecdc4]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4ecdc4]" size={20} />
              <input
                type="password"
                placeholder="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-[#cbf3f0] border-none rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-[#4ecdc4]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-40 bg-[#4ecdc4] hover:bg-[#3dbdb4] text-white font-bold py-3.5 rounded-xl transition-all uppercase text-xs tracking-[0.2em] flex justify-center items-center shadow-lg active:scale-95 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isRegister ? "Sign Up" : "Sign In")}
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full max-w-[280px] py-3 px-4 bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <img src="https://i.pinimg.com/1200x/60/41/99/604199df880fb029291ddd7c382e828b.jpg" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium text-slate-700">Continue with Google</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="mt-6 text-left text-[10px] font-bold text-slate-400 hover:text-[#4ecdc4] transition-colors uppercase tracking-widest cursor-pointer"
          >
            {isRegister ? "Already have an account? Sign In" : "Need an account? Create one"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function InterestBtn({ active, icon, onClick }: { active: boolean, icon: any, onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-3 flex items-center justify-center rounded-xl transition-all border-2 ${
        active 
          ? 'bg-[#4ecdc4] border-[#4ecdc4] text-white shadow-md scale-105' 
          : 'bg-[#cbf3f0] border-transparent text-slate-400 hover:border-[#4ecdc4]'
      }`}
    >
      {icon}
    </button>
  );
}