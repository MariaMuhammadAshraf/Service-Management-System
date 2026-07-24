// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MyJobs = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [jobs, setJobs] = useState([]);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(
//         `http://https://service-management-system-xwcx.vercel.app/api/api/bookings/provider/${storedUser.id}`
//       );
//       setJobs(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (storedUser?.id) {
//       fetchJobs();
//     }
//   }, []);

// const updateStatus = async (id, status) => {
//   await axios.put(
//     `http://https://service-management-system-xwcx.vercel.app/api/api/bookings/${id}/provider-status`,
//     {
//       status,
//       providerId: storedUser.id
//     }
//   );
//   fetchJobs();
// };

//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
//         My Assigned Jobs
//       </h1>

//       {jobs.length === 0 && (
//         <p className="text-slate-400 font-bold">No assigned jobs yet.</p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {jobs.map((job) => (
//           <div key={job._id} className="bg-white p-6 rounded-3xl border shadow-sm">

//             <h3 className="text-lg font-black uppercase">
//               {job.serviceId?.title}
//             </h3>

//             <p className="text-sm text-slate-500 mt-2">
//               Customer: {job.userId?.name}
//             </p>

//             <p className="text-sm text-slate-500">
//               Date: {job.date}
//             </p>

//             <p className="text-sm text-slate-500">
//               Time: {job.time}
//             </p>

//             <span className="inline-block mt-3 px-3 py-1 text-xs font-black rounded-full bg-blue-100 text-blue-600 uppercase">
//               {job.status}
//             </span>

//             <div className="flex gap-3 mt-6">
//               {job.status !== "In Progress" && (
//                 <button
//                   onClick={() => updateStatus(job._id, "In Progress")}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs font-black uppercase"
//                 >
//                   Start
//                 </button>
//               )}

//               {job.status !== "Completed" && (
//                 <button
//                   onClick={() => updateStatus(job._id, "Completed")}
//                   className="flex-1 bg-green-600 text-white py-2 rounded-xl text-xs font-black uppercase"
//                 >
//                   Complete
//                 </button>
//               )}
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyJobs;






import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Clock, CheckCircle, Users, 
  CalendarDays, Zap, ArrowRight, Hourglass
} from "lucide-react";

const MyJobs = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(
        `http://https://service-management-system-xwcx.vercel.app/api/api/bookings/provider/${userId}`
      );
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching provider jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchJobs();
    }
  }, [userId]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://https://service-management-system-xwcx.vercel.app/api/api/bookings/${id}/provider-status`,
        {
          status,
          providerId: userId
        }
      );
      // Fresh status update fetch karne ke liye
      fetchJobs();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Helper helper to dynamically handle badge styles based on exact database statuses
  const getStatusStyles = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Pending":
      case "Confirmed":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      case "Cancelled":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1700px] mx-auto px-1 sm:px-0">
      
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            My Assigned <span className="text-blue-600">Jobs</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
            Track, start, and complete your assigned customer bookings in real-time.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm self-start sm:self-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Total Capacity</span>
          <span className="text-sm font-extrabold text-slate-900">{jobs.length} Active Records</span>
        </div>
      </div>

      {/* Empty State Block */}
      {jobs.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-slate-50/60 rounded-3xl border border-dashed border-slate-200"
        >
          <Briefcase className="mx-auto text-slate-300 mb-4" size={40} />
          <p className="text-sm font-black text-slate-400 uppercase tracking-wider">No assigned jobs found yet.</p>
          <p className="text-xs text-slate-400 mt-1">When an administrator or client assigns a service, it will show up here.</p>
        </motion.div>
      )}

      {/* Animated Professional Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence>
          {jobs.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md hover:border-slate-200/80 transition-all flex flex-col group relative overflow-hidden"
            >
              {/* Card Top Branding Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight truncate max-w-[80%]">
                  {job.serviceId?.title || "On-Demand Service"}
                </h3>
                <div className="p-2.5 bg-blue-50 group-hover:bg-blue-100 text-blue-600 rounded-xl shrink-0 transition-colors">
                  <Zap size={16} />
                </div>
              </div>

              {/* Dynamic Content Details Block */}
              <div className="flex-1 space-y-3.5 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="text-slate-400 shrink-0" size={15} />
                  <div className="text-xs font-bold text-slate-700 truncate">
                    <span className="text-slate-400 font-medium">Customer: </span> 
                    {job.userId?.name || `ID: ${job.userId?.substring(0, 10)}...`}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays className="text-slate-400 shrink-0" size={15} />
                  <div className="text-xs font-bold text-slate-700">
                    <span className="text-slate-400 font-medium">Date: </span> {job.date}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="text-slate-400 shrink-0" size={15} />
                  <div className="text-xs font-bold text-slate-700">
                    <span className="text-slate-400 font-medium">Time Slot: </span> {job.time}
                  </div>
                </div>
              </div>

              {/* Status and Actions Row Layout */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                {/* Live Badge Dynamic Render */}
                <span className={`px-3 py-1.5 text-[9px] font-black rounded-xl border uppercase tracking-widest flex items-center justify-center gap-1.5 self-start sm:self-auto ${getStatusStyles(job.status)}`}>
                  {job.status === "In Progress" ? <Hourglass size={10} className="animate-spin" /> : <CheckCircle size={10} />}
                  {job.status}
                </span>
                
                {/* Micro-Interaction Controlled Buttons */}
                <div className="flex gap-2 w-full sm:w-auto">
                  {job.status !== "In Progress" && job.status !== "Completed" && (
                    <button
                      onClick={() => updateStatus(job._id, "In Progress")}
                      className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition active:scale-95 shadow-sm flex items-center justify-center gap-1"
                    >
                      Start <ArrowRight size={11} />
                    </button>
                  )}

                  {job.status !== "Completed" && (
                    <button
                      onClick={() => updateStatus(job._id, "Completed")}
                      className="flex-1 sm:flex-none bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition active:scale-95 shadow-sm"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default MyJobs;



