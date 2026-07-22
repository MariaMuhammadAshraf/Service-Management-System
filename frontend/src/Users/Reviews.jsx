// import React, { useEffect, useState } from "react";
// import { Star } from "lucide-react";
// import axios from "axios";

// const Reviews = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [reviews, setReviews] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [formData, setFormData] = useState({
//     serviceId: "",
//     rating: 5,
//     comment: ""
//   });

//   const fetchData = async () => {
//     try {
//       const bookingRes = await axios.get(
//         `http://https://service-management-system-xwcx.vercel.app/api/bookings/user/${storedUser.id}`
//       );

//       const completed = bookingRes.data.filter(
//         (b) => b.status === "Completed"
//       );

//       setBookings(completed);

//       const reviewRes = await axios.get(
//         `http://https://service-management-system-xwcx.vercel.app/api/reviews/user/${storedUser.id}`
//       );

//       setReviews(reviewRes.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (storedUser?.id) fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://https://service-management-system-xwcx.vercel.app/api/reviews", {
//         userId: storedUser.id,
//         serviceId: formData.serviceId,
//         rating: formData.rating,
//         comment: formData.comment
//       });

//       alert("Review Submitted ✅ (Waiting for admin approval)");
//       setFormData({ serviceId: "", rating: 5, comment: "" });
//       fetchData();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error submitting review");
//     }
//   };

//   return (
//     <div className="max-w-3xl space-y-10">

//       {bookings.length > 0 && (
//         <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
//           <h3 className="text-lg font-black uppercase mb-6">
//             Leave a Review
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <select
//               required
//               value={formData.serviceId}
//               onChange={(e) =>
//                 setFormData({ ...formData, serviceId: e.target.value })
//               }
//               className="w-full p-4 rounded-2xl bg-slate-50 font-bold"
//             >
//               <option value="">Select Completed Service</option>
//               {bookings.map((b) => (
//                 <option key={b._id} value={b.serviceId._id}>
//                   {b.serviceId.title}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={formData.rating}
//               onChange={(e) =>
//                 setFormData({ ...formData, rating: Number(e.target.value) })
//               }
//               className="w-full p-4 rounded-2xl bg-slate-50 font-bold"
//             >
//               {[5,4,3,2,1].map((r) => (
//                 <option key={r} value={r}>{r} Stars</option>
//               ))}
//             </select>

//             <textarea
//               required
//               value={formData.comment}
//               onChange={(e) =>
//                 setFormData({ ...formData, comment: e.target.value })
//               }
//               className="w-full p-4 rounded-2xl bg-slate-50 font-bold"
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase"
//             >
//               Submit Review
//             </button>
//           </form>
//         </div>
//       )}

//       <div className="space-y-4">
//         {reviews.map((review) => (
//           <div key={review._id} className="bg-white p-6 rounded-[2rem] border shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="font-black uppercase">
//                 {review.serviceId?.title}
//               </h4>
//               <div className="flex gap-1 text-yellow-400">
//                 {[...Array(review.rating)].map((_, i) => (
//                   <Star key={i} size={14} fill="currentColor" />
//                 ))}
//               </div>
//             </div>
//             <p className="text-sm italic">"{review.comment}"</p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Reviews;











import React, { useEffect, useState } from "react";
import { Star, MessageSquarePlus, Sparkles, CheckCircle2, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Reviews = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: "",
    rating: 5,
    comment: ""
  });

  const fetchData = async () => {
    try {
      const bookingRes = await axios.get(
        `http://https://service-management-system-xwcx.vercel.app/api/bookings/user/${storedUser.id}`
      );

      const completed = bookingRes.data.filter(
        (b) => b.status === "Completed"
      );

      setBookings(completed);

      const reviewRes = await axios.get(
        `http://https://service-management-system-xwcx.vercel.app/api/reviews/user/${storedUser.id}`
      );

      setReviews(reviewRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (storedUser?.id) fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://https://service-management-system-xwcx.vercel.app/api/reviews", {
        userId: storedUser.id,
        serviceId: formData.serviceId,
        rating: formData.rating,
        comment: formData.comment
      });

      alert("Review Submitted ✅ (Waiting for admin approval)");
      setFormData({ serviceId: "", rating: 5, comment: "" });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting review");
    }
  };

  return (
    <div className="w-full   space-y-10 p-2 sm:p-4 animate-in fade-in duration-700 bg-transparent text-slate-900">
      
      {/* Header Matrix Layout */}
      <div className="pb-2 border-b border-slate-100">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">
          Feedback Panel
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">
          Service <span className="text-blue-600">Reviews</span> 
        </h2>
      </div>

      {/* Section 1: Leave A Review Form Container */}
      <AnimatePresence mode="popLayout">
        {bookings.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-[1.5px] overflow-hidden rounded-[2.5rem] shadow-[0_15px_40px_rgba(15,23,42,0.03)] bg-white group"
          >
            {/* Infinite Rotating Conic Glow */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_180deg,transparent_240deg,transparent_360deg)] opacity-100 pointer-events-none"
            />

            {/* Internal Glass Body Form */}
            <div className="relative w-full h-full bg-gradient-to-br from-white via-white shadow-lg shadow-slate-900/20 to-slate-50/50 backdrop-blur-xl p-6 sm:p-8 rounded-[2.4rem] z-10 border border-white space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <MessageSquarePlus size={20} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-800">
                  Leave a Review
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Select Completed Service Dropdown */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block px-1">
                    Select Executed Protocol
                  </label>
                  <select
                    required
                    value={formData.serviceId}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceId: e.target.value })
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-xs sm:text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase tracking-wide cursor-pointer"
                  >
                    <option value="" className="normal-case">Select Completed Service</option>
                    {bookings.map((b) => (
                      <option key={b._id} value={b.serviceId._id}>
                        {b.serviceId.title ? b.serviceId.title.replace(/\\'/g, "'") : "Premium Service"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star Metric Selection Row Instead of Dull Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block px-1">
                    Assign Rating Score
                  </label>
                  <div className="flex items-center gap-2 p-4 bg-slate-50/80 border border-slate-200/60 rounded-2xl">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <motion.button
                        key={starValue}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFormData({ ...formData, rating: starValue })}
                        className="text-amber-400 transition-colors"
                      >
                        <Star 
                          size={24} 
                          fill={starValue <= formData.rating ? "currentColor" : "transparent"} 
                          className="stroke-amber-400 stroke-[2px]"
                        />
                      </motion.button>
                    ))}
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-2">
                      ({formData.rating} Stars Chosen)
                    </span>
                  </div>
                </div>

                {/* Comment Area Box */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block px-1">
                    Operational Feedback / Review Details
                  </label>
                  <textarea
                    required
                    placeholder="Describe your premium service experience here..."
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    rows={4}
                    className="w-full p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Submit Action Control */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full relative hover:bg-slate-900 bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <span>Submit Review</span>
                  <Sparkles size={13} className="opacity-70" />
                </motion.button>

              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 2: Historical Review List Nodes */}
      <div className="space-y-5">
        
        <div className="flex items-center gap-2.5 px-1">
          <MessageSquareText size={16} className="text-blue-600" />
          <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
            Your Past Transmission Matrix Reviews
          </h3>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {reviews.map((review, index) => {
              const displayTitle = review.serviceId?.title ? review.serviceId.title.replace(/\\'/g, "'") : "Premium Protocol Service";

              return (
                <motion.div
                  key={review._id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  className="relative p-[1.5px] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.15)] bg-white group"
                >
                  {/* Subtle Always-Active Rotating Neon Edge Ring for Listed Logs */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                    className="absolute inset-[-180%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_160deg,#e2e8f0_180deg,transparent_200deg,transparent_360deg)] group-hover:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_160deg,#3b82f6_180deg,transparent_200deg,transparent_360deg)] transition-all duration-500 opacity-100 pointer-events-none"
                  />

                  {/* Internal Log Node Frame */}
                  <div className="relative w-full h-full bg-gradient-to-r from-white via-white to-slate-50/30 backdrop-blur-xl p-5 sm:p-6 rounded-[1.95rem] z-10 border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Log Details Container */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="font-black text-base sm:text-lg text-slate-800 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                          {displayTitle}
                        </h4>
                        
                        {/* Approval Verification Static Badge */}
                        <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/80">
                          <CheckCircle2 size={9} fill="currentColor" className="text-white" /> Active Log
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-500 italic leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>

                    {/* Assigned Star Scores Display Cluster */}
                    <div className="flex gap-0.5 p-2 bg-amber-50/50 border border-amber-100/60 rounded-xl shrink-0 self-start sm:self-center shadow-sm">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" className="text-amber-400 stroke-amber-400" />
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty Records State */}
          {reviews.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-slate-50/50 border border-dashed border-slate-200 rounded-[2rem]"
            >
              <MessageSquareText className="mx-auto text-slate-300 mb-3" size={28} />
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">
                No past feedback matrices submitted yet.
              </p>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Reviews;