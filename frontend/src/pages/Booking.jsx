 





// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Calendar, ChevronRight } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

// const BookingPage = () => {
//   const { serviceId } = useParams();
//   const navigate = useNavigate();

//   const [selectedService, setSelectedService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     date: "",
//     time: "",
//     address: "",
//     fullName: "",
//     phone: "",
//   });

//   // ✅ Fetch selected service
//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         const res = await axios.get(`${API}/services/${serviceId}`);
//         setSelectedService(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Service not found ❌");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchService();
//   }, [serviceId]);

//   // ✅ Handle form change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ✅ Confirm Booking
//   const handleConfirmBooking = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     if (!formData.date || !formData.time) {
//       toast.error("Please select date & time");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       await axios.post(`${API}/bookings`, {
//         userId: user.id,
//         serviceId: serviceId,
//         date: formData.date,
//         time: formData.time,
//       });

//       toast.success("Booking Created Successfully ✅");

//       // ✅ Optional: Update booking count globally (if needed later)

//       setTimeout(() => {
//         navigate("/dashboard/bookings");
//       }, 1000);

//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Booking Failed ❌");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ✅ Cancel booking (future use if needed)
//   const cancelBooking = async (bookingId) => {
//     try {
//       await axios.put(`${API}/bookings/${bookingId}/cancel`);
//       toast.success("Booking cancelled ✅");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error occurred");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="font-bold text-slate-500">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
//       <div className="max-w-5xl mx-auto">

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* ✅ LEFT FORM */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
//             >
//               <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
//                 <Calendar className="text-blue-600" /> Appointment Details
//               </h2>

//               <div className="space-y-6">

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                   <div>
//                     <label className="text-xs font-black text-slate-400 uppercase ml-1">
//                       Preferred Date
//                     </label>
//                     <input
//                       type="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleChange}
//                       className="w-full mt-2 px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs font-black text-slate-400 uppercase ml-1">
//                       Preferred Time
//                     </label>
//                     <select
//                       name="time"
//                       value={formData.time}
//                       onChange={handleChange}
//                       className="w-full mt-2 px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600"
//                     >
//                       <option value="">Select Time</option>
//                       <option>09:00 AM - 12:00 PM</option>
//                       <option>12:00 PM - 03:00 PM</option>
//                       <option>03:00 PM - 06:00 PM</option>
//                       <option>06:00 PM - 09:00 PM</option>
//                     </select>
//                   </div>

//                 </div>

//                 <textarea
//                   name="address"
//                   placeholder="Service Address"
//                   rows="3"
//                   onChange={handleChange}
//                   className="w-full px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600"
//                 />

//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full Name"
//                   onChange={handleChange}
//                   className="w-full px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600"
//                 />

//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Contact Number"
//                   onChange={handleChange}
//                   className="w-full px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600"
//                 />

//               </div>
//             </motion.div>
//           </div>

//           {/* ✅ RIGHT SUMMARY */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl sticky top-28"
//             >
//               <h3 className="text-xl font-black mb-6 border-b border-white/10 pb-4">
//                 Booking Summary
//               </h3>

//               <div className="space-y-4 mb-8">
//                 <div className="flex justify-between">
//                   <span className="text-slate-400 font-bold">Service:</span>
//                   <span className="font-black text-blue-400">
//                     {selectedService?.title}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-lg">
//                   <span className="text-slate-400 font-bold">Service Fee:</span>
//                   <span className="font-black text-2xl">
//                     Rs. {selectedService?.price}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleConfirmBooking}
//                 disabled={submitting}
//                 className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
//               >
//                 {submitting ? "Processing..." : "Confirm Booking"}
//                 <ChevronRight />
//               </button>

//               <p className="text-[10px] text-center text-slate-500 mt-6 font-bold uppercase tracking-widest">
//                 Payment will be collected after service
//               </p>
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;



import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://https://service-management-system-xwcx.vercel.app/api/api";

const Booking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${API}/services/${serviceId}`);
        setSelectedService(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Service not found ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { navigate("/login"); return; }
    if (!formData.date || !formData.time) { toast.error("Please select date & time"); return; }

    try {
      setSubmitting(true);
      await axios.post(`${API}/bookings`, {
        userId: user.id,
        serviceId: serviceId,
        ...formData
      });
      toast.success("Booking Created Successfully ✅");
      setTimeout(() => navigate("/dashboard/bookings"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking Failed ❌");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-900">
        <p className="font-bold text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 pt-28 pb-20 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT FORM */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <Calendar className="text-blue-600" /> Appointment Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Preferred Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange}
                      className="w-full mt-2 px-4 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Preferred Time</label>
                    <select name="time" value={formData.time} onChange={handleChange}
                      className="w-full mt-2 px-4 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">Select Time</option>
                      <option>09:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 03:00 PM</option>
                      <option>03:00 PM - 06:00 PM</option>
                      <option>06:00 PM - 09:00 PM</option>
                    </select>
                  </div>
                </div>

                <textarea name="address" placeholder="Service Address" rows="3" onChange={handleChange}
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600" />
                
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange}
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600" />
                
                <input type="tel" name="phone" placeholder="Contact Number" onChange={handleChange}
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </motion.div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:col-span-1">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-8 rounded-[2.5rem] shadow-xl sticky top-28 border border-slate-100 dark:border-slate-700 transition-colors duration-300"
  >
    <h3 className="text-xl font-black mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
      Booking Summary
    </h3>
    
    <div className="space-y-4 mb-8">
      <div className="flex justify-between">
        <span className="text-slate-500 dark:text-slate-400 font-bold">Service:</span>
        <span className="font-black text-blue-600 dark:text-blue-400">
          {selectedService?.title}
        </span>
      </div>
      
      <div className="flex justify-between text-lg">
        <span className="text-slate-500 dark:text-slate-400 font-bold">Service Fee:</span>
        <span className="font-black text-2xl text-slate-900 dark:text-white">
          Rs. {selectedService?.price}
        </span>
      </div>
    </div>

    <button 
      onClick={handleConfirmBooking} 
      disabled={submitting}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {submitting ? "Processing..." : "Confirm Booking"} <ChevronRight />
    </button>

    <p className="text-[10px] text-center text-slate-400 mt-6 font-bold uppercase tracking-widest">
      Payment will be collected after service
    </p>
  </motion.div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Booking;