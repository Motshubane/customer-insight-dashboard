import { mockCustomers } from './mockData';
import type { Customer } from '@/shared/types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCustomers = async (): Promise<Customer[]> => {
  await delay(500); // simulate 500ms API response
  return mockCustomers;
};
