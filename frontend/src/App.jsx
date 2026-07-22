// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // General Components
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// // Website Pages
// import Home from './pages/Home';
// import Booking from './pages/Booking';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import About from './pages/About';
// import Services from './pages/Service';

// // User Dashboard Pages (As per your folder structure)
// import UserLayout from './Users/UserLayout';
// import Overview from './Users/Overview';
// import BrowseServices from './Users/BrowseServices';
// import MyBookings from './Users/MyBookings';
// import Reviews from './Users/Reviews';
// import Profile from './Users/Profile';

// // Admin Dashboard Pages (Based on your new folder)
// import AdminLayout from './Admin/AdminLayout'; // Ensure you have this file for Sidebar
// import AdminDashboard from './Admin/AdminDashboard';
// import ManageBookings from './Admin/ManageBookings';
// import ManageServices from './Admin/ManageServices';
// import ManageUsers from './Admin/ManageUsers';
// import Reports from './Admin/Reports';
// import ManageProviders from './Admin/ManageProviders';
// import ManageReviews from './Admin/ManageReviews';

// /* ====== PROVIDER PAGES ====== */
// import ProviderLayout from "./Provider/ProviderLayout";
// import ProviderDashboard from "./Provider/ProviderDashboard";
// import MyJobs from "./Provider/MyJobs";
// import Earnings from "./Provider/Earnings";
// import ProviderProfile from "./Provider/ProviderProfile";
// import ProviderReviews from './Provider/ProviderReviews';


// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
        
//         <Routes>
//           {/* --- PUBLIC ROUTES (With Navbar & Footer) --- */}
//           <Route path="*" element={
//             <>
//               <Navbar />
//               <main className="flex-grow">
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/about" element={<About />} />
//                   <Route path="/services" element={<Services />} />
//                   <Route path="/booking/:serviceId" element={<Booking />} /> ✅
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/signup" element={<Signup />} />
//                 </Routes>
//               </main>
//               <Footer />
//             </>
//           } />

//           {/* --- DASHBOARD ROUTES (No Main Navbar/Footer, uses Sidebar instead) --- */}
//           <Route path="/dashboard" element={<UserLayout />}>
//             <Route index element={<Overview />} />
//             <Route path="browse" element={<BrowseServices />} />
//             <Route path="bookings" element={<MyBookings />} />
//             <Route path="reviews" element={<Reviews />} />
//             <Route path="profile" element={<Profile />} />
//           </Route>


//           {/* --- ADMIN DASHBOARD (New Section) --- */}
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="services" element={<ManageServices />} />
//             <Route path="bookings" element={<ManageBookings />} />
//             <Route path="users" element={<ManageUsers />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="reviews" element={<ManageReviews />} />
//             <Route path="providers" element={<ManageProviders/>}/>
//           </Route>

//           {/* ===== Provider Routes ===== */}
//         <Route path="/provider" element={<ProviderLayout />}>
//          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
//           <Route path="jobs" element={<MyJobs />} />
//           <Route path="earnings" element={<Earnings />} />
//           <Route path="reviews" element={<ProviderReviews />} />
//          <Route path="/provider/profile" element={<ProviderProfile />} />
//         </Route>

//         </Routes>

//       </div>
//     </Router>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Service';

import UserLayout from './Users/UserLayout';
import Overview from './Users/Overview';
import BrowseServices from './Users/BrowseServices';
import MyBookings from './Users/MyBookings';
import Reviews from './Users/Reviews';
import Profile from './Users/Profile';

import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/AdminDashboard';
import ManageBookings from './Admin/ManageBookings';
import ManageServices from './Admin/ManageServices';
import ManageUsers from './Admin/ManageUsers';
import Reports from './Admin/Reports';
import ManageProviders from './Admin/ManageProviders';
import ManageReviews from './Admin/ManageReviews';

import ProviderLayout from "./Provider/ProviderLayout";
import ProviderDashboard from "./Provider/ProviderDashboard";
import MyJobs from "./Provider/MyJobs";
import Earnings from "./Provider/Earnings";
import ProviderProfile from "./Provider/ProviderProfile";
import ProviderReviews from './Provider/ProviderReviews';
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from './ThemeContext';
// Yahan humne apna naya WhatsApp widget import kiya hai
import WhatsAppWidget from './components/WhatsAppWidget';
 

function App() {
  return (
    <ThemeProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
             {/* ✅ GLOBAL TOASTER */}
        <Toaster position="top-right" reverseOrder={false} />


        <Routes>

          {/* ✅ PUBLIC ROUTES */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
          <Route path="/booking/:serviceId" element={<><Navbar /><Booking /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />

          {/* ✅ USER DASHBOARD (Protected) */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="browse" element={<BrowseServices />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* ✅ ADMIN DASHBOARD (Protected) */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reviews" element={<ManageReviews />} />
            <Route path="providers" element={<ManageProviders />} />
          </Route>

          {/* ✅ PROVIDER DASHBOARD (Protected) */}
          <Route
            path="/provider/*"
            element={
              <ProtectedRoute allowedRole="provider">
                <ProviderLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<ProviderDashboard />} />
            <Route path="jobs" element={<MyJobs />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="reviews" element={<ProviderReviews />} />
            <Route path="profile" element={<ProviderProfile />} />
          </Route>

        </Routes>

      </div>
      {/* WhatsApp Floating Button - Yeh website ke har page par bottom-right par show hoga */}
      <WhatsAppWidget />
    </Router>
    </ThemeProvider>
     
    
  );
}

export default App;