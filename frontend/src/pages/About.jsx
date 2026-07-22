import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Users, Rocket, CheckCircle, Award, Wrench, Globe, Star } from 'lucide-react';

// --- 1. Infinite Animated Counter Component ---
const AnimatedCounter = ({ value, label, icon }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/,/g, '').replace('+', ''));

  useEffect(() => {
    let startTime = null;
    const duration = 3000; // Ek cycle ka time

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) % duration; // Modulo operator for infinite loop
      const currentProgress = progress / duration;
      
      // Infinite bounce effect: count up then reset or stay at peak
      const currentCount = Math.floor(currentProgress * numericValue);
      setCount(currentCount);
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [numericValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/95 dark:bg-slate-900 dark:border-slate-700  backdrop-blur-md p-8 rounded-[2rem] shadow-xl dark:shadow-blue-300 border border-blue-100 flex flex-col items-center text-center transition-all hover:shadow-2xl z-20"
    >
      {/* Icon - Always on top */}
      <div className="relative z-30 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-blue-200">
        {icon}
      </div>
      <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-1 dark:text-white">
        {count.toLocaleString()}+
      </h3>
      <p className="text-slate-500 font-bold text-sm md:text-base dark:text-slate-400">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const { scrollY } = useScroll();
  const yHeader = useTransform(scrollY, [0, 500], [0, -50]);

  // Mobile-friendly Plexus Data
  const plexusData = useRef([...Array(30)].map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    targetX: Math.random() * 100,
    targetY: Math.random() * 100,
  })));

  const stats = [
    { label: 'Active Providers across Karachi', value: '1,200', icon: <Users className="w-8 h-8" /> },
    { label: 'Services Successfully Delivered', value: '15,000', icon: <Rocket className="w-8 h-8" /> },
    { label: 'Happy Karachiite Customers', value: '10,000', icon: <Award className="w-8 h-8" /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pt-10 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* 1. Hero Section with Enhanced Plexus (Visible on Mobile) */}
      <motion.section 
        style={{ y: yHeader }}
        className="py-20 px-4 bg-slate-50 relative overflow-hidden dark:bg-slate-900 flex items-center min-h-[60vh]"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="opacity-30 md:opacity-20">
            {plexusData.current.map((node, i) => (
              <motion.line
                key={i}
                stroke="#2563eb"
                strokeWidth="0.15" // Increased thickness for mobile visibility
                animate={{
                  x1: [node.x, node.targetX, node.x],
                  y1: [node.y, node.targetY, node.y],
                  x2: plexusData.current[(i+1)%30].targetX,
                  y2: plexusData.current[(i+1)%30].targetY
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center w-full  ">
          <div className="inline-block bg-blue-100 px-6 py-2 rounded-full mb-6 border border-blue-200 ">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700">Our Karachi Mission</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter dark:text-slate-100">
            Redefining <span className="text-blue-600">Home Services</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto font-medium">
            Certified experts at your doorstep in Karachi.
          </p>
        </div>
      </motion.section>

      {/* 2. Stats Section - Infinite Numbers */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-30 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {stats.map((stat, index) => (
            <AnimatedCounter key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* 3. Why We Started - Fixed Icon Visibility */}
      <section className="py-32 px-4 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100">Why We Started</h2>
            <div className="grid gap-6  ">
              {[
                { icon: <ShieldCheck />, title: 'Verified Professionals', text: 'Strict background checks for your safety.' },
                { icon: <Globe />, title: 'Local Expertise', text: 'Tailored specifically for Karachiites.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 dark:bg-slate-900   bg-white  rounded-3xl   dark:shadow-blue-300 border border-blue-50 shadow-sm hover:shadow-md transition-all">
                  <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 h-fit">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-slate-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Visual - Fixed Hidden Icons */}
          <div className="relative flex items-center justify-center h-[400px]">
             {/* Main Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative z-20 dark:bg-slate-900  bg-white p-12 rounded-[3rem] shadow-2xl dark:shadow-blue-300 border border-blue-50 text-center w-full max-w-sm"
            >
              <CheckCircle size={50} className="mx-auto text-blue-600 mb-6" />
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic leading-none">
                Karachi's <br/> Trusted Network
              </h3>
              <div className="mt-8 bg-slate-900 text-white py-2 px-4 rounded-xl inline-block text-sm font-bold">
                ESTABLISHED 2024
              </div>
            </motion.div>

            {/* Floating Blue Icons - Forced to stay on top with z-index */}
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 left-0 md:left-10 z-30 bg-blue-600 p-4 rounded-2xl text-white shadow-xl shadow-blue-300"
            >
              <Wrench size={24} />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }} 
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-10 right-0 md:right-10 z-30 bg-blue-600 p-4 rounded-2xl text-white shadow-xl shadow-blue-300"
            >
              <Star size={24} fill="currentColor" />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;