import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, AlertCircle, CreditCard, User, ArrowLeft, ShieldCheck } from 'lucide-react';
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';
import EmergencyPage from './pages/SOS';
import WalletPage from './pages/Wallet';
import ProfilePage from './pages/Profile';
import ProviderDetailPage from './pages/ProviderDetail';
import { Provider } from './types';
import { PROVIDERS } from './data/mock';

const Header = ({ title, showBack, onBack }: { title: string; showBack?: boolean; onBack?: () => void }) => (
  <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-slate-900 border-b dark:border-slate-800">
    <div className="flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} className="rounded-full p-1 active:bg-slate-100 dark:active:bg-slate-800 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
    </div>
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-blue-500/20">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" alt="User" />
      </div>
    </div>
  </header>
);

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) => (
  <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 flex items-center justify-around border-t bg-white px-2 py-2 pb-6 dark:bg-slate-900 md:pb-2">
    {[
      { id: 'home', icon: Search, label: 'Explore' },
      { id: 'chat', icon: MessageSquare, label: 'Chats' },
      { id: 'emergency', icon: AlertCircle, label: 'SOS', color: 'text-red-500' },
      { id: 'payment', icon: CreditCard, label: 'Wallet' },
      { id: 'profile', icon: User, label: 'Profile' },
    ].map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === tab.id ? (tab.color || 'text-blue-600') : 'text-slate-400'
        }`}
      >
        <tab.icon className={`h-6 w-6 ${activeTab === tab.id && tab.id === 'emergency' ? 'animate-pulse' : ''}`} />
        <span className="text-[10px] font-medium">{tab.label}</span>
      </button>
    ))}
  </nav>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedProvider, isChatting]);

  const renderContent = () => {
    if (isChatting) return <ChatPage provider={selectedProvider} onBack={() => setIsChatting(false)} />;
    if (selectedProvider) return <ProviderDetailPage provider={selectedProvider} onBack={() => setSelectedProvider(null)} onChat={() => setIsChatting(true)} />;

    switch (activeTab) {
      case 'home': return <HomePage onSelectProvider={setSelectedProvider} />;
      case 'chat': return <ChatPage provider={null} onBack={() => setActiveTab('home')} />;
      case 'emergency': return <EmergencyPage />;
      case 'payment': return <WalletPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage onSelectProvider={setSelectedProvider} />;
    }
  };

  const getPageTitle = () => {
    if (isChatting) return 'Chat with ' + (selectedProvider?.name.split(' ')[0] || 'Support');
    if (selectedProvider) return 'Service Provider';
    switch (activeTab) {
      case 'home': return 'TrustLink Kenya';
      case 'chat': return 'Messages';
      case 'emergency': return 'Emergency Assistance';
      case 'payment': return 'Secure Wallet';
      case 'profile': return 'My Account';
      default: return 'TrustLink';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-[850px] md:max-h-[850px] shadow-2xl dark:bg-slate-900 relative md:rounded-[3rem] md:overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        <Header 
          title={getPageTitle()} 
          showBack={!!selectedProvider || isChatting} 
          onBack={() => isChatting ? setIsChatting(false) : setSelectedProvider(null)} 
        />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950/50 no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedProvider?.id || '') + isChatting}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {(!selectedProvider && !isChatting) && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        
        <Toaster position="top-center" richColors />
      </div>
      
      {/* Desktop Helper */}
      <div className="fixed bottom-10 left-10 hidden xl:block max-w-xs p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h4 className="font-bold">TrustLink Kenya</h4>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          The most trusted ecosystem for local services in Kenya. 
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            M-Pesa Integrated
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Verified Identity
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
            24/7 SOS Support
          </div>
        </div>
      </div>
    </div>
  );
}