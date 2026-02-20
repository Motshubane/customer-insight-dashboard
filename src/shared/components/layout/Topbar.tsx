import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export const Topbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Customer Spending Insights</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="flex items-center gap-2 p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <UserCircleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Admin</span>
        </button>
      </div>
    </header>
  );
};