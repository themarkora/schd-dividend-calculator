import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const etfComparisonData = [
  {
    etf: 'SCHD',
    yield: '3.51%',
    expenseRatio: '0.06%',
    fiveYearReturn: '11.82%',
    tenYearReturn: '12.45%',
    inceptionDate: '2011',
  },
  {
    etf: 'VYM',
    yield: '2.98%',
    expenseRatio: '0.06%',
    fiveYearReturn: '9.54%',
    tenYearReturn: '10.12%',
    inceptionDate: '2006',
  },
  {
    etf: 'DVY',
    yield: '3.89%',
    expenseRatio: '0.39%',
    fiveYearReturn: '7.23%',
    tenYearReturn: '9.45%',
    inceptionDate: '2003',
  },
  {
    etf: 'HDV',
    yield: '3.92%',
    expenseRatio: '0.08%',
    fiveYearReturn: '6.89%',
    tenYearReturn: '9.01%',
    inceptionDate: '2011',
  },
];

const EtfComparison = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>ETF Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ETF</TableHead>
                <TableHead>Dividend Yield</TableHead>
                <TableHead>Expense Ratio</TableHead>
                <TableHead>5-Year Return</TableHead>
                <TableHead>10-Year Return</TableHead>
                <TableHead>Inception</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {etfComparisonData.map((etf) => (
                <TableRow key={etf.etf}>
                  <TableCell className="font-medium">{etf.etf}</TableCell>
                  <TableCell>{etf.yield}</TableCell>
                  <TableCell>{etf.expenseRatio}</TableCell>
                  <TableCell>{etf.fiveYearReturn}</TableCell>
                  <TableCell>{etf.tenYearReturn}</TableCell>
                  <TableCell>{etf.inceptionDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EtfComparison;