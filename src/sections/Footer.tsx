"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-20 pb-10 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 relative z-10">
        
        {/* Brand */}
        <div className="space-y-4">
          <Link href="/" className="text-3xl font-bold tracking-wider hover:text-blue-400 transition">
            TripMate
          </Link>
          <p className="text-black text-sm leading-relaxed mt-4">
            Your all-in-one travel companion for exploring the wonders of Sri Lanka. 
            Plan less, travel more.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="font-bold mb-6 text-lg">Explore</h3>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/destinations" className="hover:text-blue-400 transition">Destinations</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-blue-400 transition">Services</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-6 text-lg">Contact</h3>
          <ul className="space-y-3.5 text-sm text-neutral-500">
            <li>✉ support@tripmate.com</li>
            <li>📞 +94 11 234 5678</li>
            <li>📍 Colombo, Sri Lanka</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold mb-6 text-lg">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition flex items-center justify-center">
              <FaFacebookF className="h-5 w-5 text-white" />
            </a>
            <a href="#" className="p-3 bg-pink-500 rounded-full hover:bg-pink-600 transition flex items-center justify-center">
              <FaInstagram className="h-5 w-5 text-white" />
            </a>
            <a href="#" className="p-3 bg-sky-500 rounded-full hover:bg-sky-600 transition flex items-center justify-center">
              <FaTwitter className="h-5 w-5 text-white" />
            </a>
            <a href="#" className="p-3 bg-blue-700 rounded-full hover:bg-blue-800 transition flex items-center justify-center">
              <FaLinkedinIn className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center pt-8 text-black text-sm relative z-10">
        © {new Date().getFullYear()} TripMate. All rights reserved.
      </div>
    </footer>
  );
}
