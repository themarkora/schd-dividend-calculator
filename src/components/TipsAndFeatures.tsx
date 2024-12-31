import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TipsAndFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Consider reinvesting dividends for compound growth</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Account for taxes in your calculations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Review historical dividend growth rates</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Monitor expense ratios</span>
            </li>
          </ul>
        </CardContent>
      </Card>
        
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Compound interest calculations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tax impact analysis</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Dividend reinvestment modeling</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Long-term growth projections</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipsAndFeatures;