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
        <CardTitle className="text-2xl">SCHD Historical Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-semibold">Year</th>
                <th className="py-3 px-4 text-left font-semibold">Dividend Yield</th>
                <th className="py-3 px-4 text-left font-semibold">Total Return</th>
                <th className="py-3 px-4 text-left font-semibold">Dividend Growth</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((data) => (
                <tr key={data.year} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium">{data.year}</td>
                  <td className="py-3 px-4 text-primary">{data.dividendYield}</td>
                  <td className={`py-3 px-4 ${
                    parseFloat(data.totalReturn) >= 0 ? 'text-secondary' : 'text-destructive'
                  }`}>
                    {data.totalReturn}
                  </td>
                  <td className="py-3 px-4 text-secondary">{data.dividendGrowth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>* Data sourced from historical SCHD performance records</p>
          <p>* Total Return includes both price appreciation and dividend payments</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalData;