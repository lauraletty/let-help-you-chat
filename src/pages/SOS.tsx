import React, { useState, useEffect } from 'react';
import { AlertCircle, MapPin, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const EmergencyPage = () => {
  const [isActivating, setIsActivating] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isSent, setIsSent] = useState(false);

  const startEmergency = () => {
    setIsActivating(true);
    setCountdown(5);
    setIsSent(false);
  };

  useEffect(() => {
    let timer: any;
    if (isActivating && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (isActivating && countdown === 0) {
      toast.error('EMERGENCY SIGNAL SENT', {
        description: 'Your location has been shared with authorities and your emergency contacts.',
        duration: 8000,
      });
      setIsActivating(false);
      setIsSent(true);
    }
    return () => clearInterval(timer);
  }, [isActivating, countdown]);

  return (
    <div className="flex flex-col items-center px-6 pt-12 pb-24 h-full overflow-y-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-black tracking-tight text-red-600">SOS CENTER</h2>
        <p className="mt-2 text-slate-500">Need immediate help? Tap the button below to alert your network.</p>
      </div>

      <div className="relative flex flex-1 items-center justify-center min-h-[300px]">
        <AnimatePresence>
          {isActivating && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 2, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute h-64 w-64 rounded-full bg-red-500"
            />
          )}
        </AnimatePresence>

        <button
          onClick={startEmergency}
          disabled={isActivating || isSent}
          className={`relative z-10 flex h-48 w-48 items-center justify-center rounded-full shadow-2xl transition-transform active:scale-90 disabled:opacity-90 ${
            isSent ? 'bg-green-600' : 'bg-red-600 shadow-red-500/50 hover:bg-red-700'
          }`}
        >
          {isActivating ? (
            <span className="text-6xl font-black text-white">{countdown}</span>
          ) : isSent ? (
            <MessageSquare className="h-24 w-24 text-white" />
          ) : (
            <AlertCircle className="h-24 w-24 text-white" />
          )}
        </button>
      </div>

      <div className="mt-12 w-full space-y-4">
        <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Location</p>
            <p className="font-bold">Westlands, Nairobi, Kenya</p>
          </div>
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
        </div>

        <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Phone className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Emergency Kin</p>
            <p className="font-bold">Mama (Primary)</p>
          </div>
          <button className="text-xs font-bold text-blue-600">Notify</button>
        </div>
        
        <div className="rounded-3xl bg-slate-100 p-4 text-center dark:bg-slate-800">
          <p className="text-xs text-slate-500 leading-relaxed">
            Your SOS signal triggers a 100m radius broadcast to high-trust verified providers and notifies the local authorities with your GPS coordinates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;