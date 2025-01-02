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
  sharePrice: number,
  dividendPerShare: number,
  dividendGrowthRate: number,
  sharePriceGrowthRate: number,
  years: number,
  reinvestDividends: boolean,
  taxRate: number,
  extraInvestment: number = 0,
  extraInvestmentFrequency: string = 'monthly',
  dividendFrequency: string = 'quarterly'
) {
  let shares = investmentAmount / sharePrice;
  let totalDividends = 0;
  let quarterlyDividend = dividendPerShare;
  const yearlyData = [];
  const taxMultiplier = 1 - (taxRate / 100);

  // Calculate frequency multipliers
  const extraInvestmentMultiplier = 
    extraInvestmentFrequency === 'monthly' ? 12 :
    extraInvestmentFrequency === 'quarterly' ? 4 : 1;

  const dividendMultiplier = 
    dividendFrequency === 'monthly' ? 12 :
    dividendFrequency === 'quarterly' ? 4 : 1;

  for (let year = 0; year < years; year++) {
    // Add extra investments throughout the year
    shares += (extraInvestment * extraInvestmentMultiplier) / 
              (sharePrice * Math.pow(1 + sharePriceGrowthRate / 100, year));

    // Calculate dividends for the year
    let annualDividend = shares * quarterlyDividend * dividendMultiplier;
    let afterTaxDividend = annualDividend * taxMultiplier;
    
    totalDividends += afterTaxDividend;

    // If reinvesting dividends, buy more shares at current price
    if (reinvestDividends) {
      let currentSharePrice = sharePrice * Math.pow(1 + sharePriceGrowthRate / 100, year);
      shares += afterTaxDividend / currentSharePrice;
    }

    // Calculate current portfolio value
    let currentSharePrice = sharePrice * Math.pow(1 + sharePriceGrowthRate / 100, year);
    let portfolioValue = shares * currentSharePrice;

    yearlyData.push({
      year: year + 1,
      dividendIncome: afterTaxDividend,
      portfolioValue: portfolioValue,
    });

    // Increase dividend for next year
    quarterlyDividend *= (1 + dividendGrowthRate / 100);
  }

  // Calculate final values
  let finalSharePrice = sharePrice * Math.pow(1 + sharePriceGrowthRate / 100, years);
  let portfolioValue = shares * finalSharePrice;
  let finalAnnualDividend = shares * quarterlyDividend * dividendMultiplier * taxMultiplier;
  let yieldOnCost = (finalAnnualDividend / investmentAmount) * 100;

  return {
    totalDividends,
    finalPortfolioValue: portfolioValue,
    annualDividendIncome: finalAnnualDividend,
    yieldOnCost,
    yearlyData,
  };
}