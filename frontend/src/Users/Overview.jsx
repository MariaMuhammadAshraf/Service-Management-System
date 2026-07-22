 
import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle, AlertCircle, CalendarCheck, Loader2, 
  Activity, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';

// ✅ HIGH-END ANIMATED CIRCULAR PROGRESS SYSTEM (Dynamic Stroke States)
function CircularProgress({ value, color, label, maxGoal = 20 }) {
  const numericValue = parseInt(value) || 0;
  const percentage = Math.min((numericValue / maxGoal) * 100, 100);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const dynamicStrokeColor = numericValue > 0 ? color : "#e2e8f0";

  return (

    
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
      className="relative p-[2px] overflow-hidden rounded-[2.5rem] flex items-center justify-center group shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,transparent_210deg,transparent_360deg)] opacity-100"
      />
      
      <div className="relative w-full h-full bg-white/90 backdrop-blur-md p-6 rounded-[2.45rem] flex flex-col items-center gap-4 z-10 shadow-inner">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_10px_12px_rgba(0,0,0,0.15)]">
            <circle cx="48" cy="48" r={radius} stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
            <motion.circle
              cx="48" cy="48" r={radius} stroke={dynamicStrokeColor} strokeWidth="6" fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "backOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-slate-800 tracking-tighter drop-shadow-sm">
              {String(numericValue).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
          <motion.div 
            animate={{ scaleX: [1, 1.5, 1] }} 
            transition={{ repeat: Infinity, duration: 3 }} 
            className="h-1 w-6 bg-slate-200 mx-auto rounded-full mt-2" 
          />
        </div>
      </div>
    </motion.div>
  );
}

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [statsData, setStatsData] = useState({
    total: "00",
    completed: "00",
    cancelled: "00",
    pending: "00",
    recent: []
  });
  const [pieChartData, setPieChartData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Screen size detector for responsive chart props
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        setLoading(true);

        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        const userId = loggedInUser?.id || loggedInUser?._id;

        if (!userId) {
          setError("User session missing! Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/bookings/user/${userId}`);
        const bookings = response.data || [];

        const totalCount = bookings.length;
        const completedCount = bookings.filter(b => b.status === "Completed").length;
        const cancelledCount = bookings.filter(b => b.status === "Cancelled").length;
        
        const topTwoActivities = bookings.slice(0, 2).map(b => ({
          id: b._id,
          title: b.serviceId?.title || "Home Service",
          timeLabel: b.date && b.time ? `${b.date} • ${b.time}` : new Date(b.createdAt).toLocaleDateString(),
          status: b.status || "Pending"
        }));

        setStatsData({
          total: String(totalCount).padStart(2, '0'),
          completed: String(completedCount).padStart(2, '0'),
          cancelled: String(cancelledCount).padStart(2, '0'),
          recent: topTwoActivities
        });

        setPieChartData([
          { id: "Completed", label: "Completed", value: completedCount || 0, color: "#10b981" }, 
          { id: "Total", label: "Total Bookings", value: totalCount || 0, color: "#3b82f6" },      
          { id: "Cancelled", label: "Cancelled", value: cancelledCount || 0, color: "#ef4444" }    
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard Dynamic Error:", err);
        setError("Server se contact nahi ho paa raha.");
        setLoading(false);
      }
    };

    fetchLiveStats();
  }, []);

 // statsData update hone ke baad dynamic calculation
const topRowStats = [
  { label: "Total Bookings", value: statsData.total, icon: <Clock size={20} />, color: "#3b82f6", maxGoal: Math.max(parseInt(statsData.total), 10) },
  { label: "Completed", value: statsData.completed, icon: <CheckCircle size={20} />, color: "#10b981", maxGoal: Math.max(parseInt(statsData.total), 10) },
  { label: "Cancelled", value: statsData.cancelled, icon: <AlertCircle size={20} />, color: "#ef4444", maxGoal: Math.max(parseInt(statsData.total), 5) },
];

  if (loading) {
    return (
      <div className="h-[55vh] w-full flex flex-col items-center justify-center gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Loader2 size={38} className="text-blue-500" />
        </motion.div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 animate-pulse">
          Loading Matrix Details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-100 rounded-[2rem] text-center max-w-md mx-auto mt-16 shadow-sm">
        <AlertCircle className="text-red-500 mx-auto mb-3 animate-bounce" size={28} />
        <h4 className="font-black text-red-900 uppercase text-xs tracking-wider">Connection Failed</h4>
        <p className="text-[11px] text-red-600 font-bold mt-1 uppercase">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-700 p-4">
      {/* Header Section */}
      <div className="pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            {/* Yahan dynamic naam show hoga */}
            Welcome back, <span className="text-blue-600">{storedUser?.name || "User"}!</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg">
            Here is an overview of your recent activity and scheduled services.
          </p>
        </div>
      </div>
      {/* Top Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {topRowStats.map((s, i) => (
          <CircularProgress 
            key={i} 
            label={s.label} 
            value={s.value} 
            color={s.color} 
            maxGoal={s.maxGoal} 
          />
        ))}
      </div>

      {/* Main Layout Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Recent Activities & NECHE WALA SEMI-CIRCLE CHART */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }} 
          animate={{ opacity: 1, x: 0 }}
          whileHover={isMobile ? {} : { y: -4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d", perspective: 1200 }}
          className="lg:col-span-7 bg-gradient-to-b from-white/95 to-slate-50/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_90px_-20px_rgba(15,23,42,0.12),0_25px_45px_-15px_rgba(15,23,42,0.08),inset_0_2px_4px_rgba(255,255,255,0.9)] border border-slate-200/50 relative overflow-hidden flex flex-col gap-8 sm:gap-10"
        >
          {/* Animated Neon Matrix Edge */}
          <div className="absolute top-0 left-0 w-full h-[4px] overflow-hidden z-20">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }} 
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_25px_4px_#3b82f6]"
            />
          </div>

          {/* Activities Upper Content */}
          <div className="flex flex-col justify-start" style={{ transform: "translateZ(20px)" }}>
            <div className="flex justify-between items-center mb-6 sm:mb-8 relative z-10">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Timeline Records</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Recent Activities</h3>
              </div>
              <button className="text-[10px] font-black text-blue-600 uppercase border-b-2 border-blue-600 tracking-widest transition-all hover:text-indigo-600 hover:border-indigo-600">
                View All
              </button>
            </div>

            <div className="space-y-4 sm:space-y-5 relative z-10">
              {statsData.recent.length === 0 ? (
                <p className="text-xs text-slate-400 font-bold uppercase text-center py-12">No Recent Logs Found</p>
              ) : (
                statsData.recent.map((activity, index) => (
                  <motion.div 
                    key={activity.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    whileHover={isMobile ? {} : { x: 10, backgroundColor: "rgba(255,255,255,1)", scale: 1.01 }}
                    className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex items-center justify-between border border-white/90 cursor-pointer group transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 bg-blue-50/80 shadow-inner group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                        <CalendarCheck size={18} />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-black text-slate-800 tracking-tight block uppercase">{activity.title}</span>
                        <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 block">{activity.timeLabel}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className={`px-3 py-1 sm:px-4 sm:py-1.5 font-black rounded-xl text-[8px] sm:text-[9px] uppercase tracking-wider border transition-all duration-300 ${
                        activity.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60 shadow-[0_4px_12px_rgba(16,185,129,0.1)]' 
                          : activity.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-600 border-rose-100/60 shadow-[0_4px_12px_rgba(239,68,68,0.1)]'
                          : 'bg-amber-50 text-amber-600 border-amber-100/60 shadow-[0_4px_12px_rgba(245,158,11,0.1)]'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* ✅ NECHE WALA CHART: PERFECT SEMI-CIRCLE GAUGE WITH INFINITE SLOW FLOATING LOOP */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="border-t border-slate-200/60 pt-6 sm:pt-8 flex flex-col items-center relative"
            style={{ transform: "translateZ(40px)" }}
          >
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-2 text-center underline decoration-blue-500/30 underline-offset-8">
              Data Distribution
            </h3>
            
            <div className="h-[150px] sm:h-[180px] w-full max-w-[480px] relative filter drop-shadow-[0_20px_20px_rgba(15,23,42,0.1)] z-10 overflow-hidden">
              <ResponsivePie 
                data={pieChartData} 
                innerRadius={0.72} 
                padAngle={5} 
                cornerRadius={14} 
                colors={{ datum: 'data.color' }} 
                startAngle={-90}
                endAngle={90}
                margin={{ top: 25, right: isMobile ? 60 : 160, bottom: 0, left: isMobile ? 60 : 160 }}
                enableArcLinkLabels={true} 
                arcLinkLabel={d => isMobile ? `${d.value}` : `${d.label} (${d.value})`}
                arcLinkLabelsTextColor="#475569"
                arcLinkLabelsThickness={2.5}
                arcLinkLabelsColor={{ from: 'color' }}
                enableArcLabels={false} 
                animate={true}
                motionConfig="gentle"
              />
              
              {/* Floating Center Identity */}
              <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div 
                  animate={{ y: [0, -4, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="bg-white p-2 rounded-full shadow-[0_8px_16px_rgba(59,130,246,0.12)] border border-slate-100 flex items-center justify-center"
                >
                  <Activity className="text-blue-500" size={18} />
                </motion.div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em] mt-1">Matrix Live</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: UPER WALA CHART & DISTRIBUTION LIST (STAYS FULL-CIRCLE) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* ✅ UPER WALA CHART WITH INFINITE SLOW FLOATING LOOP */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="bg-slate-50/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_30px_60px_-30px_rgba(0,0,0,0.18),inset_0_-4px_20px_rgba(0,0,0,0.05),inset_0_4px_20px_rgba(255,255,255,0.9)] border border-slate-200/60 flex flex-col items-center group relative overflow-hidden"
          >
            <div className="absolute bottom-[20%] w-[65%] h-[25px] bg-slate-900/10 blur-md rounded-full transform scale-x-110 pointer-events-none z-0" />

            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="w-full relative z-10 flex flex-col items-center"
            >
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 sm:mb-6 text-center underline decoration-blue-500/20 underline-offset-8">Data Distribution</h3>
              
              <div className="h-[220px] sm:h-[280px] w-full relative filter drop-shadow-[0_25px_20px_rgba(0,0,0,0.15)]">
                <ResponsivePie 
                  data={pieChartData} 
                  innerRadius={0.65} 
                  padAngle={4} 
                  cornerRadius={12} 
                  colors={{ datum: 'data.color' }} 
                  margin={{ top: 30, right: isMobile ? 60 : 100, bottom: 30, left: isMobile ? 60 : 100 }}
                  enableArcLinkLabels={true} 
                  arcLinkLabel={d => isMobile ? `${d.value}` : `${d.label} (${d.value})`}
                  arcLinkLabelsTextColor="#64748b"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: 'color' }}
                  enableArcLabels={false} 
                  animate={true}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                    <Activity className="text-blue-500 mb-0.5" size={26} />
                  </motion.div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Matrix Live</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ✅ DISTRIBUTION LIST CARD CONTROLS WITH INFINITE CONIC NEON BORDER EFFECT */}
          <div className="grid grid-cols-1 gap-4">
             {pieChartData.map((item, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1, duration: 0.4 }}
                 whileHover={isMobile ? {} : { y: -5, scale: 1.01, boxShadow: "0 25px 35px -10px rgba(0,0,0,0.12)" }} 
                 className="relative p-[2px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.03)] group"
               >
                 {/* Infinite Rotating Neon Conic Border Line */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                   className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_160deg,_var(--border-color)_180deg,transparent_200deg,transparent_360deg)] opacity-100 transition-all"
                   style={{ '--border-color': item.color }}
                 />

                 {/* Internal Main Card Layout Container */}
                 <div className="relative w-full h-full bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-[1.45rem] sm:rounded-[1.95rem] flex items-center justify-between z-10 border border-white/40 cursor-pointer transition-all">
                    <div className="flex items-center gap-3 sm:gap-4">
                       <div 
                         className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" 
                         style={{ backgroundColor: item.color, boxShadow: `0 12px 24px -6px ${item.color}80` }}
                       >
                          {item.id === "Completed" ? <CheckCircle size={18}/> : item.id === "Cancelled" ? <AlertCircle size={18}/> : <Layers size={18}/>}
                       </div>
                       <div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                           {item.label}
                         </span>
                         <span className="font-black text-slate-800 text-lg sm:text-xl tracking-tight block mt-0.5">
                           {item.id === "Completed" ? statsData.completed : item.id === "Cancelled" ? statsData.cancelled : statsData.total}
                         </span>
                       </div>
                    </div>
                    <motion.div className="text-blue-500 font-black text-[9px] uppercase tracking-wider bg-blue-50/80 px-3 py-1 rounded-lg opacity-80 group-hover:opacity-100 group-hover:bg-blue-50 transition-all">
                      Filter →
                    </motion.div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;