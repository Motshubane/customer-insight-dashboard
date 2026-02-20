import { useMemo } from 'react';
import type { Customer, RiskLevel, Province, CustomerType, AccountStatus } from '@/shared/types';
import { useFilters } from '@/contexts/useFilters'; // Changed from FilterContext

export const useCustomerFilters = (customers: Customer[]) => {
  const { filters } = useFilters();

  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query)
      );
    }

    // Apply risk level filter
    if (filters.riskLevels && filters.riskLevels.length > 0) {
      const selectedRiskLevels = filters.riskLevels.filter((level): level is RiskLevel => 
        level !== 'All'
      ) as RiskLevel[];
      if (selectedRiskLevels.length > 0) {
        result = result.filter(customer => 
          selectedRiskLevels.includes(customer.riskLevel)
        );
      }
    }

    // Apply province filter
    if (filters.provinces && filters.provinces.length > 0) {
      const selectedProvinces = filters.provinces.filter((province): province is Province => 
        province !== 'All'
      ) as Province[];
      if (selectedProvinces.length > 0) {
        result = result.filter(customer => 
          selectedProvinces.includes(customer.province)
        );
      }
    }

    // Apply account type filter
    if (filters.accountTypes && filters.accountTypes.length > 0) {
      const selectedTypes = filters.accountTypes.filter((type): type is CustomerType => 
        type !== 'All'
      ) as CustomerType[];
      if (selectedTypes.length > 0) {
        result = result.filter(customer => 
          selectedTypes.includes(customer.accountType)
        );
      }
    }

    // Apply account status filter
    if (filters.accountStatus && filters.accountStatus.length > 0) {
      const selectedStatus = filters.accountStatus.filter((status): status is AccountStatus => 
        status !== 'All'
      ) as AccountStatus[];
      if (selectedStatus.length > 0) {
        result = result.filter(customer => 
          selectedStatus.includes(customer.accountStatus)
        );
      }
    }

    // Apply balance range filter
    if (filters.minBalance !== undefined) {
      result = result.filter(customer => customer.totalBalance >= filters.minBalance!);
    }
    if (filters.maxBalance !== undefined) {
      result = result.filter(customer => customer.totalBalance <= filters.maxBalance!);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'balance':
          comparison = a.totalBalance - b.totalBalance;
          break;
        case 'risk': {
          const riskOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          comparison = (riskOrder[a.riskLevel] || 0) - (riskOrder[b.riskLevel] || 0);
          break;
        }
        case 'date':
          comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
          break;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [customers, filters]);

  return {
    filteredCustomers: filteredAndSortedCustomers,
    totalCount: filteredAndSortedCustomers.length,
  };
};