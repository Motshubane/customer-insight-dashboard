import React from 'react';
import type { Insight } from '@/shared/types';
import { 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface RightInsightsPanelProps {
  insights: Insight[];
}

export const RightInsightsPanel: React.FC<RightInsightsPanelProps> = ({ insights }) => {
  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'danger':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <ArrowTrendingUpIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBorderColor = (type: Insight['type']) => {
    switch (type) {
      case 'danger':
        return 'border-red-500';
      case 'warning':
        return 'border-yellow-500';
      case 'success':
        return 'border-green-500';
      case 'info':
        return 'border-blue-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className="h-full p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Key Insights</h2>
        <p className="text-sm text-gray-500">Real-time analysis and alerts</p>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={clsx(
              'insight-card',
              getBorderColor(insight.type)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getIcon(insight.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {insight.title}
                  </h3>
                  {insight.value && (
                    <span className="text-lg font-bold text-gray-900">
                      {insight.value}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {insight.description}
                </p>
                
                {insight.action && (
                  <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                    {insight.action} →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <button className="w-full text-left text-sm text-gray-700 hover:bg-white px-3 py-2 rounded-lg transition-colors">
              📊 Generate Risk Report
            </button>
            <button className="w-full text-left text-sm text-gray-700 hover:bg-white px-3 py-2 rounded-lg transition-colors">
              📧 Send Daily Summary
            </button>
            <button className="w-full text-left text-sm text-gray-700 hover:bg-white px-3 py-2 rounded-lg transition-colors">
              🔔 Configure Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};