
import React from 'react';
import { motion } from 'framer-motion';
import { AuditResult, Transaction } from '../types';
import { MOCK_TRANSACTIONS, COLORS } from '../constants';

interface AuditReportProps {
  report: AuditResult;
  onBack: () => void;
}

const AuditReport: React.FC<AuditReportProps> = ({ report, onBack }) => {
  const impulsePercentage = Math.round((report.impulseAmount / report.totalSpent) * 100);
  const plannedPercentage = 100 - impulsePercentage;

  const impulseItems = MOCK_TRANSACTIONS.filter(t => report.decisions[t.id] === 'impulse');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="flex-1 flex flex-col bg-white rounded-t-[3rem] mt-4 m3-shadow p-8 space-y-8 overflow-y-auto"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Your Spending Health</h2>
        <button onClick={onBack} className="p-2 bg-gray-50 rounded-full text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chart Visual */}
      <div className="relative h-12 w-full bg-gray-100 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${impulsePercentage}%` }}
          className="h-full bg-[#FF8A80]"
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${plannedPercentage}%` }}
          className="h-full bg-[#80CBC4]"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-red-50 space-y-1">
          <span className="text-[10px] font-bold text-[#FF8A80] uppercase tracking-widest">Impulse</span>
          <p className="text-xl font-black text-gray-900">₹{report.impulseAmount}</p>
          <p className="text-xs text-red-400 font-medium">{impulsePercentage}% of spend</p>
        </div>
        <div className="p-4 rounded-2xl bg-teal-50 space-y-1">
          <span className="text-[10px] font-bold text-[#80CBC4] uppercase tracking-widest">Planned</span>
          <p className="text-xl font-black text-gray-900">₹{report.plannedAmount}</p>
          <p className="text-xs text-teal-400 font-medium">{plannedPercentage}% of spend</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center space-x-2">
          <span>🧠</span>
          <span>Spending Triggers</span>
        </h3>
        <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-50 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed italic">
            "Your impulse spending often happens when you're feeling <b>bored</b> or <b>stressed</b>. You spent ₹{report.impulseAmount} across {impulseItems.length} transactions that weren't planned."
          </p>
          <div className="flex flex-wrap gap-2">
            {impulseItems.map(item => (
              <span key={item.id} className="text-[10px] font-bold bg-white text-gray-500 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                {item.merchant}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center space-x-2">
          <span>🎯</span>
          <span>Next Week's Goal</span>
        </h3>
        <div className="p-5 bg-teal-500 rounded-3xl text-white shadow-lg shadow-teal-500/20">
          <p className="font-bold">The 24-Hour Rule</p>
          <p className="text-sm opacity-90 mt-1">Try waiting 24 hours before any "Late Night Cravings" purchase next week. Your future self will thank you!</p>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl m3-shadow hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Done for Now
      </button>
      
      <div className="pb-8 text-center">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Securely Reflected by Google Pay</p>
      </div>
    </motion.div>
  );
};

export default AuditReport;
