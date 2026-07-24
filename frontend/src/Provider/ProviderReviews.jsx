// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Star, AlertTriangle } from "lucide-react";

// const ProviderReviews = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [reviews, setReviews] = useState([]);
//   const [average, setAverage] = useState(0);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(
//         `http://https://service-management-system-xwcx.vercel.app/api/api/reviews/provider/${storedUser.id}`
//       );

//       setReviews(res.data);

//       if (res.data.length > 0) {
//         const avg =
//           res.data.reduce((acc, r) => acc + r.rating, 0) /
//           res.data.length;

//         setAverage(avg.toFixed(1));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (storedUser?.id) fetchReviews();
//   }, []);

//   // ✅ Rating breakdown
//   const ratingBreakdown = [5,4,3,2,1].map(star => ({
//     star,
//     count: reviews.filter(r => r.rating === star).length
//   }));

//   const handleReply = async (id, reply) => {
//     await axios.put(
//       `http://https://service-management-system-xwcx.vercel.app/api/api/reviews/${id}/reply`,
//       { reply }
//     );
//     fetchReviews();
//   };

//   const handleReport = async (id) => {
//     await axios.put(
//       `http://https://service-management-system-xwcx.vercel.app/api/api/reviews/${id}/report`
//     );
//     alert("Review reported ⚠️");
//   };

//   const lowRatingCount = reviews.filter(r => r.rating <= 2).length;

//   return (
//     <div className="space-y-10">

//       <h1 className="text-3xl font-black uppercase">
//         My Reviews
//       </h1>

//       {/* ✅ Average Rating */}
//       <div className="bg-white p-8 rounded-3xl shadow border max-w-md">
//         <h2 className="text-5xl font-black text-yellow-500 flex items-center gap-2">
//           {average} <Star fill="currentColor" />
//         </h2>
//         <p className="text-slate-500 mt-2 text-sm font-bold uppercase">
//           Average Rating
//         </p>
//       </div>

//       {/* ✅ Low Rating Alert */}
//       {lowRatingCount > 0 && (
//         <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex items-center gap-3">
//           <AlertTriangle className="text-red-500" />
//           <p className="text-red-600 font-bold text-sm">
//             You have {lowRatingCount} low ratings (2⭐ or below). Improve service quality.
//           </p>
//         </div>
//       )}

//       {/* ✅ Rating Breakdown */}
//       <div className="bg-white p-6 rounded-3xl shadow border max-w-md space-y-2">
//         <h3 className="font-black uppercase">Rating Breakdown</h3>
//         {ratingBreakdown.map(r => (
//           <div key={r.star} className="flex justify-between text-sm">
//             <span>{r.star} ⭐</span>
//             <span>{r.count}</span>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Reviews List */}
//       <div className="space-y-6">
//         {reviews.length === 0 && (
//           <p className="text-slate-400 font-bold">
//             No approved reviews yet.
//           </p>
//         )}

//         {reviews.map((review) => (
//           <div key={review._id} className="bg-white p-6 rounded-3xl shadow border">

//             <div className="flex justify-between items-center mb-3">
//               <h4 className="font-black uppercase">
//                 {review.serviceId?.title}
//               </h4>

//               <div className="flex gap-1 text-yellow-400">
//                 {[...Array(review.rating)].map((_, i) => (
//                   <Star key={i} size={14} fill="currentColor" />
//                 ))}
//               </div>
//             </div>

//             <p className="text-sm italic">
//               "{review.comment}"
//             </p>

//             <p className="text-xs text-slate-400 mt-2 uppercase">
//               — {review.userId?.name}
//             </p>

//             {/* ✅ Provider Reply */}
//             {review.reply && (
//               <div className="mt-4 p-3 bg-slate-50 rounded-xl text-sm">
//                 <strong>Your Reply:</strong> {review.reply}
//               </div>
//             )}

//             <div className="mt-4 space-y-3">
//               <textarea
//                 placeholder="Write reply..."
//                 className="w-full p-3 bg-slate-100 rounded-xl text-sm"
//                 onBlur={(e) =>
//                   handleReply(review._id, e.target.value)
//                 }
//               />

//               <button
//                 onClick={() => handleReport(review._id)}
//                 className="text-red-500 text-xs font-bold uppercase"
//               >
//                 Report Review
//               </button>
//             </div>

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ProviderReviews;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, AlertTriangle, MessageSquare, ShieldAlert, 
  CornerDownRight, Send, ShieldX, MessageCircleOff 
} from "lucide-react";

const ProviderReviews = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [replyInputs, setReplyInputs] = useState({}); // Local state to handle active text inputs cleanly

  const fetchReviews = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(
        `http://https://service-management-system-xwcx.vercel.app/api/api/reviews/provider/${userId}`
      );

      setReviews(res.data);

      if (res.data.length > 0) {
        const avg = res.data.reduce((acc, r) => acc + r.rating, 0) / res.data.length;
        setAverage(avg.toFixed(1));
      }
    } catch (error) {
      console.error("Error fetching provider reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchReviews();
  }, [userId]);

  // Dynamic Rating Breakdown Mapping
  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length
  }));

  const handleReplySubmit = async (id) => {
    const replyText = replyInputs[id];
    if (!replyText || !replyText.trim()) return;

    try {
      await axios.put(
        `http://https://service-management-system-xwcx.vercel.app/api/api/reviews/${id}/reply`,
        { reply: replyText }
      );
      // Clear specific textarea buffer input
      setReplyInputs(prev => ({ ...prev, [id]: "" }));
      fetchReviews();
    } catch (error) {
      console.error("Failed to post provider response:", error);
    }
  };

  const handleReport = async (id) => {
    try {
      await axios.put(`http://https://service-management-system-xwcx.vercel.app/api/api/reviews/${id}/report`);
      alert("Review reported successfully ⚠️");
    } catch (error) {
      console.error("Failed to report resource:", error);
    }
  };

  const lowRatingCount = reviews.filter(r => r.rating <= 2).length;
  const totalReviewsCount = reviews.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1700px] mx-auto px-1 sm:px-0">
      
      {/* Premium Header Architecture */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Reviews & <span className="text-blue-600">Ratings</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
            Analyze client feedback, respond to service experiences, and track reputation metrics.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm self-start sm:self-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Total Audited</span>
          <span className="text-sm font-extrabold text-slate-900">{totalReviewsCount} Submissions</span>
        </div>
      </div>

      {/* Critical Alert Warning Bar */}
      {lowRatingCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 flex items-start gap-3.5"
        >
          <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-rose-900 font-extrabold text-xs sm:text-sm uppercase tracking-tight">Attention Needed</p>
            <p className="text-rose-600/90 font-medium text-xs mt-0.5">
              You have {lowRatingCount} low ratings (2★ or below). Consistently weak scores may impact dashboard search exposure.
            </p>
          </div>
        </motion.div>
      )}

      {/* Statistics Block Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Large Scoring Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50/40 rounded-bl-full pointer-events-none" />
          <div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">Aggregate Metrics</span>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl sm:text-6xl font-black text-slate-950 tracking-tighter">
                {average}
              </h2>
              <div className="flex text-yellow-400 items-center">
                <Star fill="currentColor" size={28} />
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-[11px] font-bold uppercase mt-6 tracking-wide pt-4 border-t border-slate-100">
            Based on active client ledger data
          </p>
        </div>

        {/* Breakdown Progress Metric Block */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-center gap-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">Rating Segment Distribution</h3>
          <div className="space-y-2">
            {ratingBreakdown.map((r) => {
              const percentage = totalReviewsCount > 0 ? (r.count / totalReviewsCount) * 100 : 0;
              return (
                <div key={r.star} className="flex items-center gap-4 text-xs font-bold text-slate-700">
                  <span className="w-10 text-right shrink-0 flex items-center justify-end gap-1">{r.star} <Star size={12} className="text-yellow-400" fill="currentColor" /></span>
                  {/* Outer Progress Track */}
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-yellow-400 rounded-full"
                    />
                  </div>
                  <span className="w-8 text-slate-400 text-right font-black">{r.count}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Structured Logs Grid System */}
      <div className="space-y-6">
        {totalReviewsCount === 0 && (
          <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <MessageCircleOff className="mx-auto text-slate-300 mb-3" size={36} />
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">No client validation histories found yet.</p>
          </div>
        )}

        <AnimatePresence>
          {reviews.map((review, i) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md hover:border-slate-200/80 transition-all flex flex-col group relative"
            >
              
              {/* Card Top Row Metadata */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {review.serviceId?.title || "Booked Service"}
                  </span>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-tight mt-1.5">
                    — {review.userId?.name || "Verified Customer"}
                  </h4>
                </div>

                {/* Score Vector Arrays mapping */}
                <div className="flex gap-0.5 text-yellow-400 bg-yellow-50/60 p-1.5 rounded-xl border border-yellow-100/50 shrink-0">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      size={13} 
                      fill={index < review.rating ? "currentColor" : "none"} 
                      className={index < review.rating ? "text-yellow-400" : "text-slate-200"}
                    />
                  ))}
                </div>
              </div>

              {/* Main Review Text comment body */}
              <p className="text-slate-700 font-medium italic text-xs sm:text-sm pl-2 border-l-2 border-slate-200 py-1 line-clamp-3 group-hover:border-blue-400 transition-colors">
                "{review.comment || "No text feedback provided."}"
              </p>

              {/* Existing Response Block Wrapper */}
              {review.reply && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <CornerDownRight className="text-slate-400 mt-0.5 shrink-0" size={14} />
                  <div>
                    <span className="font-black uppercase tracking-wider text-[10px] text-blue-600 block mb-0.5">Your Official Reply</span>
                    <p className="font-medium">{review.reply}</p>
                  </div>
                </motion.div>
              )}

              {/* Input Action Panel */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                
                {/* Modernized Reply Input Segment */}
                <div className="flex-1 flex gap-2 max-w-xl">
                  <textarea
                    rows={1}
                    value={replyInputs[review._id] || ""}
                    placeholder={review.reply ? "Update your public response..." : "Draft public business response..."}
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none min-h-[36px]"
                    onChange={(e) => setReplyInputs(prev => ({ ...prev, [review._id]: e.target.value }))}
                  />
                  <button
                    onClick={() => handleReplySubmit(review._id)}
                    className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition shrink-0 flex items-center justify-center shadow-sm"
                    title="Send Reply"
                  >
                    <Send size={13} />
                  </button>
                </div>

                {/* Flag / Moderation Reporting Control */}
                <button
                  onClick={() => handleReport(review._id)}
                  className="text-slate-400 hover:text-rose-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors self-end sm:self-auto py-2 px-3 rounded-lg hover:bg-rose-50/50 border border-transparent hover:border-rose-100/60"
                >
                  <ShieldX size={12} /> Report Abuse
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default ProviderReviews;