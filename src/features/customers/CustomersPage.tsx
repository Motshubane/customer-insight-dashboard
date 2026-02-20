import React from 'react';
import { AppLayout } from '@/app/layout/AppLayout';
import { Table } from '@/shared/components/tables/Table';
import type { Customer } from '@/shared/types';
import { mockCustomers } from '@/features/dashboard/services/mockData';

interface CustomersPageProps {
  customers?: Customer[];
}

const CustomersPage: React.FC<CustomersPageProps> = ({ customers = mockCustomers }) => {
  const columns = [
    { key: 'name' as keyof Customer, header: 'Name' },
    { key: 'email' as keyof Customer, header: 'Email' },
    { key: 'accountType' as keyof Customer, header: 'Account Type' },
    { key: 'riskLevel' as keyof Customer, header: 'Risk Level' },
    { key: 'province' as keyof Customer, header: 'Province' },
    { 
      key: 'totalBalance' as keyof Customer, 
      header: 'Balance',
     
      render: (value: string | number, _item: Customer) => {
        const numValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
        return <span>R {numValue.toLocaleString()}</span>;
      }
    },
  ];

  const handleRowClick = (customer: Customer) => {
    console.log('Clicked customer:', customer);
  };

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>
        <div className="bg-white rounded-lg shadow">
          <Table 
            data={customers} 
            columns={columns} 
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomersPage;