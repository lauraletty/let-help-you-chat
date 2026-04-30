import React, { useState } from 'react';
import { Star, MapPin, Calendar, ShieldCheck, Heart, ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Provider } from '../types';
import { REVIEWS } from '../data/mock';

const ProviderDetailPage = ({ provider, onBack, onChat }: { provider: Provider; onBack: () => void; onChat: () => void }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const submitReview = () => {
    if (userRating === 0) return toast.error('Please select a rating');
    toast.success('Review submitted!', { description: 'Thank you for helping our community stay safe and reliable.' });
    setShowReviewModal(false);
  };

  return (
    <div className="pb-32 h-full overflow-y-auto">
      <div className="relative h-72 w-full">
        <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
        <button 
          onClick={onBack}
          className="absolute left-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-md dark:bg-black/40 shadow-lg"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-md dark:bg-black/40 text-rose-500 shadow-lg">
          <Heart className="h-6 w-6" />
        </button>
      </div>

      <div className="relative -mt-8 rounded-t-[32px] bg-white px-6 pt-8 dark:bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-2xl font-bold">{provider.name}</h2>
              <ShieldCheck className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-slate-500">{provider.category} Expert \u2022 {provider.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 font-bold">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg">{provider.rating}</span>
            </div>
            <p className="text-xs text-slate-400">{provider.reviewsCount} reviews</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto no-scrollbar">
          <div className="flex min-w-[100px] flex-col items-center rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
            <MapPin className="mb-1 h-5 w-5 text-blue-500" />
            <span className="text-[10px] text-slate-500">Distance</span>
            <span className="text-xs font-bold">{provider.distance}</span>
          </div>
          <div className="flex min-w-[100px] flex-col items-center rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
            <Calendar className="mb-1 h-5 w-5 text-green-500" />
            <span className="text-[10px] text-slate-500">Availability</span>
            <span className="text-xs font-bold">Today</span>
          </div>
          <div className="flex min-w-[100px] flex-col items-center rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
            <ShieldCheck className="mb-1 h-5 w-5 text-purple-500" />
            <span className="text-[10px] text-slate-500">Status</span>
            <span className="text-xs font-bold uppercase">Verified</span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-bold">About</h3>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            {provider.description}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-bold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {provider.skills.map((s) => (
              <span key={s} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 pb-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Reviews</h3>
            <button 
              onClick={() => setShowReviewModal(true)}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
            >
              Write a Review
            </button>
          </div>
          <div className="space-y-4">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{rev.userName}</span>
                    {rev.isVerified && (
                      <div className="flex items-center gap-0.5 text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        <ShieldCheck className="h-2 w-2" /> Verified User
                      </div>
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{rev.comment}</p>
                <span className="mt-2 block text-[10px] text-slate-400">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-2xl dark:bg-slate-900"
            >
              <h3 className="mb-2 text-xl font-bold">Rate your experience</h3>
              <p className="mb-6 text-sm text-slate-500">Reviews help our Kenyan community thrive.</p>
              
              <div className="mb-8 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <button key={i} onClick={() => setUserRating(i)}>
                    <Star className={`h-10 w-10 ${i <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                  </button>
                ))}
              </div>

              <textarea 
                placeholder="How was the service? (Punctuality, quality, safety...)"
                className="mb-6 h-32 w-full rounded-2xl bg-slate-100 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              />

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitReview}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 border-t bg-white px-6 py-4 dark:bg-slate-900 md:pb-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Est. Price</span>
            <span className="text-xl font-black text-blue-600">KES {provider.pricePerHour}</span>
          </div>
          <button 
            onClick={onChat}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
          >
            <MessageSquare className="h-5 w-5" />
            Message {provider.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailPage;