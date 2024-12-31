import React, { useState, useMemo } from 'react';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { DividendChart } from '@/components/DividendChart';
import { calculateDividendResults } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg text-gray-600">Plan your dividend investment strategy</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">SCHD is a popular dividend ETF known for its quality dividend growth focus</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CalculatorForm values={values} onChange={handleChange} />
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <ResultsDisplay results={results} />
            <Card>
              <CardHeader>
                <CardTitle>Dividend Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <DividendChart data={results.yearlyData} />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Consider reinvesting dividends for compound growth</li>
                    <li>Account for taxes in your calculations</li>
                    <li>Review historical dividend growth rates</li>
                    <li>Monitor expense ratios</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Compound interest calculations</li>
                    <li>Tax impact analysis</li>
                    <li>Dividend reinvestment modeling</li>
                    <li>Long-term growth projections</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;