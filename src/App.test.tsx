import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app/App';

// Mock all the contexts and hooks
vi.mock('@/contexts/NotificationContext', () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/contexts/useNotifications', () => ({
  useNotifications: () => ({
    notifications: [],
    showNotification: vi.fn(),
    hideNotification: vi.fn(),
  }),
}));

vi.mock('@/contexts/NotificationToast', () => ({
  NotificationToast: () => null,
}));

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

// Mock the chart component to avoid dimension warnings
vi.mock('@/features/dashboard/components/TransactionChart', () => ({
  TransactionChart: () => <div data-testid="mock-chart">Chart Mock</div>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Look for something that definitely appears
    expect(screen.getByText(/Kopano Bank/i)).toBeDefined();
  });

  it('renders the sidebar navigation', () => {
    render(<App />);
    // Look for a navigation item that should be present
    expect(screen.getByText('Executive Dashboard')).toBeDefined();
    expect(screen.getByText('Customer List')).toBeDefined();
  });
});