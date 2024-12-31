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
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            yAxisId="left"
            label={{ value: 'Portfolio Value ($)', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            label={{ value: 'Dividend Income ($)', angle: 90, position: 'insideRight' }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="portfolioValue"
            stroke="#2563eb"
            name="Portfolio Value"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="dividendIncome"
            stroke="#16a34a"
            name="Dividend Income"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};