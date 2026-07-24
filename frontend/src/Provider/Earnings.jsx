 





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { 
//   Wallet, CheckCircle2, ArrowUpRight, 
//   Percent, ShieldAlert, Calendar 
// } from "lucide-react";

// const Earnings = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || storedUser?._id;
  
//   const [completedJobs, setCompletedJobs] = useState([]);
//   const [totalEarnings, setTotalEarnings] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const COMMISSION_RATE = 0.20; // 20% platform commission kept exactly intact

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         if (!userId) return;
//         const res = await axios.get(
//           `http://https://service-management-system-xwcx.vercel.app/api/api/bookings/provider/${userId}`
//         );

//         const completed = res.data.filter(
//           (job) => job.status === "Completed"
//         );

//         setCompletedJobs(completed);

//         const total = completed.reduce((sum, job) => {
//           const price = job.serviceId?.price || 0;
//           const providerShare = price - price * COMMISSION_RATE;
//           return sum + providerShare;
//         }, 0);

//         setTotalEarnings(total);

//       } catch (error) {
//         console.error("Error calculating provider earnings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchJobs();
//     }
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10 max-w-[1700px] mx-auto px-1 sm:px-0">
      
//       {/* Premium Header Layout */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
//         <div>
//           <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
//             Earnings <span className="text-emerald-600">Overview</span>
//           </h1>
//           <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
//             Review your dynamic revenue splits, commission breakdowns, and historical transactions.
//           </p>
//         </div>
//         <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100/50 self-start sm:self-center">
//           <Percent size={14} className="shrink-0" />
//           <span className="text-[10px] font-black uppercase tracking-widest">Platform Split: 80/20</span>
//         </div>
//       </div>

//       {/* Analytics Matrix Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
//         {/* Main Net Income Card */}
//         <motion.div 
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between group hover:border-emerald-100 transition-all relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/40 rounded-bl-full pointer-events-none group-hover:bg-emerald-100/30 transition-all" />
          
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
//                 <Wallet size={24} />
//               </div>
//               <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400">
//                 Net Earnings (Take Home Share)
//               </span>
//             </div>
            
//             <h2 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tighter mt-2 flex items-baseline gap-1">
//               <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">Rs.</span>
//               {totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
//             </h2>
//           </div>

//           <div className="flex items-center gap-2 mt-8 text-[11px] text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100/80">
//             <ShieldAlert size={14} className="text-slate-400 shrink-0" />
//             <span>This total dynamically subtracts a 20% system maintenance layout fee.</span>
//           </div>
//         </motion.div>

//         {/* Dynamic Micro Info Panel */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 0.4 }}
//           className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between"
//         >
//           <div className="space-y-1">
//             <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Volume</span>
//             <h3 className="text-3xl font-black text-slate-900 tracking-tight">{completedJobs.length} Settled</h3>
//           </div>
          
//           <div className="border-t border-slate-100 pt-4 mt-6 space-y-3">
//             <div className="flex justify-between items-center text-xs">
//               <span className="font-bold text-slate-500">Gross Value:</span>
//               <span className="font-extrabold text-slate-700">
//                 Rs. {(totalEarnings / (1 - COMMISSION_RATE)).toFixed(0)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center text-xs">
//               <span className="font-bold text-slate-500">Platform Cut (20%):</span>
//               <span className="font-extrabold text-rose-500">
//                 - Rs. {((totalEarnings / (1 - COMMISSION_RATE)) * COMMISSION_RATE).toFixed(0)}
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Transaction History Block */}
//       <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md border border-slate-100">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight">
//             Completed Breakdown Logs
//           </h3>
//           <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase">
//             Ledger
//           </span>
//         </div>

//         {/* Dynamic Iteration Listing */}
//         <div className="space-y-3">
//           {completedJobs.map((job, index) => {
//             const price = job.serviceId?.price || 0;
//             const providerShare = price - price * COMMISSION_RATE;

//             return (
//               <motion.div 
//                 key={job._id}
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.04 }}
//                 className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/60 rounded-2xl border border-slate-100/80 hover:bg-slate-50 hover:border-slate-200 transition-all gap-4"
//               >
//                 <div className="flex items-center gap-3.5 min-w-0">
//                   <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
//                     <CheckCircle2 size={16} />
//                   </div>
//                   <div className="min-w-0">
//                     <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate">
//                       {job.serviceId?.title || "On-Demand Service"}
//                     </h4>
//                     <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mt-0.5">
//                       <span className="flex items-center gap-1"><Calendar size={11} /> {job.date || "N/A"}</span>
//                       <span>• Gross Base: Rs. {price}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-1.5 self-end sm:self-center font-extrabold text-slate-900 text-sm bg-white border border-slate-200/60 shadow-xs px-3 py-1.5 rounded-xl">
//                   <span className="text-[11px] text-emerald-600 font-black">+ Rs.</span>
//                   {providerShare.toFixed(0)}
//                   <ArrowUpRight size={12} className="text-emerald-500" />
//                 </div>
//               </motion.div>
//             );
//           })}

//           {completedJobs.length === 0 && (
//             <div className="text-center py-12 bg-slate-50/40 rounded-2xl border border-dashed border-slate-200">
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
//                 No revenue logs detected for completed cycles yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Earnings;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Wallet, CheckCircle2, ArrowUpRight, 
  Percent, ShieldAlert, Calendar 
} from "lucide-react";

const Earnings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;
  
  const [completedJobs, setCompletedJobs] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  const COMMISSION_RATE = 0.20; 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(
          `http://https://service-management-system-xwcx.vercel.app/api/api/bookings/provider/${userId}`
        );

        const completed = res.data.filter(
          (job) => job.status === "Completed"
        );

        setCompletedJobs(completed);

        const total = completed.reduce((sum, job) => {
          const price = job.serviceId?.price || 0;
          const providerShare = price - price * COMMISSION_RATE;
          return sum + providerShare;
        }, 0);

        setTotalEarnings(total);

      } catch (error) {
        console.error("Error calculating provider earnings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchJobs();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1700px] mx-auto px-1 sm:px-0">
      
      {/* Premium Header Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Earnings <span className="text-blue-600">Overview</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
            Review your dynamic revenue splits, commission breakdowns, and historical transactions.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-100/50 self-start sm:self-center">
          <Percent size={14} className="shrink-0" />
          <span className="text-[10px] font-black uppercase tracking-widest">Platform Split: 80/20</span>
        </div>
      </div>

      {/* Analytics Matrix Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Main Net Income Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between group hover:border-blue-100 transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/40 rounded-bl-full pointer-events-none group-hover:bg-blue-100/30 transition-all" />
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <Wallet size={24} />
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400">
                Net Earnings (Take Home Share)
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tighter mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">Rs.</span>
              {totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-8 text-[11px] text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100/80">
            <ShieldAlert size={14} className="text-slate-400 shrink-0" />
            <span>This total dynamically subtracts a 20% system maintenance layout fee.</span>
          </div>
        </motion.div>

        {/* Dynamic Micro Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Volume</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{completedJobs.length} Settled</h3>
          </div>
          
          <div className="border-t border-slate-100 pt-4 mt-6 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">Gross Value:</span>
              <span className="font-extrabold text-slate-700">
                Rs. {(totalEarnings / (1 - COMMISSION_RATE)).toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">Platform Cut (20%):</span>
              <span className="font-extrabold text-rose-500">
                - Rs. {((totalEarnings / (1 - COMMISSION_RATE)) * COMMISSION_RATE).toFixed(0)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transaction History Block */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight">
            Completed Breakdown Logs
          </h3>
          <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase">
            Ledger
          </span>
        </div>

        {/* Dynamic Iteration Listing */}
        <div className="space-y-3">
          {completedJobs.map((job, index) => {
            const price = job.serviceId?.price || 0;
            const providerShare = price - price * COMMISSION_RATE;

            return (
              <motion.div 
                key={job._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/60 rounded-2xl border border-slate-100/80 hover:bg-slate-50 hover:border-slate-200 transition-all gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate">
                      {job.serviceId?.title || "On-Demand Service"}
                    </h4>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mt-0.5">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {job.date || "N/A"}</span>
                      <span>• Gross Base: Rs. {price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 self-end sm:self-center font-extrabold text-slate-900 text-sm bg-white border border-slate-200/60 shadow-xs px-3 py-1.5 rounded-xl">
                  <span className="text-[11px] text-blue-600 font-black">+ Rs.</span>
                  {providerShare.toFixed(0)}
                  <ArrowUpRight size={12} className="text-blue-500" />
                </div>
              </motion.div>
            );
          })}

          {completedJobs.length === 0 && (
            <div className="text-center py-12 bg-slate-50/40 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                No revenue logs detected for completed cycles yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Earnings;