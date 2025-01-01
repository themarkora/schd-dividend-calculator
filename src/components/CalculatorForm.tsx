import React from 'react';
import { FormField } from './calculator/FormField';
import { FrequencySelect } from './calculator/FrequencySelect';
import { ReinvestToggle } from './calculator/ReinvestToggle';

interface CalculatorFormProps {
  values: {
    investmentAmount: number;
    sharePrice: number;
    dividendAmount: number;
    dividendFrequency: string;
    dividendGrowthRate: number;
    sharePriceGrowthRate: number;
    extraInvestment: number;
    extraInvestmentFrequency: string;
    years: number;
    reinvestDividends: boolean;
    taxRate: number;
  };
  onChange: (field: string, value: number | boolean | string) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ values, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          id="investmentAmount"
          label="Initial Investment ($)"
          tooltip="The amount you plan to invest initially"
          value={values.investmentAmount}
          onChange={(value) => onChange('investmentAmount', value)}
        />

        <FormField
          id="sharePrice"
          label="Share Price ($)"
          tooltip="Current price per share"
          value={values.sharePrice}
          onChange={(value) => onChange('sharePrice', value)}
          step="0.01"
        />

        <FormField
          id="dividendAmount"
          label="Dividend Amount ($)"
          tooltip="Dividend amount per share"
          value={values.dividendAmount}
          onChange={(value) => onChange('dividendAmount', value)}
          step="0.0001"
        />

        <FrequencySelect
          id="dividendFrequency"
          label="Dividend Frequency"
          tooltip="How often dividends are paid"
          value={values.dividendFrequency}
          onChange={(value) => onChange('dividendFrequency', value)}
        />

        <FormField
          id="dividendGrowthRate"
          label="Annual Dividend Growth Rate (%)"
          tooltip="Expected annual dividend growth rate"
          value={values.dividendGrowthRate}
          onChange={(value) => onChange('dividendGrowthRate', value)}
          step="0.01"
        />

        <FormField
          id="sharePriceGrowthRate"
          label="Share Price Growth Rate (%)"
          tooltip="Expected annual share price growth rate"
          value={values.sharePriceGrowthRate}
          onChange={(value) => onChange('sharePriceGrowthRate', value)}
          step="0.01"
        />

        <FormField
          id="extraInvestment"
          label="Extra Investment ($)"
          tooltip="Additional periodic investment amount"
          value={values.extraInvestment}
          onChange={(value) => onChange('extraInvestment', value)}
        />

        <FrequencySelect
          id="extraInvestmentFrequency"
          label="Extra Investment Frequency"
          tooltip="How often additional investments are made"
          value={values.extraInvestmentFrequency}
          onChange={(value) => onChange('extraInvestmentFrequency', value)}
        />

        <FormField
          id="years"
          label="Investment Period (Years)"
          tooltip="Number of years you plan to hold the investment"
          value={values.years}
          onChange={(value) => onChange('years', value)}
          min="1"
          max="50"
        />

        <FormField
          id="taxRate"
          label="Tax Rate (%)"
          tooltip="Your dividend tax rate"
          value={values.taxRate}
          onChange={(value) => onChange('taxRate', value)}
          min="0"
          max="100"
        />

        <ReinvestToggle
          checked={values.reinvestDividends}
          onCheckedChange={(checked) => onChange('reinvestDividends', checked)}
        />
      </div>
    </div>
  );
};