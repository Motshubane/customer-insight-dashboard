import { mockCustomers, mockTransactions } from './mockData';
import type { Customer, Transaction, FilterState } from '@/shared/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  // Customers API
  async getCustomers(filters?: Partial<FilterState>): Promise<{
    data: Customer[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await delay(800); // Simulate network delay
    
    let filteredCustomers = [...mockCustomers];
    
    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredCustomers = filteredCustomers.filter(c => 
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query)
        );
      }
      
      if (filters.riskLevels?.length) {
        filteredCustomers = filteredCustomers.filter(c => 
          filters.riskLevels?.includes(c.riskLevel)
        );
      }
      
      if (filters.provinces?.length) {
        filteredCustomers = filteredCustomers.filter(c => 
          filters.provinces?.includes(c.province)
        );
      }
      
      if (filters.accountTypes?.length) {
        filteredCustomers = filteredCustomers.filter(c => 
          filters.accountTypes?.includes(c.accountType)
        );
      }
    }
    
    // Simulate pagination
    const page = 1;
    const limit = 20;
    const start = (page - 1) * limit;
    const paginatedData = filteredCustomers.slice(start, start + limit);
    
    return {
      data: paginatedData,
      total: filteredCustomers.length,
      page,
      totalPages: Math.ceil(filteredCustomers.length / limit),
    };
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    await delay(300);
    const customer = mockCustomers.find(c => c.id === id);
    return customer || null;
  }

  async getCustomerTransactions(customerId: string, limit: number = 10): Promise<Transaction[]> {
    await delay(400);
    return mockTransactions
      .filter(t => t.customerId === customerId)
      .slice(0, limit);
  }

  // Transactions API
  async getTransactions(filters?: Partial<FilterState>): Promise<{
    data: Transaction[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await delay(600);
    
    let filteredTransactions = [...mockTransactions];
    
    if (filters) {
      if (filters.dateRange?.start && filters.dateRange?.end) {
        filteredTransactions = filteredTransactions.filter(t => {
          const txDate = new Date(t.date);
          return txDate >= filters.dateRange!.start && txDate <= filters.dateRange!.end;
        });
      }
      
      if (filters.minAmount !== undefined) {
        filteredTransactions = filteredTransactions.filter(t => t.amount >= filters.minAmount!);
      }
      
      if (filters.maxAmount !== undefined) {
        filteredTransactions = filteredTransactions.filter(t => t.amount <= filters.maxAmount!);
      }
    }
    
    // Sort by date descending (most recent first)
    filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return {
      data: filteredTransactions.slice(0, 50), // Return last 50
      total: filteredTransactions.length,
      page: 1,
      totalPages: Math.ceil(filteredTransactions.length / 50),
    };
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    await delay(300);
    const transaction = mockTransactions.find(t => t.id === id);
    return transaction || null;
  }

  // Dashboard KPIs
  async getDashboardKPIs(): Promise<{
    totalCustomers: number;
    totalTransactions: number;
    totalVolume: number;
    averageTransaction: number;
    highRiskCustomers: number;
    activeAccounts: number;
  }> {
    await delay(500);
    
    const totalCustomers = mockCustomers.length;
    const totalTransactions = mockTransactions.length;
    const totalVolume = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
    const highRiskCustomers = mockCustomers.filter(c => c.riskLevel === 'High').length;
    const activeAccounts = mockCustomers.filter(c => c.accountStatus === 'Active').length;
    
    return {
      totalCustomers,
      totalTransactions,
      totalVolume,
      averageTransaction: totalVolume / totalTransactions,
      highRiskCustomers,
      activeAccounts,
    };
  }

  // Chart data
  async getChartData(days: number = 30): Promise<Array<{
    date: string;
    credits: number;
    debits: number;
    volume: number;
  }>> {
    await delay(400);
    
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayStr = date.toISOString().split('T')[0];
      const dayTransactions = mockTransactions.filter(t => 
        t.date.startsWith(dayStr)
      );
      
      const credits = dayTransactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const debits = dayTransactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0);
      
      data.push({
        date: dayStr,
        credits,
        debits,
        volume: credits + debits,
      });
    }
    
    return data;
  }
}

export const api = new ApiService();