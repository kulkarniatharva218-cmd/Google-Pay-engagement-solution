
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import StoryView from './components/StoryView';
import AuditView from './components/AuditView';
import AuditReport from './components/AuditReport';
import { AppView, AuditResult } from './types';
import { COLORS, MOCK_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [latestReport, setLatestReport] = useState<AuditResult | null>(null);

  const handleAuditFinish = (decisions: Record<string, 'impulse' | 'planned'>) => {
    let impulseTotal = 0;
    let plannedTotal = 0;
    let total = 0;

    MOCK_TRANSACTIONS.forEach(t => {
      total += t.amount;
      if (decisions[t.id] === 'impulse') impulseTotal += t.amount;
      else plannedTotal += t.amount;
    });

    const report: AuditResult = {
      timestamp: Date.now(),
      decisions,
      totalSpent: total,
      impulseAmount: impulseTotal,
      plannedAmount: plannedTotal
    };

    setLatestReport(report);
    setView('summary');
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F2F4F8] flex flex-col relative overflow-hidden shadow-2xl">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-indigo-100/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[25%] bg-teal-100/40 rounded-full blur-[100px]" />

      <Header />

      <main className="flex-1 flex flex-col z-0">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <HomeScreen 
              key="home" 
              onStart={() => setView('story')} 
              latestReport={latestReport}
              onViewReport={() => setView('report')}
            />
          )}

          {view === 'story' && (
            <StoryView key="story" onComplete={() => setView('audit')} />
          )}

          {view === 'audit' && (
            <AuditView key="audit" onFinish={handleAuditFinish} />
          )}

          {view === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col items-center justify-center px-8 text-center space-y-8"
            >
              <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl m3-shadow rotate-3">
                ✨
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-black text-[#1C1B1F] tracking-tight">Reflection Saved</h1>
                <p className="text-[#49454F] text-lg leading-relaxed">
                  Great job, Ananya! You've categorized your week. 
                  Knowing is the first step to mindful spending.
                </p>
              </div>
              <div className="flex flex-col w-full space-y-3">
                <button 
                  onClick={() => setView('report')}
                  className="w-full py-4 bg-[#1a73e8] text-white rounded-2xl font-bold m3-shadow"
                >
                  View Your Insights
                </button>
                <button 
                  onClick={() => setView('home')}
                  className="w-full py-4 text-gray-500 font-bold"
                >
                  Back to GPay
                </button>
              </div>
            </motion.div>
          )}

          {view === 'report' && latestReport && (
            <AuditReport 
              key="report" 
              report={latestReport} 
              onBack={() => setView('home')} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Mock */}
      {(view === 'home' || view === 'report') && (
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-around z-10 m3-shadow">
          <div onClick={() => setView('home')} className={`flex flex-col items-center space-y-1 ${view === 'home' ? 'text-indigo-600' : 'text-gray-400'} cursor-pointer`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            <span className="text-[10px] font-bold uppercase">Home</span>
          </div>
          <div className="flex flex-col items-center space-y-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-[10px] font-bold uppercase">Activity</span>
          </div>
          <div onClick={() => setView('report')} className={`flex flex-col items-center space-y-1 ${view === 'report' ? 'text-indigo-600' : 'text-gray-400'} cursor-pointer`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="text-[10px] font-bold uppercase">Reflect</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
