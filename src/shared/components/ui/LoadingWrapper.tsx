import React from 'react';
import { Loader } from './Loader';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  skeleton?: React.ReactNode;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  children,
  fallback,
  skeleton
}) => {
  if (isLoading) {
    if (skeleton) {
      return <>{skeleton}</>;
    }
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};