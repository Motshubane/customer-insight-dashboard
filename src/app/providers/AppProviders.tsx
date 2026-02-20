import React from 'react';
import type { ReactNode } from 'react';
import { FilterProvider } from '@/contexts/FilterContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;