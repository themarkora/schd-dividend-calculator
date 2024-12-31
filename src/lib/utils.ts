import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDividendResults(
  investmentAmount: number,
  dividendYield: number,
  growthRate: number,
  years: number,
  reinvestDividends: boolean,
  taxRate: number
) {
  let portfolioValue = investmentAmount;
  let totalDividends = 0;
  const yearlyData = [];
  let currentYield = dividendYield;
  const taxMultiplier = 1 - (taxRate / 100);

  for (let year = 1; year <= years; year++) {
    let dividendIncome = portfolioValue * (currentYield / 100);
    let afterTaxDividend = dividendIncome * taxMultiplier;

    totalDividends += afterTaxDividend;

    if (reinvestDividends) {
      portfolioValue += afterTaxDividend;
    }

    yearlyData.push({
      year,
      dividendIncome: afterTaxDividend,
      portfolioValue,
    });

    currentYield *= (1 + (growthRate / 100));
  }

  const lastYearDividends = portfolioValue * (currentYield / 100) * taxMultiplier;
  const yieldOnCost = (lastYearDividends / investmentAmount) * 100;

  return {
    totalDividends,
    finalPortfolioValue: portfolioValue,
    annualDividendIncome: lastYearDividends,
    yieldOnCost,
    yearlyData,
  };
}