// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Lock, ChevronRight } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     // --- Dynamic Login Logic ---
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
//             const userData = res.data.user;
//             localStorage.setItem('user', JSON.stringify(userData));

//             // Role-based routing
//             if (userData.role === 'admin') {
//                 navigate('/admin'); 
//             } else {
//                 navigate('/dashboard');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Invalid credentials");
//         }
//     };

//     // --- Plexus Logic (Unchanged) ---
//     const plexusData = useRef([...Array(30)].map(() => ({
//         x: Math.random() * 100, 
//         y: Math.random() * 100,
//         targetX: Math.random() * 100, 
//         targetY: Math.random() * 100,
//         speed: 0.1 + Math.random() * 0.3
//     })));

//     return (
//         <div className="h-screen w-full bg-white overflow-hidden flex items-center justify-center relative p-4">
            
//             {/* Plexus Background Layer */}
//             <div className="absolute inset-0 z-0 pointer-events-none">
//                 <svg 
//                     width="100%" 
//                     height="100%" 
//                     viewBox="0 0 100 100" 
//                     preserveAspectRatio="xMidYMid slice"
//                     className="opacity-40 md:opacity-20"
//                 >
//                     {plexusData.current.map((node, i) => (
//                         <React.Fragment key={i}>
//                             <motion.circle
//                                 r="0.7"
//                                 fill="#2563eb"
//                                 animate={{
//                                     cx: [node.x, node.targetX, node.x],
//                                     cy: [node.y, node.targetY, node.y]
//                                 }}
//                                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                             />
//                             {plexusData.current.slice(i + 1, i + 4).map((otherNode, j) => (
//                                 <motion.line
//                                     key={`${i}-${j}`}
//                                     stroke="#2563eb"
//                                     strokeWidth="0.12"
//                                     animate={{
//                                         x1: [node.x, node.targetX, node.x],
//                                         y1: [node.y, node.targetY, node.y],
//                                         x2: [otherNode.x, otherNode.targetX, otherNode.x],
//                                         y2: [otherNode.y, otherNode.targetY, otherNode.y]
//                                     }}
//                                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                                 />
//                             ))}
//                         </React.Fragment>
//                     ))}
//                 </svg>
//             </div>

//             {/* --- FIXED ANIMATED BORDER FORM CONTAINER --- */}
//             <div className="relative group p-[3px] rounded-[2.5rem] overflow-hidden w-full max-w-[400px] shadow-2xl flex items-center justify-center">
                
//                 {/* Border Animation Layer */}
//                 <div className="absolute inset-[-100%] animate-spin bg-[conic-gradient(from_0deg,#2563eb_0deg,#2563eb_90deg,transparent_180deg,transparent_270deg,#2563eb_360deg)] opacity-100" 
//                      style={{ animationDuration: '3s' }} 
//                 />
                
//                 {/* Main Content Container */}
//                 <div className="relative z-10 bg-white p-8 md:p-10 rounded-[2.35rem] w-full">
//                     <div className="text-center mb-6">
//                         <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome Back</h2>
//                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
//                             Your Home, Managed. Your Peace, Restored.
//                         </p>
//                     </div>

//                     <form className="space-y-4" onSubmit={handleLogin}>
//                         <div className="space-y-1">
//                             <label className="text-[10px] font-black text-blue-600 uppercase ml-1">Email Address</label>
//                             <div className="relative">
//                                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                                 <input 
//                                     value={email} 
//                                     onChange={(e) => setEmail(e.target.value)} 
//                                     required 
//                                     type="email" 
//                                     placeholder="maria@example.com" 
//                                     className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm" 
//                                 />
//                             </div>
//                         </div>
//                         <div className="space-y-1">
//                             <label className="text-[10px] font-black text-blue-600 uppercase ml-1">Password</label>
//                             <div className="relative">
//                                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                                 <input 
//                                     value={password} 
//                                     onChange={(e) => setPassword(e.target.value)} 
//                                     required 
//                                     type="password" 
//                                     placeholder="••••••••" 
//                                     className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm" 
//                                 />
//                             </div>
//                         </div>
//                         <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-md hover:bg-blue-700 flex items-center justify-center gap-2 group transition-all mt-2">
//                             Login Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                         </button>
//                     </form>

//                     <div className="mt-6 text-center">
//                         <Link to="/signup" className="text-slate-500 text-[10px] font-black uppercase hover:text-blue-600 transition-colors">
//                             New User? <span className="text-blue-600 underline tracking-tighter">Create Account</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;





// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Lock, ChevronRight, Eye, EyeOff } from 'lucide-react'; // Eye icons add kiye
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false); // Password visibility state

   
// const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//         const res = await axios.post(
//             'http://localhost:5000/api/auth/login',
//             { email, password }
//         );

//         const userData = res.data.user;

//         // ✅ Save user
//         localStorage.setItem('user', JSON.stringify(userData));

//         // ✅ Check if user came from Book Now
//         const redirectPath = localStorage.getItem("redirectAfterLogin");

//         if (redirectPath) {
//             localStorage.removeItem("redirectAfterLogin");
//             navigate(redirectPath);
//             return;
//         }

//         // ✅ Normal Role-based routing
//         if (userData.role === 'admin') {
//             navigate('/admin'); 
//         } 
//         else if (userData.role === 'provider') {
//             navigate('/provider/dashboard');
//         } 
//         else {
//             navigate('/dashboard');
//         }

//     } catch (err) {
//         alert(err.response?.data?.message || "Invalid credentials");
//     }
// };
//     // --- Plexus Logic (Unchanged) ---
//     const plexusData = useRef([...Array(30)].map(() => ({
//         x: Math.random() * 100, 
//         y: Math.random() * 100,
//         targetX: Math.random() * 100, 
//         targetY: Math.random() * 100,
//         speed: 0.1 + Math.random() * 0.3
//     })));

//     return (
//         <div className="h-screen w-full bg-white overflow-hidden flex items-center justify-center relative p-4">
            
//             {/* Plexus Background Layer */}
//             <div className="absolute inset-0 z-0 pointer-events-none">
//                 <svg 
//                     width="100%" 
//                     height="100%" 
//                     viewBox="0 0 100 100" 
//                     preserveAspectRatio="xMidYMid slice"
//                     className="opacity-40 md:opacity-20"
//                 >
//                     {plexusData.current.map((node, i) => (
//                         <React.Fragment key={i}>
//                             <motion.circle
//                                 r="0.7"
//                                 fill="#2563eb"
//                                 animate={{
//                                     cx: [node.x, node.targetX, node.x],
//                                     cy: [node.y, node.targetY, node.y]
//                                 }}
//                                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                             />
//                             {plexusData.current.slice(i + 1, i + 4).map((otherNode, j) => (
//                                 <motion.line
//                                     key={`${i}-${j}`}
//                                     stroke="#2563eb"
//                                     strokeWidth="0.12"
//                                     animate={{
//                                         x1: [node.x, node.targetX, node.x],
//                                         y1: [node.y, node.targetY, node.y],
//                                         x2: [otherNode.x, otherNode.targetX, otherNode.x],
//                                         y2: [otherNode.y, otherNode.targetY, otherNode.y]
//                                     }}
//                                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                                 />
//                             ))}
//                         </React.Fragment>
//                     ))}
//                 </svg>
//             </div>

//             {/* --- FIXED ANIMATED BORDER FORM CONTAINER --- */}
//             <div className="relative group p-[3px] rounded-[2.5rem] overflow-hidden w-full max-w-[400px] shadow-2xl flex items-center justify-center">
                
//                 {/* Border Animation Layer */}
//                 <div className="absolute inset-[-100%] animate-spin bg-[conic-gradient(from_0deg,#2563eb_0deg,#2563eb_90deg,transparent_180deg,transparent_270deg,#2563eb_360deg)] opacity-100" 
//                      style={{ animationDuration: '3s' }} 
//                 />
                
//                 {/* Main Content Container */}
//                 <div className="relative z-10 bg-white p-8 md:p-10 rounded-[2.35rem] w-full">
//                     <div className="text-center mb-6">
//                         <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome Back</h2>
//                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
//                             Your Home, Managed. Your Peace, Restored.
//                         </p>
//                     </div>

//                     <form className="space-y-4" onSubmit={handleLogin}>
//                         <div className="space-y-1">
//                             <label className="text-[10px] font-black text-blue-600 uppercase ml-1">Email Address</label>
//                             <div className="relative">
//                                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                                 <input 
//                                     value={email} 
//                                     onChange={(e) => setEmail(e.target.value)} 
//                                     required 
//                                     type="email" 
//                                     placeholder="maria@example.com" 
//                                     className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm transition-all" 
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-1">
//                             <label className="text-[10px] font-black text-blue-600 uppercase ml-1">Password</label>
//                             <div className="relative">
//                                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                                 <input 
//                                     value={password} 
//                                     onChange={(e) => setPassword(e.target.value)} 
//                                     required 
//                                     type={showPassword ? "text" : "password"} // Dynamic type
//                                     placeholder="••••••••" 
//                                     className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm transition-all" 
//                                 />
//                                 {/* Eye Toggle Button */}
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
//                                 >
//                                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                             </div>
//                         </div>

//                         <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-md hover:bg-blue-700 flex items-center justify-center gap-2 group transition-all mt-2">
//                             Login Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                         </button>
//                     </form>

//                     <div className="mt-6 text-center">
//                         <Link to="/signup" className="text-slate-500 text-[10px] font-black uppercase hover:text-blue-600 transition-colors">
//                             New User? <span className="text-blue-600 underline tracking-tighter">Create Account</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ✅ 1️⃣ Prevent logged-in user from opening login page
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (user.role === 'admin') {
                navigate('/admin');
            } 
            else if (user.role === 'provider') {
                navigate('/provider/dashboard');
            } 
            else {
                navigate('/dashboard');
            }
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password }
            );

            const userData = res.data.user;

            // ✅ Save user
            localStorage.setItem('user', JSON.stringify(userData));

            // ✅ 2️⃣ Safe redirectAfterLogin logic
            const redirectPath = localStorage.getItem("redirectAfterLogin");

            if (redirectPath) {
                localStorage.removeItem("redirectAfterLogin");
                navigate(redirectPath);
                return;
            }

            // ✅ 3️⃣ Role-based routing
            if (userData.role === 'admin') {
                navigate('/admin'); 
            } 
            else if (userData.role === 'provider') {
                navigate('/provider/dashboard');
            } 
            else {
                navigate('/dashboard');
            }

        } catch (err) {
            alert(err.response?.data?.message || "Invalid credentials");
        }
    };

    // ✅ Plexus animation untouched
    const plexusData = useRef([...Array(30)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3
    })));

    return (
        <div className="h-screen w-full bg-white dark:bg-slate-900 overflow-hidden flex items-center justify-center relative p-4">
            
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

            {/* Animated Border Form Container */}
            <div className="relative group p-[3px] rounded-[2.5rem] overflow-hidden w-full max-w-[400px] shadow-2xl flex items-center justify-center">
                
                <div className="absolute inset-[-100%] animate-spin bg-[conic-gradient(from_0deg,#2563eb_0deg,#2563eb_90deg,transparent_180deg,transparent_270deg,#2563eb_360deg)] opacity-100" 
                     style={{ animationDuration: '3s' }} 
                />
                
                <div className="relative z-10 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.35rem] w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter dark:text-slate-300">Welcome Back</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                            Your Home, Managed. Your Peace, Restored.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-blue-600 uppercase ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    type="email" 
                                    placeholder="maria@example.com" 
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm transition-all" 
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-blue-600 uppercase ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••" 
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm transition-all" 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-md hover:bg-blue-700 flex items-center justify-center gap-2 group transition-all mt-2"
                        >
                            Login Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/signup" className="text-slate-500 text-[10px] font-black uppercase hover:text-blue-600 transition-colors">
                            New User? <span className="text-blue-600 underline tracking-tighter">Create Account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;