import type { ReactNode } from 'react';

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  badge?: number;
  disabled?: boolean;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

// Filter Types (include 'All' for filters)
export type FilterProvince = 'Gauteng' | 'Western Cape' | 'KwaZulu-Natal' | 'Eastern Cape' | 'Free State' | 'Mpumalanga' | 'Limpopo' | 'North West' | 'Northern Cape' | 'All';
export type FilterRiskLevel = 'Low' | 'Medium' | 'High' | 'All';
export type FilterCustomerType = 'Savings' | 'Cheque' | 'Credit' | 'All';
export type FilterAccountStatus = 'Active' | 'Dormant' | 'Frozen' | 'Closed' | 'All';

// Data Types (no 'All' for actual data)
export type Province = 'Gauteng' | 'Western Cape' | 'KwaZulu-Natal' | 'Eastern Cape' | 'Free State' | 'Mpumalanga' | 'Limpopo' | 'North West' | 'Northern Cape';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type CustomerType = 'Savings' | 'Cheque' | 'Credit';
export type AccountStatus = 'Active' | 'Dormant' | 'Frozen' | 'Closed';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface FilterState {
  dateRange: DateRange;
  provinces: FilterProvince[];
  customerTypes: FilterCustomerType[];
  riskLevels: FilterRiskLevel[];
  accountTypes: string[];
  accountStatus: FilterAccountStatus[];
  minAmount?: number;
  maxAmount?: number;
  minBalance?: number;
  maxBalance?: number;
  searchQuery: string;
  sortBy: 'name' | 'balance' | 'date' | 'risk';
  sortOrder: 'asc' | 'desc';
}

// Data Types
export interface Customer {
  id: string;
  name: string;
  age: number;
  accountType: CustomerType;
  riskLevel: RiskLevel;
  accountStatus: AccountStatus;
  joinDate: string;
  province: Province;
  gender: 'Male' | 'Female' | 'Other';
  totalBalance: number;
  monthlyIncome: number;
  creditScore: number;
  lastTransaction: string;
  email: string;
  phone: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  category: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
  status: 'Completed' | 'Pending' | 'Failed';
  flagged: boolean;
  riskScore?: number;
  description?: string;
}

export interface KPI {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  color?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  value?: string | number;
  action?: string;
}