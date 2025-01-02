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
  // Initialize variables
  let portfolioValue = investmentAmount;
  let totalDividends = 0;
  const yearlyData = [];
  const taxMultiplier = 1 - (taxRate / 100);

  // Calculate frequency multipliers
  const extraInvestmentMultiplier = 
    extraInvestmentFrequency === 'monthly' ? 12 :
    extraInvestmentFrequency === 'quarterly' ? 4 : 1;

  const dividendMultiplier = 
    dividendFrequency === 'monthly' ? 12 :
    dividendFrequency === 'quarterly' ? 4 : 1;

  // Calculate initial dividend yield
  let currentYield = dividendYield;

  for (let year = 1; year <= years; year++) {
    // Add periodic investments for the year
    const yearlyExtraInvestment = extraInvestment * extraInvestmentMultiplier;
    portfolioValue += yearlyExtraInvestment;

    // Calculate dividends for the year based on frequency
    const yearlyDividendRate = currentYield / 100;
    let yearlyDividends = 0;

    // Calculate dividends for each payment period in the year
    for (let period = 0; period < dividendMultiplier; period++) {
      const periodDividend = (portfolioValue * yearlyDividendRate / dividendMultiplier);
      const afterTaxDividend = periodDividend * taxMultiplier;
      yearlyDividends += afterTaxDividend;

      // If reinvesting, add dividends to portfolio before next period
      if (reinvestDividends) {
        portfolioValue += afterTaxDividend;
      }
    }

    totalDividends += yearlyDividends;

    // Apply share price growth at the end of the year
    portfolioValue *= (1 + (sharePriceGrowthRate / 100));

    // Store yearly data
    yearlyData.push({
      year,
      dividendIncome: yearlyDividends,
      portfolioValue,
    });

    // Increase dividend yield by growth rate for next year
    currentYield *= (1 + (dividendGrowthRate / 100));
  }

  // Calculate final year's dividend income for yield on cost
  const finalYearDividendRate = currentYield / 100;
  const lastYearDividends = portfolioValue * finalYearDividendRate * taxMultiplier;
  const yieldOnCost = (lastYearDividends / investmentAmount) * 100;

  return {
    totalDividends,
    finalPortfolioValue: portfolioValue,
    annualDividendIncome: lastYearDividends,
    yieldOnCost,
    yearlyData,
  };
}