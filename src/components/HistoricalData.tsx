import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const historicalData = [
  {
    year: "2023",
    dividendYield: "3.81%",
    totalReturn: "-0.89%",
    dividendGrowth: "13.67%"
  },
  {
    year: "2022",
    dividendYield: "3.39%",
    totalReturn: "-3.20%",
    dividendGrowth: "24.56%"
  },
  {
    year: "2021",
    dividendYield: "2.98%",
    totalReturn: "27.24%",
    dividendGrowth: "12.41%"
  },
  {
    year: "2020",
    dividendYield: "3.63%",
    totalReturn: "11.29%",
    dividendGrowth: "3.12%"
  },
  {
    year: "2019",
    dividendYield: "3.08%",
    totalReturn: "23.36%",
    dividendGrowth: "14.89%"
  }
];

const HistoricalData = () => {
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
                    parseFloat(data.totalReturn) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.totalReturn}
                  </td>
                  <td className="py-3 px-4 text-green-600">{data.dividendGrowth}</td>
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