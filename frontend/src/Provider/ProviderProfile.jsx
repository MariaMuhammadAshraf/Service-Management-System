









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { User, Phone, Sparkles, Mail, Shield, RefreshCw } from 'lucide-react';

// const ProviderProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [formData, setFormData] = useState({ name: '', phone: '' });

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || storedUser?._id;

//   useEffect(() => {
//     const fetchProvider = async () => {
//       try {
//         if (!userId) return;
//         const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/auth/user/${userId}`);
//         setUserData(res.data);
//         setFormData({ 
//           name: res.data.name || '', 
//           phone: res.data.phone || ''
//         });
//       } catch (err) { 
//         console.error("Error fetching provider profile:", err); 
//       }
//     };
//     if (userId) fetchProvider();
//   }, [userId]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);
//     try {
//       const res = await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/auth/update-profile/${userId}`, {
//         name: formData.name,
//         phone: formData.phone
//       });
//       localStorage.setItem("user", JSON.stringify({ ...storedUser, name: res.data.name }));
//       alert("Provider profile updated successfully ✅");
//     } catch (err) { 
//       alert("Update failed ❌"); 
//     } finally { 
//       setIsSaving(false); 
//     }
//   };

//   if (!userData) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   const providerInitial = formData.name ? formData.name.trim().charAt(0).toUpperCase() : "P";

//   return (
//     <div className="w-full max-w-[1700px] mx-auto px-1 sm:px-0 space-y-10">
      
//       <div className="pb-6 border-b border-slate-200">
//         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-2">Vendor Verification</p>
//         <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
//           Provider <span className="text-blue-600">Identity</span>
//         </h1>
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative p-[1.5px] overflow-hidden rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] bg-white max-w-4xl"
//       >
//         <motion.div 
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//           className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#2563eb_180deg,transparent_240deg,transparent_360deg)] opacity-70 pointer-events-none"
//         />

//         <div className="relative w-full bg-gradient-to-br from-white via-white to-slate-50/40 backdrop-blur-3xl p-6 sm:p-10 rounded-[2.4rem] z-10 border border-white flex flex-col gap-8">
          
//           <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
//             <div className="w-20 h-20 rounded-2xl bg-slate-950 flex items-center justify-center text-white text-2xl font-black shadow-md">
//               <span>{providerInitial}</span>
//             </div>
//             <div>
//               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center justify-center sm:justify-start gap-2">
//                 {formData.name || "Service Provider"}
//                 <Shield size={14} className="text-emerald-500" fill="currentColor" />
//               </h3>
//               <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">{userData.email}</p>
//             </div>
//           </div>

//           <form onSubmit={handleUpdate} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Full Name / Business Title</label>
//                 <div className="relative group">
//                   <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
//                   <input name="name" value={formData.name} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-semibold text-sm text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" required />
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Contact Number</label>
//                 <div className="relative group">
//                   <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
//                   <input name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-semibold text-sm text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Registered Business Email</label>
//               <div className="relative">
//                 <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
//                 <input type="email" value={userData.email} readOnly className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-100 border border-slate-200/40 font-semibold text-sm text-slate-400 cursor-not-allowed select-none" />
//               </div>
//             </div>

//             <motion.button whileTap={{ scale: 0.99 }} type="submit" disabled={isSaving} className="w-full bg-slate-950 hover:bg-blue-600 disabled:bg-blue-400 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2">
//               {isSaving ? <><RefreshCw size={14} className="animate-spin" /> Committing Record...</> : <><span>Save Operational Changes</span><Sparkles size={13} /></>}
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ProviderProfile;

















 







import React, { useEffect, useState } from "react";
import { User, Mail, Phone, ShieldCheck, RefreshCw, Save } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const ProviderProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/auth/user/${userId}`);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || ""
        });
        setLoading(false);
      } catch (error) {
        console.error("Profile fetching failed:", error);
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/auth/update-profile/${userId}`, {
        name: formData.name,
        phone: formData.phone
      });
      const updatedLocal = { ...storedUser, name: res.data.name };
      localStorage.setItem("user", JSON.stringify(updatedLocal));
      alert("Profile updated successfully ✅");
    } catch (error) {
      alert("Update failed ❌");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>;

  return (
      <div className="space-y-10 max-w-[1700px] mx-auto px-1 sm:px-0">
      <div className="pb-6 border-b border-slate-200/80">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
          Account <span className="text-blue-600">Settings</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-2 max-w-md leading-relaxed">
          Manage your verified business identity, personal profiles, and public contact records.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDE: Badge with Animated Border */}
        <div className="lg:col-span-4 relative rounded-[2.5rem] p-[3px] bg-slate-200 shadow-[0_25px_50px_-12px_rgba(37,99,235,0.25)] overflow-hidden">
         <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className="absolute inset-0 bg-[conic-gradient(from_0deg,#22c55e_0deg,#3b82f6_120deg,#6b7280_240deg,#22c55e_360deg)]"
              />
              
          <div className="relative bg-white rounded-[2.4rem] p-8 h-full flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 mb-5 relative">
              <User size={42} />
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-md border-2 border-white"><ShieldCheck size={12} /></div>
            </div>
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-lg">{formData.name || "Provider"}</h3>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">{formData.email}</p>
          </div>
        </div>




        {/* RIGHT SIDE: Form with Animated Border */}
        <div className="lg:col-span-8 relative rounded-[2.5rem] p-[3px] bg-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
        <motion.div 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
               className="absolute inset-0 bg-[conic-gradient(from_0deg,#22c55e_0deg,#3b82f6_120deg,#6b7280_240deg,#22c55e_360deg)]"
             />
             
          <div className="relative bg-white rounded-[2.4rem] p-10">
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" /></div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" /><input type="email" value={formData.email} readOnly className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-sm text-slate-400" /></div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</label>
                <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" /></div>
              </div>
              <button type="submit" disabled={isUpdating} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                {isUpdating ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;