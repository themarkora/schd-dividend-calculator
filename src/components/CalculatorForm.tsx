import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface CalculatorFormProps {
  values: {
    investmentAmount: number;
    dividendYield: number;
    growthRate: number;
    years: number;
    reinvestDividends: boolean;
    taxRate: number;
  };
  onChange: (field: string, value: number | boolean) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ values, onChange }) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Calculator Inputs</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="investmentAmount">Initial Investment ($)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The amount you plan to invest initially</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="investmentAmount"
            type="number"
            value={values.investmentAmount}
            onChange={(e) => onChange('investmentAmount', Number(e.target.value))}
            className="calculator-input"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="dividendYield">Dividend Yield (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current annual dividend yield percentage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="dividendYield"
            type="number"
            step="0.01"
            value={values.dividendYield}
            onChange={(e) => onChange('dividendYield', Number(e.target.value))}
            className="calculator-input"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="growthRate">Annual Growth Rate (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expected annual dividend growth rate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="growthRate"
            type="number"
            step="0.1"
            value={values.growthRate}
            onChange={(e) => onChange('growthRate', Number(e.target.value))}
            className="calculator-input"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="years">Investment Period (Years)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of years you plan to hold the investment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="years"
            type="number"
            min="1"
            max="50"
            value={values.years}
            onChange={(e) => onChange('years', Number(e.target.value))}
            className="calculator-input"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your dividend tax rate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="taxRate"
            type="number"
            min="0"
            max="100"
            value={values.taxRate}
            onChange={(e) => onChange('taxRate', Number(e.target.value))}
            className="calculator-input"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="reinvestDividends">Reinvest Dividends</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle dividend reinvestment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="reinvestDividends"
            checked={values.reinvestDividends}
            onCheckedChange={(checked) => onChange('reinvestDividends', checked)}
          />
        </div>
      </div>
    </div>
  );
};