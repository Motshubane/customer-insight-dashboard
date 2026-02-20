import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { DateRangePicker } from '@/shared/components/filters/DateRangePicker';
import type { FilterState, FilterRiskLevel, FilterProvince, FilterCustomerType } from '@/shared/types';

interface GlobalFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const provinces: FilterProvince[] = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Mpumalanga', 'Limpopo', 'North West', 'Northern Cape'];
  const riskLevels: FilterRiskLevel[] = ['Low', 'Medium', 'High'];
  const accountTypes: FilterCustomerType[] = ['Savings', 'Cheque', 'Credit'];

  const activeFilterCount = [
    filters.riskLevels.length,
    filters.provinces.length,
    filters.searchQuery ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  const handleRiskLevelsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value as FilterRiskLevel);
    onFilterChange({ riskLevels: selected });
  };

  const handleProvincesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value as FilterProvince);
    onFilterChange({ provinces: selected });
  };

  const handleAccountTypesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value as FilterCustomerType);
    onFilterChange({ accountTypes: selected });
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    onFilterChange({ dateRange: { start, end } });
  };

  const clearAllFilters = () => {
    onFilterChange({
      riskLevels: [],
      provinces: [],
      searchQuery: '',
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="px-4 py-3 flex items-center gap-2">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <DateRangePicker
          startDate={filters.dateRange.start}
          endDate={filters.dateRange.end}
          onStartDateChange={(date) => handleDateRangeChange(date, filters.dateRange.end)}
          onEndDateChange={(date) => handleDateRangeChange(filters.dateRange.start, date)}
        />
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <FunnelIcon className="w-5 h-5" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            title="Clear all filters"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Risk Level</label>
              <select
                multiple
                value={filters.riskLevels}
                onChange={handleRiskLevelsChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                size={3}
              >
                {riskLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Province</label>
              <select
                multiple
                value={filters.provinces}
                onChange={handleProvincesChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                size={4}
              >
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Account Type</label>
              <select
                multiple
                value={filters.accountTypes}
                onChange={handleAccountTypesChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                size={3}
              >
                {accountTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};