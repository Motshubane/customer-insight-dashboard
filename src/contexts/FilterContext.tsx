import React, { createContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { 
  DateRange, 
  FilterState,
  FilterProvince,
  FilterCustomerType,
  FilterRiskLevel,
  FilterAccountStatus
} from '@/shared/types';
import { DEFAULT_FILTER_STATE } from './constants';

export interface FilterContextType {
  filters: FilterState;
  setDateRange: (range: DateRange) => void;
  setProvinces: (provinces: FilterProvince[]) => void;
  setCustomerTypes: (types: FilterCustomerType[]) => void;
  setRiskLevels: (levels: FilterRiskLevel[]) => void;
  setAccountStatus: (status: FilterAccountStatus[]) => void;
  setAccountTypes: (types: string[]) => void;
  setSearchQuery: (query: string) => void;
  setBalanceRange: (min?: number, max?: number) => void;
  setAmountRange: (min?: number, max?: number) => void;
  setSorting: (sortBy: FilterState['sortBy'], sortOrder: FilterState['sortOrder']) => void;
  resetFilters: () => void;
  clearFilters: () => void;
  activeFilterCount: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const setDateRange = useCallback((dateRange: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  }, []);

  const setProvinces = useCallback((provinces: FilterProvince[]) => {
    setFilters(prev => ({ ...prev, provinces }));
  }, []);

  const setCustomerTypes = useCallback((customerTypes: FilterCustomerType[]) => {
    setFilters(prev => ({ ...prev, customerTypes }));
  }, []);

  const setRiskLevels = useCallback((riskLevels: FilterRiskLevel[]) => {
    setFilters(prev => ({ ...prev, riskLevels }));
  }, []);

  const setAccountStatus = useCallback((accountStatus: FilterAccountStatus[]) => {
    setFilters(prev => ({ ...prev, accountStatus }));
  }, []);

  const setAccountTypes = useCallback((accountTypes: string[]) => {
    setFilters(prev => ({ ...prev, accountTypes }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  }, []);

  const setBalanceRange = useCallback((min?: number, max?: number) => {
    setFilters(prev => ({ ...prev, minBalance: min, maxBalance: max }));
  }, []);

  const setAmountRange = useCallback((min?: number, max?: number) => {
    setFilters(prev => ({ ...prev, minAmount: min, maxAmount: max }));
  }, []);

  const setSorting = useCallback((sortBy: FilterState['sortBy'], sortOrder: FilterState['sortOrder']) => {
    setFilters(prev => ({ ...prev, sortBy, sortOrder }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER_STATE);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTER_STATE,
      provinces: [],
      customerTypes: [],
      riskLevels: [],
      accountTypes: [],
      accountStatus: [],
    });
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.provinces.length > 0) count++;
    if (filters.customerTypes.length > 0) count++;
    if (filters.riskLevels.length > 0) count++;
    if (filters.accountTypes.length > 0) count++;
    if (filters.accountStatus.length > 0) count++;
    if (filters.searchQuery) count++;
    if (filters.minBalance !== undefined || filters.maxBalance !== undefined) count++;
    if (filters.minAmount !== undefined || filters.maxAmount !== undefined) count++;
    return count;
  }, [filters]);

  return (
    <FilterContext.Provider value={{
      filters,
      setDateRange,
      setProvinces,
      setCustomerTypes,
      setRiskLevels,
      setAccountStatus,
      setAccountTypes,
      setSearchQuery,
      setBalanceRange,
      setAmountRange,
      setSorting,
      resetFilters,
      clearFilters,
      activeFilterCount,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext };