 


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

// const ManageBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [providers, setProviders] = useState([]);
//   const [view, setView] = useState("active");

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${API}/bookings`);
//       setBookings(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchProviders = async () => {
//     try {
//       const res = await axios.get(`${API}/auth/providers`);
//       setProviders(res.data.filter(p => p.status === "approved"));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchProviders();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`${API}/bookings/${id}/status`, { status });
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const assignProvider = async (id, providerId) => {
//     try {
//       await axios.put(`${API}/bookings/${id}/assign`, { providerId });
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const cancelBooking = async (id) => {
//     if (!window.confirm("Cancel this booking?")) return;
//     try {
//       await axios.put(`${API}/bookings/${id}/cancel`);
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const archiveBooking = async (id) => {
//     if (!window.confirm("Archive this booking?")) return;
//     try {
//       await axios.put(`${API}/bookings/${id}/archive`);
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const restoreBooking = async (id) => {
//     if (!window.confirm("Restore this booking to active?")) return;
//     try {
//       await axios.put(`${API}/bookings/${id}/restore`);
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteBooking = async (id) => {
//     if (!window.confirm("Permanently delete this booking?")) return;
//     try {
//       await axios.delete(`${API}/bookings/${id}`);
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredBookings =
//     view === "active"
//       ? bookings.filter(b => b.status !== "Archived")
//       : bookings.filter(b => b.status === "Archived");

//   return (
//     <div className="space-y-8">

//       <h2 className="text-3xl font-black uppercase">
//         Booking Management
//       </h2>

//       {/* ✅ View Toggle */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setView("active")}
//           className={`px-4 py-2 rounded-xl font-bold ${
//             view === "active"
//               ? "bg-blue-600 text-white"
//               : "bg-slate-100"
//           }`}
//         >
//           Active Bookings
//         </button>

//         <button
//           onClick={() => setView("history")}
//           className={`px-4 py-2 rounded-xl font-bold ${
//             view === "history"
//               ? "bg-blue-600 text-white"
//               : "bg-slate-100"
//           }`}
//         >
//           Archived Bookings
//         </button>
//       </div>

//       {filteredBookings.map((b) => (
//         <div
//           key={b._id}
//           className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row justify-between gap-4"
//         >
//           <div>
//             <p className="text-xs font-black text-blue-600 uppercase">
//               {b.serviceId?.title}
//             </p>

//             <p className="text-sm font-bold">
//               Client: {b.userId?.name}
//             </p>

//             <p className="text-sm text-slate-500">
//               Provider: {b.providerId?.name || "Not Assigned"}
//             </p>

//             <p className="text-sm text-slate-500">
//               Date: {b.date} | Time: {b.time}
//             </p>

//             <p className="text-xs mt-2 uppercase font-bold">
//               Status: {b.status}
//             </p>
//           </div>

//           {view === "active" ? (
//             <div className="flex flex-wrap gap-3 items-center">

//               <select
//                 value={b.status}
//                 onChange={(e) => updateStatus(b._id, e.target.value)}
//                 className="bg-slate-50 border rounded-xl px-3 py-2 text-xs font-bold"
//               >
//                 <option>Pending</option>
//                 <option>Confirmed</option>
//                 <option>In Progress</option>
//                 <option>Completed</option>
//                 <option>Cancelled</option>
//               </select>

//               <select
//                 onChange={(e) => assignProvider(b._id, e.target.value)}
//                 className="bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold"
//               >
//                 <option value="">Assign Provider</option>
//                 {providers.map((p) => (
//                   <option key={p._id} value={p._id}>
//                     {p.name}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() => cancelBooking(b._id)}
//                 className="bg-yellow-500 text-white px-3 py-2 rounded-xl text-xs font-bold"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => archiveBooking(b._id)}
//                 className="bg-slate-700 text-white px-3 py-2 rounded-xl text-xs font-bold"
//               >
//                 Archive
//               </button>

//             </div>
//           ) : (
//             // ✅ Archived View Controls
//             <div className="flex gap-3 items-center">
//               <button
//                 onClick={() => restoreBooking(b._id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
//               >
//                 Restore
//               </button>

//               <button
//                 onClick={() => deleteBooking(b._id)}
//                 className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
//               >
//                 Delete
//               </button>
//             </div>
//           )}

//         </div>
//       ))}

//       {filteredBookings.length === 0 && (
//         <p className="text-slate-400 font-bold">
//           No bookings found.
//         </p>
//       )}

//     </div>
//   );
// };

// export default ManageBookings;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, User, UserCheck, 
  Archive, RefreshCw, Trash2, Ban, 
  Briefcase, ChevronDown 
} from "lucide-react";

const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]);
  const [view, setView] = useState("active");

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProviders = async () => {
    try {
      const res = await axios.get(`${API}/auth/providers`);
      setProviders(res.data.filter(p => p.status === "approved"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchProviders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const assignProvider = async (id, providerId) => {
    try {
      await axios.put(`${API}/bookings/${id}/assign`, { providerId });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.put(`${API}/bookings/${id}/cancel`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const archiveBooking = async (id) => {
    if (!window.confirm("Archive this booking?")) return;
    try {
      await axios.put(`${API}/bookings/${id}/archive`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const restoreBooking = async (id) => {
    if (!window.confirm("Restore this booking to active?")) return;
    try {
      await axios.put(`${API}/bookings/${id}/restore`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Permanently delete this booking?")) return;
    try {
      await axios.delete(`${API}/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings =
    view === "active"
      ? bookings.filter(b => b.status !== "Archived")
      : bookings.filter(b => b.status === "Archived");

  // Helper for Status Colors (Purple removed, Sky Blue added)
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'confirmed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'in progress': return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] font-sans p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* HEADER & TABS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10"
        >
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Admin Workspace</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Booking Management</h2>
          </div>
          
          {/* Custom Animated Tabs */}
          <div className="flex bg-white/80 backdrop-blur-md p-2 rounded-[1.5rem] shadow-lg shadow-blue-900/5 border border-white">
            <button
              onClick={() => setView("active")}
              className={`relative px-8 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                view === "active" ? "text-white shadow-md" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {view === "active" && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-blue-600 rounded-[1rem] -z-10" />
              )}
              Active Bookings
            </button>
            <button
              onClick={() => setView("history")}
              className={`relative px-8 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                view === "history" ? "text-white shadow-md" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {view === "history" && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-800 rounded-[1rem] -z-10" />
              )}
              Archived
            </button>
          </div>
        </motion.div>

        {/* BOOKINGS LIST */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredBookings.map((b, index) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-md p-6 lg:p-8 rounded-[2.5rem] border border-white shadow-xl shadow-blue-900/5 flex flex-col xl:flex-row justify-between gap-6 hover:shadow-2xl hover:shadow-blue-900/10 transition-all group"
              >
                {/* Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:w-2/3">
                  
                  {/* Service Details */}
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border mb-3 ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight line-clamp-1 mb-1">
                      {b.serviceId?.title || "Unknown Service"}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      ID: <span className="text-slate-600">{b._id.slice(-8)}</span>
                    </p>
                  </div>

                  {/* People Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Client</p>
                        <p className="text-sm font-bold text-slate-700">{b.userId?.name || "Unknown User"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <UserCheck size={14} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Provider</p>
                        <p className="text-sm font-bold text-slate-700">{b.providerId?.name || "Not Assigned"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time (Purple replaced with Sky Blue) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                        <p className="text-sm font-bold text-slate-700">{b.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                        <Clock size={14} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                        <p className="text-sm font-bold text-slate-700">{b.time}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Actions Section */}
                <div className="xl:w-1/3 flex flex-wrap xl:justify-end items-end gap-3 border-t xl:border-t-0 xl:border-l border-slate-100 pt-6 xl:pt-0 xl:pl-6">
                  
                  {view === "active" ? (
                    <>
                      {/* Status Dropdown with Heading */}
                      <div className="w-full sm:w-auto flex-grow xl:flex-grow-0">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Current Status</label>
                        <div className="relative">
                          <select
                            value={b.status}
                            onChange={(e) => updateStatus(b._id, e.target.value)}
                            className="w-full appearance-none bg-slate-50 border border-slate-100 text-slate-700 px-4 pr-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-600/10 cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Provider Dropdown with Heading */}
                      <div className="w-full sm:w-auto flex-grow xl:flex-grow-0">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Assign Provider</label>
                        <div className="relative">
                          <select
                            onChange={(e) => assignProvider(b._id, e.target.value)}
                            value={b.providerId?._id || ""}
                            className="w-full appearance-none bg-blue-50 border border-blue-100 text-blue-700 px-4 pr-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-600/20 cursor-pointer"
                          >
                            <option value="">Assign Provider</option>
                            {providers.map((p) => (
                              <option key={p._id} value={p._id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-end h-[42px]">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => cancelBooking(b._id)}
                          title="Cancel Booking"
                          className="p-3 w-12 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Ban size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => archiveBooking(b._id)}
                          title="Archive Booking"
                          className="p-3 w-12 flex items-center justify-center bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Archive size={16} />
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    /* Archived View Controls */
                    <div className="flex gap-3 w-full justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => restoreBooking(b._id)}
                        className="flex items-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-colors"
                      >
                        <RefreshCw size={14} /> Restore
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteBooking(b._id)}
                        className="flex items-center gap-2 bg-red-50 text-red-500 hover:bg-red-600 hover:text-white px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-colors"
                      >
                        <Trash2 size={14} /> Delete
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredBookings.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="w-full bg-white/50 backdrop-blur-sm rounded-[3rem] p-16 flex flex-col items-center justify-center text-center border border-white/50 shadow-inner"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300 mb-6 shadow-inner">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Bookings Found</h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                There are no {view} bookings to display at the moment.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageBookings;