"use client";

import Image from "next/image";
import menuIcon from "@/assets/menu.svg";
import { User, LogOut, Settings, ChevronDown, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import AuthModal from "@/app/(auth)/login/page";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore-sri-lanka" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
];

export default function Navbar() {
  const logoText = "TripMate";
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) setIsAuthModalOpen(false); 
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
  };

  return (
    <header className="py-4 lg:py-5 fixed w-full top-0 z-50 bg-neutral-950/70 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl px-6 items-center justify-between">
        
        <Link href="/" className="text-3xl font-bold text-white tracking-wider">
          {logoText}
        </Link>

        <nav className="hidden lg:flex items-center gap-x-8 font-semibold text-white">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors uppercase text-xs tracking-widest hover:text-blue-400 text-neutral-300">
              {link.label}
            </Link>
          ))}
          {/* Dashboard link visible only when logged in */}
          {user && (
            <Link href="/dashboard" className="transition-colors uppercase text-xs tracking-widest text-blue-400 hover:text-blue-300">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          {!user ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden lg:block bg-green-500 px-6 py-2.5 rounded-xl text-white font-semibold text-sm uppercase tracking-wider transition-all cursor-pointer"
            >
              Get Started
            </button>
          ) : (
            <div className="hidden lg:block relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white hidden sm:block">
                  {user.user_metadata?.full_name?.split(" ")[0] || "Profile"}
                </span>
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-semibold text-white truncate">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      {/* Your Requested Link Added Here */}
                      <Link 
                        href="/dashboard" 
                        className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-200 hover:bg-white/10 transition-all"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" /> 
                        My Dashboard
                      </Link>
                      
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-200 hover:bg-white/10 transition-all">
                        <Settings className="w-4 h-4" /> Account Settings
                      </Link>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-200 hover:bg-red-500/20 hover:text-red-300 transition-all w-full text-left cursor-pointer">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal onClose={() => setIsAuthModalOpen(false)} /> 
        )}
      </AnimatePresence>
    </header>
  );
}