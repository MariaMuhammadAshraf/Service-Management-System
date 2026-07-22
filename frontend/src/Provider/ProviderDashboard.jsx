 



// import React, { useEffect, useState } from "react";
// import { 
//   Briefcase, Clock, CheckCircle, Package, Users, 
//   MapPin, CalendarDays, Zap, Star 
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { ResponsivePie } from "@nivo/pie";
// import axios from "axios"; // ✅ Added Axios for API calls

// const CustomTooltip = ({ datum }) => (
//   <div className="bg-white p-2.5 rounded-xl shadow-xl border border-slate-100 font-sans">
//     <div className="flex items-center gap-2">
//       <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: datum.color }}></div>
//       <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">{datum.id}</p>
//     </div>
//     <p className="text-xl font-black text-slate-900 mt-0.5">{datum.value}</p>
//     <p className="text-[9px] font-bold text-slate-400">({datum.formattedValue}% of total)</p>
//   </div>
// );

// const ProviderDashboard = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || storedUser?._id;
  
//   const [isAvailable, setIsAvailable] = useState(storedUser?.isAvailable ?? true);

//   // ✅ FIX: FETCH FRESH STATUS FROM DATABASE WHEN DASHBOARD MOUNTS
//   useEffect(() => {
//     const fetchLiveStatus = async () => {
//       try {
//         if (!userId) return;
//         const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/auth/user/${userId}`);
//         if (res.data && res.data.isAvailable !== undefined) {
//           setIsAvailable(res.data.isAvailable);
//           // Sync localStorage so it stays fresh on page loads
//           localStorage.setItem("user", JSON.stringify({ ...storedUser, isAvailable: res.data.isAvailable }));
//         }
//       } catch (error) {
//         console.error("Error fetching live status on mount:", error);
//       }
//     };

//     fetchLiveStatus();
//   }, [userId]);

//   // ✅ SYNC AVAILABILITY WITH BACKEND DATABASE & LOCALSTORAGE
//   const handleToggleAvailability = async () => {
//     if (!userId) return;
//     const nextState = !isAvailable;
//     setIsAvailable(nextState); // Instant UI feedback

//     try {
//       const res = await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/auth/toggle-availability/${userId}`);
      
//       // Sync with localStorage so state remains same on browser refresh
//       const updatedUser = { ...storedUser, isAvailable: res.data.isAvailable };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     } catch (error) {
//       console.error("Failed to sync availability with server:", error);
//       setIsAvailable(!nextState); // Rollback to previous state if server fails
//     }
//   };

//   const stats = [
//     { name: "Total Jobs", value: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100", label: "text-blue-600" },
//     { name: "In Progress", value: "3", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-100", label: "text-yellow-700" },
//     { name: "Completed", value: "9", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100", label: "text-emerald-600" },
//   ];

//   const jobDistribution = [
//     { id: "Completed", label: "Completed", value: 9, color: "hsl(142, 70%, 45%)" }, 
//     { id: "In Progress", label: "In Progress", value: 3, color: "hsl(48, 96%, 53%)" }, 
//   ];

//   const servicesBreakdown = [
//     { id: "AC Repair", label: "AC Repair", value: 6, color: "hsl(221, 83%, 53%)" }, 
//     { id: "Cleaning", label: "Cleaning", value: 4, color: "hsl(142, 70%, 45%)" }, 
//     { id: "Painting", label: "Painting", value: 2, color: "hsl(271, 91%, 65%)" }, 
//   ];

//   return (
//     <div className="space-y-10 max-w-[1700px] mx-auto px-1 sm:px-0">

//       {/* Header + Functional Availability Toggle */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-slate-200">
//         <div>
//           <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
//             Welcome back, <span className="text-blue-600">{storedUser?.name || "Provider"}!</span>
//           </h1>
//           <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg">
//             Manage your jobs, view performance metrics, and stay updated with your service schedule.
//           </p>
//         </div>

//         {/* ✅ Updated Availability Toggle Trigger */}
//         <div className="flex items-center gap-4 bg-white px-5 py-3.5 rounded-3xl border border-slate-100 shadow-sm self-start sm:self-center">
//           <div className="flex flex-col text-right">
//             <span className={`text-[9px] font-black uppercase tracking-wider ${isAvailable ? 'text-emerald-600' : 'text-slate-400'}`}>
//               Availability
//             </span>
//             <span className="text-[12px] font-bold text-slate-900 mt-0.5">
//               {isAvailable ? "Ready to Work" : "Offline"}
//             </span>
//           </div>
//           <button 
//             onClick={handleToggleAvailability}
//             className={`relative w-14 h-7 rounded-full transition-colors duration-300 p-1 flex ${isAvailable ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}
//           >
//             <motion.div layout transition={{ type: "spring", stiffness: 700, damping: 30 }} className="w-5 h-5 bg-white rounded-full shadow-lg" />
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
//         <div className="lg:col-span-2 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
//           {stats.map((stat, i) => {
//             const Icon = stat.icon;
//             return (
//               <motion.div 
//                 key={stat.name}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
//                 className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex items-start gap-5 sm:gap-6 group hover:border-blue-100 hover:-translate-y-1 transition-all"
//               >
//                 <div className={`p-3.5 ${stat.bg} rounded-2xl group-hover:rotate-6 transition-transform`}>
//                   <Icon className={`${stat.color}`} size={28} />
//                 </div>
//                 <div className="flex-1">
//                   <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${stat.label}`}>
//                     {stat.name}
//                   </span>
//                   <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-1 tracking-tighter">{stat.value}</h2>
//                   <p className="text-[10px] font-medium text-slate-400 mt-0.5">Jobs this month</p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Job Distribution */}
//         <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col min-w-0">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight">Job Distribution</h3>
//             <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase">Status</span>
//           </div>
//           <div className="w-full h-[280px] sm:h-[340px] relative mx-auto">
//             <ResponsivePie
//               data={jobDistribution}
//               margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//               innerRadius={0.68}
//               padAngle={2}
//               cornerRadius={6}
//               colors={{ datum: "data.color" }}
//               borderWidth={0}
//               enableArcLinkLabels={false}
//               enableArcLabels={false}
//               tooltip={CustomTooltip}
//               layers={[
//                 "arcs", 
//                 "arcLabels", 
//                 "legends", 
//                 ({ centerX, centerY }) => (
//                   <g transform={`translate(${centerX}, ${centerY})`}>
//                     <text textAnchor="middle" dominantBaseline="central" className="font-sans">
//                       <tspan dy="-5" className="text-3xl sm:text-4xl font-black" fill="#1e293b">
//                         {stats[0].value}
//                       </tspan>
//                       <tspan x="0" dy="22" className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest" fill="#64748b">
//                         Total Jobs
//                       </tspan>
//                     </text>
//                   </g>
//                 )
//               ]}
//             />
//           </div>
//         </div>

//         {/* Services Breakdown */}
//         <div className="lg:col-span-1 xl:col-span-3 bg-white p-5 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col min-w-0">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight">Services Breakdown</h3>
//             <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase">Categories</span>
//           </div>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-1 w-full min-w-0">
//             <div className="w-full sm:w-1/2 h-[240px] sm:h-[340px] relative">
//               <ResponsivePie
//                 data={servicesBreakdown}
//                 margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
//                 innerRadius={0.7}
//                 padAngle={2.5}
//                 cornerRadius={6}
//                 colors={{ datum: "data.color" }}
//                 borderWidth={0}
//                 enableArcLinkLabels={false}
//                 enableArcLabels={false}
//                 tooltip={CustomTooltip}
//                 layers={[
//                   "arcs", 
//                   "arcLabels", 
//                   ({ centerX, centerY }) => (
//                     <g transform={`translate(${centerX}, ${centerY})`}>
//                       <text textAnchor="middle" dominantBaseline="central" className="font-sans">
//                         <tspan dy="-5" className="text-3xl sm:text-4xl font-black" fill="#1e293b">
//                           {stats[0].value}
//                         </tspan>
//                         <tspan x="0" dy="22" className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest" fill="#64748b">
//                           Services
//                         </tspan>
//                       </text>
//                     </g>
//                   )
//                 ]}
//               />
//             </div>

//             <div className="w-full sm:w-1/2 flex flex-col justify-center gap-3 sm:pl-6 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0">
//               {servicesBreakdown.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between bg-slate-50/60 p-2.5 rounded-xl border border-slate-100/80">
//                   <div className="flex items-center gap-2.5">
//                     <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
//                     <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">{item.label}</span>
//                   </div>
//                   <span className="text-xs font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200/60 shadow-xs">
//                     {item.value}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Assigned Jobs */}
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Assigned Jobs</h2>
//           <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full uppercase">1 Job Confirmed</span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           <motion.div 
//             initial={{ opacity: 0, x: -15 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
//             className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md hover:border-slate-200 transition-all flex flex-col group"
//           >
//             <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
//               <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
//                 AC Repair Service
//               </h3>
//               <div className="p-2.5 bg-blue-100 rounded-xl shrink-0">
//                 <Zap className="text-blue-600" size={15} />
//               </div>
//             </div>

//             <div className="flex-1 space-y-3 mb-5">
//               {[
//                 { icon: Users, text: "Maria Khan (Customer)" },
//                 { icon: CalendarDays, text: "30 May 2026" },
//                 { icon: Clock, text: "3:00 PM (Start Time)" },
//                 { icon: MapPin, text: "Johar Town, Block B" }
//               ].map((item, i) => (
//                 <div key={i} className="flex items-center gap-2.5">
//                   <item.icon className="text-slate-400 group-hover:text-blue-400 transition-colors shrink-0" size={14} />
//                   <p className="text-xs font-bold text-slate-700 tracking-tight truncate">{item.text}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-4 border-t border-slate-100 mt-auto">
//               <span className="px-3 py-1.5 text-[9px] font-black rounded-xl bg-yellow-100 text-yellow-700 uppercase tracking-widest flex items-center justify-center gap-1.5 self-start sm:self-auto">
//                 <Clock size={10} /> Confirmed
//               </span>
              
//               <div className="flex gap-2 w-full sm:w-auto">
//                 <button className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition active:scale-95 shadow-sm">
//                   Start
//                 </button>
//                 <button className="flex-1 sm:flex-none bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition active:scale-95 shadow-sm">
//                   Complete
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProviderDashboard;







// import React, { useEffect, useState } from "react";
// import { Briefcase, Clock, CheckCircle, Zap, Users, MapPin, CalendarDays } from "lucide-react";
// import { motion } from "framer-motion";
// import { ResponsivePie } from "@nivo/pie";
// import axios from "axios";

// const ProviderDashboard = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || storedUser?._id;
  
//   const [isAvailable, setIsAvailable] = useState(storedUser?.isAvailable ?? true);
//   const [dashboardData, setDashboardData] = useState({
//     total: 0,
//     inProgress: 0,
//     completed: 0,
//     jobs: []
//   });

//   // 1. Add this Helper Function inside ProviderDashboard
// const getStatusStyles = (status) => {
//   switch (status) {
//     case "In Progress": return "bg-blue-50 text-blue-600 border-blue-100";
//     case "Completed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
//     case "Pending":
//     case "Confirmed": return "bg-yellow-50 text-yellow-700 border-yellow-100";
//     default: return "bg-slate-50 text-slate-600 border-slate-100";
//   }
// };

// // 2. Add this Update Function
// const updateStatus = async (id, status) => {
//   try {
//     await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/bookings/${id}/provider-status`, {
//       status,
//       providerId: userId
//     });
//     // Re-fetch dashboard data to update the UI
//     const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/dashboard/${userId}`);
//     setDashboardData(res.data);
//   } catch (error) {
//     console.error("Failed to update status:", error);
//   }
// };


//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         if (!userId) return;
//         const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/dashboard/${userId}`);
//         setDashboardData(res.data);
//       } catch (err) { console.error("Error:", err); }
//     };
//     fetchDashboard();
//   }, [userId]);

//   // Chart Data Preparation
//   const jobDistributionData = [
//     { id: "Completed", label: "Completed", value: dashboardData.completed, color: "#10b981" },
//     { id: "In Progress", label: "In Progress", value: dashboardData.inProgress, color: "#eab308" }
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8fafc] p-8">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-black text-slate-900 uppercase">Overview</h1>
//           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
//             WELCOME BACK, {storedUser?.name?.toUpperCase() || "PROVIDER"}
//           </p>
//         </div>
//         <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-3xl border border-slate-100 shadow-sm">
//           <span className="text-[10px] font-black text-slate-400 uppercase">Availability</span>
//           <span className="text-[12px] font-black text-slate-900">Ready to Work</span>
//           <button onClick={() => setIsAvailable(!isAvailable)} className={`w-12 h-6 rounded-full p-1 ${isAvailable ? 'bg-blue-600' : 'bg-slate-300'}`}>
//             <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
//           </button>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {[
//           { label: "TOTAL JOBS", val: dashboardData.total, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
//           { label: "IN PROGRESS", val: dashboardData.inProgress, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
//           { label: "COMPLETED", val: dashboardData.completed, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" }
//         ].map((item, i) => (
//           <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
//             <div className={`p-4 ${item.bg} rounded-2xl`}><item.icon className={item.color} size={28} /></div>
//             <div>
//               <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{item.label}</p>
//               <h2 className="text-5xl font-black text-slate-900">{item.val}</h2>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[350px]">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Job Distribution</h3>
//             <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">Status</span>
//           </div>
//           <ResponsivePie data={jobDistributionData} innerRadius={0.7} enableArcLabels={false} colors={{ datum: 'data.color' }} />
//         </div>
//         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[350px]">
//           <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-6">Services Breakdown</h3>
//         </div>
//       </div>

//      {/* Jobs List Section */}
// <h2 className="text-lg font-black text-slate-900 uppercase mb-6">Assigned Jobs</h2>

// <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//   {dashboardData.jobs?.length > 0 ? (
//     dashboardData.jobs.map((job) => (
//       <div key={job._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
        
//        <div className="flex justify-between items-start mb-6">
//       <h3 className="text-base font-black text-slate-900 uppercase truncate">
//         {/* Yahan try karein ki kya backend se direct naam aa raha hai */}
//         {job.serviceName || job.serviceId?.title || "SERVICE"}
//       </h3>
//       <Zap className="text-blue-500 shrink-0" size={18} />
//     </div>
        
//         <div className="space-y-3 mb-6 text-[11px] font-bold text-slate-500 flex-1">
//           {/* Customer Name Mapping - Checking both object and direct field */}
//           <p className="flex items-center gap-3">
//             <Users size={14}/> {job.userId?.name || job.customerName || "CUSTOMER"}
//           </p>
//           <p className="flex items-center gap-3">
//             <CalendarDays size={14}/> {job.date ? new Date(job.date).toLocaleDateString() : "DATE"}
//           </p>
//           <p className="flex items-center gap-3">
//             <Clock size={14}/> {job.time || "TIME"}
//           </p>
//         </div>

//         {/* Status Badge */}
//         <span className={`px-3 py-1.5 mb-4 text-[9px] font-black rounded-xl border uppercase tracking-widest text-center ${getStatusStyles(job.status)}`}>
//           {job.status || "PENDING"}
//         </span>

//         {/* Action Buttons */}
//         <div className="flex gap-2">
//           {job.status !== "In Progress" && job.status !== "Completed" && (
//             <button 
//               onClick={() => updateStatus(job._id, "In Progress")}
//               className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition"
//             >
//               Start
//             </button>
//           )}
//           {job.status !== "Completed" && (
//             <button 
//               onClick={() => updateStatus(job._id, "Completed")}
//               className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
//             >
//               Complete
//             </button>
//           )}
//         </div>
//       </div>
//     ))
//   ) : (
//     <p className="text-slate-400 font-bold uppercase text-xs">No jobs assigned yet.</p>
//   )}
 
// </div>
//     </div>
//   );
// };

// export default ProviderDashboard;














import React, { useEffect, useState } from "react";
// Nayee line:
import { Briefcase, Clock, CheckCircle, Zap, Users, CalendarDays, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

const ProviderDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;
  
  const [isAvailable, setIsAvailable] = useState(storedUser?.isAvailable ?? true);
  const [dashboardData, setDashboardData] = useState({ total: 0, inProgress: 0, completed: 0, jobs: [] });

  const getStatusStyles = (status) => {
    switch (status) {
      case "In Progress": return "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/50";
      case "Completed": return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/50";
      case "Pending": return "bg-yellow-50 text-yellow-700 border-yellow-100 shadow-yellow-100/50";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const fetchDashboard = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/dashboard/${userId}`);
      setDashboardData(res.data);
    } catch (err) { console.error("Error:", err); }
  };

  // useEffect(() => { fetchDashboard(); }, [userId]);
  
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/dashboard/${userId}`);
        setDashboardData(res.data);
      } catch (err) { console.error("Error:", err); }
    };
    
    fetchDashboard();
  }, [userId]); // Ab sirf userId par depend karega

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/bookings/${id}/provider-status`, { status, providerId: userId });
      fetchDashboard();
    } catch (error) { console.error("Failed to update status:", error); }
  };

  const pieData = [
    { id: "Completed", value: dashboardData.completed, color: "#10b981" },
    { id: "InProgress", value: dashboardData.inProgress, color: "#3b82f6" },
    { id: "Total Jobs", value: dashboardData.total, color: "grey" }, // Blue
  ];

  return (
     <div className="space-y-10 max-w-[1700px] mx-auto px-1 sm:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
         
         <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Welcome back,<span className="text-blue-600">{storedUser?.name || "Partner"}!</span> 
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg">
  Stay updated with your latest service requests, active job progress, and recent business activity.
</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAvailable(!isAvailable)} 
          className={`px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 transition-all ${isAvailable ? 'bg-[#10b981] text-slate-100' : ' bg-[#94a3b8]  text-slate-100'}`}
        >
          {isAvailable ? "● Online" : "○ Offline"}
        </motion.button>
      </div>
{/* Stats Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  {[
    { label: "Total Jobs", val: dashboardData.total, icon: Briefcase, color: "#6b7280" }, // Grey
    { label: "Active", val: dashboardData.inProgress, icon: Clock, color: "#3b82f6" },    // Blue
    { label: "Finished", val: dashboardData.completed, icon: CheckCircle, color: "#10b981" } // Emerald
  ].map((stat, i) => (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "infinite" }}
      whileHover={{ y: -5 }}
      key={i}
      className="relative p-[2px] rounded-[2.6rem] overflow-hidden group shadow-lg"
    >
      {/* Animated Border */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute inset-0 bg-[conic-gradient(from_0deg,#22c55e_0deg,#3b82f6_120deg,#6b7280_240deg,#22c55e_360deg)]"
      />
      
      {/* Inner White Layer (Card Content) */}
      <div className="relative bg-white p-6 rounded-[2.5rem] flex items-center justify-between z-10 h-full">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
          <h2 className="text-4xl font-black text-slate-900 mt-1">{stat.val}</h2>
        </div>
        <div 
          className="p-4 rounded-2xl bg-slate-50 border border-slate-100" 
          style={{ color: stat.color }}
        >
          <stat.icon size={24} />
        </div>
      </div>
    </motion.div>
  ))}
</div>
      {/* Analytics Chart */}
      {/* <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[300px] mb-10 flex flex-col">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><BarChart3 size={14}/> Productivity Insights</h3>
        <ResponsivePie 
          data={pieData} 
          innerRadius={0.75} 
          padAngle={3} 
          cornerRadius={8}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
        />
      </div> */}

     <motion.div 
initial={{ opacity: 0, scale: 0.9 }}
  // Yahan se animation ko update karein:
  animate={{ 
    opacity: 1, 
    scale: 1, 
    y: [0, -10, 0] // Yeh chart ko infinity upar-neeche float karwayega
  }}
  transition={{ 
    y: { 
      repeat: Infinity, 
      duration: 6, 
      ease: "easeInOut" 
    },
    opacity: { duration: 0.5 },
    scale: { duration: 0.5 }
  }}
  className="relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] h-[400px] flex flex-col overflow-hidden"
>
  {/* Infinite Glowing Background Animation */}
  <div className="absolute inset-0 z-0 opacity-0 filter drop-shadow-[0_20px_20px_rgba(15,23,42,0.1)] ">
    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,transparent_210deg,transparent_360deg)]" />
  </div>

  {/* Header */}
  <div className="relative z-10 flex justify-between items-center mb-6">
    <div>
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Productivity Insights</h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Performance Matrix</p>
    </div>
    <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
      <Activity size={18} />
    </div>
  </div>

  {/* Chart Container */}
  <div className="relative z-10 flex-1 filter drop-shadow-[0_20px_20px_rgba(15,23,42,0.1)] ">
    <ResponsivePie 
      data={pieData} 
      margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
      innerRadius={0.7} 
    padAngle={3}
      cornerRadius={12}
      activeOuterRadiusOffset={10}
      colors={{ datum: 'data.color' }}
      borderWidth={0}
      borderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
     
      enableArcLinkLabels={true}
      arcLinkLabelsSkipAngle={0}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      
      arcLinkLabelsDiagonalLength={10}
      arcLinkLabelsStraightLength={10}
      
      enableArcLabels={false}
      theme={{
        chart: {
        filter: "none"
        }
      }}
    />
  </div>
</motion.div>


      {/* Jobs Section */}
      <h2 className="text-lg font-black text-slate-900 uppercase mb-4 mt-4">Jobs Assign</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {dashboardData.jobs?.map((job) => (
            <motion.div layout key={job._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase truncate">{job.serviceId?.title || "Service"}</h3>
                <Zap size={16} className="text-blue-500"/>
              </div>
              
              <div className="space-y-3 mb-6 text-[11px] font-bold text-slate-500">
                <p className="flex items-center gap-2"><Users size={12}/> {job.userId?.name || "Client"}</p>
                <p className="flex items-center gap-2"><CalendarDays size={12}/> {job.date ? new Date(job.date).toLocaleDateString() : "Date TBD"}</p>
              </div>

              <span className={`block w-full py-2 mb-4 text-[10px] font-black rounded-xl border text-center uppercase ${getStatusStyles(job.status)}`}>
                {job.status}
              </span>

              <div className="flex gap-2">
                {job.status !== "In Progress" && job.status !== "Completed" && (
                  <button onClick={() => updateStatus(job._id, "In Progress")} className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition">Start</button>
                )}
                {job.status !== "Completed" && (
                  <button onClick={() => updateStatus(job._id, "Completed")} className="flex-1 bg-emerald-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition">Done</button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProviderDashboard;