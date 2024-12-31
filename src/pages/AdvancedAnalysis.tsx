import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DividendChart } from '@/components/DividendChart';
import { calculateDividendResults } from '@/lib/utils';

const AdvancedAnalysis = () => {
  // Sample data for demonstration
  const sampleResults = calculateDividendResults(
    100000, // Initial investment
    3.5,    // Dividend yield
    5,      // Growth rate
    20,     // Years
    true,   // Reinvest dividends
    15      // Tax rate
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Analysis</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Detailed analysis and projections for dividend investment strategies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Growth Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <DividendChart data={sampleResults.yearlyData} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Dividends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  ${Math.round(sampleResults.totalDividends).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Cumulative dividends earned
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Final Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  ${Math.round(sampleResults.finalPortfolioValue).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Total investment value
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Annual Dividend Income</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  ${Math.round(sampleResults.annualDividendIncome).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Projected yearly income
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yield on Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {sampleResults.yieldOnCost.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Return on initial investment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalysis;