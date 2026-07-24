// import React, { useEffect, useState } from 'react';
// import { Search, Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BrowseServices = () => {
//   const navigate = useNavigate();

//   const [services, setServices] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   // ✅ Fetch services from backend
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get('http://https://service-management-system-xwcx.vercel.app/api/api/services');
//         setServices(res.data);
//       } catch (err) {
//         console.error("Error fetching services:", err);
//       }
//     };

//     fetchServices();
//   }, []);

//   // ✅ Search filter
//   const filtered = services.filter(service =>
//     service.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ Book button logic (same as home page)
//   const handleBookNow = (serviceId) => {
//     const storedUser = localStorage.getItem("user");

//     if (!storedUser) {
//       localStorage.setItem("redirectAfterLogin", `/booking/${serviceId}`);
//       navigate("/login");
//       return;
//     }

//     navigate(`/booking/${serviceId}`);
//   };

//   return (
//     <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//         <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
//           Available Services
//         </h2>

//         <div className="relative w-full md:w-80">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//           <input
//             type="text"
//             placeholder="Search service..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-xs"
//           />
//         </div>
//       </div>

//       {/* Services Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filtered.map((s) => (
//           <div key={s._id} className="bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
            
//             <div className="h-44 bg-slate-100 rounded-[2rem] overflow-hidden relative">
//               <img
//                 src={s.image || `https://api.dicebear.com/7.x/identicon/svg?seed=${s.title}`}
//                 className="w-full h-full object-cover p-8 opacity-50 group-hover:scale-110 transition-transform"
//                 alt="service"
//               />
//               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[8px] font-black text-blue-600 uppercase tracking-widest">
//                 {s.category}
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="flex justify-between items-start">
//                 <h4 className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none">
//                   {s.title}
//                 </h4>
//                 <div className="flex items-center gap-1 text-yellow-400 font-bold text-[10px]">
//                   <Star size={12} fill="currentColor" /> {s.rating || 4.5}
//                 </div>
//               </div>

//               <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
//                 <div>
//                   <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
//                     Starts at
//                   </p>
//                   <p className="text-xl font-black text-blue-600">
//                     Rs. {s.price}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => handleBookNow(s._id)}
//                   className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-100"
//                 >
//                   Book
//                 </button>
//               </div>
//             </div>

//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filtered.length === 0 && (
//         <div className="text-center py-10 text-slate-400 font-bold">
//           No services found.
//         </div>
//       )}

//     </div>
//   );
// };

// export default BrowseServices;




import React, { useEffect, useState } from 'react';
import { Search, Star, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; // ✅ Standard import perfectly fixed

const BrowseServices = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch services from backend (Functionality Intact)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://https://service-management-system-xwcx.vercel.app/api/api/services');
        setServices(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ✅ Search filter (Functionality Intact)
  const filtered = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Book button logic (Functionality Intact)
  const handleBookNow = (serviceId) => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      localStorage.setItem("redirectAfterLogin", `/booking/${serviceId}`);
      navigate("/login");
      return;
    }

    navigate(`/booking/${serviceId}`);
  };

  // Modern Premium Loading State
  if (loading) {
    return (
      <div className="h-[55vh] w-full flex flex-col items-center justify-center gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Loader2 size={38} className="text-blue-500" />
        </motion.div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 animate-pulse">
          Syncing Premium Services...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto p-4 animate-in fade-in duration-700">
      
      {/* Premium Header Layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100">
        <div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Available Matrix</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">
            Available <span className="text-blue-600"> Services </span>
          </h2>
        </div>

        {/* Stylish Neo-Search Box */}
        <div className="relative w-full md:w-85 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search premium service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold text-xs shadow-sm transition-all uppercase placeholder:normal-case tracking-wider text-slate-700"
          />
        </div>
      </div>

      {/* Services Premium Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((s, index) => (
            <motion.div 
              key={s._id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative p-[2px] overflow-hidden rounded-[2.5rem] flex flex-col justify-between shadow-[0_20px_50px_rgba(15,23,42,0.06)] group bg-white/90"
            >
              {/* ✅ FIXED: Always Active & Infinite Rotating Conic Neon Border Accent */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,transparent_210deg,transparent_360deg)] opacity-100"
              />
              
              {/* Internal Premium Glass Content Wrapper */}
              <div className="relative w-full h-full bg-gradient-to-b from-white to-slate-50/50 backdrop-blur-xl p-3 rounded-[2.45rem] flex flex-col justify-between z-10 border border-white/60 shadow-inner">
                
                {/* Media Presentation Block */}
                <div className="h-44 sm:h-48 bg-gradient-to-br from-slate-100 to-slate-200/60 rounded-[2rem] overflow-hidden relative group-hover:shadow-inner transition-all">
                  <img
                    src={s.image || `https://api.dicebear.com/7.x/identicon/svg?seed=${s.title}`}
                    className="w-full h-full object-cover p-4 opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    alt="service"
                  />
                  
                  {/* Category Chip Display */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 text-white shadow-lg backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em]">
                    {s.category || "Premium"}
                  </div>
                </div>

                {/* Typography Metadata Block */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="text-lg sm:text-xl font-black text-slate-800 uppercase tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h4>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-100/70 rounded-xl text-amber-600 font-black text-[10px] tracking-tight shrink-0 shadow-sm">
                      <Star size={11} fill="currentColor" className="transform group-hover:rotate-12 transition-transform" /> 
                      {s.rating || "4.5"}
                    </div>
                  </div>

                  {/* Pricing Matrix & Action Controllers */}
                  <div className="mt-6 sm:mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                        Starts at
                      </p>
                      <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        Rs. {s.price}
                      </p>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookNow(s._id)}
                      className="relative bg-slate-900 hover:bg-blue-600 text-white px-5 py-3 sm:px-7 sm:py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/20 overflow-hidden flex items-center gap-2"
                    >
                      <span>Book</span>
                      <Sparkles size={10} className="opacity-60 group-hover:animate-pulse" />
                    </motion.button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Styled Clean Empty Search State */}
      {filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]"
        >
          <Search className="mx-auto text-slate-300 mb-3 animate-pulse" size={28} />
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest">
            No matching premium services found.
          </p>
        </motion.div>
      )}

    </div>
  );
};

export default BrowseServices;