// import React, { useState } from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { LayoutDashboard, Search, Calendar, Star, User, LogOut, Menu, Bell } from 'lucide-react';

// const UserLayout = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const navs = [
//     { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
//     { name: "Services", path: "/dashboard/browse", icon: <Search size={18} /> },
//     { name: "My Bookings", path: "/dashboard/bookings", icon: <Calendar size={18} /> },
//     { name: "Reviews", path: "/dashboard/reviews", icon: <Star size={18} /> },
//     { name: "Profile", path: "/dashboard/profile", icon: <User size={18} /> },
//   ];

//   // ✅ ✅ ✅ PROPER LOGOUT FUNCTION
//   const handleLogout = () => {
//     console.log("LOGOUT CLICKED");

//     localStorage.removeItem("user");
//     localStorage.removeItem("redirectAfterLogin");

//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex overflow-hidden">

//       {/* Sidebar */}
//       <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        
//         <div className="p-8">
//           <div className="flex items-center gap-3 mb-12">
//             <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 font-black">
//               S
//             </div>
//             <div>
//               <p className="text-lg font-black text-slate-900 tracking-tighter leading-none uppercase">
//                 Servicely
//               </p>
//               <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">
//                 Karachi Network
//               </p>
//             </div>
//           </div>

//           <nav className="space-y-2">
//             {navs.map(link => (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 end
//                 className={({ isActive }) =>
//                   `flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
//                     isActive
//                       ? 'bg-blue-600 text-white shadow-xl shadow-blue-100'
//                       : 'text-slate-400 hover:bg-slate-50 hover:text-blue-600'
//                   }`
//                 }
//               >
//                 {link.icon}
//                 {link.name}
//               </NavLink>
//             ))}
//           </nav>
//         </div>

//         {/* ✅ Sidebar Bottom / Logout */}
//         <div className="p-6 border-t border-white/5 bg-black/20">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-4 w-full px-6 py-4 text-red-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 rounded-2xl transition-all duration-300 group"
//           >
//             <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
//            Sign Out
//           </button>
//         </div>

//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 md:ml-72 flex flex-col h-screen overflow-y-auto">
         

//         <div className="p-8 max-w-7xl mx-auto w-full">
//           <Outlet />
//         </div>
//       </div>

//     </div>
//   );
// };

// export default UserLayout;



// import React, { useState } from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { 
//   LayoutDashboard, Search, Calendar, Star, User, LogOut, 
//   Menu, Bell, Command, Activity, X
// } from 'lucide-react';
// import { motion, AnimatePresence } from "framer-motion";

// const UserLayout = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const navs = [
//     { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
//     { name: "Services", path: "/dashboard/browse", icon: <Search size={18} /> },
//     { name: "My Bookings", path: "/dashboard/bookings", icon: <Calendar size={18} /> },
//     { name: "Reviews", path: "/dashboard/reviews", icon: <Star size={18} /> },
//     { name: "Profile", path: "/dashboard/profile", icon: <User size={18} /> },
//   ];

//   // ✅ ✅ ✅ PROPER LOGOUT FUNCTION (Functionality Retained Unchanged)
//   const handleLogout = () => {
//     console.log("LOGOUT CLICKED");

//     localStorage.removeItem("user");
//     localStorage.removeItem("redirectAfterLogin");

//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex font-sans selection:bg-blue-100 overflow-hidden">
      
//       {/* Mobile Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
//             onClick={() => setIsOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* --- SIDEBAR --- */}
//       <aside className={`fixed inset-y-0 left-0 z-[70] w-72 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-all duration-500 ease-in-out border-r border-slate-200 flex flex-col shadow-2xl md:shadow-none`}>
        
//         {/* Logo Section */}
//         <div className="p-8 mb-4">
//           <div className="flex items-center gap-3 group cursor-pointer">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform duration-300">
//               <span className="font-black text-white italic text-lg">S</span>
//             </div>
//             <div>
//               <h1 className="text-lg font-black tracking-tighter uppercase leading-none text-slate-800 group-hover:text-blue-600 transition-colors">Servicely</h1>
//               <p className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1 text-nowrap">Karachi Network</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
//           {navs.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               end
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) => `
//                 group flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all duration-300
//                 ${isActive 
//                   ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
//                   : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
//                 }
//               `}
//             >
//               <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Logout Button */}
//         <div className="p-6 border-t border-slate-100">
//           <button 
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-5 py-3.5 text-red-500 font-bold text-[10px] uppercase tracking-wider hover:bg-red-50 rounded-xl transition-all duration-300 group"
//           >
//             <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* --- MAIN CONTENT --- */}
//       <div className="flex-1 md:ml-72 flex flex-col h-screen overflow-hidden">
        
//         {/* Professional Mobile Top Header */}
//         <header className="md:hidden sticky top-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-50 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
//               <LayoutDashboard size={20} className="text-white" />
//             </div>
//             <div className="flex flex-col text-left">
//               <span className="font-black text-[13px] text-slate-800 uppercase tracking-tight leading-none">Servicely</span>
//               <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">User Dashboard</span>
//             </div>
//           </div>
//           <button 
//             onClick={() => setIsOpen(true)}
//             className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all"
//           >
//             <Menu size={22} />
//           </button>
//         </header>

//         {/* Professional Desktop Global Action Header */}
//         <header className="hidden md:flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40">
//           <div className="flex items-center gap-8">
//             <div className="text-left">
//               <h2 className="text-2xl font-black text-slate-800 tracking-tight">Overview</h2>
//               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Welcome back, User</p>
//             </div>

//             {/* Global Search Bar */}
//             <div className="relative group hidden lg:block">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Search services or dashboard..." 
//                 className="bg-slate-100/50 border border-transparent focus:border-blue-200 focus:bg-white w-[300px] pl-11 pr-4 py-2.5 rounded-2xl text-sm font-medium outline-none transition-all"
//               />
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 shadow-sm">
//                 <span className="flex items-center gap-0.5"> <Command size={10} /> K </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-5">
//             {/* Action Buttons */}
//             <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
//               <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
//                 <Bell size={18} />
//               </button>
//               <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
//                 <Activity size={18} />
//               </button>
//             </div>

//             <div className="h-10 w-[1px] bg-slate-200/80 mx-1" />

//             {/* Profile Section */}
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all border border-transparent hover:border-slate-200"
//             >
//               <div className="text-right">
//                 <p className="text-xs font-black text-slate-800 leading-none">Customer Account</p>
//                 <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter mt-1 flex items-center justify-end gap-1">
//                   <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
//                   Active Now
//                 </p>
//               </div>
//               <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
//                 <img 
//                   src="https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff&bold=true" 
//                   alt="user profile" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </header>

//         {/* Page Content Holder */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-10 no-scrollbar bg-[#f8fafc]">
//           <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <Outlet />
//           </div>
//         </main>

//       </div>
//     </div>
//   );
// };

// export default UserLayout;



import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Search, Calendar, Star, User, LogOut, Settings,MessageSquare,
  Menu, Bell, Command, Activity, X
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const UserLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("User"); // 🎛️ Default dynamic name state
  const navigate = useNavigate();

  // ⚡ Extracting live logged-in user details on layout mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      // Agar backend se 'name' ya 'fullName' ya 'username' kuch bhi aa raha ho, yeh usko extract kar lega
      const dynamicName = loggedInUser.name || loggedInUser.fullName || loggedInUser.username || "User";
      setUserName(dynamicName);
    }
  }, []);

  const navs = [
    { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Services", path: "/dashboard/browse", icon: <Settings size={18} /> },
    { name: "My Bookings", path: "/dashboard/bookings", icon: <Calendar size={18} /> },
    { name: "Reviews", path: "/dashboard/reviews", icon: <MessageSquare size={18} /> },
    { name: "Profile", path: "/dashboard/profile", icon: <User size={18} /> },
  ];

  // ✅ ✅ ✅ PROPER LOGOUT FUNCTION (Functionality Retained Unchanged)
  const handleLogout = () => {
    console.log("LOGOUT CLICKED");

    localStorage.removeItem("user");
    localStorage.removeItem("redirectAfterLogin");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans selection:bg-blue-100 overflow-hidden">
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-[70] w-72 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-all duration-500 ease-in-out border-r border-slate-200 flex flex-col shadow-2xl md:shadow-none`}>
        
        {/* Logo Section */}
        <div className="p-8 mb-4">
          <div className="flex items-center justify-between md:justify-start gap-3 group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform duration-300">
                <span className="font-black text-white italic text-lg">U</span>
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tighter uppercase leading-none text-slate-800 group-hover:text-blue-600 transition-colors">User</h1>
                <p className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1 text-nowrap">Panel</p>
              </div>
            </div>
            {/* Mobile Sidebar Close Button */}
            <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {navs.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                group flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all duration-300
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                }
              `}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-5 py-3.5 text-red-500 font-bold text-[10px] uppercase tracking-wider hover:bg-red-50 rounded-xl transition-all duration-300 group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 md:ml-72 flex flex-col h-screen overflow-hidden">
        
        {/* ✅ FIXED PROFESSIONAL MOBILE HEADER (Now Fully Dynamic!) */}
        <header className="md:hidden sticky top-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-white">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=4F46E5&color=fff&bold=true`} 
                alt="user profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              {/* Mobile me user ka actual naam yahan dikhega */}
              <span className="font-black text-[13px] text-slate-800 uppercase tracking-tight leading-none truncate max-w-[150px]">{userName}</span>
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">Active Session</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Professional Desktop Global Action Header */}
        <header className="hidden md:flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40">
          <div className="flex items-center gap-8">
            <div className="text-left">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Overview</h2>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Welcome back, {userName}</p>
            </div>

            {/* Global Search Bar */}
            <div className="relative group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search services or dashboard..." 
                className="bg-slate-100/50 border border-transparent focus:border-blue-200 focus:bg-white w-[300px] pl-11 pr-4 py-2.5 rounded-2xl text-sm font-medium outline-none transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 shadow-sm">
                <span className="flex items-center gap-0.5"> <Command size={10} /> K </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Action Buttons */}
            <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
              <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
                <Bell size={18} />
              </button>
              <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
                <Activity size={18} />
              </button>
            </div>

            <div className="h-10 w-[1px] bg-slate-200/80 mx-1" />

            {/* Profile Section */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all border border-transparent hover:border-slate-200"
            >
              <div className="text-right">
                <p className="text-xs font-black text-slate-800 leading-none">{userName === "User" ? "Customer Account" : userName}</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter mt-1 flex items-center justify-end gap-1">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                  Active Now
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=4F46E5&color=fff&bold=true`} 
                  alt="user profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Page Content Holder */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 no-scrollbar bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default UserLayout;