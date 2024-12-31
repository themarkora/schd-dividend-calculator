import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/lib/utils';

interface ResultsDisplayProps {
  results: {
    totalDividends: number;
    finalPortfolioValue: number;
    annualDividendIncome: number;
    yieldOnCost: number;
  };
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Dividends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(results.totalDividends)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Portfolio Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(results.finalPortfolioValue)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Annual Dividend Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">
            {formatCurrency(results.annualDividendIncome)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Yield on Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">
            {results.yieldOnCost.toFixed(2)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};