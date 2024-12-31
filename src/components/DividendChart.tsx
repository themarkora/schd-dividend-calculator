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

  const mobileMargin = { top: 20, right: 10, left: 10, bottom: 20 };
  const desktopMargin = { top: 20, right: 80, left: 80, bottom: 20 };

  return (
    <div className="chart-container h-[400px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={isMobile ? mobileMargin : desktopMargin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            label={!isMobile ? { 
              value: 'Year', 
              position: 'insideBottom', 
              offset: -10 
            } : undefined}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={isMobile ? 5 : 10}
          />
          <YAxis 
            yAxisId="left"
            label={!isMobile ? { 
              value: 'Portfolio Value ($)', 
              angle: -90, 
              position: 'insideLeft',
              offset: -60
            } : undefined}
            tickFormatter={(value) => isMobile ? `$${Math.round(value / 1000)}K` : formatCurrency(value)}
            width={isMobile ? 60 : 80}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={isMobile ? 3 : 5}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            label={!isMobile ? { 
              value: 'Dividend Income ($)', 
              angle: 90, 
              position: 'insideRight',
              offset: -50
            } : undefined}
            tickFormatter={(value) => isMobile ? `$${Math.round(value / 1000)}K` : formatCurrency(value)}
            width={isMobile ? 60 : 80}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={isMobile ? 3 : 5}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ 
              fontSize: isMobile ? '12px' : '14px',
              padding: isMobile ? '8px' : '10px'
            }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              fontSize: isMobile ? '12px' : '14px',
              paddingTop: isMobile ? '8px' : '10px'
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="portfolioValue"
            stroke="#2563eb"
            name="Portfolio Value"
            strokeWidth={isMobile ? 1.5 : 2}
            dot={{ r: isMobile ? 2 : 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="dividendIncome"
            stroke="#16a34a"
            name="Dividend Income"
            strokeWidth={isMobile ? 1.5 : 2}
            dot={{ r: isMobile ? 2 : 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};