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
  dividendGrowthRate: number,
  years: number,
  reinvestDividends: boolean,
  taxRate: number,
  extraInvestment: number = 0,
  extraInvestmentFrequency: string = 'monthly',
  dividendFrequency: string = 'quarterly',
  sharePriceGrowthRate: number = 0
) {
  let portfolioValue = investmentAmount;
  let totalDividends = 0;
  const yearlyData = [];
  let currentYield = dividendYield;
  const taxMultiplier = 1 - (taxRate / 100);

  // Calculate frequency multipliers
  const extraInvestmentMultiplier = 
    extraInvestmentFrequency === 'monthly' ? 12 :
    extraInvestmentFrequency === 'quarterly' ? 4 : 1;

  const dividendMultiplier = 
    dividendFrequency === 'monthly' ? 12 :
    dividendFrequency === 'quarterly' ? 4 : 1;

  for (let year = 1; year <= years; year++) {
    // Add extra investments throughout the year
    portfolioValue += extraInvestment * extraInvestmentMultiplier;

    // Calculate dividends for the year
    let dividendIncome = (portfolioValue * (currentYield / 100)) / dividendMultiplier * dividendMultiplier;
    let afterTaxDividend = dividendIncome * taxMultiplier;

    totalDividends += afterTaxDividend;

    if (reinvestDividends) {
      portfolioValue += afterTaxDividend;
    }

    // Apply share price growth
    portfolioValue *= (1 + (sharePriceGrowthRate / 100));

    yearlyData.push({
      year,
      dividendIncome: afterTaxDividend,
      portfolioValue,
    });

    // Increase dividend yield by growth rate
    currentYield *= (1 + (dividendGrowthRate / 100));
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