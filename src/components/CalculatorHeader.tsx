import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CalculatorHeader = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">SCHD Dividend Calculator</h1>
      <div className="flex items-center justify-center gap-2">
        <p className="text-lg text-gray-600">Plan your dividend investment strategy</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">SCHD is a popular dividend ETF known for its quality dividend growth focus</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CalculatorHeader;