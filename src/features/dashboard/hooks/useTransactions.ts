import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { FilterState } from '@/shared/types';

export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters: Partial<FilterState>) => [...transactionKeys.lists(), filters] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

export const useTransactions = (filters: Partial<FilterState> = {}) => {
  return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => api.getTransactions(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => api.getTransactionById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};