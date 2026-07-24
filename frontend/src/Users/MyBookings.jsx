// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(
//         `${API}/bookings/user/${user.id}`
//       );
//       setBookings(res.data);
//     } catch (error) {
//       console.error("Error fetching bookings", error);
//     }
//   };

//   useEffect(() => {
//     if (user?.id) {
//       fetchBookings();
//     }
//   }, []);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
//         Your Bookings
//       </h2>

//       <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-4">

//         <div className="space-y-4">
//           {bookings.length === 0 && (
//             <p className="text-center text-slate-500 py-10">
//               No bookings found.
//             </p>
//           )}

//           {bookings.map((bk) => (
//             <div
//               key={bk._id}
//               className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
//             >
//               <div className="flex gap-5 items-center">
//                 <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">
//                   #{bk._id.slice(-4)}
//                 </div>

//                 <div>
//                   <h4 className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none">
//                     {bk.serviceId?.title}
//                   </h4>

//                   <p className="text-[10px] font-black text-blue-600 uppercase mt-1">
//                     {bk.date} | {bk.time}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-6 justify-between md:justify-end">
//                 <div className="text-right">
//                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
//                     Amount
//                   </p>
//                   <p className="font-black text-slate-900">
//                     Rs. {bk.serviceId?.price}
//                   </p>
//                 </div>

//                 <span
//                   className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
//                     bk.status === "Completed"
//                       ? "bg-green-50 text-green-600 border-green-100"
//                       : bk.status === "Cancelled"
//                       ? "bg-red-50 text-red-600 border-red-100"
//                       : bk.status === "In Progress"
//                       ? "bg-blue-50 text-blue-600 border-blue-100"
//                       : "bg-orange-50 text-orange-600 border-orange-100"
//                   }`}
//                 >
//                   {bk.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MyBookings;











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Calendar, Clock, Loader2, CalendarCheck } from "lucide-react";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API}/bookings/user/${user.id}`);
//       setBookings(res.data);
//     } catch (error) { console.error("Error fetching bookings", error); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => {
//     if (user?.id) fetchBookings();
//     else setLoading(false);
//   }, []);

//   if (loading) return (
//     <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//       <Loader2 size={40} className="text-blue-600 animate-spin" />
//       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Matrix...</p>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-10 animate-in fade-in duration-700">
//       <div className="border-b border-slate-100 pb-6">
//         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Transaction Logs</p>
//         <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">Booking History</h2>
//       </div>

//       <div className="space-y-6">
//         <AnimatePresence mode="popLayout">
//           {bookings.length === 0 ? (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]">
//               <CalendarCheck className="mx-auto text-slate-300 mb-4" size={32} />
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No active records found.</p>
//             </motion.div>
//           ) : (
//             bookings.map((bk, index) => (
//               <motion.div
//                 key={bk._id}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="relative p-[1.5px] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_15px_40px_rgba(15,23,42,0.04)]"
//               >
//                 {/* Profile jaisa animated border */}
//                 <motion.div 
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
//                   className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_180deg,transparent_240deg,transparent_360deg)] opacity-100 pointer-events-none"
//                 />
                
//                 <div className="relative bg-white p-6 sm:p-8 rounded-[2.4rem] flex flex-col sm:flex-row gap-6 items-center justify-between z-10">
//                   <div className="flex items-center gap-5 w-full">
//                     <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-slate-900/20">
//                       #{bk._id?.slice(-3)}
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="font-black text-lg text-slate-900 uppercase tracking-tight">
//                         {bk.serviceId?.title?.replace(/\\'/g, "'") || "Service"}
//                       </h4>
//                       <div className="flex gap-4">
//                         <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                           <Calendar size={12} /> {bk.date}
//                         </span>
//                         <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                           <Clock size={12} /> {bk.time}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-100 pt-4 sm:pt-0">
//                     <div className="text-right">
//                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Price</p>
//                       <p className="font-black text-slate-900 text-sm">Rs. {bk.serviceId?.price}</p>
//                     </div>
//                     <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
//                       bk.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
//                       bk.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
//                     }`}>
//                       {bk.status}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default MyBookings;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Calendar, Clock, Loader2, CalendarCheck } from "lucide-react";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API}/bookings/user/${user.id}`);
//       setBookings(res.data);
//     } catch (error) { console.error("Error fetching bookings", error); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => {
//     if (user?.id) fetchBookings();
//     else setLoading(false);
//   }, []);

//   if (loading) return (
//     <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//       <Loader2 size={40} className="text-blue-600 animate-spin" />
//       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Matrix...</p>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-10 animate-in fade-in duration-700">
//       <div className="border-b border-slate-100 pb-6">
//         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Transaction Logs</p>
//         <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">Booking History</h2>
//       </div>

//       <div className="space-y-6">
//         <AnimatePresence mode="popLayout">
//           {bookings.length === 0 ? (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]">
//               <CalendarCheck className="mx-auto text-slate-300 mb-4" size={32} />
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No active records found.</p>
//             </motion.div>
//           ) : (
//             bookings.map((bk, index) => (
//               <motion.div
//                 key={bk._id}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="relative p-[1.5px] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_15px_40px_rgba(15,23,42,0.04)]"
//               >
//                 {/* Rotating Border Glow */}
//                 <motion.div 
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
//                   className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_180deg,transparent_240deg,transparent_360deg)] opacity-100 pointer-events-none"
//                 />
                
//                 <div className="relative bg-gradient-to-br from-white via-white to-slate-50/50 backdrop-blur-xl p-6 sm:p-8 rounded-[2.4rem] flex flex-col sm:flex-row gap-6 items-center justify-between z-10 border border-white">
//                   <div className="flex items-center gap-5 w-full">
//                     <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-slate-900/20">
//                       #{bk._id?.slice(-3)}
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="font-black text-lg text-slate-900 uppercase tracking-tight">
//                         {bk.serviceId?.title?.replace(/\\'/g, "'") || "Service"}
//                       </h4>
//                       <div className="flex gap-4">
//                         <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                           <Calendar size={12} /> {bk.date}
//                         </span>
//                         <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                           <Clock size={12} /> {bk.time}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-100 pt-4 sm:pt-0">
//                     <div className="text-right">
//                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Price</p>
//                       <p className="font-black text-slate-900 text-sm">Rs. {bk.serviceId?.price}</p>
//                     </div>
//                     <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
//                       bk.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
//                       bk.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
//                     }`}>
//                       {bk.status}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default MyBookings;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Loader2, CalendarCheck } from "lucide-react";

const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/bookings/user/${user.id}`);
      setBookings(res.data);
    } catch (error) { console.error("Error fetching bookings", error); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (user?.id) fetchBookings();
    else setLoading(false);
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 size={40} className="text-blue-600 animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Matrix...</p>
    </div>
  );

  return (
    <div className="w-full p-4 sm:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="pb-2">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Transaction Logs</p>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">Booking 
        <span className="text-blue-600"> History </span></h2>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {bookings.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]">
              <CalendarCheck className="mx-auto text-slate-300 mb-4" size={32} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No active records found.</p>
            </motion.div>
          ) : (
            bookings.map((bk, index) => (
              <motion.div
                key={bk._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                // Yahan wahi animated border wala structure use kiya hai
                className="relative p-[1.5px] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.04)]"
              >
                {/* Wahi Rotating Glow Animation */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_180deg,transparent_240deg,transparent_360deg)] opacity-100"
                />
                
                <div className="relative bg-white p-6 sm:p-8 rounded-[2.4rem] flex flex-col sm:flex-row gap-6 items-center justify-between">
                  <div className="flex items-center gap-5 w-full">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shrink-0">
                      #{bk._id?.slice(-3)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-lg text-slate-900 uppercase tracking-tight">
                        {bk.serviceId?.title?.replace(/\\'/g, "'") || "Service"}
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          <Calendar size={12} /> {bk.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          <Clock size={12} /> {bk.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-100 pt-4 sm:pt-0">
                    <div className="text-right">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Price</p>
                      <p className="font-black text-slate-900 text-sm">Rs. {bk.serviceId?.price}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                      bk.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                      bk.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {bk.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyBookings;