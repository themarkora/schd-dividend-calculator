import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BudgetItem } from "./types";

interface BudgetFormProps {
  onAddItem: (item: Omit<BudgetItem, "id">) => void;
}

const BudgetForm = ({ onAddItem }: BudgetFormProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [itemType, setItemType] = useState<"income" | "expense">("expense");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newCategory || !newAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    onAddItem({
      category: newCategory,
      amount,
      type: itemType,
    });

    setNewCategory("");
    setNewAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Budget Item</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <Select
            value={itemType}
            onValueChange={(value: "income" | "expense") => setItemType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;