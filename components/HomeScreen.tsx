
import React from 'react';
import { motion } from 'framer-motion';
import ReflectBlob from './ReflectBlob';
import { COLORS, MOCK_PEOPLE, MOCK_BUSINESSES } from '../constants';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col flex-1 px-4 space-y-6 pb-24"
    >
      {/* Primary Action Block: Scan QR */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full bg-[#1a73e8] rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 m3-shadow"
      >
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <span className="text-white font-semibold text-lg">Scan any QR code</span>
      </motion.div>

      {/* Reflect Discovery Card */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="relative overflow-hidden rounded-3xl p-5 bg-white/40 backdrop-blur-xl border border-white/50 m3-shadow flex items-center space-x-4 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40 animate-pulse-slow pointer-events-none" />
        
        <div className="relative z-10 w-16 h-16 flex items-center justify-center">
          <ReflectBlob size="sm" className="opacity-100" />
          <span className="absolute text-xl">✨</span>
        </div>

        <div className="flex-1 space-y-1 relative z-10">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">Your Weekly Vibe Check is ready.</h3>
          <p className="text-xs text-gray-600">You had a 'Spontaneous' week. See the patterns?</p>
          <button className="mt-2 px-4 py-1.5 bg-[#3949AB] text-white text-[11px] font-bold rounded-full m3-shadow">
            Open Reflection
          </button>
        </div>

        <div className="relative z-10 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>

      {/* People Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">People</h3>
          <button className="text-[#1a73e8] text-xs font-bold">More</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {MOCK_PEOPLE.map((person) => (
            <div key={person.id} className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-white m3-shadow bg-white p-0.5">
                <img src={person.img} alt={person.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-[11px] font-medium text-gray-700">{person.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Businesses Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Businesses</h3>
          <button className="text-[#1a73e8] text-xs font-bold">More</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {MOCK_BUSINESSES.map((biz) => (
            <div key={biz.id} className="flex flex-col items-center space-y-2">
              <div className={`w-14 h-14 ${biz.color} rounded-2xl flex items-center justify-center text-2xl m3-shadow border border-white`}>
                {biz.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-700">{biz.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-24 right-6 z-50">
        <button className="h-14 px-6 bg-[#d2e3fc] text-[#1a73e8] rounded-2xl flex items-center space-x-3 m3-shadow hover:scale-105 active:scale-95 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-bold">New Payment</span>
        </button>
      </div>
    </motion.div>
  );
};

export default HomeScreen;
