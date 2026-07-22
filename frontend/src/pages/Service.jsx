import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, MapPin, Zap, Brush, Wrench, Scissors, LayoutGrid } from 'lucide-react';
import axios from 'axios';

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState(['All']);

  const getIcon = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'repair': return <Wrench size={20} />;
      case 'cleaning': return <Brush size={20} />;
      case 'salon': return <Scissors size={20} />;
      case 'maintenance': return <Wrench size={20} />;
      default: return <Zap size={20} />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, catRes] = await Promise.all([
          axios.get('http://https://service-management-system-xwcx.vercel.app/api/services'),
          axios.get('http://https://service-management-system-xwcx.vercel.app/api/categories')
        ]);

        setServices(serviceRes.data);
        const dynamicCats = ['All', ...catRes.data.map(c => c.name)];
        setCategories(dynamicCats);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  const filtered = services.filter(s =>
    (selectedCategory === 'All' || s.category === selectedCategory) &&
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ ✅ ✅ SECURE BOOK NOW FUNCTION
  const handleBookNow = (serviceId) => {
    if (!serviceId) {
      console.error("Service ID missing");
      return;
    }

    const storedUser = localStorage.getItem("user");

    // 🔒 Not logged in
    if (!storedUser) {
      // Optional: remember where user wanted to go
      localStorage.setItem("redirectAfterLogin", `/booking/${serviceId}`);
      navigate("/login");
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    if (!user?.id) {
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    // ✅ Logged in → Go to booking page
    navigate(`/booking/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 pt-28 pb-20 px-4 ">
      <div className="max-w-7xl mx-auto ">

        {/* Title & Search */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Book Karachi's <span className="text-blue-600">Best</span>
          </motion.h1>

         <div className="max-w-4xl mx-auto  bg-white dark:bg-slate-800 p-3 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search services..."
               className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-[2rem] outline-none font-bold text-slate-700 dark:text-white placeholder:text-slate-400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                      : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat === 'All' ? <LayoutGrid size={14}/> : getIcon(cat)}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filtered.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all p-4 group"
              >
                <div className="relative h-56 rounded-[2.5rem] overflow-hidden mb-6">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?q=80&w=600'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-blue-600 shadow-lg">
                    {getIcon(item.category)}
                  </div>
                </div>

                <div className="px-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500 font-black">
                      <Star size={14} fill="currentColor"/> {item.rating || '4.5'}
                    </div>
                  </div>

                  <p className="text-slate-400 text-[11px] font-bold uppercase mb-4 line-clamp-1">
                    {item.description}
                  </p>
               <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-700">
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 dark:text-slate-500">
                        Starting Price
                      </p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        Rs. {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleBookNow(item._id)}
                      className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-slate-900 hover:-translate-y-1 transition-all active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div> */}

        {/* Services Grid with Enhanced Infinite-style Animations */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <AnimatePresence mode='popLayout'>
    {filtered.map((item) => (
      <motion.div
        key={item._id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        // Added smooth hover animation
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="relative bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl dark:hover:shadow-blue-900/30 transition-all p-4 group"
      >
        {/* Subtle Pulse Border Effect (Infinite Animation) */}
        <div className="absolute inset-0 rounded-[3rem] border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-500"></div>

        <div className="relative h-56 rounded-[2.5rem] overflow-hidden mb-6">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?q=80&w=600'}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-2xl text-blue-600 dark:text-blue-400 shadow-lg animate-bounce-slow">
            {getIcon(item.category)}
          </div>
        </div>

        <div className="px-4 pb-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              {item.title}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500 font-black">
              <Star size={14} fill="currentColor"/> {item.rating || '4.5'}
            </div>
          </div>

          <p className="text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase mb-4 line-clamp-1">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-700">
            <div>
              <p className="text-[10px] font-black text-slate-300 dark:text-slate-500 uppercase tracking-widest mb-1">
                Starting Price
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                Rs. {item.price}
              </p>
            </div>

            <button
              onClick={() => handleBookNow(item._id)}
              className="relative bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:shadow-blue-600/40 hover:scale-105 transition-all active:scale-95 overflow-hidden"
            >
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
</div>

      </div>
    </div>
  );
};

export default Services;



 