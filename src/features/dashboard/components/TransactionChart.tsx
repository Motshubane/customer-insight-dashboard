import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { format } from 'date-fns';

interface ChartDataPoint {
  date: string;
  credits: number;
  debits: number;
  volume: number;
}

interface TransactionChartProps {
  data: ChartDataPoint[];
}

interface TooltipPayload {
  value: number;
  name: string;
  dataKey: string;
  payload: ChartDataPoint;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        <p className="text-sm text-gray-600">
          Credits: <span className="text-green-600 font-medium">R {payload[0]?.value?.toLocaleString() || 0}</span>
        </p>
        <p className="text-sm text-gray-600">
          Debits: <span className="text-red-600 font-medium">R {payload[1]?.value?.toLocaleString() || 0}</span>
        </p>
        <p className="text-sm text-gray-600 mt-1 pt-1 border-t border-gray-100">
          Total: <span className="text-blue-600 font-medium">R {((payload[0]?.value || 0) + (payload[1]?.value || 0)).toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'MMM dd'),
  }));
  // const totalVolume = data.reduce((sum, d) => sum + d.volume, 0);
  // const avgDaily = totalVolume / data.length;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Transaction Volume Trend</h2>
          <p className="text-sm text-gray-500">Last 30 days activity</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Credits (Inflow)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Debits (Outflow)</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorDebits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `R${(value/1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="credits"
              name="Credits"
              stroke="#10b981"
              fill="url(#colorCredits)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="debits"
              name="Debits"
              stroke="#ef4444"
              fill="url(#colorDebits)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};