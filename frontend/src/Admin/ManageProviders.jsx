// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   CheckCircle, XCircle, Trash2, Mail, Phone, 
//   ShieldCheck, Clock, Ban, Briefcase 
// } from "lucide-react";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api/auth";

// const ManageProviders = () => {
//   const [providers, setProviders] = useState([]);

//   const fetchProviders = async () => {
//     try {
//       const res = await axios.get(`${API}/providers`);
//       setProviders(res.data);
//     } catch (error) {
//       console.error("Error fetching providers", error);
//     }
//   };

//   useEffect(() => {
//     fetchProviders();
//   }, []);

//   const handleApprove = async (id) => {
//     await axios.put(`${API}/providers/${id}/approve`);
//     fetchProviders();
//   };

//   const handleReject = async (id) => {
//     await axios.put(`${API}/providers/${id}/reject`);
//     fetchProviders();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this provider?")) return;
//     await axios.delete(`${API}/providers/${id}`);
//     fetchProviders();
//   };

//   // Helper for Status Styles
//   const getStatusStyles = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
//       case 'pending': return 'bg-orange-50 text-orange-600 border-orange-100';
//       case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
//       default: return 'bg-slate-50 text-slate-600 border-slate-100';
//     }
//   };

//   // Helper for Status Icon
//   const getStatusIcon = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'approved': return <ShieldCheck size={12} />;
//       case 'pending': return <Clock size={12} />;
//       case 'rejected': return <Ban size={12} />;
//       default: return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f7fe] font-sans p-4 md:p-8 overflow-x-hidden">
//       <div className="max-w-[1600px] mx-auto space-y-8">
        
//         {/* ✅ HEADER SECTION */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10"
//         >
//           <div>
//             <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Service Network</p>
//             <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Providers</h2>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-[1.5rem] shadow-xl shadow-blue-900/5 border border-white flex items-center gap-3">
//             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
//             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
//               Total Providers: {providers.length}
//             </span>
//           </div>
//         </motion.div>

//         {/* ✅ PROVIDERS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//           <AnimatePresence>
//             {providers.map((p, index) => (
//               <motion.div
//                 key={p._id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.2, delay: index * 0.05 }}
//                 className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white flex flex-col justify-between group hover:shadow-2xl hover:shadow-blue-900/10 transition-all relative overflow-hidden"
//               >
//                 {/* Info Section */}
//                 <div>
//                   <div className="flex justify-between items-start mb-6">
//                     {/* Avatar Icon */}
//                     <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl shadow-sm border border-blue-100">
//                       {p.name.charAt(0).toUpperCase()}
//                     </div>
                    
//                     {/* Dynamic Status Badge */}
//                     <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 shadow-sm ${getStatusStyles(p.status)}`}>
//                       {getStatusIcon(p.status)}
//                       {p.status}
//                     </div>
//                   </div>

//                   <h4 className="text-xl font-black text-slate-800 tracking-tight line-clamp-1 mb-4">{p.name}</h4>
                  
//                   <div className="space-y-3 mb-8">
//                     <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
//                       <Mail size={16} className="text-blue-500" /> 
//                       <span className="text-xs font-bold truncate">{p.email}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
//                       <Phone size={16} className="text-emerald-500" /> 
//                       <span className="text-xs font-bold">{p.phone || "No phone provided"}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Actions Section */}
//                 <div className="flex gap-2 h-[46px]">
//                   {p.status === "pending" ? (
//                     <>
//                       {/* Approve Button */}
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleApprove(p._id)}
//                         className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors"
//                       >
//                         <CheckCircle size={14} /> Approve
//                       </motion.button>

//                       {/* Reject Button */}
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleReject(p._id)}
//                         className="flex-1 flex items-center justify-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors"
//                       >
//                         <XCircle size={14} /> Reject
//                       </motion.button>
                      
//                       {/* Icon Delete Button (When Pending) */}
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleDelete(p._id)}
//                         title="Delete Provider"
//                         className="w-[46px] flex items-center justify-center bg-red-50 text-red-500 border border-red-100 rounded-2xl hover:bg-red-500 hover:text-white transition-colors"
//                       >
//                         <Trash2 size={14} />
//                       </motion.button>
//                     </>
//                   ) : (
//                     /* Full Width Delete Button (When Not Pending) */
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => handleDelete(p._id)}
//                       className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
//                     >
//                       <Trash2 size={14} /> Delete Provider Account
//                     </motion.button>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {/* Empty State */}
//           {providers.length === 0 && (
//             <motion.div 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               className="col-span-full bg-white/50 backdrop-blur-sm rounded-[3rem] p-16 flex flex-col items-center justify-center text-center border border-white/50 shadow-inner mt-4"
//             >
//               <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300 mb-6 shadow-inner">
//                 <Briefcase size={32} />
//               </div>
//               <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Providers Found</h3>
//               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
//                 There are no service providers registered in the system yet.
//               </p>
//             </motion.div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ManageProviders;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, XCircle, Trash2, Mail, Phone, 
  ShieldCheck, Clock, Ban, Briefcase 
} from "lucide-react";

const API = "http://https://service-management-system-xwcx.vercel.app/api/api/auth";

const ManageProviders = () => {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    try {
      const res = await axios.get(`${API}/providers`);
      setProviders(res.data);
    } catch (error) {
      console.error("Error fetching providers", error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleApprove = async (id) => {
    await axios.put(`${API}/providers/${id}/approve`);
    fetchProviders();
  };

  const handleReject = async (id) => {
    await axios.put(`${API}/providers/${id}/reject`);
    fetchProviders();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this provider?")) return;
    await axios.delete(`${API}/providers/${id}`);
    fetchProviders();
  };

  const getStatusStyles = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return <ShieldCheck size={12} />;
      case 'pending': return <Clock size={12} />;
      case 'rejected': return <Ban size={12} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] font-sans p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10"
        >
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Service Network</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Providers</h2>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-[1.5rem] shadow-xl shadow-blue-900/5 border border-white flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              Total Providers: {providers.length}
            </span>
          </div>
        </motion.div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {providers.map((p, index) => (
              <motion.div
                key={p._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white flex flex-col justify-between group hover:shadow-2xl hover:shadow-blue-900/10 transition-all relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl shadow-sm border border-blue-100 shrink-0">
                        {p.name?.charAt(0).toUpperCase()}
                      </div>

                      {/* ✅ ABSOLUTE BOOLEAN live Status Check (Strictly Database Sync) */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-black tracking-widest uppercase text-slate-400">Live Status</span>
                        {p.isAvailable === true ? (
                          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider shadow-sm">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Online
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-400 border border-slate-200/50 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider shadow-sm">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            Offline
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 shadow-sm shrink-0 ${getStatusStyles(p.status)}`}>
                      {getStatusIcon(p.status)}
                      {p.status}
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-slate-800 tracking-tight line-clamp-1 mb-4">{p.name}</h4>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <Mail size={16} className="text-blue-500 shrink-0" /> 
                      <span className="text-xs font-bold truncate">{p.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <Phone size={16} className="text-emerald-500 shrink-0" /> 
                      <span className="text-xs font-bold">{p.phone || "No phone provided"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 h-[46px]">
                  {p.status === "pending" ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleApprove(p._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors"
                      >
                        <CheckCircle size={14} /> Approve
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleReject(p._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        <XCircle size={14} /> Reject
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(p._id)}
                        title="Delete Provider"
                        className="w-[46px] flex items-center justify-center bg-red-50 text-red-500 border border-red-100 rounded-2xl hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDelete(p._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={14} /> Delete Provider Account
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {providers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full bg-white/50 backdrop-blur-sm rounded-[3rem] p-16 flex flex-col items-center justify-center text-center border border-white/50 shadow-inner mt-4"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300 mb-6 shadow-inner">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Providers Found</h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                There are no service providers registered in the system yet.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageProviders;