"use client";

import Navbar from "@/sections/Navbar";
import { motion } from "framer-motion";
import { Search, Compass, MapPin, ArrowRight, Users, Award, Filter, Star } from "lucide-react";
import Footer from "@/sections/Footer";
import Image from "next/image";
import { useState } from "react";

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

   const collections = [
    { 
      title: "Heritage",        
      category: "Heritage",    
      color: "from-amber-500 to-orange-500", 
      image: "https://i.pinimg.com/736x/54/92/1d/54921d37cde3e51c3f18af509198a073.jpg"
    },
    { 
      title: "Nature",        
      category: "Nature",     
      color: "from-emerald-500 to-teal-500", 
      image: "https://i.pinimg.com/1200x/4f/f1/d5/4ff1d5f526bb9bb3895318acaa460534.jpg"
    },
    { 
      title: "Beaches",     
      category: "Beaches",    
      color: "from-blue-500 to-cyan-500", 
      image: "https://i.pinimg.com/736x/e5/03/ea/e503eac2f264c20b36dca8030a72fb8d.jpg"
    },
    { 
      title: "Wildlife",     
      category: "Wildlife", 
      color: "from-purple-500 to-pink-500", 
      image: "https://i.pinimg.com/1200x/5d/cb/59/5dcb59a8072d59b30eb8eebb7d5ee649.jpg"
    }
  ];

  const destinations = [
  {
    id: 1,
    name: "Meemure Village",
    image: "https://i.pinimg.com/736x/bc/eb/ff/bcebff4d8a7560ab4094ec3e8ec225d8.jpg",
    rating: 4.9,
    reviews: 623,
    price: "LKR 14,800/night",
    category: "Nature"
  },
  {
    id: 2,
    name: "Knuckles Mountain Range", 
    image: "https://i.pinimg.com/736x/f6/d5/d6/f6d5d6a6b44ec8348d02aff203d1a03d.jpg",
    rating: 4.8,
    reviews: 1456,
    price: "LKR 22,500/night",
    category: "Nature"
  },
  {
    id: 3,
    name: "Pigeon Island",
    image: "https://i.pinimg.com/736x/ad/84/26/ad8426452a44bcab5192b949b6015c8c.jpg",
    rating: 4.9,
    reviews: 2103,
    price: "LKR 19,800/night",
    category: "Beaches"
  },
  {
    id: 4,
    name: "Gal Oya National Park",
    image: "https://i.pinimg.com/736x/bf/9e/a9/bf9ea901fceef345d7227a93fa1fc54e.jpg",
    rating: 4.7,
    reviews: 892,
    price: "LKR 25,000/night",
    category: "Wildlife"
  },
  {
    id: 5,
    name: "Tissamaharama",
    image: "https://i.pinimg.com/1200x/f0/83/ac/f083ac6642cf1b3a1f9355615312b051.jpg",
    rating: 4.8,
    reviews: 1765,
    price: "LKR 16,200/night",
    category: "Wildlife"
  },
  {
    id: 6,
    name: "Hiriketiya Beach",
    image: "https://i.pinimg.com/1200x/99/60/8a/99608a512827ea36908fb60fa71ba53d.jpg",
    rating: 4.9,
    reviews: 2987,
    price: "LKR 23,800/night",
    category: "Beaches"
  },
  {
    id: 7,
    name: "Ambuluwawa Tower",
    image: "https://i.pinimg.com/736x/b0/52/51/b05251631b89a7da60804a24f192fce8.jpg",
    rating: 4.7,
    reviews: 2341,
    price: "LKR 13,500/night",
    category: "Heritage"
  },
  {
    id: 8,
    name: "Jungle Beach (Trincomalee)",
    image: "https://i.pinimg.com/736x/b9/18/57/b918571f05501aed50a54d514e0bfb2c.jpg",
    rating: 4.8,
    reviews: 1678,
    price: "LKR 18,900/night",
    category: "Beaches"
  }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter === "All" || dest.category === activeFilter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-sky-50 via-white to-emerald-50 text-black overflow-x-hidden">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-linear-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-24">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-lg text-sm font-semibold text-emerald-700"
              >
                <Compass className="w-4 h-4" />
                Hidden Gems of Sri Lanka
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight bg-linear-to-r from-gray-900 via-black to-emerald-900 bg-clip-text text-transparent">
                Discover 
                <span className="block">Secret Sri Lanka</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-lg">
                Explore Sri Lanka's hidden gems beyond the tourist crowds. 
                Authentic destinations, pristine beaches, and untouched nature.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Explore Hidden Gems
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative h-96 lg:h-125 rounded-3xl overflow-hidden bg-linear-to-br from-emerald-400/20 to-teal-400/20 border-4 border-white/50 shadow-2xl">
              <Image
                src="https://i.pinimg.com/736x/d8/7e/64/d87e64113745761054f52ea997f0f291.jpg"
                alt="Sri Lanka hidden paradise"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/60 shadow-lg">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <MapPin className="w-4 h-4" />
                  Offbeat Sri Lanka
                  <Award className="w-4 h-4 ml-auto text-amber-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Floating Search & Filters */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-24 z-20 max-w-4xl mx-auto px-6 lg:px-8 -mt-12"
        >
          <div className="bg-white/70 backdrop-blur-xl shadow-2xl border border-white/60 rounded-3xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search hidden gems..."
                  value={searchQuery}     
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/50 border-2 border-neutral-200 rounded-2xl py-4 pl-14 pr-6 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all backdrop-blur-md"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {["All", "Heritage", "Nature", "Beaches", "Northern"].map((cat) => (
                  <motion.button 
                    key={cat}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all shadow-lg ${
                      activeFilter === cat
                        ? "bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/25" 
                        : "bg-white/80 border-2 border-neutral-200 text-neutral-700 hover:border-emerald-400 hover:text-emerald-600 backdrop-blur-md"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Collections - CLICKABLE */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent mb-4">
              Hidden Collections
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Authentic Sri Lankan destinations most tourists never see
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, i) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-72"
                onClick={() => setActiveFilter(collection.category)}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-linear-to-br ${collection.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">{collection.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Working Destinations List */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Destinations</h2>
              <p className="text-xl text-neutral-600">
                {filteredDestinations.length} {activeFilter} hidden gems found
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Filter className="w-5 h-5" />
              <span>{activeFilter} filter active</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50"
              >
                <div className="relative h-64">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-emerald-600">{dest.category}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(dest.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-500">({dest.reviews.toLocaleString()})</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{dest.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-black">{dest.price}</span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all"
                    >
                      Discover
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
