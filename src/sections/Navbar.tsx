"use client";

import Image from "next/image";
import menuIcon from "@/assets/menu.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore-sri-lanka" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
];

export default function Navbar() {
  const logoText = "TripMate";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-4 lg:py-5 fixed w-full top-0 z-50 bg-neutral-950/70 backdrop-blur-xl border-b border-white/10">
      
      <div className="mx-auto flex w-full max-w-6xl px-6 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-white tracking-wider"
        >
          {logoText}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-8 font-semibold text-white">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className="transition-colors uppercase text-xs tracking-widest hover:text-blue-400 text-neutral-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <Image
              src={menuIcon}
              alt="menu"
              width={28}
              height={28}
              className="invert"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden bg-neutral-950 border-b border-white/10"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-gray-200">
              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  onClick={() => setIsOpen(false)}
                  className="font-semibold uppercase text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}