export type BudgetItem = {
  id: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};