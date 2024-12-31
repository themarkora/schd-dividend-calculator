import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetItem } from "./types";

interface BudgetSummaryProps {
  items: BudgetItem[];
}

const BudgetSummary = ({ items }: BudgetSummaryProps) => {
  const totalIncome = items
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = items
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className={balance >= 0 ? "text-green-600" : "text-red-600"}>
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetSummary;