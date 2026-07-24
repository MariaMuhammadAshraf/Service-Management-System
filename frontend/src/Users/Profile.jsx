// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const Profile = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     phone: '',
// //     address: ''
// //   });

// //   const storedUser = JSON.parse(localStorage.getItem("user"));

// //   // ✅ Fetch current user data
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://https://service-management-system-xwcx.vercel.app/api/api/auth/user/${storedUser.id}`
// //         );
// //         setUserData(res.data);
// //         setFormData({
// //           name: res.data.name || '',
// //           phone: res.data.phone || '',
// //           address: res.data.address || ''
// //         });
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

// //     if (storedUser?.id) {
// //       fetchUser();
// //     }
// //   }, []);

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.put(
// //         `http://https://service-management-system-xwcx.vercel.app/api/api/auth/update-profile/${storedUser.id}`,
// //         formData
// //       );

// //       // ✅ Update localStorage name
// //       const updatedLocal = {
// //         ...storedUser,
// //         name: res.data.name
// //       };
// //       localStorage.setItem("user", JSON.stringify(updatedLocal));

// //       alert("Profile updated successfully ✅");
// //     } catch (err) {
// //       alert("Update failed ❌");
// //     }
// //   };

// //   if (!userData) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <p className="text-slate-400 font-bold">Loading profile...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-2xl animate-in fade-in duration-700">
// //       <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        
// //         {/* Cover */}
// //         <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-800"></div>

// //         <div className="px-10 pb-10">
          
// //           {/* Avatar & Name */}
// //           <div className="relative -top-16 flex items-end gap-6">
// //             <img
// //               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`}
// //               className="w-32 h-32 rounded-[2.5rem] border-8 border-white bg-slate-100 shadow-lg"
// //               alt="avatar"
// //             />
// //             <div className="pb-4">
// //               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
// //                 {formData.name}
// //               </h3>
// //               <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
// //                 {userData.email}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Form */}
// //           <form onSubmit={handleUpdate} className="space-y-5 -mt-6">

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

// //               <div className="space-y-1">
// //                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
// //                   Full Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
// //                 />
// //               </div>

// //               <div className="space-y-1">
// //                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
// //                   Contact Number
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
// //                 />
// //               </div>

// //               <div className="md:col-span-2 space-y-1">
// //                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
// //                   Home Address
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="address"
// //                   value={formData.address}
// //                   onChange={handleChange}
// //                   className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
// //                 />
// //               </div>

// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-slate-900 transition-all mt-4"
// //             >
// //               Save Changes
// //             </button>

// //           </form>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;









// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const Profile = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

// //   const storedUser = JSON.parse(localStorage.getItem("user"));

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/user/${storedUser.id}`);
// //         setUserData(res.data);
// //         setFormData({ name: res.data.name || '', phone: res.data.phone || '', address: res.data.address || '' });
// //       } catch (err) { console.error(err); }
// //     };
// //     if (storedUser?.id) fetchUser();
// //   }, []);

// //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/update-profile/${storedUser.id}`, formData);
// //       alert("Profile updated successfully ✅");
// //     } catch (err) { alert("Update failed ❌"); }
// //   };

// //   if (!userData) return <div className="p-10 text-slate-400">Loading...</div>;

// //   return (
// //     <div className="w-full flex justify-center">
// //       {/* Container jo aapki theme ke mutabiq dark hai */}
// //       <div className="w-full max-w-2xl bg-[#0a0f1d] rounded-3xl border border-slate-800 p-8 shadow-2xl">
        
// //         {/* User Info Section */}
// //         <div className="flex items-center gap-6 mb-8">
// //           <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
// //             {formData.name.charAt(0).toUpperCase()}
// //           </div>
// //           <div>
// //             <h3 className="text-2xl font-bold text-white">{formData.name}</h3>
// //             <p className="text-slate-400">{userData.email}</p>
// //           </div>
// //         </div>

// //         {/* Input Fields */}
// //         <form onSubmit={handleUpdate} className="space-y-6">
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="text-xs text-slate-500 uppercase mb-1 block">Full Name</label>
// //               <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#151b2d] text-white p-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500" />
// //             </div>
// //             <div>
// //               <label className="text-xs text-slate-500 uppercase mb-1 block">Contact Number</label>
// //               <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#151b2d] text-white p-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500" />
// //             </div>
// //           </div>
          
// //           <div>
// //             <label className="text-xs text-slate-500 uppercase mb-1 block">Home Address</label>
// //             <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-[#151b2d] text-white p-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500" />
// //           </div>

// //           <button type="submit" className="w-full bg-white text-black font-bold p-4 rounded-xl hover:bg-slate-200 transition">
// //             Save Changes
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';
// // import { User, Phone, MapPin, Sparkles } from 'lucide-react';

// // const Profile = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

// //   const storedUser = JSON.parse(localStorage.getItem("user"));

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/user/${storedUser.id}`);
// //         setUserData(res.data);
// //         setFormData({ name: res.data.name || '', phone: res.data.phone || '', address: res.data.address || '' });
// //       } catch (err) { console.error(err); }
// //     };
// //     if (storedUser?.id) fetchUser();
// //   }, []);

// //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     setIsSaving(true);
// //     try {
// //       const res = await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/update-profile/${storedUser.id}`, formData);
// //       localStorage.setItem("user", JSON.stringify({ ...storedUser, name: res.data.name }));
// //       alert("Profile updated successfully ✅");
// //     } catch (err) { alert("Update failed ❌"); }
// //     finally { setIsSaving(false); }
// //   };

// //   if (!userData) return <div className="flex h-64 items-center justify-center font-black text-slate-400">LOADING...</div>;

// //   return (
// //     <div className="max-w-4xl mx-auto p-2 sm:p-4 animate-in fade-in duration-700">
      
// //       <div className="pb-8">
// //         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Account Management</p>
// //         <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">Edit Your Profile</h2>
// //       </div>

// //       <motion.div 
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="relative p-[1.5px] overflow-hidden rounded-[2.5rem] shadow-[0_15px_40px_rgba(15,23,42,0.03)] bg-white"
// //       >
// //         <motion.div 
// //           animate={{ rotate: 360 }}
// //           transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
// //           className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_180deg,transparent_240deg,transparent_360deg)] opacity-100 pointer-events-none"
// //         />

// //         <div className="relative w-full bg-gradient-to-br from-white via-white to-slate-50/50 backdrop-blur-xl p-8 rounded-[2.4rem] z-10 border border-white">
          
// //           <div className="flex items-center gap-6 mb-10">
// //             {/* MK Initials */}
// //             <div className="w-24 h-24 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-blue-500/20">
// //               MK
// //             </div>
// //             <div>
// //               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{formData.name}</h3>
// //               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{userData.email}</p>
// //             </div>
// //           </div>

// //           <form onSubmit={handleUpdate} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //               <div className="space-y-1">
// //                 <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2">Full Name</label>
// //                 <div className="relative flex items-center">
// //                     <User size={16} className="absolute left-4 text-slate-400" />
// //                     <input name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
// //                 </div>
// //               </div>
// //               <div className="space-y-1">
// //                 <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2">Contact Number</label>
// //                 <div className="relative flex items-center">
// //                     <Phone size={16} className="absolute left-4 text-slate-400" />
// //                     <input name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="space-y-1">
// //               <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2">Home Address</label>
// //               <div className="relative flex items-center">
// //                 <MapPin size={16} className="absolute left-4 text-slate-400" />
// //                 <input name="address" value={formData.address} onChange={handleChange} className="w-full pl-12 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
// //               </div>
// //             </div>

// //             <motion.button 
// //               whileTap={{ scale: 0.98 }}
// //               type="submit" 
// //               disabled={isSaving}
// //               className="w-full bg-blue-600 hover:bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
// //             >
// //               {isSaving ? "SAVING..." : <><span>Save Operational Changes</span> <Sparkles size={13} /></>}
// //             </motion.button>
// //           </form>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default Profile;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { User, Phone, MapPin, Sparkles } from 'lucide-react';

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

//   const storedUser = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/user/${storedUser.id}`);
//         setUserData(res.data);
//         setFormData({ name: res.data.name || '', phone: res.data.phone || '', address: res.data.address || '' });
//       } catch (err) { console.error(err); }
//     };
//     if (storedUser?.id) fetchUser();
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);
//     try {
//       const res = await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/update-profile/${storedUser.id}`, formData);
//       localStorage.setItem("user", JSON.stringify({ ...storedUser, name: res.data.name }));
//       alert("Profile updated successfully ✅");
//     } catch (err) { alert("Update failed ❌"); }
//     finally { setIsSaving(false); }
//   };

//   if (!userData) return <div className="flex h-64 items-center justify-center font-black text-slate-400">LOADING...</div>;

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-in fade-in duration-700">
      
//       <div className="pb-8">
//         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Account Management</p>
//         <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">Edit Your Profile</h2>
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         // Updated shadow for better depth
//         className="relative p-[1.5px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(15,23,42,0.15)] bg-white"
//       >
//         <motion.div 
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
//           className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_180deg,transparent_240deg,transparent_360deg)] opacity-100 pointer-events-none"
//         />

//         <div className="relative w-full bg-gradient-to-br from-white via-white to-slate-50/50 backdrop-blur-xl p-6 sm:p-8 rounded-[1.9rem] sm:rounded-[2.4rem] z-10 border border-white">
          
//           <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
//             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-900 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-lg shadow-slate-900/20">
//               MK
//             </div>
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">{formData.name}</h3>
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{userData.email}</p>
//             </div>
//           </div>

//           <form onSubmit={handleUpdate} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <div className="space-y-1">
//                 <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2">Full Name</label>
//                 <div className="relative flex items-center">
//                     <User size={16} className="absolute left-4 text-slate-400" />
//                     <input name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
//                 </div>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2">Contact Number</label>
//                 <div className="relative flex items-center">
//                     <Phone size={16} className="absolute left-4 text-slate-400" />
//                     <input name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2">Home Address</label>
//               <div className="relative flex items-center">
//                 <MapPin size={16} className="absolute left-4 text-slate-400" />
//                 <input name="address" value={formData.address} onChange={handleChange} className="w-full pl-12 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
//               </div>
//             </div>

//             <motion.button 
//               whileTap={{ scale: 0.98 }}
//               type="submit" 
//               disabled={isSaving}
//               className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/20 flex items-center justify-center gap-2"
//             >
//               {isSaving ? "SAVING..." : <><span>Save Operational Changes</span> <Sparkles size={13} /></>}
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Profile;










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { User, Phone, MapPin, Sparkles, Mail, Shield, RefreshCw } from 'lucide-react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || storedUser?._id;

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (!userId) return;
//         const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/user/${userId}`);
//         setUserData(res.data);
//         setFormData({ 
//           name: res.data.name || '', 
//           phone: res.data.phone || '', 
//           address: res.data.address || '' 
//         });
//       } catch (err) { 
//         console.error("Error fetching customer profile:", err); 
//       }
//     };
//     if (userId) fetchUser();
//   }, [userId]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);
//     try {
//       const res = await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/update-profile/${userId}`, formData);
//       localStorage.setItem("user", JSON.stringify({ ...storedUser, name: res.data.name }));
//       alert("Customer profile updated successfully ✅");
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

//   const userInitial = formData.name ? formData.name.trim().charAt(0).toUpperCase() : "U";

//   return (
//     <div className="w-full max-w-[1700px] mx-auto px-1 sm:px-0 space-y-10">
      
//       <div className="pb-6 border-b border-slate-200">
//         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-2">Customer Hub</p>
//         <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
//           My Account <span className="text-blue-600">Settings</span>
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
//               <span>{userInitial}</span>
//             </div>
//             <div>
//               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center justify-center sm:justify-start gap-2">
//                 {formData.name || "Client"}
//                 <Shield size={14} className="text-blue-500" fill="currentColor" />
//               </h3>
//               <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">{userData.email}</p>
//             </div>
//           </div>

//           <form onSubmit={handleUpdate} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Full Name</label>
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
//               <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Email Address</label>
//               <div className="relative">
//                 <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
//                 <input type="email" value={userData.email} readOnly className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-100 border border-slate-200/40 font-semibold text-sm text-slate-400 cursor-not-allowed select-none" />
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Home Address</label>
//               <div className="relative group">
//                 <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
//                 <input name="address" value={formData.address} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-semibold text-sm text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
//               </div>
//             </div>

//             <motion.button whileTap={{ scale: 0.99 }} type="submit" disabled={isSaving} className="w-full bg-slate-950 hover:bg-blue-600 disabled:bg-blue-400 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2">
//               {isSaving ? <><RefreshCw size={14} className="animate-spin" /> Saving...</> : <><span>Update Personal File</span><Sparkles size={13} /></>}
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default UserProfile;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Sparkles, Mail, Shield, RefreshCw } from 'lucide-react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/user/${userId}`);
        setUserData(res.data);
        setFormData({ 
          name: res.data.name || '', 
          phone: res.data.phone || '', 
          address: res.data.address || '' 
        });
      } catch (err) { 
        console.error("Error fetching customer profile:", err); 
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/api/auth/update-profile/${userId}`, formData);
      localStorage.setItem("user", JSON.stringify({ ...storedUser, name: res.data.name }));
      alert("Customer profile updated successfully ✅");
    } catch (err) { 
      alert("Update failed ❌"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get Initials: takes first character of first and last name
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
      <div className="space-y-10 max-w-[1600px] mx-auto p-4 animate-in fade-in duration-700">
      <div className="pb-6 border-b border-slate-200/80">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
          Customer <span className="text-blue-600">Settings</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-2 max-w-md leading-relaxed">
          Manage your personal information, contact preferences, and delivery address.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDE: Avatar Badge with Animated Border */}
        <div className="lg:col-span-4 relative rounded-[2.5rem] p-[3px] bg-slate-200 shadow-[0_25px_50px_-12px_rgba(37,99,235,0.25)] overflow-hidden">
       <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                   className="absolute inset-0 bg-[conic-gradient(from_0deg,#64748b_0deg,#3b82f6_120deg,#6b7280_240deg,#64748b_360deg)]"
                   />
          <div className="relative bg-white rounded-[2.4rem] p-8 h-full flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-3xl font-black mb-5 shadow-lg relative">
              <span>{getInitials(formData.name)}</span>
            </div>
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-lg">{formData.name || "User"}</h3>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">{userData.email}</p>
            <div className="mt-4 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-1.5">
              <Shield size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">Verified Account</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form with Animated Border */}
        <div className="lg:col-span-8 relative rounded-[2.5rem] p-[3px] bg-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
           <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                         className="absolute inset-0 bg-[conic-gradient(from_0deg,#64748b_0deg,#3b82f6_120deg,#6b7280_240deg,#64748b_360deg)]"
                       />
          <div className="relative bg-white rounded-[2.4rem] p-10">
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" /></div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</label>
                  <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" /></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" /><input type="email" value={userData.email} readOnly className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-sm text-slate-400" /></div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</label>
                <div className="relative"><MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="address" value={formData.address} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" /></div>
              </div>

              <button type="submit" disabled={isSaving} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />} Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;