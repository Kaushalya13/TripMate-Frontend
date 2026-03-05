"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: <Map className="w-6 h-6 text-orange-500" />,
    title: "Expert Local Knowledge",
    description: "Curated by locals who know every hidden corner of Sri Lanka.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "Personalized Support",
    description: "24/7 assistance throughout your entire journey.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    title: "Safe & Verified",
    description: "We only partner with trusted hotels and transport providers.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base font-semibold text-black uppercase tracking-wide">
              About TripMate
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-black sm:text-4xl">
              Reimagining Travel in <span className="text-black">Sri Lanka</span>
            </h3>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              We are not just a travel agency; we are your digital travel companion. 
              Our mission is to help you discover the true essence of Sri Lanka, 
              from the misty mountains of Ella to the golden coasts of Mirissa, 
              without the stress of planning.
            </p>

            <div className="mt-8 grid gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex-none p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 h-fit">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-black">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              {/* <Button className="gap-2">
                Read Our Story <ArrowRight className="w-10 h-10 bg-amber-200" />
              </Button> */}
            </div>
          </motion.div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <Image
                  src="https://i.pinimg.com/1200x/49/f5/4b/49f54b9954b574e9dca8f5788a656e14.jpg"
                  alt="Sri Lanka Train"
                  width={400}
                  height={500}
                  className="rounded-2xl object-cover h-64 w-full shadow-lg"
                />
                 <Image
                  src="https://i.pinimg.com/1200x/e7/eb/d3/e7ebd3f50f79f1e8e477820b51d41e16.jpg"
                  alt="Sri Lanka Elephants"
                  width={400}
                  height={500}
                  className="rounded-2xl object-cover h-48 w-full shadow-lg"
                />
              </motion.div>
              <motion.div
                 initial={{ opacity: 0, y: -50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="space-y-4 pt-8"
              >
                <Image
                  src="https://i.pinimg.com/736x/d9/23/c7/d923c744f5fbb52f72fa823641b850e1.jpg"
                  alt="Sri Lanka Tea"
                  width={400}
                  height={500}
                  className="rounded-2xl object-cover h-48 w-full shadow-lg"
                />
                <Image
                  src="https://i.pinimg.com/736x/b4/e3/0a/b4e30ae2257524767567f304df6b13e6.jpg"
                  alt="Sri Lanka Beach"
                  width={400}
                  height={500}
                  className="rounded-2xl object-cover h-64 w-full shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}