import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const historicalData = [
  {
    year: '2024',
    dividendYield: '3.96%',
    totalReturn: '-0.36%',
    dividendGrowth: '8.0%',
  },
  {
    year: '2023',
    dividendYield: '3.51%',
    totalReturn: '2.85%',
    dividendGrowth: '13.2%',
  },
  {
    year: '2022',
    dividendYield: '3.38%',
    totalReturn: '-3.18%',
    dividendGrowth: '15.9%',
  },
  {
    year: '2021',
    dividendYield: '2.89%',
    totalReturn: '23.15%',
    dividendGrowth: '12.8%',
  },
  {
    year: '2020',
    dividendYield: '3.62%',
    totalReturn: '11.32%',
    dividendGrowth: '3.5%',
  },
];

const HistoricalData = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>SCHD Historical Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Dividend Yield</TableHead>
                <TableHead>Total Return</TableHead>
                <TableHead>Dividend Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalData.map((data) => (
                <TableRow key={data.year}>
                  <TableCell className="font-medium">{data.year}</TableCell>
                  <TableCell>{data.dividendYield}</TableCell>
                  <TableCell>{data.totalReturn}</TableCell>
                  <TableCell>{data.dividendGrowth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalData;