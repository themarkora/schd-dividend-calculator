import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <div>
          <div className="flex items-center gap-2 mb-2">
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
            className="text-right pr-4 h-12"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="sharePrice">Share Price ($)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current price per share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="sharePrice"
            type="number"
            step="0.01"
            value={values.sharePrice}
            onChange={(e) => onChange('sharePrice', Number(e.target.value))}
            className="text-right pr-4 h-12"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="dividendAmount">Dividend Amount ($)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dividend amount per share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="dividendAmount"
            type="number"
            step="0.0001"
            value={values.dividendAmount}
            onChange={(e) => onChange('dividendAmount', Number(e.target.value))}
            className="text-right pr-4 h-12"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="dividendFrequency">Dividend Frequency</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>How often dividends are paid</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={values.dividendFrequency}
            onValueChange={(value) => onChange('dividendFrequency', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="dividendGrowthRate">Annual Dividend Growth Rate (%)</Label>
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
            id="dividendGrowthRate"
            type="number"
            step="0.01"
            value={values.dividendGrowthRate}
            onChange={(e) => onChange('dividendGrowthRate', Number(e.target.value))}
            className="text-right pr-4 h-12"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="sharePriceGrowthRate">Share Price Growth Rate (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expected annual share price growth rate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="sharePriceGrowthRate"
            type="number"
            step="0.01"
            value={values.sharePriceGrowthRate}
            onChange={(e) => onChange('sharePriceGrowthRate', Number(e.target.value))}
            className="text-right pr-4 h-12"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="extraInvestment">Extra Investment ($)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional periodic investment amount</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="extraInvestment"
            type="number"
            value={values.extraInvestment}
            onChange={(e) => onChange('extraInvestment', Number(e.target.value))}
            className="text-right pr-4 h-12"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="extraInvestmentFrequency">Extra Investment Frequency</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>How often additional investments are made</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={values.extraInvestmentFrequency}
            onValueChange={(value) => onChange('extraInvestmentFrequency', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
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
            className="text-right pr-4 h-12"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
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
            className="text-right pr-4 h-12"
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
