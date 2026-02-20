import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app/App';

// Mock the chart component
vi.mock('@/features/dashboard/components/TransactionChart', () => ({
  TransactionChart: () => <div data-testid="mock-chart" />
}));

// Mock contexts
vi.mock('@/contexts/useFilters', () => ({
  useFilters: () => ({
    filters: {
      dateRange: { start: new Date(), end: new Date() },
      searchQuery: '',
      riskLevels: [],
      provinces: [],
      accountTypes: [],
    },
    setDateRange: vi.fn(),
    setSearchQuery: vi.fn(),
    setRiskLevels: vi.fn(),
    setProvinces: vi.fn(),
    setAccountTypes: vi.fn(),
    activeFilterCount: 0,
  }),
}));

vi.mock('@/contexts/useNotifications', () => ({
  useNotifications: () => ({
    notifications: [],
    showNotification: vi.fn(),
  }),
}));

vi.mock('@/contexts/NotificationToast', () => ({
  NotificationToast: () => null,
}));

vi.mock('@/features/dashboard/hooks/useDashboardStats', () => ({
  useDashboardStats: () => ({
    data: {
      totalCustomers: 2843,
      totalVolume: 2400000,
      highRiskCustomers: 124,
    },
    isLoading: false,
  }),
  useChartData: () => ({
    data: [],
    isLoading: false,
  }),
  useTransactions: () => ({
    data: { data: [] },
    isLoading: false,
  }),
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Kopano Bank/i)).toBeDefined();
  });

  it('renders the sidebar navigation', () => {
    render(<App />);
    expect(screen.getByText('Executive Dashboard')).toBeDefined();
  });
});