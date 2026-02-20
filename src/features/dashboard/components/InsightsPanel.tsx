import React from 'react';
import { 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';
import type { Customer, Transaction } from '@/shared/types';

interface InsightsPanelProps {
  customers?: Customer[];
  transactions?: Transaction[];
}

interface BaseInsight {
  id: number;
  title: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  icon: React.ComponentType<{ className?: string }>;
  action?: string;
}

interface InsightWithDescription extends BaseInsight {
  description: string;
}

interface InsightWithCustomerGetter extends BaseInsight {
  getCustomerDescription: (customers: Customer[]) => string;
}

interface InsightWithTransactionGetter extends BaseInsight {
  getTransactionDescription: (transactions: Transaction[]) => string;
}

type InsightItem = InsightWithDescription | InsightWithCustomerGetter | InsightWithTransactionGetter;

const insights: InsightItem[] = [
  {
    id: 1,
    title: 'High Risk Customers',
    getCustomerDescription: (customers: Customer[]) => 
      `${customers.filter(c => c.riskLevel === 'High').length} customers require immediate attention`,
    type: 'danger',
    icon: ExclamationTriangleIcon,
    action: 'Review Now',
  },
  {
    id: 2,
    title: 'Flagged Transactions',
    getTransactionDescription: (transactions: Transaction[]) => 
      `${transactions.filter(t => t.status === 'Failed').length} failed transactions to review`,
    type: 'warning',
    icon: ExclamationTriangleIcon,
    action: 'View Flags',
  },
  {
    id: 3,
    title: 'Average Transaction',
    getTransactionDescription: (transactions: Transaction[]) => {
      const avg = transactions.length 
        ? Math.round(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length)
        : 0;
      return `R ${avg.toLocaleString()} average`;
    },
    type: 'info',
    icon: InformationCircleIcon,
  },
  {
    id: 4,
    title: 'Top Category',
    getTransactionDescription: (transactions: Transaction[]) => {
      const categories = transactions.reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + 1;
        return acc;
      }, {});
      
      const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
      return topCategory ? `${topCategory[0]} (${topCategory[1]} transactions)` : 'N/A';
    },
    type: 'success',
    icon: CheckCircleIcon,
  },
  {
    id: 5,
    title: 'Peak Hours',
    description: 'Most transactions occur between 10AM - 2PM',
    type: 'info',
    icon: ArrowTrendingUpIcon,
  },
];

const isInsightWithDescription = (insight: InsightItem): insight is InsightWithDescription => {
  return 'description' in insight;
};

const isInsightWithCustomerGetter = (insight: InsightItem): insight is InsightWithCustomerGetter => {
  return 'getCustomerDescription' in insight;
};

const isInsightWithTransactionGetter = (insight: InsightItem): insight is InsightWithTransactionGetter => {
  return 'getTransactionDescription' in insight;
};

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ 
  customers = [], 
  transactions = [] 
}) => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return 'border-red-500 bg-red-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      case 'success':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getIconStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="h-full p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Key Insights</h2>
        <p className="text-sm text-gray-500">Real-time analysis and alerts</p>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          let description = '';
          
          if (isInsightWithDescription(insight)) {
            description = insight.description;
          } else if (isInsightWithCustomerGetter(insight)) {
            description = insight.getCustomerDescription(customers);
          } else if (isInsightWithTransactionGetter(insight)) {
            description = insight.getTransactionDescription(transactions);
          }
          
          const Icon = insight.icon;
          
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border-l-4 ${getTypeStyles(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${getIconStyles(insight.type)} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {description}
                  </p>
                  {insight.action && (
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            📊 Generate Risk Report
          </button>
          <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            📧 Send Daily Summary
          </button>
          <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            🔔 Configure Alerts
          </button>
        </div>
      </div>
    </div>
  );
};