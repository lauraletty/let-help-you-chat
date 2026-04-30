import React, { useState } from 'react';
import { Search, Shield, Star, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { CATEGORIES, PROVIDERS } from '../data/mock';
import { Provider } from '../types';

const HomePage = ({ onSelectProvider }: { onSelectProvider: (p: Provider) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [womenOnly, setWomenOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProviders = PROVIDERS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWomenOnly = !womenOnly || p.gender === 'Female';
    const matchesCategory = !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesWomenOnly && matchesCategory;
  });

  return (
    <div className="pb-24">
      <div className="px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Find Trusted Help</h2>
          <p className="text-slate-500">Verified professionals in Nairobi & beyond</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for services or locations..."
            className="w-full rounded-2xl border-none bg-slate-100 py-4 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`flex flex-col items-center gap-2 min-w-[80px] transition-transform active:scale-95 ${
                selectedCategory === cat.name ? 'opacity-100' : 'opacity-70'
              }`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cat.color} text-white shadow-lg`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <span className="text-xs font-semibold">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">Nearby Providers</h3>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600">
              {filteredProviders.length} Found
            </span>
          </div>
          <button 
            onClick={() => {
              setWomenOnly(!womenOnly);
              if (!womenOnly) toast.success('Women-Safe Mode enabled');
              else toast.info('Standard mode enabled');
            }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
              womenOnly 
                ? 'bg-pink-100 text-pink-600 border border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800' 
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 border border-transparent'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            Women-Safe
          </button>
        </div>

        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={provider.id}
              onClick={() => onSelectProvider(provider)}
              className="group relative flex cursor-pointer gap-4 rounded-3xl bg-white p-4 shadow-sm border border-slate-100 transition-all hover:shadow-md dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
                <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
                {provider.isOnline && (
                  <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold">{provider.name}</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{provider.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    <span>{provider.location} \u2022 {provider.distance}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-blue-600">KES {provider.pricePerHour}/hr</span>
                  <div className="rounded-full bg-slate-50 p-1.5 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-700">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredProviders.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-500">No providers found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;