"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin, ArrowUpRight } from "lucide-react";

const destinations = [
  {
    id: "sigiriya",
    category: "Heritage",
    title: "Sigiriya",
    subtitle: "The Lion Rock",
    description: "An ancient rock fortress and palace ruin surrounded by the remains of an extensive network of gardens.",
    src: "https://i.pinimg.com/1200x/7a/fb/18/7afb1867ab39dcc0187ca69d9318d791.jpg",
  },
  {
    id: "ella",
    category: "Nature",
    title: "Ella",
    subtitle: "Nine Arch Bridge",
    description: "A small town in the Badulla District famous for its stunning mountain views and the iconic railway bridge.",
    src: "https://i.pinimg.com/736x/92/4f/19/924f192d00f40e70acc99299326fdc77.jpg",
  },
  {
    id: "mirissa",
    category: "Beaches",
    title: "Mirissa",
    subtitle: "Tropical Paradise",
    description: "Famous for whale watching and its crescent-shaped beach, offering the perfect tropical escape.",
    src: "https://i.pinimg.com/736x/5d/3d/12/5d3d127ada2c93fbf444f847ab379df6.jpg",
  },
  {
    id: "kandy",
    category: "Culture",
    title: "Kandy",
    subtitle: "Sacred City",
    description: "The last capital of the ancient kings' era, home to the Temple of the Tooth Relic.",
    src: "https://i.pinimg.com/1200x/3f/17/30/3f17304aea5ee39920f5b1d80c85a7f4.jpg",
  },
  {
    id: "galle",
    category: "History",
    title: "Galle",
    subtitle: "Dutch Fort",
    description: "A UNESCO World Heritage site featuring colonial architecture and historic fortification.",
    src: "https://i.pinimg.com/736x/99/04/ff/9904ff78ff2434d4de7b587a58b8bee0.jpg",
  },
];

export default function CityList() {
  const [activeId, setActiveId] = useState<string>(destinations[0].id);

  return (
    <section className="w-full py-24 bg-black text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-3xl md:text-5xl font-bold tracking-tight text-white"
            >
              Uncover Hidden <span className="text-muted">Gems</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-neutral-400 text-lg"
            >
              Select a destination to expand your view.
            </motion.p>
          </div>
          <div className="hidden md:block">
            <button className="flex items-center gap-2 text-sm font-medium transition-colors text-white">
                View All Destinations <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanding Cards Container */}
        <div className="flex flex-col lg:flex-row h-200 lg:h-150 gap-4 w-full">
          {destinations.map((city) => (
            <ExpandingCard
              key={city.id}
              city={city}
              isActive={activeId === city.id}
              onClick={() => setActiveId(city.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpandingCard({ 
    city, 
    isActive, 
    onClick 
}: { 
    city: typeof destinations[0], 
    isActive: boolean, 
    onClick: () => void 
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={cn(
        "relative rounded-3xl overflow-hidden cursor-pointer group",
        "transition-all duration-500 ease-in-out",
        isActive ? "flex-3 lg:flex-3" : "flex-1 lg:flex-1 hover:flex-[1.2]"
      )}
    >
      {/* Background Image */}
      <Image
        src={city.src}
        alt={city.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={isActive}
      />
      
      {/* Dark Overlay - Less dark when active */}
      <div className={cn(
        "absolute inset-0 bg-black/40 transition-colors duration-500",
        isActive ? "bg-black/20" : "bg-black/60 group-hover:bg-black/50"
      )} />

      {/* Content Positioned at Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end h-full bg-linear-to-t from-black/90 via-black/40 to-transparent">
        
        {/* Active Content: Shows Detail */}
        {isActive ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2 text-blue-400">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{city.category}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">{city.title}</h3>
            <p className="text-xl text-neutral-200 font-medium mb-4">{city.subtitle}</p>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-lg">
                {city.description}
            </p>
          </motion.div>
        ) : (
          /* Inactive Content: Vertical Title (Desktop) or Horizontal (Mobile) */
          <div className="flex lg:flex-col lg:items-center items-end justify-between lg:justify-end h-full">
             <div className="lg:-rotate-90 lg:mb-20 lg:whitespace-nowrap origin-left transition-all">
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-300 group-hover:text-white">
                    {city.title}
                </h3>
             </div>
             <div className="lg:hidden">
                 <ArrowUpRight className="text-white w-6 h-6" />
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}