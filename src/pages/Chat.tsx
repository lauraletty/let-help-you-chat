import React, { useState } from 'react';
import { Send, Phone, Camera, ArrowLeft, CheckCircle2, XCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Provider, Message } from '../types';
import { PROVIDERS } from '../data/mock';

const ChatPage = ({ provider, onBack }: { provider: Provider | null; onBack: () => void }) => {
  const [msg, setMsg] = useState('');
  const activeProvider = provider || PROVIDERS[0];
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: activeProvider.id, text: `Jambo! I see you need an expert ${activeProvider.category.toLowerCase()}. How can I help?`, timestamp: '10:00 AM' },
    { id: '2', senderId: 'me', text: 'Hey, I need some help with a repair. Are you available today?', timestamp: '10:05 AM' },
    { id: '3', senderId: activeProvider.id, text: `I am available. For this job, I propose KES ${activeProvider.pricePerHour} per hour.`, timestamp: '10:06 AM', type: 'agreement', amount: activeProvider.pricePerHour, status: 'pending' },
  ]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setMsg('');
    
    // Simulate auto-reply
    setTimeout(() => {
      if (msg.toLowerCase().includes('ok') || msg.toLowerCase().includes('agree')) {
        toast.success('Agreement confirmed!');
      }
    }, 1000);
  };

  const handleAgreement = (id: string, status: 'accepted' | 'declined') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    if (status === 'accepted') {
      toast.success('Price agreement accepted!');
    } else {
      toast.error('Price agreement declined');
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col bg-slate-50 dark:bg-slate-950">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-slate-900 border-b dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 md:hidden"><ArrowLeft className="h-6 w-6" /></button>
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
            <img src={activeProvider.image} alt={activeProvider.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold leading-none">{activeProvider.name}</h3>
            <span className="text-[10px] text-green-500 font-bold">Online Now</span>
          </div>
        </div>
        <button className="rounded-full bg-slate-100 p-2 dark:bg-slate-800 text-blue-600">
          <Phone className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
            {m.type === 'agreement' ? (
              <div className="w-full max-w-[85%] rounded-3xl bg-white p-5 shadow-sm border border-blue-100 dark:bg-slate-800 dark:border-blue-900">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Agreement</p>
                    <p className="font-black text-lg">KES {m.amount}</p>
                  </div>
                </div>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">{m.text}</p>
                {m.status === 'pending' ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAgreement(m.id, 'accepted')}
                      className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-lg active:scale-95 transition-transform"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleAgreement(m.id, 'declined')}
                      className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-white active:scale-95 transition-transform"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <div className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold ${
                    m.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {m.status === 'accepted' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    Agreement {m.status === 'accepted' ? 'Accepted' : 'Declined'}
                  </div>
                )}
              </div>
            ) : (
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                m.senderId === 'me' 
                ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                : 'bg-white text-slate-800 rounded-bl-none shadow-sm dark:bg-slate-800 dark:text-white border border-slate-100 dark:border-slate-700'
              }`}>
                <p>{m.text}</p>
                <span className={`mt-1 block text-[10px] ${m.senderId === 'me' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {m.timestamp}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t bg-white p-4 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-blue-600 transition-colors"><Camera className="h-6 w-6" /></button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Discuss price and details..."
              className="w-full rounded-2xl border-none bg-slate-100 py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 outline-none"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-blue-600 p-2 text-white shadow-lg active:scale-90 transition-transform"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;