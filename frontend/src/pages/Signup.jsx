 



import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ChevronRight, Eye, EyeOff } from 'lucide-react'; // Eye icons add kiye
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // Password toggle state
    
    // --- Dynamic Form State ---
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 'user' // default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend API Call
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert(res.data.message);
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    // --- Complex Plexus Node Generator Logic (Unchanged) ---
    const plexusData = useRef([...Array(30)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3
    })));

    return (
     /* FIX: Main container ko relative rakha taake z-index sahi kaam kare */
        <div className="min-h-screen w-full mt-12 dark:bg-slate-900 bg-white flex items-start sm:items-center justify-center relative p-4 py-24 sm:py-10 overflow-x-hidden">
            
            {/* Plexus Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="xMidYMid slice"
                    className="opacity-40 md:opacity-20"
                >
                    {plexusData.current.map((node, i) => (
                        <React.Fragment key={i}>
                            <motion.circle
                                r="0.7"
                                fill="#2563eb"
                                animate={{
                                    cx: [node.x, node.targetX, node.x],
                                    cy: [node.y, node.targetY, node.y]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            {plexusData.current.slice(i + 1, i + 4).map((otherNode, j) => (
                                <motion.line
                                    key={`${i}-${j}`}
                                    stroke="#2563eb"
                                    strokeWidth="0.12"
                                    animate={{
                                        x1: [node.x, node.targetX, node.x],
                                        y1: [node.y, node.targetY, node.y],
                                        x2: [otherNode.x, otherNode.targetX, otherNode.x],
                                        y2: [otherNode.y, otherNode.targetY, otherNode.y]
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </svg>
            </div>

           {/* --- SIGNUP FORM WITH FIXED ANIMATED BORDER --- */}
        {/* SIGNUP FORM CONTAINER */}
            <div className="relative z-10 p-[3px] md:p-[4px] rounded-[2.5rem] overflow-hidden w-full max-w-[480px] shadow-2xl my-auto">
                
                {/* Animated Border Spin Layer */}
                <div 
                    className="absolute inset-[-100%] animate-spin bg-[conic-gradient(from_0deg,#2563eb_0deg,#2563eb_90deg,transparent_180deg,transparent_270deg,#2563eb_360deg)]" 
                    style={{ animationDuration: '4s' }}
                />
                
                {/* Main Content Container (z-10 to stay above the border) */}
                <div className="relative z-10 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.35rem] w-full">
                    <div className="text-center mb-5">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-300 tracking-tighter leading-none">Create Account</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-tighter mt-1">Connecting You to Excellence, One Tap Away.</p>
                    </div>

                   <form className="space-y-4" onSubmit={handleSubmit}>
  
  {/* NAME + PHONE */}
  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-1">
      <label className="text-[9px] font-black text-blue-600 uppercase ml-1">
        Full Name
      </label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          type="text"
          placeholder="Maria M."
          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-xs"
        />
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-[9px] font-black text-blue-600 uppercase ml-1">
        Phone
      </label>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="03XX-XXXXXXX"
          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-xs"
        />
      </div>
    </div>
  </div>

  {/* EMAIL */}
  <div className="space-y-1">
    <label className="text-[9px] font-black text-blue-600 uppercase ml-1">
      Email Address
    </label>
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        type="email"
        placeholder="maria@karachi.com"
        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-xs"
      />
    </div>
  </div>

  {/* PASSWORD */}
  <div className="space-y-1">
    <label className="text-[9px] font-black text-blue-600 uppercase ml-1">
      Password
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        type={showPassword ? "text" : "password"}
        placeholder="Min. 8 characters"
        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-xs"
      />

      {/* Eye Toggle */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>

  {/* REGISTER AS */}
  <div className="space-y-1">
    <label className="text-[9px] font-black text-blue-600 uppercase ml-1">
      Register As
    </label>
    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      className="w-full py-2.5 px-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-xs appearance-none cursor-pointer"
    >
      <option value="user">User</option>
      <option value="provider">Service Provider</option>
    </select>
  </div>

  {/* SUBMIT BUTTON */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black text-md hover:bg-blue-700 flex items-center justify-center gap-2 group transition-all mt-4"
  >
    Register Now
    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
  </button>

</form>

                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-slate-500 text-[10px] font-black uppercase hover:text-blue-600 transition-colors">
                            Existing User? <span className="text-blue-600 underline tracking-tighter">Login here</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;