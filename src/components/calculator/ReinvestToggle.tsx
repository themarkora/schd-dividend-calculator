import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface ReinvestToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const ReinvestToggle: React.FC<ReinvestToggleProps> = ({
  checked,
  onCheckedChange,
}) => {
  return (
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
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};