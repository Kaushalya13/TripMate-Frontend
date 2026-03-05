"use client";

import { motion } from "framer-motion";
import { Calendar, Car, Hotel, MapPin } from "lucide-react";

const services = [
  {
    title: "AI Trip Planner",
    description: "Automatically generates optimized, day-by-day travel itineraries based on your interests, budget, and trip duration.",
    icon: <Calendar className="w-8 h-8 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Smart Place Recommendations",
    description: "Recommends attractions and destinations using content-based filtering and user preference matching.",
    icon: <MapPin className="w-8 h-8 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Route Optimization Engine",
    description: "Uses heuristic optimization algorithms to create efficient travel routes that minimize time and cost.",
    icon: <Car className="w-8 h-8 text-white" />,
    color: "bg-purple-500",
  },
  {
    title: "AI Chat Trip Assistant",
    description: "Understands natural language requests and converts them into structured trip plans through intelligent intent parsing.",
    icon: <Hotel className="w-8 h-8 text-white" />,
    color: "bg-orange-500",
  },
];


export default function Services() {
  return (
    <section id="services" className="py-24 bg-neutral-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-white"
        >
          Everything You Need for a <br /> Perfect Trip
        </motion.h2>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group p-8 bg-white dark:bg-neutral-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-neutral-200"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color} shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}