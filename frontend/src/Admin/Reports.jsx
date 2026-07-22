 




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { 
//   FileText, Download, TrendingUp, DollarSign, 
//   Activity, Calendar, CheckCircle, Loader2 
// } from 'lucide-react';
// import { ResponsiveBar } from '@nivo/bar';
// import { ResponsivePie } from '@nivo/pie';
// import toast from 'react-hot-toast';

// const API_BASE = "http://localhost:5000/api";

// // --- Framer Motion Animation Variants ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
// };

// const Reports = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExporting, setIsExporting] = useState(false);
//   const [timeRange, setTimeRange] = useState('6M');
//   const [rawBookings, setRawBookings] = useState([]);
//   const [servicesMap, setServicesMap] = useState({});
  
//   const [metrics, setMetrics] = useState({
//     totalRevenue: 0,
//     totalBookings: 0,
//     avgValue: 0,
//     completionRate: 0
//   });

//   const [chartData, setChartData] = useState({
//     revenue: [],
//     category: [],
//     status: []
//   });

//   // ✅ Fetch and Calculate Dynamic Data
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [bookRes, servRes] = await Promise.all([
//           axios.get(`${API_BASE}/bookings`),
//           axios.get(`${API_BASE}/services`)
//         ]);

//         const bookings = bookRes.data;
//         const services = servRes.data;

//         const sMap = {};
//         services.forEach(s => { sMap[s._id] = s; });
//         setServicesMap(sMap);
//         setRawBookings(bookings);

//         let revenue = 0;
//         let completedCount = 0;
        
//         const monthlyRevMap = {};
//         const catCounts = {};
//         const statusCounts = {};

//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         monthNames.forEach(m => monthlyRevMap[m] = 0);

//         bookings.forEach(b => {
//           const serviceIdStr = b.serviceId?._id || b.serviceId;
//           const matchedService = sMap[serviceIdStr] || {};
          
//           const status = b.status || 'Pending';
//           const price = Number(b.price || matchedService.price || 0);
//           const category = matchedService.category || 'General';
          
//           let dateObj = new Date(b.date || b.createdAt || Date.now());
//           if (isNaN(dateObj.getTime())) dateObj = new Date();
//           const monthStr = monthNames[dateObj.getMonth()];

//           statusCounts[status] = (statusCounts[status] || 0) + 1;
//           catCounts[category] = (catCounts[category] || 0) + 1;

//           if (status.toLowerCase() === 'completed') {
//             revenue += price;
//             completedCount++;
//             if (monthlyRevMap[monthStr] !== undefined) {
//               monthlyRevMap[monthStr] += price;
//             }
//           }
//         });

//         const activeRevChart = monthNames
//           .filter(m => monthlyRevMap[m] > 0)
//           .map(month => ({ month, revenue: monthlyRevMap[month] }));

//         const catColors = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
//         const catChartData = Object.keys(catCounts).map((key, i) => ({
//           id: key,
//           label: key,
//           value: catCounts[key],
//           color: catColors[i % catColors.length]
//         }));

//         const statColors = { Completed: '#10b981', Pending: '#f59e0b', Cancelled: '#ef4444', 'In Progress': '#3b82f6', Archived: '#64748b' };
//         const statChartData = Object.keys(statusCounts)
//           .map(key => ({
//             id: key,
//             label: key,
//             value: statusCounts[key],
//             color: statColors[key] || '#94a3b8'
//           }));

//         setMetrics({
//           totalRevenue: revenue,
//           totalBookings: bookings.length,
//           avgValue: completedCount > 0 ? Math.round(revenue / completedCount) : 0,
//           completionRate: bookings.length > 0 ? Math.round((completedCount / bookings.length) * 100) : 0
//         });

//         setChartData({
//           revenue: activeRevChart.length > 0 ? activeRevChart : [{ month: 'No Data', revenue: 0 }],
//           category: catChartData.length > 0 ? catChartData : [{ id: 'Empty', label: 'No Data', value: 1, color: '#e2e8f0' }],
//           status: statChartData.length > 0 ? statChartData : [{ id: 'Empty', label: 'No Data', value: 1, color: '#e2e8f0' }]
//         });

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Fetch Data Error:", error);
//         toast.error("Failed to load real-time reports.");
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // ✅ Fully Working CSV Export Function
//   const handleExportCSV = () => {
//     if (rawBookings.length === 0) {
//       toast.error("No data available to export!");
//       return;
//     }

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = ["Booking ID", "Client Name", "Client Email", "Provider Name", "Service Title", "Category", "Status", "Date", "Price (Rs)"];
      
//       const rows = rawBookings.map(b => {
//         const serviceIdStr = b.serviceId?._id || b.serviceId;
//         const matchedService = servicesMap[serviceIdStr] || {};
        
//         return [
//           b._id,
//           `"${b.userId?.name || 'N/A'}"`,
//           `"${b.userId?.email || 'N/A'}"`,
//           `"${b.providerId?.name || 'Unassigned'}"`,
//           `"${b.serviceId?.title || matchedService.title || 'N/A'}"`,
//           `"${matchedService.category || 'General'}"`,
//           b.status,
//           `"${b.date || new Date(b.createdAt).toLocaleDateString()}"`,
//           b.price || matchedService.price || 0
//         ];
//       });

//       const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", `Karachi_Service_Network_Report_${new Date().toISOString().split('T')[0]}.csv`);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setIsExporting(false);
//       toast.success("CSV File Downloaded Successfully! 🎉");
//     }, 1500);
//   };

//   const today = new Date();
//   const recentReports = [
//     { id: 'REP-001', name: 'Latest Financial Summary', date: today.toLocaleDateString() },
//     { id: 'REP-002', name: 'Provider Performance Matrix', date: new Date(today.setDate(today.getDate() - 2)).toLocaleDateString() },
//     { id: 'REP-003', name: 'User Growth Statistics', date: new Date(today.setDate(today.getDate() - 5)).toLocaleDateString() },
//   ];

//   if (isLoading) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-[#f4f7fe]">
//         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
//           <Loader2 className="w-12 h-12 text-blue-600" />
//         </motion.div>
//         <p className="mt-4 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] animate-pulse">Compiling Database Analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div 
//       initial="hidden" animate="show" variants={containerVariants}
//       className="min-h-screen bg-[#f4f7fe] font-sans p-4 md:p-8 overflow-x-hidden"
//     >
//       <div className="max-w-[1600px] mx-auto space-y-8">

//         {/* ✅ HEADER SECTION */}
//         <motion.div 
//           variants={itemVariants}
//           className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5 relative overflow-hidden"
//         >
//           <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">Business Reports</h2>
//             <p className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
//               <Activity size={12} className="text-blue-500" /> Real-time Analytics & Export
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
//             <select 
//               value={timeRange} onChange={(e) => setTimeRange(e.target.value)}
//               className="w-full sm:w-auto bg-slate-50 border border-slate-100 text-slate-600 px-5 sm:px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-600/10 cursor-pointer transition-all"
//             >
//               <option value="1M">Last 1 Month</option>
//               <option value="6M">Last 6 Months</option>
//               <option value="1Y">Last 1 Year</option>
//               <option value="ALL">All Time</option>
//             </select>

//             <motion.button 
//               whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }} 
//               whileTap={{ scale: 0.98 }}
//               onClick={handleExportCSV} disabled={isExporting}
//               className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
//               {isExporting ? 'Generating File...' : 'Export to CSV'}
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* ✅ DYNAMIC KPI STATS CARDS */}
//         <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {[
//             { title: "Total Revenue", value: `Rs ${metrics.totalRevenue.toLocaleString()}`, icon: <DollarSign size={24}/>, color: "text-blue-500", bg: "bg-blue-50", trend: "Growth" },
//             { title: "Total Bookings", value: metrics.totalBookings, icon: <Calendar size={24}/>, color: "text-purple-500", bg: "bg-purple-50", trend: "Volume" },
//             { title: "Avg. Service Value", value: `Rs ${metrics.avgValue.toLocaleString()}`, icon: <TrendingUp size={24}/>, color: "text-emerald-500", bg: "bg-emerald-50", trend: "Value" },
//             { title: "Completion Rate", value: `${metrics.completionRate}%`, icon: <CheckCircle size={24}/>, color: "text-orange-500", bg: "bg-orange-50", trend: "Success" },
//           ].map((stat, i) => (
//             <motion.div 
//               key={i} variants={itemVariants}
//               whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1)" }}
//               className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-white shadow-xl shadow-blue-900/5 transition-all"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[1rem] sm:rounded-[1.2rem] flex items-center justify-center shadow-sm ${stat.bg} ${stat.color}`}>{stat.icon}</div>
//                 <span className="text-blue-500 text-[8px] sm:text-[9px] font-black tracking-widest uppercase bg-blue-50 px-2 py-1 rounded-lg border border-blue-100/50">{stat.trend}</span>
//               </div>
//               <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight truncate">{stat.value}</h3>
//               <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.title}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* ✅ DYNAMIC CHARTS SECTION */}
//         <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
//           {/* Main Bar Chart */}
//           <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5 relative w-full overflow-hidden">
//             <div className="mb-6">
//               <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Revenue Growth</h3>
//               <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Financial Performance</p>
//             </div>
//             <div className="h-[250px] sm:h-[300px] w-full min-w-[300px] overflow-x-auto animate-pulse">
//               <ResponsiveBar
//                 data={chartData.revenue}
//                 keys={['revenue']} 
//                 indexBy="month"
//                 margin={{ top: 10, right: 10, bottom: 40, left: 60 }}
//                 padding={0.8}
//                 valueScale={{ type: 'linear' }}
//                 colors={['#3b82f6']}
//                 borderRadius={8}
//                 enableLabel={false}
//                 theme={{
//                   axis: { ticks: { text: { fill: "#94a3b8", fontWeight: 800, fontSize: window.innerWidth < 600 ? 9 : 11 } } },
//                   grid: { line: { stroke: "#f1f5f9", strokeWidth: 1 } },
//                   tooltip: { container: { background: "#ffffff", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", color: "#1e293b", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" } }
//                 }}
//                 animate={true}
//               />
//             </div>
//           </motion.div>

//           {/* Doughnut Chart */}
//           <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5 flex flex-col">
//             <div className="mb-6">
//               <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Service Categories</h3>
//               <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Demand by Department</p>
//             </div>
//             <div className="h-[200px] sm:h-[250px] w-full relative flex-grow">
//               <ResponsivePie
//                 data={chartData.category}
//                 margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
//                 innerRadius={0.7}
//                 padAngle={3}
//                 cornerRadius={10}
//                 colors={{ datum: 'data.color' }}
//                 enableArcLinkLabels={false}
//                 enableArcLabels={false}
//                 animate={true}
//                 theme={{ tooltip: { container: { borderRadius: "12px", fontWeight: "bold", fontSize: "12px", color: "#1e293b" } } }}
//               />
//               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                 <span className="text-2xl sm:text-3xl font-black text-slate-800">{metrics.totalBookings > 0 ? '100%' : '0%'}</span>
//                 <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Market</span>
//               </div>
//             </div>
//             <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
//               {chartData.category.slice(0, 4).map(c => (
//                 <div key={c.id} className="flex items-center gap-1 sm:gap-2">
//                   <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: c.color }} />
//                   <span className="text-[8px] sm:text-[10px] font-black text-slate-600 uppercase tracking-widest">{c.label}</span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//         </motion.div>

//         <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
//           {/* Pie Chart */}
//           <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5">
//              <div className="mb-6">
//               <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Booking Status</h3>
//               <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Workflow</p>
//             </div>
//             <div className="h-[200px] sm:h-[220px] w-full">
//               <ResponsivePie
//                 data={chartData.status}
//                 margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
//                 innerRadius={0}
//                 padAngle={2}
//                 cornerRadius={8}
//                 colors={{ datum: 'data.color' }}
//                 arcLabelsTextColor="#ffffff"
//                 enableArcLinkLabels={false}
//                 theme={{ tooltip: { container: { borderRadius: "12px", fontWeight: "bold", fontSize: "12px", color: "#1e293b" } } }}
//               />
//             </div>
//           </motion.div>

//           {/* Recent Generated Reports List */}
//           <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5">
//             <div className="flex justify-between items-center mb-6 sm:mb-8">
//               <div>
//                 <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Saved Reports</h3>
//                 <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">History of generated files</p>
//               </div>
//               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExportCSV} className="text-[9px] sm:text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 sm:px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
//                 Export New
//               </motion.button>
//             </div>

//             <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3 sm:space-y-4">
//               {recentReports.map((report) => (
//                 <motion.div variants={itemVariants} key={report.id} className="flex flex-row items-center justify-between p-4 sm:p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] group hover:bg-white hover:shadow-md transition-all">
//                   <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-white text-slate-400 rounded-[1rem] sm:rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:text-blue-500 transition-colors">
//                       <FileText size={18} className="sm:w-5 sm:h-5"/>
//                     </div>
//                     <div className="overflow-hidden">
//                       <h4 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight truncate">{report.name}</h4>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{report.id}</span>
//                         <div className="w-1 h-1 flex-shrink-0 rounded-full bg-slate-300" />
//                         <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{report.date}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <motion.button 
//                     whileHover={{ scale: 1.1, backgroundColor: "#eff6ff", color: "#3b82f6" }} whileTap={{ scale: 0.9 }}
//                     onClick={handleExportCSV} 
//                     className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 transition-all shadow-sm ml-2"
//                   >
//                     <Download size={14} className="sm:w-4 sm:h-4"/>
//                   </motion.button>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//         </motion.div>

//       </div>
//     </motion.div>
//   );
// };

// export default Reports;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FileText, Download, TrendingUp, DollarSign, 
  Activity, Calendar, CheckCircle, Loader2 
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import toast from 'react-hot-toast';

const API_BASE = "http://localhost:5000/api";

// --- Framer Motion Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [timeRange, setTimeRange] = useState('6M');
  const [rawBookings, setRawBookings] = useState([]);
  const [servicesMap, setServicesMap] = useState({});
  
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    avgValue: 0,
    completionRate: 0
  });

  const [chartData, setChartData] = useState({
    revenue: [],
    category: [],
    status: []
  });

  // ✅ Fetch and Calculate Dynamic Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookRes, servRes] = await Promise.all([
          axios.get(`${API_BASE}/bookings`),
          axios.get(`${API_BASE}/services`)
        ]);

        const bookings = bookRes.data;
        const services = servRes.data;

        const sMap = {};
        services.forEach(s => { sMap[s._id] = s; });
        setServicesMap(sMap);
        setRawBookings(bookings);

        let revenue = 0;
        let completedCount = 0;
        
        const monthlyRevMap = {};
        const catCounts = {};
        const statusCounts = {};

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        monthNames.forEach(m => monthlyRevMap[m] = 0);

        bookings.forEach(b => {
          const serviceIdStr = b.serviceId?._id || b.serviceId;
          const matchedService = sMap[serviceIdStr] || {};
          
          const status = b.status || 'Pending';
          const price = Number(b.price || matchedService.price || 0);
          const category = matchedService.category || 'General';
          
          let dateObj = new Date(b.date || b.createdAt || Date.now());
          if (isNaN(dateObj.getTime())) dateObj = new Date();
          const monthStr = monthNames[dateObj.getMonth()];

          statusCounts[status] = (statusCounts[status] || 0) + 1;
          catCounts[category] = (catCounts[category] || 0) + 1;

          if (status.toLowerCase() === 'completed') {
            revenue += price;
            completedCount++;
            if (monthlyRevMap[monthStr] !== undefined) {
              monthlyRevMap[monthStr] += price;
            }
          }
        });

        const activeRevChart = monthNames
          .filter(m => monthlyRevMap[m] > 0)
          .map(month => ({ month, revenue: monthlyRevMap[month] }));

        const catColors = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
        const catChartData = Object.keys(catCounts).map((key, i) => ({
          id: key,
          label: key,
          value: catCounts[key],
          color: catColors[i % catColors.length]
        }));

        const statColors = { Completed: '#10b981', Pending: '#f59e0b', Cancelled: '#ef4444', 'In Progress': '#3b82f6', Archived: '#64748b' };
        const statChartData = Object.keys(statusCounts)
          .map(key => ({
            id: key,
            label: key,
            value: statusCounts[key],
            color: statColors[key] || '#94a3b8'
          }));

        setMetrics({
          totalRevenue: revenue,
          totalBookings: bookings.length,
          avgValue: completedCount > 0 ? Math.round(revenue / completedCount) : 0,
          completionRate: bookings.length > 0 ? Math.round((completedCount / bookings.length) * 100) : 0
        });

        setChartData({
          revenue: activeRevChart.length > 0 ? activeRevChart : [{ month: 'No Data', revenue: 0 }],
          category: catChartData.length > 0 ? catChartData : [{ id: 'Empty', label: 'No Data', value: 1, color: '#e2e8f0' }],
          status: statChartData.length > 0 ? statChartData : [{ id: 'Empty', label: 'No Data', value: 1, color: '#e2e8f0' }]
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Fetch Data Error:", error);
        toast.error("Failed to load real-time reports.");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ Fully Working CSV Export Function
  const handleExportCSV = () => {
    if (rawBookings.length === 0) {
      toast.error("No data available to export!");
      return;
    }

    setIsExporting(true);

    setTimeout(() => {
      const headers = ["Booking ID", "Client Name", "Client Email", "Provider Name", "Service Title", "Category", "Status", "Date", "Price (Rs)"];
      
      const rows = rawBookings.map(b => {
        const serviceIdStr = b.serviceId?._id || b.serviceId;
        const matchedService = servicesMap[serviceIdStr] || {};
        
        return [
          b._id,
          `"${b.userId?.name || 'N/A'}"`,
          `"${b.userId?.email || 'N/A'}"`,
          `"${b.providerId?.name || 'Unassigned'}"`,
          `"${b.serviceId?.title || matchedService.title || 'N/A'}"`,
          `"${matchedService.category || 'General'}"`,
          b.status,
          `"${b.date || new Date(b.createdAt).toLocaleDateString()}"`,
          b.price || matchedService.price || 0
        ];
      });

      const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Karachi_Service_Network_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      toast.success("CSV File Downloaded Successfully! 🎉");
    }, 1500);
  };

  const today = new Date();
  const recentReports = [
    { id: 'REP-001', name: 'Latest Financial Summary', date: today.toLocaleDateString() },
    { id: 'REP-002', name: 'Provider Performance Matrix', date: new Date(today.setDate(today.getDate() - 2)).toLocaleDateString() },
    { id: 'REP-003', name: 'User Growth Statistics', date: new Date(today.setDate(today.getDate() - 5)).toLocaleDateString() },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f4f7fe]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Loader2 className="w-12 h-12 text-blue-600" />
        </motion.div>
        <p className="mt-4 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] animate-pulse">Compiling Database Analytics...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden" animate="show" variants={containerVariants}
      className="min-h-screen bg-[#f4f7fe] font-sans p-4 md:p-8 overflow-x-hidden"
    >
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* ✅ HEADER SECTION */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">Business Reports</h2>
            <p className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
              <Activity size={12} className="text-blue-500" /> Real-time Analytics & Export
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <select 
              value={timeRange} onChange={(e) => setTimeRange(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-100 text-slate-600 px-5 sm:px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-600/10 cursor-pointer transition-all"
            >
              <option value="1M">Last 1 Month</option>
              <option value="6M">Last 6 Months</option>
              <option value="1Y">Last 1 Year</option>
              <option value="ALL">All Time</option>
            </select>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }} 
              whileTap={{ scale: 0.98 }}
              onClick={handleExportCSV} disabled={isExporting}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {isExporting ? 'Generating File...' : 'Export to CSV'}
            </motion.button>
          </div>
        </motion.div>

        {/* ✅ DYNAMIC KPI STATS CARDS */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: "Total Revenue", value: `Rs ${metrics.totalRevenue.toLocaleString()}`, icon: <DollarSign size={24}/>, color: "text-blue-500", bg: "bg-blue-50", trend: "Growth" },
            { title: "Total Bookings", value: metrics.totalBookings, icon: <Calendar size={24}/>, color: "text-purple-500", bg: "bg-purple-50", trend: "Volume" },
            { title: "Avg. Service Value", value: `Rs ${metrics.avgValue.toLocaleString()}`, icon: <TrendingUp size={24}/>, color: "text-emerald-500", bg: "bg-emerald-50", trend: "Value" },
            { title: "Completion Rate", value: `${metrics.completionRate}%`, icon: <CheckCircle size={24}/>, color: "text-orange-500", bg: "bg-orange-50", trend: "Success" },
          ].map((stat, i) => (
            <motion.div 
              key={i} variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1)" }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-white shadow-xl shadow-blue-900/5 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[1rem] sm:rounded-[1.2rem] flex items-center justify-center shadow-sm ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                <span className="text-blue-500 text-[8px] sm:text-[9px] font-black tracking-widest uppercase bg-blue-50 px-2 py-1 rounded-lg border border-blue-100/50">{stat.trend}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight truncate">{stat.value}</h3>
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ DYNAMIC CHARTS SECTION */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Main Bar Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5 relative w-full overflow-hidden">
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Revenue Growth</h3>
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Financial Performance</p>
            </div>
            <div className="h-[250px] sm:h-[300px] w-full min-w-[300px] overflow-x-auto animate-pulse">
              <ResponsiveBar
                data={chartData.revenue}
                keys={['revenue']} 
                indexBy="month"
                margin={{ top: 10, right: 10, bottom: 40, left: 60 }}
                padding={0.8}
                valueScale={{ type: 'linear' }}
                colors={['#3b82f6']}
                borderRadius={8}
                enableLabel={false}
                theme={{
                  axis: { ticks: { text: { fill: "#94a3b8", fontWeight: 800, fontSize: window.innerWidth < 600 ? 9 : 11 } } },
                  grid: { line: { stroke: "#f1f5f9", strokeWidth: 1 } },
                  tooltip: { container: { background: "#ffffff", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", color: "#1e293b", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" } }
                }}
                animate={true}
              />
            </div>
          </motion.div>

          {/* Doughnut Chart (WITH LIGHT INFINITE UP DOWN ANIMATION) */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Service Categories</h3>
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Demand by Department</p>
            </div>
            
            {/* Floating Animation Added Here */}
            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="h-[200px] sm:h-[250px] w-full relative flex-grow"
            >
              <ResponsivePie
                data={chartData.category}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                innerRadius={0.7}
                padAngle={3}
                cornerRadius={10}
                colors={{ datum: 'data.color' }}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                animate={true}
                theme={{ tooltip: { container: { borderRadius: "12px", fontWeight: "bold", fontSize: "12px", color: "#1e293b" } } }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-black text-slate-800">{metrics.totalBookings > 0 ? '100%' : '0%'}</span>
                <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Market</span>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
              {chartData.category.slice(0, 4).map(c => (
                <div key={c.id} className="flex items-center gap-1 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-[8px] sm:text-[10px] font-black text-slate-600 uppercase tracking-widest">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pie Chart (WITH LIGHT INFINITE UP DOWN ANIMATION) */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5">
             <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Booking Status</h3>
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Workflow</p>
            </div>
            
            {/* Floating Animation Added Here (With slight delay to look organic) */}
            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="h-[200px] sm:h-[220px] w-full"
            >
              <ResponsivePie
                data={chartData.status}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                innerRadius={0}
                padAngle={2}
                cornerRadius={8}
                colors={{ datum: 'data.color' }}
                arcLabelsTextColor="#ffffff"
                enableArcLinkLabels={false}
                theme={{ tooltip: { container: { borderRadius: "12px", fontWeight: "bold", fontSize: "12px", color: "#1e293b" } } }}
              />
            </motion.div>
          </motion.div>

          {/* Recent Generated Reports List */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Saved Reports</h3>
                <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">History of generated files</p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExportCSV} className="text-[9px] sm:text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 sm:px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
                Export New
              </motion.button>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3 sm:space-y-4">
              {recentReports.map((report) => (
                <motion.div variants={itemVariants} key={report.id} className="flex flex-row items-center justify-between p-4 sm:p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-white text-slate-400 rounded-[1rem] sm:rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:text-blue-500 transition-colors">
                      <FileText size={18} className="sm:w-5 sm:h-5"/>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight truncate">{report.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{report.id}</span>
                        <div className="w-1 h-1 flex-shrink-0 rounded-full bg-slate-300" />
                        <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{report.date}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#eff6ff", color: "#3b82f6" }} whileTap={{ scale: 0.9 }}
                    onClick={handleExportCSV} 
                    className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 transition-all shadow-sm ml-2"
                  >
                    <Download size={14} className="sm:w-4 sm:h-4"/>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </motion.div>
  );
};

export default Reports;