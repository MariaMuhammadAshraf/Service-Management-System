import React from 'react';
import { Link } from 'react-router-dom';
// import { useTheme } from '../ThemeContext';
import { 
    Mail, MapPin, Phone, Globe, Share2, 
  MessageSquare, ChevronRight, ExternalLink 
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6 mt-auto dark:bg-slate-900 dark:border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12">
          
          {/* 1. Brand Section */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
             <span className="text-white font-black text-lg">SB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 leading-none dark:text-white">Service Booking</span>
                <span className="text-[8px] font-black uppercase text-blue-600 tracking-wider">Management System</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Karachi's premier and most reliable service management platform. 
              We bring expert professionals right to your doorstep.
            </p>
            {/* Social Icons with Transitions */}
            <div className="flex gap-3">
              {[
                { icon: <Globe size={18} />, label: "Web" },
                { icon: <Share2 size={18} />, label: "Share" },
                { icon: <MessageSquare size={18} />, label: "Chat" }
              ].map((social, idx) => (
                <div key={idx} className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-blue-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm">
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Quick Links with Hover Effect */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Booking'].map((item) => (
                <li key={item} className="group">
                  <Link 
                    to={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '')}`} 
                    className="text-slate-500 hover:text-blue-600 text-sm flex items-center gap-0 group-hover:gap-2 transition-all duration-300"
                  >
                    <ChevronRight size={14} className="opacity-50 group-hover:opacity-100 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support Section */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQs'].map((link) => (
                <li key={link} className="hover:text-blue-600 cursor-pointer transition-colors duration-300 flex items-center gap-2">
                  <ExternalLink size={12} className="text-slate-300" />
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                  <MapPin className="text-slate-400 group-hover:text-white transition-colors" size={16} />
                </div>
                <span className="text-slate-500 text-sm   transition-colors">Karachi, Sindh, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                  <Phone className="text-slate-400 group-hover:text-white transition-colors" size={16} />
                </div>
                <span className="text-slate-500 text-sm   transition-colors">+92 327 3880100</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                  <Mail className="text-slate-400 group-hover:text-white transition-colors" size={16} />
                </div>
                <span className="text-slate-500 text-sm   transition-colors">support@service.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Improved for Mobile */}
        <div className="pt-8 border-t border-slate-50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            © {currentYear} Karachi Service Management. All Rights Reserved.
          </p>
          <p className="text-[9px] font-black text-slate-400 tracking-wider flex items-center gap-2">
            DESIGNED & DEVELOPED BY 
            <span className="text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-white  px-2 py-1 rounded">Maria Arbiani</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;