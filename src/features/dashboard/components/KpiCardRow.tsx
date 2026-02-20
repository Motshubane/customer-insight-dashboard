import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import type { KPI } from '@/shared/types';
import { clsx } from 'clsx';

interface KpiCardsRowProps {
  kpis: KPI[];
}

export const KpiCardsRow: React.FC<KpiCardsRowProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {kpis.map((kpi, index) => (
        <div key={index} className="kpi-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
            {kpi.icon && <span className="text-gray-400">{kpi.icon}</span>}
          </div>
          
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
            
            <div className={clsx(
              'flex items-center gap-1 text-sm font-medium',
              kpi.trend === 'up' && 'text-green-600',
              kpi.trend === 'down' && 'text-red-600',
              kpi.trend === 'neutral' && 'text-gray-500'
            )}>
              {kpi.trend === 'up' && <ArrowUpIcon className="w-4 h-4" />}
              {kpi.trend === 'down' && <ArrowDownIcon className="w-4 h-4" />}
              <span>{Math.abs(kpi.change)}%</span>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={clsx(
                  'h-1.5 rounded-full',
                  kpi.trend === 'up' && 'bg-green-500',
                  kpi.trend === 'down' && 'bg-red-500',
                  kpi.trend === 'neutral' && 'bg-gray-500'
                )}
                style={{ width: `${Math.min(100, Math.abs(kpi.change))}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};