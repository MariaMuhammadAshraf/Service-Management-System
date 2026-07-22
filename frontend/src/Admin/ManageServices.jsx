 


import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Briefcase, Tag, Search } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCatName, setNewCatName] = useState("");
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });

  // --- API FETCHING ---
  const fetchData = async () => {
    try {
      const [serviceRes, catRes] = await Promise.all([
        axios.get('http://localhost:5000/api/services'),
        axios.get('http://localhost:5000/api/categories')
      ]);
      setServices(serviceRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- CATEGORY ACTIONS ---
  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/categories', { name: newCatName });
      setNewCatName("");
      fetchData();
    } catch (err) { alert("Category already exists!"); }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Delete this category?")) {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchData();
    }
  };

  // --- SERVICE ACTIONS ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = (service = null) => {
    if (service) {
      setFormData(service);
      setEditingId(service._id);
      setIsEditMode(true);
    } else {
      setFormData({ title: '', category: categories[0]?.name || '', price: '', description: '', image: '' });
      setIsEditMode(false);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, price: Number(formData.price) };
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/services/${editingId}`, dataToSend);
      } else {
        await axios.post('http://localhost:5000/api/services', dataToSend);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) { alert("Action failed!"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this service?")) {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchData();
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] font-sans overflow-x-hidden p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
        >
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Admin Catalog</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Services</h2>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()} 
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 transition-shadow hover:shadow-2xl hover:shadow-blue-500/40"
          >
            <div className="bg-white/20 p-1 rounded-full"><Plus size={16} /></div>
            Add New Service
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: CATEGORY MANAGEMENT */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 xl:col-span-3 space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-md p-6 lg:p-8 rounded-[3rem] border border-white shadow-2xl shadow-blue-900/5 relative overflow-hidden group">
              {/* Glowing Line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Tag size={16} /></div>
                Categories
              </h3>
              
              <div className="relative w-full mb-6">
                <input 
                  value={newCatName} 
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="New Category..." 
                  className="w-full bg-[#f4f7fe]/50 border border-slate-100 rounded-2xl pl-5 pr-14 py-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all"
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddCategory} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-[0.8rem] shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                  {categories.map(cat => (
                    <motion.div 
                      key={cat._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="group bg-white border border-slate-100 text-slate-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                    >
                      {cat.name}
                      <button onClick={() => deleteCategory(cat._id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors">
                        <X size={12} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: SERVICES TABLE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 xl:col-span-9 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative group z-10">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search services by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white/80 backdrop-blur-md border border-white rounded-[2rem] shadow-xl shadow-blue-900/5 outline-none focus:ring-4 focus:ring-blue-600/10 font-bold text-sm text-slate-700 transition-all"
              />
            </div>

            {/* Table Container */}
            <div className="bg-white/80 backdrop-blur-md rounded-[3.5rem] border border-white shadow-2xl shadow-blue-900/5 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-[4px] overflow-hidden z-20">
                <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6]" />
              </div>
              
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                      <th className="px-8 py-6">Service Detail</th>
                      <th className="px-8 py-6">Category</th>
                      <th className="px-8 py-6">Price</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/80">
                    <AnimatePresence>
                      {filteredServices.map((s) => (
                        <motion.tr 
                          key={s._id} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-blue-50/30 transition-colors group"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-5">
                              <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden bg-white border-2 border-slate-100 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                <img src={s.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-black text-slate-800 text-sm tracking-tight mb-1">{s.title}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider line-clamp-1 max-w-[250px]">{s.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-blue-100/50 shadow-sm">
                              {s.category}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <p className="font-black text-slate-800 text-sm bg-slate-50 inline-block px-3 py-1 rounded-lg border border-slate-100">
                              <span className="text-blue-500 mr-1">Rs.</span>{s.price.toLocaleString()}
                            </p>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex justify-end gap-3 transition-opacity">
                              <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }} 
                                onClick={() => openModal(s)} 
                                className="p-3 bg-white border border-slate-100 rounded-[1rem] text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md transition-all shadow-sm"
                              >
                                <Edit2 size={16}/>
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }} 
                                onClick={() => handleDelete(s._id)} 
                                className="p-3 bg-white border border-slate-100 rounded-[1rem] text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:shadow-md transition-all shadow-sm"
                              >
                                <Trash2 size={16}/>
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {filteredServices.length === 0 && (
                  <div className="w-full p-12 flex flex-col items-center justify-center text-center">
                    <Briefcase className="text-slate-200 mb-4" size={48} />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No services found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- DYNAMIC GLASS MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white/95 backdrop-blur-2xl w-full max-w-2xl rounded-[3.5rem] shadow-2xl p-8 md:p-12 relative max-h-[90vh] overflow-y-auto border border-white pointer-events-auto custom-scrollbar"
              >
                <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-700">
                  <X size={20} />
                </button>
                
                <div className="mb-10">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">{isEditMode ? 'Update Data' : 'Add New Data'}</p>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{isEditMode ? 'Edit Service' : 'Create Service'}</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Service Title</label>
                      <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-6 py-4 bg-[#f4f7fe]/50 border border-slate-100 rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-bold text-sm text-slate-700 transition-all shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-6 py-4 bg-[#f4f7fe]/50 border border-slate-100 rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-bold text-sm text-slate-700 transition-all shadow-inner appearance-none">
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Price (Rs.)</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">Rs.</span>
                        <input name="price" value={formData.price} onChange={handleChange} required type="number" className="w-full pl-14 pr-6 py-4 bg-[#f4f7fe]/50 border border-slate-100 rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-bold text-sm text-slate-700 transition-all shadow-inner" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Image URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full pl-14 pr-6 py-4 bg-[#f4f7fe]/50 border border-slate-100 rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-bold text-sm text-slate-700 transition-all shadow-inner" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-6 py-4 bg-[#f4f7fe]/50 border border-slate-100 rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-bold text-sm text-slate-700 transition-all shadow-inner resize-none custom-scrollbar" />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-blue-500/30 mt-8 transition-shadow hover:shadow-2xl hover:shadow-blue-500/40 flex items-center justify-center gap-2"
                  >
                    {isEditMode ? 'Update Service Information' : 'Confirm & Save Service'}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* Global Style for Custom Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
};

export default ManageServices;