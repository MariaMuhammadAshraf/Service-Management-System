// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ManageReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [filter, setFilter] = useState("all");

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/reviews");
//       setReviews(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/reviews/${id}/approve`);
//       fetchReviews();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/reviews/${id}/reject`);
//       fetchReviews();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/reviews/${id}`);
//       fetchReviews();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredReviews =
//     filter === "all"
//       ? reviews
//       : reviews.filter((r) => r.status === filter);

//   return (
//     <div className="space-y-10">

//       <h2 className="text-3xl font-black uppercase tracking-tight">
//         Manage User Reviews
//       </h2>

//       {/* ✅ Filter Tabs */}
//       <div className="flex gap-4">
//         {["all", "pending", "approved", "rejected"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab)}
//             className={`px-4 py-2 rounded-xl font-bold uppercase text-sm ${
//               filter === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-slate-100 text-slate-600"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {filteredReviews.length === 0 && (
//         <p className="text-slate-400 font-bold">
//           No {filter} reviews found.
//         </p>
//       )}

//       {filteredReviews.map((r) => (
//         <div
//           key={r._id}
//           className={`bg-white p-6 rounded-3xl border shadow-sm ${
//             r.reported ? "border-red-300 bg-red-50" : ""
//           }`}
//         >
//           <div className="flex justify-between items-start gap-6">

//             {/* ✅ Review Info */}
//             <div className="flex-1 space-y-2">
//               <h4 className="font-black uppercase">
//                 {r.serviceId?.title}
//               </h4>

//               <p className="text-sm text-slate-500">
//                 User: {r.userId?.name} ({r.userId?.email})
//               </p>

//               <p className="italic mt-2">
//                 "{r.comment}"
//               </p>

//               {/* ✅ Provider Reply */}
//               {r.reply && (
//                 <div className="mt-3 p-3 bg-slate-100 rounded-xl text-sm">
//                   <strong>Provider Reply:</strong> {r.reply}
//                 </div>
//               )}

//               {/* ✅ Status Badge */}
//               <span
//                 className={`inline-block mt-3 px-3 py-1 text-xs font-bold uppercase rounded-xl ${
//                   r.status === "approved"
//                     ? "bg-green-100 text-green-600"
//                     : r.status === "rejected"
//                     ? "bg-red-100 text-red-600"
//                     : "bg-yellow-100 text-yellow-600"
//                 }`}
//               >
//                 {r.status}
//               </span>

//               {r.reported && (
//                 <div className="text-red-600 text-xs font-bold uppercase mt-2">
//                   ⚠ Reported by Provider
//                 </div>
//               )}
//             </div>

//             {/* ✅ Action Buttons */}
//             <div className="flex flex-col gap-3">
//               {r.status !== "approved" && (
//                 <button
//                   onClick={() => handleApprove(r._id)}
//                   className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition text-sm font-bold"
//                 >
//                   Approve
//                 </button>
//               )}

//               {r.status !== "rejected" && (
//                 <button
//                   onClick={() => handleReject(r._id)}
//                   className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition text-sm font-bold"
//                 >
//                   Reject
//                 </button>
//               )}

//               <button
//                 onClick={() => handleDelete(r._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition text-sm font-bold"
//               >
//                 Delete
//               </button>
//             </div>

//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageReviews;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, XCircle, Trash2, MessageSquare, 
  User, AlertTriangle, CornerDownRight, Quote 
} from "lucide-react";

const API = "http://localhost:5000/api";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${API}/reviews/${id}/approve`);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${API}/reviews/${id}/reject`);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this review?")) return;
    try {
      await axios.delete(`${API}/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReviews = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  // Helper for Status Styles
  const getStatusStyles = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-orange-50 text-orange-600 border-orange-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] font-sans p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* ✅ HEADER & TABS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10"
        >
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">User Feedback</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Reviews</h2>
          </div>
          
          {/* Custom Animated Tabs */}
          <div className="flex bg-white/80 backdrop-blur-md p-2 rounded-[1.5rem] shadow-lg shadow-blue-900/5 border border-white overflow-x-auto max-w-full custom-scrollbar">
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative px-6 sm:px-8 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  filter === tab ? "text-white shadow-md" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {filter === tab && (
                  <motion.div layoutId="activeReviewTab" className="absolute inset-0 bg-blue-600 rounded-[1rem] -z-10" />
                )}
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ✅ REVIEWS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredReviews.map((r, index) => (
              <motion.div
                key={r._id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[3rem] shadow-xl border relative overflow-hidden group hover:shadow-2xl transition-all flex flex-col justify-between ${
                  r.reported ? 'border-red-200 shadow-red-900/5 hover:shadow-red-900/10' : 'border-white shadow-blue-900/5 hover:shadow-blue-900/10'
                }`}
              >
                {/* Glowing Background Effect for Reported Reviews */}
                {r.reported && <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />}

                <div>
                  <div className="flex justify-between items-start mb-6 gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center font-black text-lg shadow-sm border ${r.reported ? 'bg-red-50 text-red-500 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {r.userId?.name?.charAt(0).toUpperCase() || <User size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800 tracking-tight line-clamp-1">{r.userId?.name || "Unknown User"}</h4>
                        <p className="text-[10px] font-bold text-slate-400">{r.userId?.email || "No email"}</p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center gap-1 shadow-sm ${getStatusStyles(r.status)}`}>
                      {r.status}
                    </div>
                  </div>

                  {/* Reported Warning Banner */}
                  {r.reported && (
                    <div className="mb-4 bg-red-50 border border-red-100 p-3 rounded-2xl flex items-center gap-2 text-red-600">
                      <AlertTriangle size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Reported by Provider</span>
                    </div>
                  )}

                  {/* Service Title */}
                  <h5 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <MessageSquare size={12} /> {r.serviceId?.title || "Unknown Service"}
                  </h5>

                  {/* Review Comment */}
                  <div className="relative bg-slate-50 border border-slate-100 p-5 rounded-3xl mb-6">
                    <Quote className="absolute text-slate-200 w-8 h-8 -top-2 -left-2 transform rotate-180 bg-white rounded-full" />
                    <p className="text-sm text-slate-600 font-medium italic leading-relaxed z-10 relative pl-2">
                      "{r.comment}"
                    </p>
                  </div>

                  {/* Provider Reply */}
                  {r.reply && (
                    <div className="mb-6 flex gap-3">
                      <CornerDownRight className="text-emerald-400 mt-2 shrink-0" size={20} />
                      <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-3xl flex-1">
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Provider Reply</p>
                        <p className="text-sm text-slate-700 font-medium">{r.reply}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Row */}
                <div className="flex gap-2 mt-auto pt-2 h-[46px]">
                  {r.status !== "approved" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApprove(r._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors"
                    >
                      <CheckCircle size={14} /> Approve
                    </motion.button>
                  )}

                  {r.status !== "rejected" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleReject(r._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <XCircle size={14} /> Reject
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(r._id)}
                    title="Delete Review"
                    className={`flex items-center justify-center gap-1.5 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors ${
                      r.status === 'approved' || r.status === 'rejected' 
                        ? 'flex-1 bg-red-50 text-red-500 border-red-100 hover:bg-red-500 hover:text-white' 
                        : 'w-[46px] bg-red-50 text-red-500 border-red-100 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Trash2 size={14} /> {(r.status === 'approved' || r.status === 'rejected') && "Delete"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full bg-white/50 backdrop-blur-sm rounded-[3rem] p-16 flex flex-col items-center justify-center text-center border border-white/50 shadow-inner"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300 mb-6 shadow-inner">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Reviews Found</h3>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              There are no {filter !== "all" ? filter : ""} reviews to display at the moment.
            </p>
          </motion.div>
        )}

      </div>

      {/* Global Style for Custom Scrollbar for Tabs on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
};

export default ManageReviews;