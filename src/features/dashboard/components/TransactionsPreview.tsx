import React from 'react';
import type { Transaction } from '@/shared/types';

interface TransactionsPreviewProps {
  transactions: Transaction[];
}

export const TransactionsPreview: React.FC<TransactionsPreviewProps> = ({ transactions }) => {
  return (
    <div>
      {transactions.slice(0, 5).map(t => (
        <div key={t.id}>{t.customerName} - R {t.amount}</div>
      ))}
    </div>
  );
};