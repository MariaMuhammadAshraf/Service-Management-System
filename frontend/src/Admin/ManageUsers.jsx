



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Mail, Shield, Phone } from "lucide-react";
// import toast from "react-hot-toast";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/auth";
// const USERS_PER_PAGE = 6;

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${API}/users`);
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Search filter
//   const filteredUsers = users.filter(u =>
//     u.name.toLowerCase().includes(search.toLowerCase()) ||
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   // ✅ Pagination
//   const indexOfLast = currentPage * USERS_PER_PAGE;
//   const indexOfFirst = indexOfLast - USERS_PER_PAGE;
//   const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

//   const handleDeactivate = async (id) => {
//     await axios.put(`${API}/users/${id}/deactivate`);
//     toast.success("User deactivated");
//     fetchUsers();
//   };

//   const handleBlock = async (id) => {
//     await axios.put(`${API}/users/${id}/block`);
//     toast.success("User block status updated");
//     fetchUsers();
//   };

//   return (
//     <div className="space-y-10">

//       <h2 className="text-3xl font-black uppercase">
//         Manage Users
//       </h2>

//       {/* ✅ Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-3xl shadow border">
//           <h3 className="text-lg font-black">Total Users</h3>
//           <p className="text-3xl font-black text-blue-600">
//             {users.length}
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-3xl shadow border">
//           <h3 className="text-lg font-black">Active Users</h3>
//           <p className="text-3xl font-black text-green-600">
//             {users.filter(u => u.status !== "inactive").length}
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-3xl shadow border">
//           <h3 className="text-lg font-black">Blocked Users</h3>
//           <p className="text-3xl font-black text-red-600">
//             {users.filter(u => u.isBlocked).length}
//           </p>
//         </div>
//       </div>

//       {/* ✅ Search */}
//       <input
//         placeholder="Search users..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full md:w-96 p-3 rounded-xl border"
//       />

//       {/* ✅ Users Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {currentUsers.map((u) => (
//           <div key={u._id} className="bg-white p-6 rounded-3xl border shadow">

//             <div className="flex justify-between items-center mb-3">
//               <Shield size={20} />
//               <span className="text-xs font-bold uppercase">
//                 {u.status}
//               </span>
//             </div>

//             <h4 className="font-black">{u.name}</h4>
//             <div className="text-sm text-slate-500 flex items-center gap-2 mt-2">
//               <Mail size={14} /> {u.email}
//             </div>

//             <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
//               <Phone size={14} /> {u.phone || "No phone"}
//             </div>

//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={() => handleDeactivate(u._id)}
//                 className="bg-yellow-500 text-white px-3 py-2 rounded-xl text-xs"
//               >
//                 Deactivate
//               </button>

//               <button
//                 onClick={() => handleBlock(u._id)}
//                 className="bg-red-500 text-white px-3 py-2 rounded-xl text-xs"
//               >
//                 {u.isBlocked ? "Unblock" : "Block"}
//               </button>
//             </div>

//           </div>
//         ))}
//       </div>

//       {/* ✅ Pagination */}
//       <div className="flex gap-3 justify-center">
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-2 rounded-xl ${
//               currentPage === i + 1
//                 ? "bg-blue-600 text-white"
//                 : "bg-slate-100"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ManageUsers;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Shield, Phone, Search, 
  Users, UserCheck, UserX, Ban 
} from "lucide-react";
import toast from "react-hot-toast";

const API = "http://https://service-management-system-xwcx.vercel.app/api/auth";
const USERS_PER_PAGE = 6;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Search filter
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Pagination
  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  // ✅ Toggle Active/Deactivate Logic
  const handleToggleStatus = async (id, currentStatus) => {
    const isInactive = currentStatus === "inactive" || currentStatus === "deactivated";
    try {
      if (isInactive) {
        await axios.put(`${API}/users/${id}/activate`);
        toast.success("User Activated Successfully ✅");
      } else {
        await axios.put(`${API}/users/${id}/deactivate`);
        toast.success("User Deactivated 🚫");
      }
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Action failed!");
    }
  };

  const handleBlock = async (id) => {
    await axios.put(`${API}/users/${id}/block`);
    toast.success("User block status updated");
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] font-sans p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* ✅ HEADER & SEARCH SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10"
        >
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Admin Directory</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Users</h2>
          </div>
          
          <div className="relative w-full lg:w-96 group z-10">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
              className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-md border border-white rounded-[2rem] shadow-xl shadow-blue-900/5 outline-none focus:ring-4 focus:ring-blue-600/10 font-bold text-sm text-slate-700 transition-all"
            />
          </div>
        </motion.div>

        {/* ✅ STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white flex items-center gap-6 group hover:scale-[1.02] transition-transform">
            <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 text-blue-500 flex items-center justify-center shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
              <Users size={28} />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Users</h3>
              <p className="text-4xl font-black text-slate-800 tracking-tight">{users.length}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white flex items-center gap-6 group hover:scale-[1.02] transition-transform">
            <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
              <UserCheck size={28} />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Users</h3>
              <p className="text-4xl font-black text-slate-800 tracking-tight">
                {users.filter(u => u.status !== "inactive" && u.status !== "deactivated" && !u.isBlocked).length}
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white flex items-center gap-6 group hover:scale-[1.02] transition-transform">
            <div className="w-16 h-16 rounded-[1.5rem] bg-red-50 text-red-500 flex items-center justify-center shadow-inner group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
              <UserX size={28} />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Blocked Users</h3>
              <p className="text-4xl font-black text-slate-800 tracking-tight">{users.filter(u => u.isBlocked).length}</p>
            </div>
          </motion.div>
        </div>

        {/* ✅ USERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-4">
          <AnimatePresence>
            {currentUsers.map((u, index) => {
              const isInactive = u.status === 'inactive' || u.status === 'deactivated';

              return (
                <motion.div 
                  key={u._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white flex flex-col justify-between group hover:shadow-2xl hover:shadow-blue-900/10 transition-all relative overflow-hidden"
                >
                  {/* Glowing Background Effect */}
                  {u.isBlocked && <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10" />}
                  
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl shadow-sm border border-blue-100">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center gap-1 shadow-sm ${
                        u.isBlocked 
                          ? 'bg-red-50 text-red-600 border-red-100'
                          : isInactive
                            ? 'bg-orange-50 text-orange-600 border-orange-100'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {u.isBlocked ? <Ban size={12} /> : <Shield size={12} />}
                        {u.isBlocked ? 'Blocked' : (isInactive ? 'Deactivated' : 'Active')}
                      </div>
                    </div>

                    <h4 className="text-xl font-black text-slate-800 tracking-tight line-clamp-1 mb-4">{u.name}</h4>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <Mail size={16} className="text-blue-500" /> 
                        <span className="text-xs font-bold truncate">{u.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <Phone size={16} className="text-emerald-500" /> 
                        <span className="text-xs font-bold">{u.phone || "No phone provided"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* Toggle Activate/Deactivate Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleToggleStatus(u._id, u.status)}
                      className={`flex-1 border py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors ${
                        isInactive
                          ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-500 hover:text-white' // Activate Style
                          : 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-500 hover:text-white' // Deactivate Style
                      }`}
                    >
                      {isInactive ? "Activate" : "Deactivate"}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBlock(u._id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-colors ${
                        u.isBlocked 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white'
                          : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      {u.isBlocked ? 'Unblock' : 'Block User'}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {currentUsers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full bg-white/50 backdrop-blur-sm rounded-[3rem] p-16 flex flex-col items-center justify-center text-center border border-white/50 shadow-inner mt-4"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300 mb-6 shadow-inner">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Users Found</h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Try adjusting your search criteria.
              </p>
            </motion.div>
          )}
        </div>

        {/* ✅ PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-8">
            <div className="bg-white/80 backdrop-blur-md p-2 rounded-[2rem] shadow-lg shadow-blue-900/5 border border-white flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-[1.5rem] text-xs font-black transition-all duration-300 flex items-center justify-center ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                      : "bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageUsers;