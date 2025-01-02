import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  tooltip: string;
  value: number;
  onChange: (value: number) => void;
  type?: string;
  step?: string;
  min?: string;
  max?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  tooltip,
  value,
  onChange,
  type = "number",
  step,
  min,
  max
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // If the input is empty or just a minus sign, set value to 0
    if (inputValue === '' || inputValue === '-') {
      onChange(0);
      return;
    }

    // Convert to number and update if valid
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label htmlFor={id}>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id={id}
        type={type}
        step={step}
        min={min}
        max={max}
        value={value === 0 ? '' : value}
        onChange={handleChange}
        className="text-right pr-4 h-12"
      />
    </div>
  );
};