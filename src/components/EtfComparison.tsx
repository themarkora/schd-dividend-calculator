import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EtfComparison = () => {
  const etfData = [
    {
      etf: "SCHD",
      yield: "3.96%",
      expenseRatio: "0.06%",
      description: "High-quality dividend growth focus",
      fiveYearReturn: "11.2%"
    },
    {
      etf: "VYM",
      yield: "3.12%",
      expenseRatio: "0.06%",
      description: "High dividend yield focus",
      fiveYearReturn: "9.8%"
    },
    {
      etf: "DGRO",
      yield: "2.48%",
      expenseRatio: "0.08%",
      description: "Dividend growth focus",
      fiveYearReturn: "10.4%"
    },
    {
      etf: "HDV",
      yield: "4.02%",
      expenseRatio: "0.08%",
      description: "High dividend yield focus",
      fiveYearReturn: "8.9%"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>ETF Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ETF</TableHead>
              <TableHead>Yield</TableHead>
              <TableHead>Expense Ratio</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>5Y Return</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {etfData.map((etf) => (
              <TableRow key={etf.etf}>
                <TableCell className="font-medium">{etf.etf}</TableCell>
                <TableCell>{etf.yield}</TableCell>
                <TableCell>{etf.expenseRatio}</TableCell>
                <TableCell className="hidden md:table-cell">{etf.description}</TableCell>
                <TableCell>{etf.fiveYearReturn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EtfComparison;