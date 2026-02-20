import type { NavGroup } from '../types';

export const NAVIGATION_GROUPS: NavGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboard & Overview',
    items: [
      { id: 'exec-dash', label: 'Executive Dashboard', path: '/', icon: '📊' },
      { id: 'branch-perf', label: 'Branch Performance', path: '/branch-performance', icon: '🏢' },
      { id: 'regional', label: 'Regional Overview', path: '/regional-overview', icon: '🗺️' },
      { id: 'daily', label: 'Daily Snapshot', path: '/daily-snapshot', icon: '📅' },
      { id: 'metrics', label: 'Key Metrics', path: '/key-metrics', icon: '📈' },
    ],
  },
  {
    id: 'customers',
    label: 'Customer Management',
    items: [
      { id: 'cust-list', label: 'Customer List', path: '/customers', icon: '👥', badge: 2843 },
      { id: 'hnw', label: 'High Net Worth', path: '/customers/high-net-worth', icon: '💎', badge: 342 },
      { id: 'corp', label: 'Corporate Clients', path: '/customers/corporate', icon: '🏛️' },
      { id: 'sme', label: 'SME Customers', path: '/customers/sme', icon: '🏢' },
      { id: 'youth', label: 'Youth Accounts', path: '/customers/youth', icon: '🧒' },
      { id: 'senior', label: 'Senior Citizens', path: '/customers/senior', icon: '👴' },
      { id: 'dormant', label: 'Dormant Accounts', path: '/customers/dormant', icon: '💤', badge: 156 },
      { id: 'onboarding', label: 'Customer Onboarding', path: '/customers/onboarding', icon: '🚀' },
    ],
  },
  {
    id: 'accounts',
    label: 'Accounts',
    items: [
      { id: 'acc-ov', label: 'Account Overview', path: '/accounts', icon: '💳' },
      { id: 'savings', label: 'Savings Accounts', path: '/accounts/savings', icon: '💰' },
      { id: 'cheque', label: 'Cheque Accounts', path: '/accounts/cheque', icon: '📝' },
      { id: 'cards', label: 'Credit Cards', path: '/accounts/credit-cards', icon: '💳' },
      { id: 'fixed', label: 'Fixed Deposits', path: '/accounts/fixed-deposits', icon: '🏦' },
      { id: 'foreign', label: 'Foreign Currency', path: '/accounts/foreign-currency', icon: '🌍' },
    ],
  },
  {
    id: 'transactions',
    label: 'Transactions',
    items: [
      { id: 'tx-mon', label: 'Transaction Monitor', path: '/transactions', icon: '🔄' },
      { id: 'pending', label: 'Pending Approvals', path: '/transactions/pending', icon: '⏳', badge: 23 },
      { id: 'failed', label: 'Failed Transactions', path: '/transactions/failed', icon: '❌', badge: 7 },
      { id: 'large', label: 'Large Transactions', path: '/transactions/large', icon: '💰' },
      { id: 'intl', label: 'International Transfers', path: '/transactions/international', icon: '✈️' },
    ],
  },
  {
    id: 'loans',
    label: 'Loans & Credit',
    items: [
      { id: 'loan-por', label: 'Loan Portfolio', path: '/loans', icon: '📊' },
      { id: 'mortgage', label: 'Mortgage Loans', path: '/loans/mortgage', icon: '🏠' },
      { id: 'vehicle', label: 'Vehicle Finance', path: '/loans/vehicle', icon: '🚗' },
      { id: 'personal', label: 'Personal Loans', path: '/loans/personal', icon: '👤' },
      { id: 'business', label: 'Business Loans', path: '/loans/business', icon: '🏢' },
      { id: 'npl', label: 'Non-Performing Loans', path: '/loans/non-performing', icon: '⚠️', badge: 45 },
    ],
  },
  {
    id: 'risk',
    label: 'Risk & Compliance',
    items: [
      { id: 'risk-dash', label: 'Risk Dashboard', path: '/risk', icon: '🛡️' },
      { id: 'fraud', label: 'Fraud Detection', path: '/risk/fraud', icon: '🚨', badge: 12 },
      { id: 'aml', label: 'AML Alerts', path: '/risk/aml', icon: '🔍', badge: 8 },
      { id: 'kyc', label: 'KYC Status', path: '/risk/kyc', icon: '📋' },
      { id: 'reg', label: 'Regulatory Reports', path: '/risk/regulatory', icon: '📄' },
    ],
  },
  {
    id: 'investments',
    label: 'Investments',
    items: [
      { id: 'inv-por', label: 'Investment Portfolio', path: '/investments', icon: '📈' },
      { id: 'ut', label: 'Unit Trusts', path: '/investments/unit-trusts', icon: '📊' },
      { id: 'stocks', label: 'Stock Trading', path: '/investments/stocks', icon: '📉' },
      { id: 'fixed-inc', label: 'Fixed Income', path: '/investments/fixed-income', icon: '💰' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    items: [
      { id: 'custom-rep', label: 'Custom Reports', path: '/reports/custom', icon: '📑' },
      { id: 'export', label: 'Data Export', path: '/reports/export', icon: '📤' },
      { id: 'audit', label: 'Audit Logs', path: '/reports/audit', icon: '📋' },
      { id: 'analytics', label: 'Performance Analytics', path: '/reports/analytics', icon: '📊' },
    ],
  },
];