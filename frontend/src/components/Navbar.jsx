 





import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';

function Navbar() {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("redirectAfterLogin");
    navigate("/login");
  };

  // ✅ Role-based dashboard link
  const getDashboardLink = () => {
    if (!user) return null;

    if (user.role === "admin") return "/admin";
    if (user.role === "provider") return "/provider/dashboard";
    return "/dashboard";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-slate-100 py-4 shadow-sm dark:bg-slate-900 dark:border-slate-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 md:w-11 md:h-11 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
           <span className="text-white font-black text-lg">SB</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-xl font-extrabold tracking-tighter text-slate-800 leading-none dark:text-white">
              Service Booking
            </span>
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.15em] text-blue-600">
              Management System
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 ">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-[15px] font-bold transition-all ${
                  isActive
                    ? "text-blue-600 scale-105 "
                    : "text-slate-600 hover:text-blue-600 hover:scale-105 dark:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* ✅ Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
       <button 
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
  aria-label="Toggle Theme"
>
  {theme === "light" ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )}
</button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-bold bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-all shadow-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white text-sm font-bold px-7 py-3 rounded-xl hover:bg-slate-700 transition-all shadow-md"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={getDashboardLink()}
                className="text-sm font-bold bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-all shadow-md"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-bold bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all shadow-md"
              >
                Logout
              </button>

             
            </>

            
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-700 hover:text-white rounded-lg transition-all"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-600 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {/* Theme Toggle Button for Mobile */}
    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Theme Mode</span>
      <button 
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all shadow-sm"
        aria-label="Toggle Theme"
      >
        {theme === "light" ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>
    </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold border-b pb-3 ${
                  isActive
                    ? "text-blue-600 border-blue-100 dark:border-slate-600"
                    : "text-slate-500 hover:text-blue-600 border-slate-50 dark:border-slate-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="grid grid-cols-2 gap-4 pt-4">
            
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-[12px] font-bold py-3 rounded-xl bg-blue-600 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-[12px] font-bold text-white py-3 rounded-xl bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsOpen(false)}
                  className="col-span-2 text-center text-[12px] font-bold py-3 rounded-xl bg-blue-600 text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="col-span-2 text-center text-[12px] font-bold py-3 rounded-xl bg-red-500 text-white"
                >
                  Logout
                </button>
              </>
              
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;