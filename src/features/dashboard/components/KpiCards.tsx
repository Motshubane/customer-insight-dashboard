import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface KpiCardsProps {
  kpis: {
    totalCustomers: number;
    averageBalance: number;
    monthlyVolume: number;
    highRiskCount: number;
  };
  trends: {
    customers: { value: string; direction: 'up' | 'down' };
    balance: { value: string; direction: 'up' | 'down' };
    volume: { value: string; direction: 'up' | 'down' };
    risk: { value: string; direction: 'up' | 'down' };
  };
}

export const KpiCards: React.FC<KpiCardsProps> = ({ kpis, trends }) => {
  const cards = [
    {
      title: 'Total Customers',
      value: kpis.totalCustomers.toLocaleString(),
      trend: trends.customers,
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Average Balance',
      value: `R ${Math.round(kpis.averageBalance).toLocaleString()}`,
      trend: trends.balance,
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Monthly Volume',
      value: `R ${Math.round(kpis.monthlyVolume / 1000)}k`,
      trend: trends.volume,
      icon: '📊',
      color: 'purple'
    },
    {
      title: 'High Risk',
      value: kpis.highRiskCount.toString(),
      trend: trends.risk,
      icon: '⚠️',
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{card.icon}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              card.trend.direction === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {card.trend.value}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">{card.title}</p>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          <div className="mt-2 flex items-center text-xs">
            {card.trend.direction === 'up' ? (
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={card.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
              vs last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};