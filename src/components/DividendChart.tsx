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
    <div className="chart-container h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ 
            top: 20, 
            right: isMobile ? 40 : 80,
            left: isMobile ? 40 : 80,
            bottom: 20 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            label={{ 
              value: 'Year', 
              position: 'insideBottom', 
              offset: -10,
              fontSize: isMobile ? 10 : 12
            }}
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis 
            yAxisId="left"
            label={{ 
              value: 'Portfolio Value ($)', 
              angle: -90, 
              position: 'insideLeft',
              offset: isMobile ? -30 : -60,
              fontSize: isMobile ? 10 : 12
            }}
            tickFormatter={(value) => isMobile ? formatCurrency(value, true) : formatCurrency(value)}
            width={isMobile ? 60 : 80}
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            label={{ 
              value: 'Dividend Income ($)', 
              angle: 90, 
              position: 'insideRight',
              offset: isMobile ? -30 : -50,
              fontSize: isMobile ? 10 : 12
            }}
            tickFormatter={(value) => isMobile ? formatCurrency(value, true) : formatCurrency(value)}
            width={isMobile ? 60 : 80}
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ fontSize: isMobile ? '12px' : '14px' }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: isMobile ? '12px' : '14px' }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="portfolioValue"
            stroke="#2563eb"
            name="Portfolio Value"
            strokeWidth={2}
            dot={{ r: isMobile ? 2 : 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="dividendIncome"
            stroke="#16a34a"
            name="Dividend Income"
            strokeWidth={2}
            dot={{ r: isMobile ? 2 : 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};