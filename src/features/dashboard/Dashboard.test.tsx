import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { FilterProvider } from '@/contexts/FilterContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

// Mock the notification context
vi.mock('@/contexts/useNotifications', () => ({
  useNotifications: () => ({
    notifications: [],
    showNotification: vi.fn(),
  }),
}));

vi.mock('@/contexts/NotificationToast', () => ({
  NotificationToast: () => null,
}));

// Mock the hooks
vi.mock('./hooks/useDashboardStats', () => ({
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

describe('Dashboard', () => {
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <NotificationProvider>
          <FilterProvider>
            <Dashboard />
          </FilterProvider>
        </NotificationProvider>
      </BrowserRouter>
    );
  };

  it('renders the dashboard header', () => {
    renderDashboard();
    expect(screen.getByText(/Kopano Bank/i)).toBeDefined();
  });

  it('renders all dashboard sections', () => {
    renderDashboard();
    
    // Use getAllByText and check length for elements that might appear multiple times
    const totalCustomersElements = screen.getAllByText(/Total Customers/i);
    expect(totalCustomersElements.length).toBeGreaterThan(0);
    
    const averageBalanceElements = screen.getAllByText(/Average Balance/i);
    expect(averageBalanceElements.length).toBeGreaterThan(0);
    
    const monthlyVolumeElements = screen.getAllByText(/Monthly Volume/i);
    expect(monthlyVolumeElements.length).toBeGreaterThan(0);
    
    // For High Risk, we know it appears twice (once in KPI, once in Insights)
    const highRiskElements = screen.getAllByText(/High Risk/i);
    expect(highRiskElements.length).toBe(2); // One in KPI, one in Insights
  });
});