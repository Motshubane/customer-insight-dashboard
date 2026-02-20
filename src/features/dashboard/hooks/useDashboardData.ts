import { useState, useEffect } from 'react';
import type { Customer, Transaction } from '../services/mockData';
import { mockCustomers, mockTransactions } from '../services/mockData';

interface FilterState {
  dateRange: { start: Date; end: Date };
  searchQuery: string;
  riskLevels: string[];
  provinces: string[];
  accountTypes: string[];
}

export const useDashboardData = (filters: FilterState) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter customers
      let filteredCustomers = [...mockCustomers];
      
      if (filters.riskLevels && filters.riskLevels.length > 0) {
        filteredCustomers = filteredCustomers.filter(c => 
          filters.riskLevels.includes(c.riskLevel)
        );
      }
      
      if (filters.provinces && filters.provinces.length > 0) {
        filteredCustomers = filteredCustomers.filter(c => 
          filters.provinces.includes(c.province)
        );
      }
      
      if (filters.accountTypes && filters.accountTypes.length > 0) {
        filteredCustomers = filteredCustomers.filter(c => 
          filters.accountTypes.includes(c.accountType)
        );
      }
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredCustomers = filteredCustomers.filter(c => 
          c.name.toLowerCase().includes(query)
        );
      }
      
      // Filter transactions based on date range and customers
      let filteredTransactions = mockTransactions.filter(t => 
        filteredCustomers.some(c => c.id === t.customerId)
      );
      
      if (filters.dateRange?.start && filters.dateRange?.end) {
        filteredTransactions = filteredTransactions.filter(t => {
          const txDate = new Date(t.date);
          return txDate >= filters.dateRange.start && txDate <= filters.dateRange.end;
        });
      }
      
      setCustomers(filteredCustomers);
      setTransactions(filteredTransactions);
      setLoading(false);
    };

    fetchData();
  }, [filters]);

  // Calculate KPIs
  const kpis = {
    totalCustomers: customers.length,
    averageBalance: customers.length > 0 
      ? customers.reduce((sum, c) => sum + c.totalBalance, 0) / customers.length 
      : 0,
    monthlyVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
    highRiskCount: customers.filter(c => c.riskLevel === 'High').length,
  };

  // Calculate trends (mock data)
  const trends = {
    customers: { value: '+5.2%', direction: 'up' as const },
    balance: { value: '+2.1%', direction: 'up' as const },
    volume: { value: '+8.3%', direction: 'up' as const },
    risk: { value: '-3.2%', direction: 'down' as const },
  };

  return {
    customers,
    transactions,
    kpis,
    trends,
    loading,
  };
};