import React, { useEffect, useRef } from 'react';
import { 
  ArrowRight, CheckCircle2,   Users, 
  ShieldCheck, Zap,   Globe,  
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, animate,   useTransform , useInView , useTime} from 'framer-motion';
 

function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // once: false taake har baar trigger ho
  
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  
  

  useEffect(() => {
    if (isInView) {
      // animate function ko infinite loop mein dal diya hai
      const controls = animate(0, numericValue, {
        duration: 2,
        repeat: Infinity, // Yeh loop chalayega
        repeatType: "loop",
        repeatDelay: 3, // 3 seconds ruk kar dobara start hoga
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

function Home() {

    // --- Complex Plexus Node Generator Logic ---
  // Generating dots and lines that move semi-randomly
  const plexusData = useRef([...Array(30)].map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    targetX: Math.random() * 100,
    targetY: Math.random() * 100,
    speed: 0.1 + Math.random() * 0.3
  })));
  const features = [
    {
      title: "Verified Experts",
      desc: "Every professional is background-checked and skill-verified.",
      icon: <ShieldCheck size={24} />
    },
    {
      title: "Instant Booking",
      desc: "Real-time scheduling with automatic email confirmations.",
      icon: <Zap size={24} />
    },
    {
      title: "Secure Payments",
      desc: "Fully integrated payment gateways for safe transactions.",
      icon: <CheckCircle2 size={24} />
    }
    
  ];
  // Tilt values for CTA
const time = useTime();
// Time ka use karke ek automatic rotation value banayein
// const rotateX = useTransform(time, [0, 5000], [0, 360]); 
// const rotateY = useTransform(time, [0, 5000], [0, 360]);

// Ab hume mouse ki zarurat nahi hai, isliye hum "Spring-based Sine Wave" use karenge
const smoothRotateX = useTransform(time, (t) => Math.sin(t / 1000) * 15);
const smoothRotateY = useTransform(time, (t) => Math.cos(t / 1000) * 15);


  return (
    <div className="bg-white dark:bg-slate-900 pt-20 overflow-x-hidden">
 {/* 1. Hero Section - Darker Background on Mobile & Fully Fixed Responsive Syntax */}
<section className="relative overflow-hidden py-16 md:py-32 px-4 md:px-6 bg-white min-h-[90vh] flex items-center dark:bg-slate-900">
  
  {/* Plexus Background Layer - Mobile Darker & More Visible */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="xMidYMid slice"
      className="opacity-40 md:opacity-20" // Mobile par 40% (Darker) aur Desktop par 20%
    >
      {plexusData.current.map((node, i) => (
        <React.Fragment key={i}>
          <motion.circle
            r="0.7" // Nodes slightly larger for mobile visibility
            fill="#2563eb"
            animate={{
              cx: [node.x, node.targetX, node.x],
              cy: [node.y, node.targetY, node.y]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {plexusData.current.slice(i + 1, i + 4).map((otherNode, j) => (
            <motion.line
              key={`${i}-${j}`}
              stroke="#2563eb"
              strokeWidth="0.12" // Thicker lines for mobile prominence
              animate={{
                x1: [node.x, node.targetX, node.x],
                y1: [node.y, node.targetY, node.y],
                x2: [otherNode.x, otherNode.targetX, otherNode.x],
                y2: [otherNode.y, otherNode.targetY, otherNode.y]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </React.Fragment>
      ))}
    </svg>
  </div>

  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 relative z-10 w-full">
    {/* Left Side: Text Content */}
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 space-y-6 md:space-y-8 text-center md:text-left pt-10 md:pt-0"
    >
      <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-slate-900 px-4 py-2 rounded-full border border-blue-100 shadow-sm ">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 dark:text-white"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </span>
        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-700 dark:text-white">Available across Karachi</span>
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.2] md:leading-[1.1] tracking-tight dark:text-white">
        Manage Your <br className="hidden md:block" />
        <span className="text-blue-600 relative inline-block">
          Services
          <motion.svg 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-1 md:-bottom-2 left-0 h-1.5 md:h-2" viewBox="0 0 200 8" fill="none"
          >
             <path d="M2 6C50 2 150 2 198 6" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          </motion.svg>
        </span> With Ease.
      </h1>
      
      <p className="text-slate-500 text-base md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 px-2 md:px-0">
        Karachi's most reliable service management platform. One tap to book professionals for your home.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start px-4 md:px-0">
        <Link to="/booking" className="group bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-blue-200">
          Book a Service <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/about" className="bg-blue-600  text-white   px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-300 text-center shadow-xl shadow-blue-200">
          Learn More 
        </Link> 
      </div>
    </motion.div>

    {/* Right Side: Fully Dynamic Visual (Fixed Syntax) */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex-1 relative h-[450px] md:h-[550px] w-full flex items-center justify-center mt-12 md:mt-0"
    >
      {/* Orbiting Icons */}
      <div className="absolute inset-0 pointer-events-none  ">
        <motion.div 
          animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-5 left-0 md:top-10 dark:shadow-blue-300 shadow-blue-300 md:left-10 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-blue-600 border border-blue-50"
        >
          <Zap size={18} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 right-0 md:bottom-20 dark:shadow-blue-300 shadow-blue-300 md:right-10 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-blue-600 border border-blue-50"
        >
          <ShieldCheck size={18} />
        </motion.div>
      </div>

      {/* Main Glass Card */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 bg-white/80 dark:shadow-blue-300 shadow-blue-300 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(37,99,235,0.1)] border border-white w-[280px] md:w-80 overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-6 md:mb-8">
           <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white">
             {/* Using className instead of md:size for responsiveness */}
             <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" /> 
           </div>
           <div>
             <h4 className="font-black text-slate-800 text-base md:text-lg">Order #4290</h4>
             <p className="text-[9px] md:text-[10px] text-green-500 font-bold uppercase tracking-widest">In Progress</p>
           </div>
        </div>

        <div className="space-y-4">
          <div className="h-2.5 md:h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ duration: 2, delay: 1 }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>
        </div>

       <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100 flex items-center gap-3">
  <div className="flex -space-x-2">
    {[1, 2, 3].map((i) => (
      <div 
        key={i} 
        className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden shadow-sm"
      >
        {/* Khaali circle ki jagah ek chota user icon ya text */}
        <span className="text-[8px] md:text-[10px] font-bold text-blue-600 uppercase">
          {i === 1 ? 'MS' : i === 2 ? 'AZ' : 'RK'}
        </span>
      </div>
    ))}
  </div>
  <p className="text-[9px] md:text-[10px] font-bold text-slate-500 italic tracking-tight">
    <span className="text-blue-600">+5 verified</span> experts nearby
  </p>
</div>
      </motion.div>

      {/* Quick-Action Badge */}
      <motion.div 
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-5 right-2 md:top-16 md:right-0 z-30 dark:bg-blue-0 bg-slate-900 dark:shadow-blue-300 shadow-blue-300 dark:bg-white  text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 scale-90 md:scale-100"
      >
        <div className="dark:bg-blue-600 bg-blue-600 p-1.5 md:p-2 rounded-lg ">
          <Users className="w-4 h-4" /> 
        </div>
        <div>
           <p className="text-[8px] md:text-[10px] text-blue-800 font-bold uppercase">Active Now</p>
           <p className="text-xs md:text-sm font-bold dark:text-slate-900 ">1.2k Providers</p>
        </div>
      </motion.div>

      {/* Local Tag */}
      <motion.div 
        className="absolute bottom-10 left-2 md:bottom-20 md:left-0 z-30 dark:shadow-blue-300 shadow-blue-300 bg-blue-50 text-blue-700 px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-blue-100 shadow-lg flex items-center gap-2 scale-90 md:scale-100"
      >
        <Globe className="w-4 h-4" /> 
        <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter">Karachi's #1 Choice</span>
      </motion.div>

    </motion.div>
  </div>
</section>

      {/* 2. Stats Section - Numbers now animate on scroll */}
      <section className="dark:bg-slate-900 py-16 px-6  border-blue-100 bg-blue-50/50 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "15k+", label: "Service Booked" },
            { val: "500+", label: "Verified Pros" },
            { val: "98%", label: "Satisfaction" },
            { val: "24/7", label: "Support Available" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-black dark:text-white text-slate-800">
                <Counter value={stat.val} />
              </h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

     {/* 3. Features Grid - Icons & Cards with Animated Borders */}
<section className="py-32 px-6 relative overflow-hidden bg-white dark:bg-slate-900 ">
  <style>{`
    @keyframes spin-border {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>

  <div className="max-w-7xl mx-auto ">
    <div className="text-center mb-20 space-y-4">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase dark:text-white">
        Why Choose <span className="text-blue-600">Us?</span>
      </h2>
      <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
      {features.map((f, i) => (
        <motion.div 
          whileHover={{ y: -10 }}
          key={i} 
          className="group relative p-[2px] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 transition-all duration-500 dark:shadow-blue-200 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-500/20"
        >
          {/* Animated Border */}
          <div 
            className="absolute inset-[-100%] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'conic-gradient(from 0deg, transparent 10%, #2563eb 50%, transparent 90%)',
              animation: 'spin-border 3s linear infinite', 
            }}
          ></div>

          {/* Main Card Content */}
          <div className="relative h-full w-full bg-white shadow-blue-200  dark:bg-slate-900 p-10 rounded-[2.4rem] z-10 flex flex-col items-start overflow-hidden">
            {/* Background Blob */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50  dark:bg-blue-900/20 rounded-full group-hover:scale-150 transition-transform duration-700 z-0 opacity-50"></div>
            
            {/* ICON SECTION */}
            <div className="relative p-[3px] rounded-2xl  overflow-hidden mb-8 w-fit z-10 bg-slate-100 dark:bg-slate-800">
                <div 
                  className="absolute inset-[-150%] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 10%, #2563eb 50%, transparent 90%)',
                    animation: 'spin-border 3s linear infinite',
                  }}
                ></div>

                <div className="relative w-14 h-14 bg-slate-50 dark:bg-slate-900 text-blue-600 rounded-2xl flex items-center justify-center z-10 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[15deg] transition-all duration-300">
                  {f.icon}
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
              {f.title}
            </h3>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed relative z-10">
              {f.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  {/* 4. Simple CTA Section - Stylishly Animated & Fully Mobile Responsive */}
<section className="relative py-12 sm:py-20 md:py-32 px-4 sm:px-6 flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden">
  
  {/* Custom CSS for High-Visibility Rotating Gradient Border */}
  <style>{`
    @keyframes spinBorder {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-spin-border {
      animation: spinBorder 4s linear infinite;
    }
  `}</style>

  {/* Background Orbs */}
  <div className="absolute inset-0 z-0">
    <motion.div 
      animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 rounded-full blur-[100px] sm:blur-[150px]"
    />
    <motion.div 
      animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/10 rounded-full blur-[100px] sm:blur-[150px]"
    />
  </div>

  {/* Tilt Container */}
  <motion.div
    style={{ 
      rotateX: smoothRotateX, 
      rotateY: smoothRotateY, 
      transformStyle: "preserve-3d" 
    }}
    className="relative z-10 w-full max-w-4xl p-[3px] rounded-[2.4rem] sm:rounded-[3.3rem] md:rounded-[4.3rem] overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.3)] dark:shadow-[0_0_50px_rgba(59,130,246,0.5)]"
  >
    {/* Infinite Rotating Gradient Beam Behind the Card */}
    <div className="absolute inset-[-50%] animate-spin-border bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0deg,transparent_60deg,transparent_300deg,#06b6d4_330deg,#3b82f6_360deg)] opacity-90 dark:opacity-100" />

   {/* Deep Depth Glass Card (Placed over the rotating gradient so only the border shows) */}
    <div className="relative z-10 bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl p-6 sm:p-12 md:p-20 rounded-[2.3rem] sm:rounded-[3.2rem] md:rounded-[4.2rem] shadow-2xl text-center overflow-hidden m-[2px]">
      
      {/* Glossy Overlay Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

      {/* Main Heading */}
      <motion.h2 
        style={{ transform: "translateZ(80px)" }}
        className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-8 leading-tight"
      >
        Experience the <br className="hidden sm:inline" />
        <span className="text-blue-600 dark:text-blue-400 block sm:inline"> Future of Services</span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p 
        style={{ transform: "translateZ(40px)" }}
        className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-md mx-auto font-light tracking-wide px-2"
      >
        The most premium services in Karachi, curated just for your lifestyle.
      </motion.p>

   {/* Button with Infinite Animated Conic Gradient Border */}
      {/* Button with Infinite Animated Conic Gradient Border - Light & Dark Mode Optimized */}
<motion.div 
  style={{ transform: "translateZ(100px)" }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="inline-block relative p-[2px] rounded-full overflow-hidden shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] dark:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.8)] transition-all duration-500"
>
  {/* Button's Rotating Border Animation Wrapper */}
  <div className="absolute inset-[-50%] animate-spin-border bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0deg,transparent_60deg,transparent_300deg,#06b6d4_330deg,#3b82f6_360deg)] opacity-85 dark:opacity-100" />

  <Link 
    to="/signup" 
    className="relative z-10 inline-flex items-center gap-3 px-6 sm:px-10 py-3.5 sm:py-5 rounded-full font-bold text-base sm:text-lg 
    bg-white text-slate-900 hover:bg-slate-50 
    dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900
    transition-colors duration-300
    whitespace-nowrap m-[1px]"
  >
    Book Now
    <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
      <span className="text-blue-600 dark:text-blue-400 text-sm sm:text-base">→</span>
    </span>
  </Link>
</motion.div>
    </div>
  </motion.div>
</section>

    </div>
  );
}

export default Home;