import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DividendChart } from '@/components/DividendChart';
import { calculateDividendResults } from '@/lib/utils';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';

const AdvancedAnalysis = () => {
  const [values, setValues] = useState({
    investmentAmount: 100000,
    dividendYield: 3.5,
    growthRate: 5,
    years: 20,
    reinvestDividends: true,
    taxRate: 15,
  });

  const handleChange = (field: string, value: number | boolean) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const results = calculateDividendResults(
    values.investmentAmount,
    values.dividendYield,
    values.growthRate,
    values.years,
    values.reinvestDividends,
    values.taxRate
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CalculatorForm values={values} onChange={handleChange} />
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <ResultsDisplay results={results} />
            
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <DividendChart data={results.yearlyData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalysis;