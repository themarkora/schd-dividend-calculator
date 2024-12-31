import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HistoricalData = () => {
  const historicalData = [
    { year: 2024, dividendYield: "3.96%", totalReturn: "-0.36%", dividendGrowth: "8.0%" },
    { year: 2023, dividendYield: "3.58%", totalReturn: "2.85%", dividendGrowth: "13.9%" },
    { year: 2022, dividendYield: "3.41%", totalReturn: "-3.20%", dividendGrowth: "15.9%" },
    { year: 2021, dividendYield: "2.98%", totalReturn: "29.63%", dividendGrowth: "13.0%" },
    { year: 2020, dividendYield: "3.62%", totalReturn: "11.29%", dividendGrowth: "12.1%" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>SCHD Historical Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {historicalData.map((data) => (
            <div key={data.year} className="p-4 border rounded-lg">
              <div className="text-lg font-semibold">{data.year}</div>
              <div className="space-y-2 text-sm">
                <div>Dividend Yield: {data.dividendYield}</div>
                <div>Total Return: {data.totalReturn}</div>
                <div>Dividend Growth: {data.dividendGrowth}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalData;