import { useContext } from 'react';
import { FilterContext } from './FilterContext';
import type { FilterContextType } from './FilterContext';

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};