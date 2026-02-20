import React, { useState } from 'react'; // Add useState import
import { AppLayout } from '@/app/layout/AppLayout'; // Add AppLayout import
import { MagnifyingGlassIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { useFilters } from '@/contexts/useFilters';
import { useCustomerFilters } from '../hooks/useCustomerFilters';
import { mockCustomers } from '@/features/dashboard/services/mockData';
import { ExportButton } from '@/shared/components/ui/ExportButton';
import { prepareCustomerDataForExport } from '@/shared/utils/export';
import { useNotifications } from '@/contexts/useNotifications';
import type { FilterState } from '@/shared/types';

// Move SortIcon outside the component
const SortIcon = ({ 
  column, 
  currentSort, 
  currentOrder 
}: { 
  column: FilterState['sortBy']; 
  currentSort: FilterState['sortBy'];
  currentOrder: FilterState['sortOrder'];
}) => {
  if (currentSort !== column) return null;
  return currentOrder === 'asc' ? 
    <ArrowUpIcon className="w-3 h-3 ml-1" /> : 
    <ArrowDownIcon className="w-3 h-3 ml-1" />;
};

const CustomerList: React.FC = () => {
  const { 
    filters, 
    setSearchQuery, 
    setRiskLevels, 
    setSorting,
    activeFilterCount,
    clearFilters 
  } = useFilters();
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const { showNotification } = useNotifications();

  const { filteredCustomers } = useCustomerFilters(mockCustomers);

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + rowsPerPage);

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Dormant':
        return 'bg-gray-100 text-gray-800';
      case 'Frozen':
        return 'bg-blue-100 text-blue-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (sortBy: typeof filters.sortBy) => {
    setSorting(sortBy, filters.sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRiskRemove = (riskToRemove: string) => {
    setRiskLevels(filters.riskLevels.filter(r => r !== riskToRemove));
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header with filter stats and export button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer List</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and view all customer accounts
            </p>
          </div>
          <div className="flex items-center gap-4">
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <span>Clear filters ({activeFilterCount})</span>
              </button>
            )}
            <ExportButton
              data={prepareCustomerDataForExport(filteredCustomers)}
              filename={`customers-${new Date().toISOString().split('T')[0]}`}
              title="Customer List Export"
              formats={['csv', 'json']}
              onExport={(format) => {
                showNotification('info', 'Export Started', `Exporting ${filteredCustomers.length} customers as ${format.toUpperCase()}`);
              }}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.riskLevels.map((risk: string) => (
            <span key={risk} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center gap-1">
              Risk: {risk}
              <button onClick={() => handleRiskRemove(risk)}>×</button>
            </span>
          ))}
          {filters.searchQuery && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center gap-1">
              Search: "{filters.searchQuery}"
              <button onClick={() => setSearchQuery('')}>×</button>
            </span>
          )}
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredCustomers.length} customers
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Customer <SortIcon column="name" currentSort={filters.sortBy} currentOrder={filters.sortOrder} />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account Type
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('risk')}
                  >
                    <div className="flex items-center">
                      Risk Level <SortIcon column="risk" currentSort={filters.sortBy} currentOrder={filters.sortOrder} />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Province
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('balance')}
                  >
                    <div className="flex items-center justify-end">
                      Balance <SortIcon column="balance" currentSort={filters.sortBy} currentOrder={filters.sortOrder} />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">Age: {customer.age}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        customer.accountType === 'Savings' ? 'bg-blue-100 text-blue-800' :
                        customer.accountType === 'Cheque' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {customer.accountType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskBadgeColor(customer.riskLevel)}`}>
                        {customer.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(customer.accountStatus)}`}>
                        {customer.accountStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.province}</td>
                    <td className="px-6 py-4 text-sm text-right font-medium">
                      R {customer.totalBalance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerList;