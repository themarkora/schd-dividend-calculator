import React, { useState, useMemo } from 'react';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { DividendChart } from '@/components/DividendChart';
import { calculateDividendResults } from '@/lib/utils';

const Index = () => {
  const [values, setValues] = useState({
    investmentAmount: 10000,
    dividendYield: 3.5,
    growthRate: 5,
    years: 10,
    reinvestDividends: true,
    taxRate: 0,
  });

  const handleChange = (field: string, value: number | boolean) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const results = useMemo(() => {
    return calculateDividendResults(
      values.investmentAmount,
      values.dividendYield,
      values.growthRate,
      values.years,
      values.reinvestDividends,
      values.taxRate
    );
  }, [values]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SCHD Dividend Calculator</h1>
          <p className="text-lg text-gray-600">Plan your dividend investment strategy with our interactive calculator</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CalculatorForm values={values} onChange={handleChange} />
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <ResultsDisplay results={results} />
            <DividendChart data={results.yearlyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;