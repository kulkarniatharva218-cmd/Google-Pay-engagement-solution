
import React from 'react';
import { motion } from 'framer-motion';

interface ReflectBlobProps {
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const ReflectBlob: React.FC<ReflectBlobProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    full: 'w-full h-full'
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} rounded-full blur-3xl opacity-70`}
        style={{
          background: 'linear-gradient(135deg, #FF8A80 0%, #80CBC4 50%, #3949AB 100%)',
        }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, 90, 180, 0],
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 70%"]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ReflectBlob;
