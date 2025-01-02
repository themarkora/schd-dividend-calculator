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
  dividendAmount: number,
  dividendGrowthRate: number,
  years: number,
  reinvestDividends: boolean,
  taxRate: number,
  extraInvestment: number = 0,
  extraInvestmentFrequency: string = 'monthly',
  dividendFrequency: string = 'quarterly',
  sharePriceGrowthRate: number = 0
) {
  let shares = investmentAmount / sharePrice;
  let totalDividends = 0;
  const yearlyData = [];
  let quarterlyDividend = dividendAmount / 4; // Convert to quarterly payment
  
  // Calculate frequency multipliers
  const extraInvestmentMultiplier = 
    extraInvestmentFrequency === 'monthly' ? 12 :
    extraInvestmentFrequency === 'quarterly' ? 4 : 1;
    
  const dividendMultiplier = 
    dividendFrequency === 'monthly' ? 12 :
    dividendFrequency === 'quarterly' ? 4 : 1;
  
  const taxMultiplier = 1 - (taxRate / 100);

  for (let year = 1; year <= years; year++) {
    let yearlyDividend = 0;
    const currentSharePrice = sharePrice * Math.pow(1 + (sharePriceGrowthRate / 100), year - 1);
    
    // Add extra investments
    const yearlyExtraInvestment = extraInvestment * extraInvestmentMultiplier;
    shares += yearlyExtraInvestment / currentSharePrice;

    // Calculate dividends for each payment period in the year
    for (let period = 0; period < dividendMultiplier; period++) {
      const dividendPayment = shares * (dividendAmount / dividendMultiplier);
      const afterTaxDividend = dividendPayment * taxMultiplier;
      
      yearlyDividend += afterTaxDividend;
      totalDividends += afterTaxDividend;

      // Reinvest if enabled
      if (reinvestDividends) {
        shares += afterTaxDividend / currentSharePrice;
      }
    }

    // Calculate portfolio value at end of year
    const portfolioValue = shares * currentSharePrice;
    
    // Increase dividend amount by growth rate for next year
    dividendAmount *= (1 + (dividendGrowthRate / 100));

    yearlyData.push({
      year,
      dividendIncome: yearlyDividend,
      portfolioValue: portfolioValue,
    });
  }

  // Calculate final year metrics
  const finalSharePrice = sharePrice * Math.pow(1 + (sharePriceGrowthRate / 100), years);
  const portfolioValue = shares * finalSharePrice;
  const annualDividendIncome = shares * dividendAmount * taxMultiplier;
  const yieldOnCost = (annualDividendIncome / investmentAmount) * 100;

  return {
    totalDividends,
    finalPortfolioValue: portfolioValue,
    annualDividendIncome,
    yieldOnCost,
    yearlyData,
  };
}