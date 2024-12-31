import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartData {
  year: number;
  dividendIncome: number;
  portfolioValue: number;
}

interface DividendChartProps {
  data: ChartData[];
}

export const DividendChart: React.FC<DividendChartProps> = ({ data }) => {
  const isMobile = useIsMobile();

  return (
    <div className="chart-container h-[500px] bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Dividend Growth Projection</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ 
            top: 20, 
            right: isMobile ? 20 : 40,
            left: isMobile ? 20 : 60,
            bottom: 20 
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis 
            yAxisId="left"
            orientation="left"
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            width={60}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            width={60}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '8px'
            }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: '#374151', fontSize: '14px' }}>
                {value === 'portfolioValue' ? 'Portfolio Value' : 'Dividend Income'}
              </span>
            )}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="portfolioValue"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 0 }}
            activeDot={{ r: 6, fill: '#2563eb' }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="dividendIncome"
            stroke="#16a34a"
            strokeWidth={2.5}
            dot={{ r: 0 }}
            activeDot={{ r: 6, fill: '#16a34a' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};