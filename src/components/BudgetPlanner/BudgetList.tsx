import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Trash2 } from "lucide-react";
import { BudgetItem } from "./types";

interface BudgetListProps {
  items: BudgetItem[];
  onRemoveItem: (id: string) => void;
}

const BudgetList = ({ items, onRemoveItem }: BudgetListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <DollarSign className={item.type === "income" ? "text-green-600" : "text-red-600"} />
                <div>
                  <p className="font-medium">{item.category}</p>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">${item.amount.toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center text-gray-500">No budget items added yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetList;