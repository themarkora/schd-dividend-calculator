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
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="text-right pr-4 h-12"
      />
    </div>
  );
};