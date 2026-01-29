
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReflectBlob from './ReflectBlob';

interface StoryViewProps {
  onComplete: () => void;
}

const stories = [
  {
    text: "You spent 40% of your budget on 'Late Night Cravings'.",
    subtext: "Triggers: Boredom?",
    highlight: "#FF8A80"
  },
  {
    text: "Your coffee runs peaked on Tuesday morning.",
    subtext: "Momentum: Work Meeting Prep",
    highlight: "#80CBC4"
  },
  {
    text: "Stress buying was higher than last week.",
    subtext: "Deep breaths, let's look closer.",
    highlight: "#3949AB"
  }
];

const StoryView: React.FC<StoryViewProps> = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (current < stories.length - 1) {
        setCurrent(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, [current, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#1C1B1F] flex flex-col overflow-hidden"
    >
      {/* Background Blob */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 scale-150 pointer-events-none">
        <ReflectBlob size="full" />
      </div>

      {/* Progress Bars */}
      <div className="flex space-x-2 px-4 pt-6 relative z-50">
        {stories.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: idx === current ? '100%' : idx < current ? '100%' : '0%' }}
              transition={{ duration: idx === current ? 4.5 : 0, ease: "linear" }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-bold text-white leading-tight">
              {stories[current].text}
            </h1>
            <p className="text-xl text-white/70 italic">
              {stories[current].subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <div className="pb-12 text-center text-white/30 text-xs font-medium uppercase tracking-widest relative z-10">
        Reflection in progress...
      </div>
    </motion.div>
  );
};

export default StoryView;
