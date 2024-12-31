import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number, compact: boolean = false) => {
  if (compact) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

interface YearlyData {
  year: number;
  dividendIncome: number;
  portfolioValue: number;
}

export const calculateDividendResults = (
  initialInvestment: number,
  dividendYield: number,
  growthRate: number,
  years: number,
  reinvestDividends: boolean,
  taxRate: number
): { 
  totalDividends: number;
  finalPortfolioValue: number;
  annualDividendIncome: number;
  yieldOnCost: number;
  yearlyData: YearlyData[];
} => {
  let currentValue = initialInvestment;
  let totalDividends = 0;
  const yearlyData: YearlyData[] = [];

  for (let year = 1; year <= years; year++) {
    // Calculate dividends for the year
    const dividends = currentValue * (dividendYield / 100);
    const afterTaxDividends = dividends * (1 - taxRate / 100);
    totalDividends += afterTaxDividends;

    // Apply growth rate to the portfolio value
    currentValue = currentValue * (1 + growthRate / 100);

    // If reinvesting dividends, add them to the portfolio value
    if (reinvestDividends) {
      currentValue += afterTaxDividends;
    }

    yearlyData.push({
      year,
      dividendIncome: afterTaxDividends,
      portfolioValue: currentValue,
    });
  }

  // Calculate final year's dividend income for annual income
  const finalYearDividends = currentValue * (dividendYield / 100) * (1 - taxRate / 100);
  
  // Calculate yield on cost
  const yieldOnCost = (finalYearDividends / initialInvestment) * 100;

  return {
    totalDividends,
    finalPortfolioValue: currentValue,
    annualDividendIncome: finalYearDividends,
    yieldOnCost,
    yearlyData,
  };
};