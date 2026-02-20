import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/features/dashboard/Dashboard';
import CustomerList from '@/features/customers/pages/CustomerList';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;