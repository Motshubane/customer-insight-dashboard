import React from 'react';
import { AppLayout } from '@/app/layout/AppLayout';
import { GlobalFilters } from './components/GlobalFilters';
import { KpiCards } from './components/KpiCards';
import { TransactionChart } from './components/TransactionChart';
import { TransactionsTable } from './components/TransactionsTable';
import { InsightsPanel } from './components/InsightsPanel';
import { useFilters } from '@/contexts/useFilters'; // Changed from FilterContext
import { useDashboardStats, useChartData, useTransactions } from './hooks/useDashboardStats';
import { KpiSkeleton, ChartSkeleton, TableSkeleton } from '@/shared/components/ui/Loader';
import type { DateRange, FilterRiskLevel, FilterProvince } from '@/shared/types';

interface FilterChangeHandler {
  dateRange?: DateRange;
  searchQuery?: string;
  riskLevels?: FilterRiskLevel[];
  provinces?: FilterProvince[];
  accountTypes?: string[];
}

const Dashboard: React.FC = () => {
  const { filters, setDateRange, setSearchQuery, setRiskLevels, setProvinces, setAccountTypes } = useFilters();

  // Use React Query hooks
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: chartData, isLoading: chartLoading } = useChartData(30);
  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions(filters);

  const handleFilterChange = (newFilters: FilterChangeHandler) => {
    if (newFilters.dateRange) {
      setDateRange(newFilters.dateRange);
    }
    if (newFilters.searchQuery !== undefined) {
      setSearchQuery(newFilters.searchQuery);
    }
    if (newFilters.riskLevels !== undefined) {
      setRiskLevels(newFilters.riskLevels);
    }
    if (newFilters.provinces !== undefined) {
      setProvinces(newFilters.provinces);
    }
    if (newFilters.accountTypes !== undefined) {
      setAccountTypes(newFilters.accountTypes);
    }
  };

  const kpis = stats ? {
    totalCustomers: stats.totalCustomers,
    averageBalance: stats.totalVolume / stats.totalCustomers,
    monthlyVolume: stats.totalVolume,
    highRiskCount: stats.highRiskCustomers,
  } : {
    totalCustomers: 0,
    averageBalance: 0,
    monthlyVolume: 0,
    highRiskCount: 0,
  };

  const trends = {
    customers: { value: '+5.2%', direction: 'up' as const },
    balance: { value: '+2.1%', direction: 'up' as const },
    volume: { value: '+8.3%', direction: 'up' as const },
    risk: { value: '-3.2%', direction: 'down' as const },
  };

  return (
    <AppLayout
      rightPanel={<InsightsPanel customers={[]} transactions={transactionsData?.data || []} />}
    >
      <GlobalFilters filters={filters} onFilterChange={handleFilterChange} />
      
      {/* KPIs Section */}
      {statsLoading ? (
        <KpiSkeleton />
      ) : (
        <KpiCards kpis={kpis} trends={trends} />
      )}
      
      {/* Chart Section */}
      {chartLoading ? (
        <ChartSkeleton />
      ) : (
        <TransactionChart data={chartData || []} />
      )}
      
      {/* Table Section */}
      {transactionsLoading ? (
        <TableSkeleton />
      ) : (
        <TransactionsTable transactions={transactionsData?.data?.slice(0, 20) || []} />
      )}
    </AppLayout>
  );
};

export default Dashboard;