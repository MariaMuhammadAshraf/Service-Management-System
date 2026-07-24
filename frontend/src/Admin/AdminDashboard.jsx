
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Users, CheckCircle, TrendingUp, Activity, Briefcase, 
//   Loader2, LayoutDashboard, ShieldCheck, X 
// } from "lucide-react";
// import { ResponsiveBar } from "@nivo/bar";
// import { ResponsivePie } from "@nivo/pie";
// import { motion, AnimatePresence } from "framer-motion";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

// function CircularProgress({ value, color, label, maxGoal = 10 }) {
//   const percentage = Math.min((value / maxGoal) * 100, 100);
//   const radius = 35;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (percentage / 100) * circumference;

//   return (
//     <motion.div 
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ y: -5 }}
//       className="relative p-[2px] overflow-hidden rounded-[2.5rem] flex items-center justify-center group"
//     >
//       <motion.div 
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
//         className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,transparent_210deg,transparent_360deg)] opacity-100"
//       />
//       <div className="relative w-full h-full bg-white/90 backdrop-blur-md p-6 rounded-[2.45rem] flex flex-col items-center gap-4 z-10">
//         <div className="relative w-24 h-24 flex items-center justify-center">
//           <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]">
//             <circle cx="48" cy="48" r={radius} stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
//             <motion.circle
//               cx="48" cy="48" r={radius} stroke={color} strokeWidth="6" fill="transparent"
//               strokeDasharray={circumference}
//               initial={{ strokeDashoffset: circumference }}
//               animate={{ strokeDashoffset }}
//               transition={{ duration: 2, ease: "backOut" }}
//               strokeLinecap="round"
//             />
//           </svg>
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-xl font-black text-slate-800 tracking-tighter">{value}</span>
//           </div>
//         </div>
//         <div className="text-center">
//           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
//           <motion.div animate={{ scaleX: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="h-1 w-6 bg-slate-200 mx-auto rounded-full mt-2" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// const AnimatedBar = (props) => (
//   <motion.rect
//     x={props.x} y={props.y} width={props.width} height={props.height} fill={props.color} rx={12}
//     animate={{ opacity: [0.7, 1, 0.7], scaleY: [1, 1.02, 1] }}
//     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//     style={{ transformOrigin: "bottom" }}
//   />
// );

// function AdminDashboard() {
//   const [stats, setStats] = useState(null);
//   const [chartData, setChartData] = useState({ bar: [], pie: [] });
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(`${API}/dashboard/admin-stats`);
//       const data = res.data;
//       setStats(data);
      
//       const barData = Object.entries(data.monthlyRevenue || {}).map(([month, value]) => ({
//         month,
//         current: value,
//         previous: value * 0.8,
//       }));

//       const pieData = [
//         { id: "Bookings", label: "Bookings", value: data.totalBookings || 0, color: "#3b82f6" },
//         { id: "Services", label: "Services", value: data.totalServices || 0, color: "#a855f7" },
//         { id: "Users", label: "Users", value: data.totalUsers || 0, color: "#ef4444" },
//         { id: "Providers", label: "Providers", value: data.totalProviders || 0, color: "#10b981" },
//       ];
//       setChartData({ bar: barData, pie: pieData });
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     }
//   };

//   useEffect(() => { fetchStats(); }, []);

//   if (!stats) return (
//     <div className="h-screen bg-[#f0f4ff] flex flex-col items-center justify-center">
//       <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Loader2 className="w-16 h-16 text-blue-600" /></motion.div>
//       <p className="mt-6 text-xs font-black text-blue-400 uppercase tracking-[0.4em] animate-pulse">Initializing Interface</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f4f7fe] font-sans overflow-x-hidden">
//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden" />
//             <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed top-0 left-0 h-full w-[280px] bg-white/90 backdrop-blur-2xl z-[70] shadow-2xl p-8 lg:hidden border-r border-white">
//               <div className="flex justify-between items-center mb-12">
//                 <div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><LayoutDashboard size={18} /></div><span className="font-black italic text-lg uppercase">Admin</span></div>
//                 <button onClick={() => setIsMenuOpen(false)}><X className="text-slate-400" /></button>
//               </div>
//               <div className="space-y-6">{['Overview', 'Users', 'Services', 'Bookings', 'Revenue', 'Settings'].map((item) => (<div key={item} className="text-slate-500 font-bold hover:text-blue-600 cursor-pointer transition-colors uppercase text-sm tracking-widest">{item}</div>))}</div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       <div className="max-w-[1600px] mx-auto p-4 md:p-8">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
//           <CircularProgress label="Active Users" value={stats.totalUsers} color="#ef4444" maxGoal={20} />
//           <CircularProgress label="Bookings" value={stats.totalBookings} color="#3b82f6" maxGoal={50} />
//           <CircularProgress label="Services" value={stats.totalServices} color="#a855f7" maxGoal={30} />
//           <CircularProgress label="Providers" value={stats.totalProviders} color="#10b981" maxGoal={10} />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//          {/* 5. MAIN REVENUE CHART (FIXED BARS) */}
// <motion.div 
//   initial={{ opacity: 0, x: -20 }} 
//   animate={{ opacity: 1, x: 0 }}
//   className="lg:col-span-8 bg-white/80 backdrop-blur-md p-8 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden group"
// >
//   {/* Top Neon Glow Line */}
//   <div className="absolute top-0 left-0 w-full h-[4px] overflow-hidden z-20">
//     <motion.div 
//       animate={{ x: ['-100%', '100%'] }} 
//       transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
//       className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6]"
//     />
//   </div>

//   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
//      <div>
//        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Revenue Performance</p>
//        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Growth Statistics</h3>
//      </div>
     
//      <motion.div 
//        whileHover={{ scale: 1.05 }}
//        className="bg-gradient-to-br from-emerald-400 to-emerald-600 px-8 py-4 rounded-[2rem] shadow-xl shadow-emerald-200 flex items-center gap-4 text-white"
//      >
//         <TrendingUp size={24} />
//         <div>
//           <p className="text-[9px] font-bold uppercase opacity-80">Total Income</p>
//           <span className="text-xl font-black">Rs. {stats.totalRevenue?.toLocaleString()}</span>
//         </div>
//      </motion.div>


     
//   </div>

//   <div className="h-[400px] w-full relative z-10 uppercase tracking-widest animate-pulse">
//      <ResponsiveBar
//        data={chartData.bar.length > 0 ? chartData.bar : [{ month: 'Apr', current: 0 }]}
//      keys={['previous', 'current']}
//      /* --- YEH MAIN CHANGE HAI --- */
//   groupMode="grouped" // Isse bars barabar-barabar ho jayenge (side-by-side)
//        indexBy="month"
//        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
//        padding={0.7}
//        innerPadding={4} // Dono bars ke darmiyan gap
//        colors={['#e2e8f0', '#3b82f6']}
//        // Filhal AnimatedBar ko hata diya hai taake bars show ho jayein
//        borderRadius={8}
//        enableLabel={false}
//        maxValue={14000} 
//        animate={true}
      

//   /* --- SECURE & SMOOTH ANIMATION --- */
//   animate={true}
//   motionConfig="slow" // Isse animation slowly upar ayegi
//   initialMode="no-data" // Page load par bars zero se start hokar upar ayenge
 
//     theme={{
//     axis: { 
//       ticks: { 
//         text: { fill: "#94a3b8", fontWeight: 800, fontSize: 11 } 
//       } 
//     },
//     grid: { 
//       line: { stroke: "#f1f5f9", strokeWidth: 1 } 
//     }
//   }}
// />
//   </div>
// </motion.div>

//           <div className="lg:col-span-4 flex flex-col gap-8">
//             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 backdrop-blur-md p-10 rounded-[3.5rem] shadow-2xl border border-white flex flex-col items-center group relative overflow-hidden">
//                 <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full">
//                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center underline decoration-blue-500/20 underline-offset-8">Data Distribution</h3>
//                   <div className="h-[260px] w-full relative">
//                      <ResponsivePie data={chartData.pie} innerRadius={0.75} padAngle={5} cornerRadius={15} colors={{ datum: 'data.color' }} enableArcLinkLabels={false} enableArcLabels={false} />
//                      <div className="absolute inset-0 flex flex-col items-center justify-center">
//                         <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Activity className="text-blue-500 mb-2" size={32} /></motion.div>
//                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Engine Live</p>
//                      </div>
//                   </div>
//                 </motion.div>
//             </motion.div>
            
//             <div className="grid grid-cols-1 gap-4">
//                {chartData.pie.map((item, i) => (
//                  <motion.div key={i} whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,1)" }} className="bg-white/60 backdrop-blur-sm p-5 rounded-[1.8rem] shadow-sm flex items-center justify-between border border-white/50 cursor-pointer group transition-all">
//                     <div className="flex items-center gap-4">
//                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform" style={{ backgroundColor: item.color, boxShadow: `0 8px 20px -6px ${item.color}` }}>
//                           {item.id === "Providers" ? <ShieldCheck size={20}/> : item.id === "Users" ? <Users size={20}/> : item.id === "Bookings" ? <CheckCircle size={20}/> : <Briefcase size={20}/>}
//                        </div>
//                        <div>
//                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.label}</span>
//                          <span className="font-black text-slate-800 text-lg tracking-tight">{item.value}</span>
//                        </div>
//                     </div>
//                     <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-blue-500 font-black text-[10px] uppercase italic">View Details →</motion.div>
//                  </motion.div>
//                ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Users, CheckCircle, TrendingUp, Activity, Briefcase, 
//   Loader2, LayoutDashboard, ShieldCheck, X 
// } from "lucide-react";
// import { ResponsiveBar } from "@nivo/bar";
// import { ResponsivePie } from "@nivo/pie";
// import { motion, AnimatePresence } from "framer-motion";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

// function CircularProgress({ value, color, label, maxGoal = 10 }) {
//   const percentage = Math.min((value / maxGoal) * 100, 100);
//   const radius = 35;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (percentage / 100) * circumference;

//   return (
//     <motion.div 
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ y: -5 }}
//       className="relative p-[2px] overflow-hidden rounded-[2.5rem] flex items-center justify-center group"
//     >
//       <motion.div 
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
//         className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,transparent_210deg,transparent_360deg)] opacity-100"
//       />
//       <div className="relative w-full h-full bg-white/90 backdrop-blur-md p-6 rounded-[2.45rem] flex flex-col items-center gap-4 z-10">
//         <div className="relative w-24 h-24 flex items-center justify-center">
//           <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]">
//             <circle cx="48" cy="48" r={radius} stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
//             <motion.circle
//               cx="48" cy="48" r={radius} stroke={color} strokeWidth="6" fill="transparent"
//               strokeDasharray={circumference}
//               initial={{ strokeDashoffset: circumference }}
//               animate={{ strokeDashoffset }}
//               transition={{ duration: 2, ease: "backOut" }}
//               strokeLinecap="round"
//             />
//           </svg>
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-xl font-black text-slate-800 tracking-tighter">{value}</span>
//           </div>
//         </div>
//         <div className="text-center">
//           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
//           <motion.div animate={{ scaleX: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="h-1 w-6 bg-slate-200 mx-auto rounded-full mt-2" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// const AnimatedBar = (props) => (
//   <motion.rect
//     x={props.x} y={props.y} width={props.width} height={props.height} fill={props.color} rx={12}
//     animate={{ opacity: [0.7, 1, 0.7], scaleY: [1, 1.02, 1] }}
//     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//     style={{ transformOrigin: "bottom" }}
//   />
// );

// function AdminDashboard() {
//   const [stats, setStats] = useState(null);
//   const [chartData, setChartData] = useState({ bar: [], pie: [] });
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(`${API}/dashboard/admin-stats`);
//       const data = res.data;
//       setStats(data);
      
//       const barData = Object.entries(data.monthlyRevenue || {}).map(([month, value]) => ({
//         month,
//         current: value,
//         previous: value * 0.8,
//       }));

//       const pieData = [
//         { id: "Bookings", label: "Bookings", value: data.totalBookings || 0, color: "#3b82f6" },
//         { id: "Services", label: "Services", value: data.totalServices || 0, color: "#a855f7" },
//         { id: "Users", label: "Users", value: data.totalUsers || 0, color: "#ef4444" },
//         { id: "Providers", label: "Providers", value: data.totalProviders || 0, color: "#10b981" },
//       ];
//       setChartData({ bar: barData, pie: pieData });
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     }
//   };

//   useEffect(() => { fetchStats(); }, []);

//   if (!stats) return (
//     <div className="h-screen bg-[#f0f4ff] flex flex-col items-center justify-center">
//       <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Loader2 className="w-16 h-16 text-blue-600" /></motion.div>
//       <p className="mt-6 text-xs font-black text-blue-400 uppercase tracking-[0.4em] animate-pulse">Initializing Interface</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f4f7fe] font-sans overflow-x-hidden">
//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden" />
//             <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed top-0 left-0 h-full w-[280px] bg-white/90 backdrop-blur-2xl z-[70] shadow-2xl p-8 lg:hidden border-r border-white">
//               <div className="flex justify-between items-center mb-12">
//                 <div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><LayoutDashboard size={18} /></div><span className="font-black italic text-lg uppercase">Admin</span></div>
//                 <button onClick={() => setIsMenuOpen(false)}><X className="text-slate-400" /></button>
//               </div>
//               <div className="space-y-6">{['Overview', 'Users', 'Services', 'Bookings', 'Revenue', 'Settings'].map((item) => (<div key={item} className="text-slate-500 font-bold hover:text-blue-600 cursor-pointer transition-colors uppercase text-sm tracking-widest">{item}</div>))}</div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       <div className="max-w-[1600px] mx-auto p-4 md:p-8">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
//           <CircularProgress label="Active Users" value={stats.totalUsers} color="#ef4444" maxGoal={20} />
//           <CircularProgress label="Bookings" value={stats.totalBookings} color="#3b82f6" maxGoal={50} />
//           <CircularProgress label="Services" value={stats.totalServices} color="#a855f7" maxGoal={30} />
//           <CircularProgress label="Providers" value={stats.totalProviders} color="#10b981" maxGoal={10} />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//          {/* MAIN REVENUE CHART */}
// <motion.div 
//   initial={{ opacity: 0, x: -20 }} 
//   animate={{ opacity: 1, x: 0 }}
//   className="lg:col-span-8 bg-white/80 backdrop-blur-md p-8 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden group"
// >
//   {/* Top Neon Glow Line */}
//   <div className="absolute top-0 left-0 w-full h-[4px] overflow-hidden z-20">
//     <motion.div 
//       animate={{ x: ['-100%', '100%'] }} 
//       transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
//       className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6]"
//     />
//   </div>

//   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
//      <div>
//        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Revenue Performance</p>
//        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Growth Statistics</h3>
//      </div>
     
//      <motion.div 
//        whileHover={{ scale: 1.05 }}
//        className="bg-gradient-to-br from-emerald-400 to-emerald-600 px-8 py-4 rounded-[2rem] shadow-xl shadow-emerald-200 flex items-center gap-4 text-white"
//      >
//         <TrendingUp size={24} />
//         <div>
//           <p className="text-[9px] font-bold uppercase opacity-80">Total Income</p>
//           <span className="text-xl font-black">Rs. {stats.totalRevenue?.toLocaleString()}</span>
//         </div>
//      </motion.div>
//   </div>

//   <div className="h-[400px] w-full relative z-10 uppercase tracking-widest animate-pulse">
//      <ResponsiveBar
//        data={chartData.bar.length > 0 ? chartData.bar : [{ month: 'Apr', current: 0 }]}
//        keys={['previous', 'current']}
//        groupMode="grouped" 
//        indexBy="month"
//        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
//        padding={0.7}
//        innerPadding={4} 
//        colors={['#e2e8f0', '#3b82f6']}
//        borderRadius={8}
//        enableLabel={false}
//        maxValue={14000} 
//        animate={true}
//        motionConfig="slow" 
//        initialMode="no-data" 
//        theme={{
//         axis: { 
//           ticks: { 
//             text: { fill: "#94a3b8", fontWeight: 800, fontSize: 11 } 
//           } 
//         },
//         grid: { 
//           line: { stroke: "#f1f5f9", strokeWidth: 1 } 
//         }
//       }}
//     />
//   </div>

//   {/* ✅ NAYA DIFFERNET (HALF DONUT / GAUGE) SECTION YAHAN SE SHURU */}
//   <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
      
//       {/* Left Details Grid */}
//       <div className="w-full md:w-1/2 text-center md:text-left">
//           <div className="inline-block px-3 py-1 bg-blue-50 text-blue-500 rounded-lg text-[9px] font-black uppercase tracking-widest mb-3">Ecosystem</div>
//           <h4 className="text-2xl font-black text-slate-800 tracking-tight">Platform Metrics</h4>
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-6">Live entity distribution across the network</p>
          
//           <div className="grid grid-cols-2 gap-3">
//              {chartData.pie.map((item, idx) => (
//                 <motion.div whileHover={{ scale: 1.05 }} key={idx} className="flex flex-col items-start bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 transition-all">
//                    <div className="flex items-center gap-2 mb-1">
//                        <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
//                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
//                    </div>
//                    <span className="text-xl font-black text-slate-800 tracking-tight">{item.value}</span>
//                 </motion.div>
//              ))}
//           </div>
//       </div>
      
//       {/* Right Speedometer Chart */}
//       <motion.div 
//         animate={{ y: [0, -5, 0] }} 
//         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//         className="h-[200px] w-full md:w-1/2 relative flex items-end justify-center"
//       >
//           <div className="absolute inset-0">
//               <ResponsivePie
//                   data={chartData.pie}
//                   margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//                   startAngle={-90} // Isse half-circle (Gauge) banta hai
//                   endAngle={90}    // Isse half-circle (Gauge) banta hai
//                   innerRadius={0.75}
//                   padAngle={3}
//                   cornerRadius={10}
//                   colors={{ datum: 'data.color' }}
//                   enableArcLinkLabels={false}
//                   enableArcLabels={false}
//                   activeOuterRadiusOffset={8}
//                   animate={true}
//               />
//           </div>
          
//           <div className="absolute bottom-6 flex flex-col items-center">
//               <span className="text-4xl font-black text-slate-800 tracking-tighter">
//                  {stats.totalBookings + stats.totalServices + stats.totalUsers + stats.totalProviders || 0}
//               </span>
//               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm">Network Size</span>
//           </div>
//       </motion.div>
//   </div>
//   {/* ✅ NAYA DIFFERNET GAUGE CHART END */}

// </motion.div>

//           <div className="lg:col-span-4 flex flex-col gap-8">
//             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 backdrop-blur-md p-10 rounded-[3.5rem] shadow-2xl border border-white flex flex-col items-center group relative overflow-hidden">
//                 <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full">
//                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center underline decoration-blue-500/20 underline-offset-8">Data Distribution</h3>
//                   <div className="h-[260px] w-full relative">
//                      <ResponsivePie data={chartData.pie} innerRadius={0.75} padAngle={5} cornerRadius={15} colors={{ datum: 'data.color' }} enableArcLinkLabels={false} enableArcLabels={false} />
//                      <div className="absolute inset-0 flex flex-col items-center justify-center">
//                         <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Activity className="text-blue-500 mb-2" size={32} /></motion.div>
//                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Engine Live</p>
//                      </div>
//                   </div>
//                 </motion.div>
//             </motion.div>
            
//             <div className="grid grid-cols-1 gap-4">
//                {chartData.pie.map((item, i) => (
//                  <motion.div key={i} whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,1)" }} className="bg-white/60 backdrop-blur-sm p-5 rounded-[1.8rem] shadow-sm flex items-center justify-between border border-white/50 cursor-pointer group transition-all">
//                     <div className="flex items-center gap-4">
//                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform" style={{ backgroundColor: item.color, boxShadow: `0 8px 20px -6px ${item.color}` }}>
//                           {item.id === "Providers" ? <ShieldCheck size={20}/> : item.id === "Users" ? <Users size={20}/> : item.id === "Bookings" ? <CheckCircle size={20}/> : <Briefcase size={20}/>}
//                        </div>
//                        <div>
//                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.label}</span>
//                          <span className="font-black text-slate-800 text-lg tracking-tight">{item.value}</span>
//                        </div>
//                     </div>
//                     <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-blue-500 font-black text-[10px] uppercase italic">View Details →</motion.div>
//                  </motion.div>
//                ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, CheckCircle, TrendingUp, Activity, Briefcase, 
  Loader2, LayoutDashboard, ShieldCheck, X 
} from "lucide-react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

function CircularProgress({ value, color, label, maxGoal = 10 }) {
  const percentage = Math.min((value / maxGoal) * 100, 100);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="relative p-[2px] overflow-hidden rounded-[2.5rem] flex items-center justify-center group"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,transparent_210deg,transparent_360deg)] opacity-100"
      />
      <div className="relative w-full h-full bg-white/90 backdrop-blur-md p-6 rounded-[2.45rem] flex flex-col items-center gap-4 z-10">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]">
            <circle cx="48" cy="48" r={radius} stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
            <motion.circle
              cx="48" cy="48" r={radius} stroke={color} strokeWidth="6" fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "backOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-slate-800 tracking-tighter">{value}</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
          <motion.div animate={{ scaleX: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="h-1 w-6 bg-slate-200 mx-auto rounded-full mt-2" />
        </div>
      </div>
    </motion.div>
  );
}

// ✅ NAYA CUSTOM POLAR AREA CHART (Tasveer Jaisa)
const PolarAreaChart = ({ data }) => {
  // Find max value to scale the chart dynamically
  const maxVal = Math.max(...data.map(d => d.value)) || 10;
  const rings = [0.25, 0.5, 0.75, 1]; // 4 concentric grid circles
  const R = 100; // Max Radius
  const cx = 120; // Center X
  const cy = 120; // Center Y

  return (
    <div className="relative w-full h-[280px] flex flex-col items-center justify-center">
      {/* Top Legend (Tasveer ke mutabiq) */}
      <div className="flex flex-wrap justify-center gap-4 mb-2 z-10">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-5 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{d.label}</span>
          </div>
        ))}
      </div>

      <motion.svg 
        viewBox="0 0 240 240" 
        className="w-full h-full overflow-visible"
        animate={{ y: [0, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {/* Concentric Grid Lines */}
        {rings.map((mult, i) => (
          <circle key={`grid-${i}`} cx={cx} cy={cy} r={R * mult} stroke="#e2e8f0" strokeWidth="1" fill="none" />
        ))}

        {/* Slices / Polar Areas */}
        {data.map((d, i) => {
          const angle = 360 / data.length;
          const startAngle = i * angle;
          const endAngle = (i + 1) * angle;
          const r = Math.max((d.value / maxVal) * R, 5); // Radius depends on value

          // Convert degrees to radians
          const startRad = (startAngle - 90) * (Math.PI / 180);
          const endRad = (endAngle - 90) * (Math.PI / 180);

          const x1 = cx + r * Math.cos(startRad);
          const y1 = cy + r * Math.sin(startRad);
          const x2 = cx + r * Math.cos(endRad);
          const y2 = cy + r * Math.sin(endRad);

          // SVG Path definition
          const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

          return (
            <motion.g
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: i * 0.1, type: "spring", damping: 15 }}
              style={{ transformOrigin: `${cx}px ${cy}px`, cursor: 'pointer' }}
            >
              <path d={pathData} fill={d.color} stroke="#ffffff" strokeWidth="2" opacity={0.9} />
            </motion.g>
          );
        })}

        {/* Axis Numbers (Top vertical line values) */}
        {rings.map((mult, i) => (
          <text
            key={`label-${i}`}
            x={cx}
            y={cy - (R * mult) + 3}
            fontSize="8"
            fontWeight="900"
            fill="#64748b"
            textAnchor="middle"
            className="pointer-events-none drop-shadow-[0_0_2px_rgba(255,255,255,1)]"
          >
            {Math.round(maxVal * mult)}
          </text>
        ))}
      </motion.svg>
    </div>
  );
};

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState({ bar: [], pie: [] });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/dashboard/admin-stats`);
      const data = res.data;
      setStats(data);
      
      const barData = Object.entries(data.monthlyRevenue || {}).map(([month, value]) => ({
        month,
        current: value,
        previous: value * 0.8,
      }));

      const pieData = [
        { id: "Bookings", label: "Bookings", value: data.totalBookings || 0, color: "#3b82f6" },
        { id: "Services", label: "Services", value: data.totalServices || 0, color: "#a855f7" },
        { id: "Users", label: "Users", value: data.totalUsers || 0, color: "#ef4444" },
        { id: "Providers", label: "Providers", value: data.totalProviders || 0, color: "#10b981" },
      ];
      setChartData({ bar: barData, pie: pieData });
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  if (!stats) return (
    <div className="h-screen bg-[#f0f4ff] flex flex-col items-center justify-center">
      <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Loader2 className="w-16 h-16 text-blue-600" /></motion.div>
      <p className="mt-6 text-xs font-black text-blue-400 uppercase tracking-[0.4em] animate-pulse">Initializing Interface</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] font-sans overflow-x-hidden">
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed top-0 left-0 h-full w-[280px] bg-white/90 backdrop-blur-2xl z-[70] shadow-2xl p-8 lg:hidden border-r border-white">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><LayoutDashboard size={18} /></div><span className="font-black italic text-lg uppercase">Admin</span></div>
                <button onClick={() => setIsMenuOpen(false)}><X className="text-slate-400" /></button>
              </div>
              <div className="space-y-6">{['Overview', 'Users', 'Services', 'Bookings', 'Revenue', 'Settings'].map((item) => (<div key={item} className="text-slate-500 font-bold hover:text-blue-600 cursor-pointer transition-colors uppercase text-sm tracking-widest">{item}</div>))}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
          <CircularProgress label="Active Users" value={stats.totalUsers} color="#ef4444" maxGoal={20} />
          <CircularProgress label="Bookings" value={stats.totalBookings} color="#3b82f6" maxGoal={50} />
          <CircularProgress label="Services" value={stats.totalServices} color="#a855f7" maxGoal={30} />
          <CircularProgress label="Providers" value={stats.totalProviders} color="#10b981" maxGoal={10} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
        {/* MAIN REVENUE CHART */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 bg-white/80 backdrop-blur-md p-8 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden group"
        >
          {/* Top Neon Glow Line */}
          <div className="absolute top-0 left-0 w-full h-[4px] overflow-hidden z-20">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }} 
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6]"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
            <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Revenue Performance</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Growth Statistics</h3>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-emerald-400 to-emerald-600 px-8 py-4 rounded-[2rem] shadow-xl shadow-emerald-200 flex items-center gap-4 text-white"
            >
                <TrendingUp size={24} />
                <div>
                  <p className="text-[9px] font-bold uppercase opacity-80">Total Income</p>
                  <span className="text-xl font-black">Rs. {stats.totalRevenue?.toLocaleString()}</span>
                </div>
            </motion.div>
          </div>

          <div className="h-[400px] w-full relative z-10 uppercase tracking-widest animate-pulse">
            <ResponsiveBar
              data={chartData.bar.length > 0 ? chartData.bar : [{ month: 'Apr', current: 0 }]}
              keys={['previous', 'current']}
              groupMode="grouped" 
              indexBy="month"
              margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
              padding={0.7}
              innerPadding={4} 
              colors={['#e2e8f0', '#3b82f6']}
              borderRadius={8}
              enableLabel={false}
              maxValue={14000} 
              animate={true}
              motionConfig="slow" 
              initialMode="no-data" 
              theme={{
                axis: { 
                  ticks: { 
                    text: { fill: "#94a3b8", fontWeight: 800, fontSize: 11 } 
                  } 
                },
                grid: { 
                  line: { stroke: "#f1f5f9", strokeWidth: 1 } 
                }
              }}
            />
          </div>

          {/* ✅ NAYA POLAR AREA CHART YAHAN ADD KIYA HAI */}
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              
              <div className="w-full md:w-1/3 text-center md:text-left">
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-500 rounded-lg text-[9px] font-black uppercase tracking-widest mb-3">Ecosystem</div>
                  <h4 className="text-2xl font-black text-slate-800 tracking-tight">Platform Scale</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-6">Live entity distribution mapping</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {chartData.pie.map((item, idx) => (
                        <motion.div whileHover={{ scale: 1.05 }} key={idx} className="flex flex-col items-start bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 transition-all">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</span>
                          <span className="text-xl font-black text-slate-800 tracking-tight" style={{ color: item.color }}>{item.value}</span>
                        </motion.div>
                    ))}
                  </div>
              </div>
              
              <div className="w-full md:w-2/3">
                  {/* Dynamic Custom Chart */}
                  <PolarAreaChart data={chartData.pie} />
              </div>
          </div>

        </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 backdrop-blur-md p-10 rounded-[3.5rem] shadow-2xl border border-white flex flex-col items-center group relative overflow-hidden">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center underline decoration-blue-500/20 underline-offset-8">Data Distribution</h3>
                  <div className="h-[260px] w-full relative">
                     <ResponsivePie data={chartData.pie} innerRadius={0.75} padAngle={5} cornerRadius={15} colors={{ datum: 'data.color' }} enableArcLinkLabels={false} enableArcLabels={false} />
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Activity className="text-blue-500 mb-2" size={32} /></motion.div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Engine Live</p>
                     </div>
                  </div>
                </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-4">
               {chartData.pie.map((item, i) => (
                 <motion.div key={i} whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,1)" }} className="bg-white/60 backdrop-blur-sm p-5 rounded-[1.8rem] shadow-sm flex items-center justify-between border border-white/50 cursor-pointer group transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform" style={{ backgroundColor: item.color, boxShadow: `0 8px 20px -6px ${item.color}` }}>
                          {item.id === "Providers" ? <ShieldCheck size={20}/> : item.id === "Users" ? <Users size={20}/> : item.id === "Bookings" ? <CheckCircle size={20}/> : <Briefcase size={20}/>}
                       </div>
                       <div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.label}</span>
                         <span className="font-black text-slate-800 text-lg tracking-tight">{item.value}</span>
                       </div>
                    </div>
                    <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-blue-500 font-black text-[10px] uppercase italic">View Details →</motion.div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;