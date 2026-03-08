"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import Image from "next/image";
import { MapPin, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "Meemure Village",
    image: "https://i.pinimg.com/736x/bc/eb/ff/bcebff4d8a7560ab4094ec3e8ec225d8.jpg",
    rating: 4.9,
    reviews: 623,
    description: "Meemure is one of the most remote villages in Sri Lanka, nestled deep within the Knuckles Mountain Range. It is famous for its breathtaking natural beauty and traditional lifestyle.",
    price: "LKR 14,800/night",
    category: "Nature",
    location: "Matale District",
    activities: ["Hiking", "Waterfall Trekking", "Camping"]
  },
  {
    id: 2,
    name: "Knuckles Mountain Range",
    image: "https://i.pinimg.com/736x/f6/d5/d6/f6d5d6a6b44ec8348d02aff203d1a03d.jpg",
    rating: 4.8,
    reviews: 1456,
    description: "A UNESCO World Heritage site, the Knuckles range offers misty peaks, hidden waterfalls, and diverse flora. It's a paradise for serious trekkers and nature photographers.",
    price: "LKR 22,500/night",
    category: "Nature",
    location: "Kandy/Matale",
    activities: ["Mountain Trekking", "Bird Watching", "Photography"]
  },
  {
    id: 3,
    name: "Pigeon Island",
    image: "https://i.pinimg.com/736x/ad/84/26/ad8426452a44bcab5192b949b6015c8c.jpg",
    rating: 4.9,
    reviews: 2103,
    description: "One of the two marine national parks in Sri Lanka, this island is home to some of the best-preserved coral reefs and crystal clear waters perfect for seeing reef sharks and turtles.",
    price: "LKR 19,800/night",
    category: "Beaches",
    location: "Trincomalee",
    activities: ["Snorkeling", "Scuba Diving", "Boat Rides"]
  },
  {
    id: 4,
    name: "Gal Oya National Park",
    image: "https://i.pinimg.com/736x/bf/9e/a9/bf9ea901fceef345d7227a93fa1fc54e.jpg",
    rating: 4.7,
    reviews: 892,
    description: "Famous for its unique boat safaris, Gal Oya is the only place in Sri Lanka where you can witness wild elephants swimming across the Senanayake Samudraya reservoir.",
    price: "LKR 25,000/night",
    category: "Wildlife",
    location: "Ampara District",
    activities: ["Boat Safari", "Wild Elephant Spotting", "Jungle Trekking"]
  },
  {
    id: 5,
    name: "Tissamaharama",
    image: "https://i.pinimg.com/1200x/f0/83/ac/f083ac6642cf1b3a1f9355615312b051.jpg",
    rating: 4.8,
    reviews: 1765,
    description: "A historic town that serves as the gateway to Yala National Park. It is known for its giant ancient stupas and the beautiful Tissa Wewa lake filled with birdlife.",
    price: "LKR 16,200/night",
    category: "Wildlife",
    location: "Hambantota District",
    activities: ["Ancient Stupa Tours", "Lake Walks", "Safari Basecamp"]
  },
  {
    id: 6,
    name: "Hiriketiya Beach",
    image: "https://i.pinimg.com/1200x/99/60/8a/99608a512827ea36908fb60fa71ba53d.jpg",
    rating: 4.9,
    reviews: 2987,
    description: "A hidden horseshoe-shaped bay that has become a trending spot for surfers and digital nomads. The waves are consistent year-round, surrounded by lush jungle palms.",
    price: "LKR 23,800/night",
    category: "Beaches",
    location: "Dikwella",
    activities: ["Surfing", "Yoga", "Cafe Hopping"]
  },
  {
    id: 7,
    name: "Ambuluwawa Tower",
    image: "https://i.pinimg.com/736x/b0/52/51/b05251631b89a7da60804a24f192fce8.jpg",
    rating: 4.7,
    reviews: 2341,
    description: "The Biodiversity Complex at Ambuluwawa features a spiral tower that offers 360-degree views of the central highlands. It's a unique architectural and multi-religious site.",
    price: "LKR 13,500/night",
    category: "Heritage",
    location: "Gampola",
    activities: ["Tower Climbing", "Sightseeing", "Botanical Walks"]
  },
  {
    id: 8,
    name: "Jungle Beach",
    image: "https://i.pinimg.com/736x/b9/18/57/b918571f05501aed50a54d514e0bfb2c.jpg",
    rating: 4.8,
    reviews: 1678,
    description: "A secluded, quiet beach tucked away behind a forested hill. Its calm, shallow waters make it feel like a natural swimming pool, ideal for a relaxing escape.",
    price: "LKR 18,900/night",
    category: "Beaches",
    location: "Trincomalee",
    activities: ["Swimming", "Sunbathing", "Beach Picnics"]
  }
];

export default function DestinationDetail() {
  const { id } = useParams();
  const dest = destinations.find(d => d.id === Number(id)); //

  if (!dest) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-bold">Destination not found</h2>
      <Link href="/explore-sri-lanka" className="text-emerald-600 underline font-bold">Back to Explore</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <Link href="/explore-sri-lanka" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:underline">
            <ArrowLeft size={20} /> Back to Explore
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Image Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image src={dest.image} alt={dest.name} fill className="object-cover" />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-emerald-600 shadow-lg">
                {dest.category}
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">{dest.name}</h1>
                <div className="flex items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1 font-bold"><MapPin size={18} className="text-emerald-500" /> {dest.location}</span>
                  <span className="flex items-center gap-1 font-bold text-amber-500"><Star size={18} fill="currentColor" /> {dest.rating}</span>
                </div>
              </div>

              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {dest.description}
              </p>

              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Starting Price</p>
                  <p className="text-2xl font-black text-slate-900">{dest.price}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Recommended Time</p>
                  <p className="text-2xl font-black text-slate-900">2-3 Days</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Popular Activities</h3>
                <div className="flex flex-wrap gap-3">
                  {dest.activities.map(act => (
                    <span key={act} className="px-5 py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-100 text-sm">
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => window.location.href=`/planner?idea=${dest.name}`}
                className="w-full py-5 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-black uppercase text-sm tracking-[0.2em] rounded-2xl shadow-xl shadow-emerald-100 hover:shadow-2xl transition-all"
              >
                Plan a Trip Here
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}