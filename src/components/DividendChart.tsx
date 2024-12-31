import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface ChartData {
  year: number;
  dividendIncome: number;
  portfolioValue: number;
}

interface DividendChartProps {
  data: ChartData[];
}

export const DividendChart: React.FC<DividendChartProps> = ({ data }) => {
  return (
    <div className="chart-container h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ 
            top: 20, 
            right: 80,  // Increased right margin for the right axis labels
            left: 80,   // Increased left margin for the left axis labels
            bottom: 20 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            label={{ 
              value: 'Year', 
              position: 'insideBottom', 
              offset: -10 
            }}
          />
          <YAxis 
            yAxisId="left"
            label={{ 
              value: 'Portfolio Value ($)', 
              angle: -90, 
              position: 'insideLeft',
              offset: -60  // Adjusted offset for better positioning
            }}
            tickFormatter={(value) => formatCurrency(value)}
            width={80}    // Fixed width for the left axis
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            label={{ 
              value: 'Dividend Income ($)', 
              angle: 90, 
              position: 'insideRight',
              offset: -50  // Adjusted offset for better positioning
            }}
            tickFormatter={(value) => formatCurrency(value)}
            width={80}    // Fixed width for the right axis
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend 
            verticalAlign="top"
            height={36}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="portfolioValue"
            stroke="#2563eb"
            name="Portfolio Value"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="dividendIncome"
            stroke="#16a34a"
            name="Dividend Income"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};