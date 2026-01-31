
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
// Added MOCK_PEOPLE to the import list to fix the undefined variable error
import { MOCK_TRANSACTIONS, COLORS, MOCK_PEOPLE } from '../constants';
import { Transaction } from '../types';

interface AuditViewProps {
  onFinish: () => void;
}

interface CardProps {
  item: Transaction;
  onDecision: (type: 'impulse' | 'planned') => void;
}

const Card: React.FC<CardProps> = ({ item, onDecision }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);
  
  // Dynamic background color shift based on swipe
  const bgColor = useTransform(
    x,
    [-150, 0, 150],
    ['#FFF1F0', '#FFFFFF', '#F0F9F8']
  );

  // Indicators for swipe decision
  const impulseOpacity = useTransform(x, [-100, -20], [1, 0]);
  const plannedOpacity = useTransform(x, [20, 100], [0, 1]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity, backgroundColor: bgColor }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) onDecision('planned');
        else if (info.offset.x < -120) onDecision('impulse');
      }}
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ x: x.get() > 0 ? 600 : -600, opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
      className="absolute w-full max-w-sm aspect-[4/5] rounded-[2.5rem] m3-shadow p-8 flex flex-col border border-white/50 cursor-grab active:cursor-grabbing overflow-hidden select-none"
    >
      {/* Swipe Overlay Indicators */}
      <motion.div 
        style={{ opacity: impulseOpacity }}
        className="absolute top-10 right-10 border-4 border-[#FF8A80] px-4 py-1 rounded-xl rotate-[15deg] pointer-events-none"
      >
        <span className="text-[#FF8A80] font-black text-2xl uppercase tracking-tighter">Impulse</span>
      </motion.div>

      <motion.div 
        style={{ opacity: plannedOpacity }}
        className="absolute top-10 left-10 border-4 border-[#80CBC4] px-4 py-1 rounded-xl -rotate-[15deg] pointer-events-none"
      >
        <span className="text-[#80CBC4] font-black text-2xl uppercase tracking-tighter">Planned</span>
      </motion.div>

      <div className="flex-1 flex flex-col">
        {/* Header: Icon and Progress */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl m3-shadow border border-white">
            {item.icon}
          </div>
          <div className="text-[10px] font-bold text-gray-400 bg-gray-100/50 px-3 py-1.5 rounded-full uppercase tracking-widest">
            {item.id} / {MOCK_TRANSACTIONS.length}
          </div>
        </div>
        
        {/* Core Info: Merchant and Amount */}
        <div className="space-y-1 mb-8">
          <h3 className="text-3xl font-bold text-[#1C1B1F] leading-tight">{item.merchant}</h3>
          <div className="text-5xl font-black text-[#1C1B1F] tracking-tighter">
            ₹{item.amount}
          </div>
        </div>

        {/* Details Section: Tag and Trigger (Requested Summary) */}
        <div className="mt-auto space-y-4 pt-6 border-t border-gray-100">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category & Context</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-2xl text-sm font-bold m3-shadow border border-indigo-100/50">
                {item.tag}
              </span>
            </div>
          </div>

          {item.trigger && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Potential Trigger</p>
              <div className="flex items-center space-x-2 bg-pink-50 text-pink-700 px-4 py-2.5 rounded-2xl border border-pink-100/50 m3-shadow">
                <span className="text-base">⚡</span>
                <span className="text-sm font-bold">{item.trigger}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer hint */}
      <div className="mt-8 text-center text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em]">
        Swipe left for Impulse • Right for Planned
      </div>
    </motion.div>
  );
};

const AuditView: React.FC<AuditViewProps> = ({ onFinish }) => {
  const [items, setItems] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [decisionLog, setDecisionLog] = useState<Record<string, 'impulse' | 'planned'>>({});

  const handleDecision = (type: 'impulse' | 'planned') => {
    if (items.length === 0) return;
    
    const current = items[0];
    setDecisionLog(prev => ({ ...prev, [current.id]: type }));
    setItems(prev => prev.slice(1));

    if (items.length === 1) {
      setTimeout(onFinish, 800);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-8 relative overflow-hidden">
      <div className="py-6 text-center space-y-1">
        <h2 className="text-2xl font-black text-[#1C1B1F] tracking-tight">Vibe Audit</h2>
        {/* Added missing MOCK_PEOPLE by importing it from constants */}
        <p className="text-sm font-medium text-[#49454F] opacity-70">Be honest with yourself, {MOCK_PEOPLE[0].name}!</p>
      </div>

      <div className="flex-1 relative mt-2 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            // Only render top 2 cards for performance and stack look
            if (index > 1) return null;
            return (
              <Card 
                key={item.id} 
                item={item} 
                onDecision={handleDecision} 
              />
            );
          })}
          {items.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-center space-y-6"
            >
              <div className="w-24 h-24 bg-teal-500 rounded-3xl flex items-center justify-center mx-auto text-white text-4xl m3-shadow transform rotate-12">
                ✨
              </div>
              <div className="space-y-2">
                <p className="font-black text-2xl text-gray-900">Audit Complete!</p>
                <p className="text-gray-500 text-sm">Wrapping up your insights...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center space-x-10 mt-10">
        <div className="flex flex-col items-center space-y-3">
          <button 
            onClick={() => handleDecision('impulse')}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center m3-shadow group active:scale-95 transition-all hover:bg-red-50"
          >
            <span className="text-[#FF8A80] text-3xl font-light group-hover:scale-110 transition-transform">✕</span>
          </button>
          <span className="text-[10px] font-black text-[#FF8A80] uppercase tracking-widest">Impulse</span>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <button 
            onClick={() => handleDecision('planned')}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center m3-shadow group active:scale-95 transition-all hover:bg-teal-50"
          >
            <span className="text-[#80CBC4] text-3xl font-light group-hover:scale-110 transition-transform">✓</span>
          </button>
          <span className="text-[10px] font-black text-[#80CBC4] uppercase tracking-widest">Planned</span>
        </div>
      </div>
    </div>
  );
};

export default AuditView;
