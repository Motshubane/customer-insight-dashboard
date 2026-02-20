import { mockTransactions } from './mockData';
import type { Transaction } from '@/shared/types';
import type { FilterState } from '@/shared/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class TransactionService {
  async getTransactions(filters?: Partial<FilterState>): Promise<Transaction[]> {
    await delay(500);
    
    let filtered = [...mockTransactions];
    
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      filtered = filtered.filter(t => {
        const date = new Date(t.date);
        return date >= filters.dateRange!.start && date <= filters.dateRange!.end;
      });
    }
    
    if (filters?.minAmount) {
      filtered = filtered.filter(t => t.amount >= filters.minAmount!);
    }
    
    if (filters?.maxAmount) {
      filtered = filtered.filter(t => t.amount <= filters.maxAmount!);
    }
    
    return filtered;
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    await delay(300);
    return mockTransactions.find(t => t.id === id) || null;
  }

  async getTransactionsByCustomer(customerId: string): Promise<Transaction[]> {
    await delay(400);
    return mockTransactions.filter(t => t.customerId === customerId);
  }

  async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    await delay(300);
    return mockTransactions.slice(0, limit);
  }

  async getTransactionStats(): Promise<{
    totalVolume: number;
    averageAmount: number;
    successRate: number;
    flaggedCount: number;
  }> {
    await delay(400);
    
    const totalVolume = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
    const averageAmount = totalVolume / mockTransactions.length;
    const successful = mockTransactions.filter(t => t.status === 'Completed').length;
    const successRate = (successful / mockTransactions.length) * 100;
    const flaggedCount = mockTransactions.filter(t => t.flagged).length;
    
    return {
      totalVolume,
      averageAmount,
      successRate,
      flaggedCount,
    };
  }
}

export const transactionService = new TransactionService();
export default transactionService;