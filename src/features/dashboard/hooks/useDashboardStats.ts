import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { FilterState } from '@/shared/types';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => api.getDashboardKPIs(),
    staleTime: 10 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useChartData = (days: number = 30) => {
  return useQuery({
    queryKey: ['dashboard', 'chart', days],
    queryFn: () => api.getChartData(days),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTransactions = (filters?: Partial<FilterState>) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => api.getTransactions(filters),
    staleTime: 2 * 60 * 1000,
  });
};