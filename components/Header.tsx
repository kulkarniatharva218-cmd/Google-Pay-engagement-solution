
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center px-4 pt-12 pb-4 space-x-3 bg-[#F2F4F8]">
      <div className="flex-1 flex items-center bg-white rounded-full px-4 py-3 m3-shadow border border-gray-100">
        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-gray-500 text-sm font-normal truncate">Pay friends and merchants</span>
      </div>
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center m3-shadow overflow-hidden border-2 border-white ring-1 ring-gray-100">
        <img src="https://picsum.photos/seed/ananya/100" alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Header;
