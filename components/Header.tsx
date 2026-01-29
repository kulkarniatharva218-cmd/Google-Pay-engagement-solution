
import React from 'react';
import { COLORS } from '../constants';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-transparent z-10 w-full">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center m3-shadow">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <span className="text-xl font-semibold tracking-tight text-[#1C1B1F]">GPay</span>
      </div>
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center m3-shadow overflow-hidden">
        <img src="https://picsum.photos/seed/ananya/100" alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Header;
