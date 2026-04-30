import React, { useState } from 'react';
import { ShieldCheck, Camera, User, Shield, CreditCard, MessageSquare, Lock, Settings, ChevronRight, Phone, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyingStep, setVerifyingStep] = useState(0); // 0: none, 1: phone, 2: ID, 3: Face, 4: complete

  const startVerification = () => {
    setVerifyingStep(1);
    toast.info('Verification started...');
  };

  const nextStep = () => {
    if (verifyingStep === 3) {
      setIsVerified(true);
      setVerifyingStep(4);
      toast.success('Identity Verified!', {
        description: 'You now have the Silver Trust Badge.',
      });
    } else {
      setVerifyingStep(prev => prev + 1);
    }
  };

  return (
    <div className="px-6 pb-24 pt-6 h-full overflow-y-auto">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-4 h-32 w-32 rounded-full border-4 border-white shadow-xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="text-white h-6 w-6" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Brian Onyango</h2>
        <div className="mt-1 flex items-center gap-1.5 text-slate-500">
          <ShieldCheck className={`h-4 w-4 ${isVerified ? 'text-blue-500' : 'text-slate-300'}`} />
          <span className="text-sm font-medium">{isVerified ? 'Verified Kenyan Citizen' : 'Unverified Account'}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isVerified && verifyingStep === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl"
          >
            <h3 className="mb-2 text-lg font-bold">Get Verified</h3>
            <p className="mb-4 text-sm opacity-90 text-white/80 leading-relaxed">Increase trust and unlock premium Kenyan services by verifying your identity today.</p>
            <button 
              onClick={startVerification}
              className="w-full rounded-2xl bg-white py-3 text-sm font-bold text-blue-600 active:scale-95 transition-transform shadow-lg"
            >
              Start Verification
            </button>
          </motion.div>
        )}

        {verifyingStep > 0 && verifyingStep < 4 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 rounded-[32px] bg-white p-6 shadow-xl border border-blue-100 dark:bg-slate-800 dark:border-blue-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Verification</h3>
              <span className="text-xs font-bold text-blue-600">Step {verifyingStep} of 3</span>
            </div>
            
            <div className="mb-6 flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${verifyingStep >= i ? 'bg-blue-600' : 'bg-slate-100 dark:bg-slate-700'}`} />
              ))}
            </div>

            <div className="min-h-[120px] mb-6 flex flex-col items-center justify-center text-center">
              {verifyingStep === 1 && (
                <>
                  <Phone className="h-10 w-10 text-blue-500 mb-3" />
                  <p className="font-bold">Phone Verification</p>
                  <p className="text-xs text-slate-500">We'll send a 4-digit code to your M-Pesa number.</p>
                </>
              )}
              {verifyingStep === 2 && (
                <>
                  <FileText className="h-10 w-10 text-blue-500 mb-3" />
                  <p className="font-bold">ID Document</p>
                  <p className="text-xs text-slate-500">Upload a clear photo of your National ID or Passport.</p>
                </>
              )}
              {verifyingStep === 3 && (
                <>
                  <Camera className="h-10 w-10 text-blue-500 mb-3" />
                  <p className="font-bold">Facial Recognition</p>
                  <p className="text-xs text-slate-500">A quick selfie to match your ID photo.</p>
                </>
              )}
            </div>

            <button 
              onClick={nextStep}
              className="w-full rounded-2xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg active:scale-95 transition-transform"
            >
              {verifyingStep === 3 ? 'Finish' : 'Continue'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 pb-10">
        <div>
          <h3 className="mb-3 px-1 text-sm font-bold uppercase tracking-wider text-slate-400">Trust Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
              <span className="block text-2xl font-black text-blue-600">{isVerified ? '92' : '45'}</span>
              <span className="text-xs font-bold text-slate-500">Trust Score</span>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
              <span className="block text-2xl font-black text-indigo-500">{isVerified ? 'Gold' : 'Bronze'}</span>
              <span className="text-xs font-bold text-slate-500">Identity Badge</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 px-1 text-sm font-bold uppercase tracking-wider text-slate-400">Preferences</h3>
          <div className="overflow-hidden rounded-[32px] bg-white shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
            {[
              { icon: User, label: 'Edit Profile' },
              { icon: Shield, label: 'Security & Privacy' },
              { icon: CreditCard, label: 'Payment Methods' },
              { icon: MessageSquare, label: 'Notification Settings' },
              { icon: Lock, label: 'Women-Safe Mode Default' },
              { icon: Settings, label: 'General' },
            ].map((item, i) => (
              <button key={i} className={`flex w-full items-center justify-between border-b p-5 transition-colors active:bg-slate-50 dark:active:bg-slate-700 last:border-none border-slate-50 dark:border-slate-700`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;