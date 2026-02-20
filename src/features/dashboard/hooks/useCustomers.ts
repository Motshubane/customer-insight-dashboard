import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import type { FilterState, Customer } from '@/shared/types';

// Query keys - cache management
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (filters: Partial<FilterState>) => [...customerKeys.lists(), filters] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

// Hook - paginated/filtered customers
export const useCustomers = (filters: Partial<FilterState> = {}) => {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => api.getCustomers(filters),
    staleTime: 5 * 60 * 1000, // Data - fresh for 5 minutes
    placeholderData: (previousData) => previousData,
  });
};

// Hook - get a single customer by ID
export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => api.getCustomerById(id),
    enabled: !!id, // Only run if id is provided
    staleTime: 5 * 60 * 1000,
  });
};

// Hook - get customer transactions
export const useCustomerTransactions = (customerId: string, limit: number = 10) => {
  return useQuery({
    queryKey: ['customers', customerId, 'transactions', limit],
    queryFn: () => api.getCustomerTransactions(customerId, limit),
    enabled: !!customerId,
    staleTime: 2 * 60 * 1000,
  });
};

//mutation (for future use)
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (customer: Partial<Customer> & { id: string }) => {
      //this would be an API call if app was fully implemented
      await new Promise(resolve => setTimeout(resolve, 500));
      return customer;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
};