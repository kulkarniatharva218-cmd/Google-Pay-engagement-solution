
import React from 'react';
import { motion } from 'framer-motion';
import ReflectBlob from './ReflectBlob';
import { COLORS } from '../constants';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col flex-1 px-6 space-y-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] p-8 bg-white/40 backdrop-blur-xl border border-white/30 m3-shadow min-h-[420px] flex flex-col items-center justify-between text-center">
        <div className="absolute top-4 left-0 right-0">
          <span className="text-xs font-bold tracking-widest text-[#3949AB] uppercase opacity-60">Your Weekly Vibe Check</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center w-full">
          <ReflectBlob size="lg" />
        </div>

        <div className="space-y-4 relative z-10">
          <h2 className="text-2xl font-bold text-[#1C1B1F]">
            Ananya, you had a spontaneous week.
          </h2>
          <p className="text-[#49454F] text-lg leading-relaxed">
            Let's see why your spending felt a bit different this time.
          </p>
          <button
            onClick={onStart}
            className="mt-4 px-10 py-4 bg-[#3949AB] text-white rounded-full font-semibold text-lg hover:scale-105 active:scale-95 transition-transform m3-shadow"
          >
            Start Reflection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-[#80CBC4]/10 rounded-3xl space-y-2 border border-[#80CBC4]/20">
          <div className="text-[#80CBC4] font-bold text-xl">₹2,450</div>
          <div className="text-sm text-gray-500">Planned Spends</div>
        </div>
        <div className="p-6 bg-[#FF8A80]/10 rounded-3xl space-y-2 border border-[#FF8A80]/20">
          <div className="text-[#FF8A80] font-bold text-xl">₹1,120</div>
          <div className="text-sm text-gray-500">Impulse Spends</div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeScreen;
