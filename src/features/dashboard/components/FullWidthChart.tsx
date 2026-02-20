import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/shared/components/ui/Card';
import { format } from 'date-fns';

interface ChartData {
  date: string;
  value: number;
}

interface FullWidthChartProps {
  data: ChartData[];
  title?: string;
}

export const FullWidthChart: React.FC<FullWidthChartProps> = ({ 
  data,
  title = 'Transaction Volume Trend'
}) => {
  // Safe formatter handles undefined values
  const formatTooltipValue = (value: number | string | Array<number | string> | undefined) => {
    if (typeof value === 'number') {
      return [`R ${value.toLocaleString()}`, 'Amount'];
    }
    return ['R 0', 'Amount'];
  };

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                try {
                  return format(new Date(date), 'MMM dd');
                } catch {
                  return String(date);
                }
              }}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => {
                if (typeof value === 'number') {
                  return `R${(value/1000).toFixed(0)}k`;
                }
                return 'R0k';
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={formatTooltipValue}
              labelFormatter={(label) => {
                try {
                  return format(new Date(label), 'MMMM dd, yyyy');
                } catch {
                  return String(label);
                }
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};