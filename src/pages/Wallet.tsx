import React, { useState } from 'react';
import { CreditCard, ArrowRight, ArrowLeft, Calendar, Wrench, ShieldCheck, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const WalletPage = () => {
  const [balance, setBalance] = useState(12450);
  const [showMpesa, setShowMpesa] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMpesaTopup = () => {
    setIsProcessing(true);
    toast.info('STK Push sent to your phone...', {
      description: 'Please enter your M-Pesa PIN on your phone.',
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowMpesa(false);
      setBalance(prev => prev + 1000);
      toast.success('KES 1,000 added successfully!');
    }, 3000);
  };

  return (
    <div className="px-6 pt-6 pb-24 h-full overflow-y-auto">
      <h2 className="mb-6 text-2xl font-bold">Secure Wallet</h2>
      
      <div className="mb-8 rounded-[40px] bg-slate-900 p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <p className="mb-1 text-sm opacity-60">Available Balance</p>
        <h3 className="mb-8 text-4xl font-black tracking-tight">KES {balance.toLocaleString()}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowMpesa(true)}
            className="rounded-2xl bg-white px-6 py-2 text-sm font-bold text-slate-900 active:scale-95 transition-transform border border-white/10"
          >
            Top Up
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showMpesa && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-8 rounded-3xl bg-green-50 p-6 border border-green-200 dark:bg-green-900/10 dark:border-green-900/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                <Smartphone className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-green-800 dark:text-green-400">M-Pesa Express</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-500 mb-4">Enter your M-Pesa number to receive the payment prompt.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="rounded-xl border-none bg-white p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 dark:bg-slate-800"
                placeholder="07XX XXX XXX"
              />
              <button 
                onClick={handleMpesaTopup}
                disabled={isProcessing}
                className="w-full rounded-xl bg-green-600 py-4 font-bold text-white shadow-lg active:scale-95 transition-transform disabled:opacity-50"
              >
                {isProcessing ? 'Waiting for PIN...' : 'Send STK Push'}
              </button>
              <button 
                onClick={() => setShowMpesa(false)}
                className="text-xs font-bold text-slate-400"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8 grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center gap-2 rounded-3xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 active:scale-95 transition-transform">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold">Withdraw</span>
        </button>
        <button className="flex flex-col items-center gap-2 rounded-3xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 active:scale-95 transition-transform">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold">Cards</span>
        </button>
        <button className="flex flex-col items-center gap-2 rounded-3xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 active:scale-95 transition-transform">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold">History</span>
        </button>
      </div>

      <h3 className="mb-4 text-lg font-bold">Transaction History</h3>
      <div className="space-y-4 pb-10">
        {[
          { name: 'Wanjiku Kamau', cat: 'Electrical Service', amount: -1500, date: 'Today', status: 'Completed' },
          { name: 'M-Pesa Topup', cat: 'Wallet Funding', amount: +2000, date: 'Yesterday', status: 'Success' },
          { name: 'John Otieno', cat: 'Plumbing Service', amount: -1200, date: 'Oct 24', status: 'Completed' },
        ].map((t, i) => (
          <div key={i} className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${t.amount < 0 ? 'bg-slate-100 dark:bg-slate-700' : 'bg-green-100 dark:bg-green-900/30'} text-slate-800 dark:text-white`}>
                {t.amount < 0 ? <Wrench className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-bold text-sm">{t.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-medium text-slate-500 uppercase">{t.date}</p>
                  {t.amount < 0 && (
                    <div className="flex items-center gap-1 text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                      <ShieldCheck className="h-2 w-2" /> Verified
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className={`font-black text-sm ${t.amount < 0 ? 'text-slate-900 dark:text-white' : 'text-green-600'}`}>
              {t.amount < 0 ? `- KES ${Math.abs(t.amount).toLocaleString()}` : `+ KES ${t.amount.toLocaleString()}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletPage;