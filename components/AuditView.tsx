
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { MOCK_TRANSACTIONS, COLORS } from '../constants';
import { Transaction } from '../types';

interface AuditViewProps {
  onFinish: () => void;
}

const AuditView: React.FC<AuditViewProps> = ({ onFinish }) => {
  const [items, setItems] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [decisionLog, setDecisionLog] = useState<Record<string, 'impulse' | 'planned'>>({});

  const handleDecision = (type: 'impulse' | 'planned') => {
    if (items.length === 0) return;
    
    const current = items[0];
    setDecisionLog(prev => ({ ...prev, [current.id]: type }));
    setItems(prev => prev.slice(1));

    if (items.length === 1) {
      setTimeout(onFinish, 600);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-8 relative overflow-hidden">
      <div className="py-4 text-center">
        <h2 className="text-xl font-bold text-[#1C1B1F]">Impulse Audit</h2>
        <p className="text-sm text-[#49454F]">Swipe or tap to categorize</p>
      </div>

      <div className="flex-1 relative mt-4 flex items-center justify-center">
        <AnimatePresence>
          {items.map((item, index) => {
            const isTop = index === 0;
            return isTop ? (
              <Card 
                key={item.id} 
                item={item} 
                onDecision={handleDecision} 
              />
            ) : null;
          })}
          {items.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center space-y-4"
            >
              <div className="w-20 h-20 bg-[#80CBC4] rounded-full flex items-center justify-center mx-auto text-white text-3xl">✓</div>
              <p className="font-semibold text-lg">All caught up!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center space-x-6 mt-8">
        <button 
          onClick={() => handleDecision('impulse')}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center m3-shadow group active:scale-90 transition-transform"
        >
          <span className="text-[#FF8A80] text-2xl group-hover:scale-110 transition-transform">✕</span>
        </button>
        <button 
          onClick={() => handleDecision('planned')}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center m3-shadow group active:scale-90 transition-transform"
        >
          <span className="text-[#80CBC4] text-2xl group-hover:scale-110 transition-transform">✓</span>
        </button>
      </div>

      <div className="flex justify-between items-center mt-8 px-4">
        <span className="text-xs font-bold text-[#FF8A80] uppercase tracking-widest">Impulse / Regret</span>
        <span className="text-xs font-bold text-[#80CBC4] uppercase tracking-widest">Worth It / Planned</span>
      </div>
    </div>
  );
};

const Card = ({ item, onDecision }: { item: Transaction, onDecision: (type: 'impulse' | 'planned') => void }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const bgColor = useTransform(x, [-100, 0, 100], ['#FF8A8033', '#FFFFFF', '#80CBC433']);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity, backgroundColor: bgColor }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onDecision('planned');
        else if (info.offset.x < -100) onDecision('impulse');
      }}
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
      className="absolute w-full max-w-sm aspect-[3/4] rounded-[2.5rem] m3-shadow p-8 flex flex-col justify-between border border-white/50 cursor-grab active:cursor-grabbing bg-white overflow-hidden"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="text-4xl">{item.icon}</div>
          <div className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{item.id} of {MOCK_TRANSACTIONS.length}</div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-[#1C1B1F]">{item.merchant}</h3>
          <p className="text-indigo-600 font-medium">{item.tag}</p>
        </div>

        <div className="text-4xl font-bold text-[#1C1B1F]">₹{item.amount}</div>
      </div>

      <div className="space-y-4">
        <div className="h-px bg-gray-100" />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Was this Planned or Impulse?</p>
          {item.trigger && (
            <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm">
              <span className="opacity-60">Probable Trigger:</span>
              <span className="font-bold">{item.trigger}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AuditView;
