import React from 'react';

interface CardSkeletonProps {
  lines?: number;
  className?: string;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`bg-#f4f3f2 rounded-lg shadow p-5 animate-pulse ${className}`}>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-3 mb-3">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-2 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;