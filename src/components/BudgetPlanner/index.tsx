import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import BudgetForm from "./BudgetForm";
import BudgetSummary from "./BudgetSummary";
import BudgetList from "./BudgetList";
import { BudgetItem } from "./types";

const BudgetPlanner = () => {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const { toast } = useToast();

  // Load items from session storage on component mount
  useEffect(() => {
    const savedItems = sessionStorage.getItem("budgetItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem("budgetItems", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<BudgetItem, "id">) => {
    const itemWithId: BudgetItem = {
      ...newItem,
      id: crypto.randomUUID(),
    };
    setItems([...items, itemWithId]);
    toast({
      title: "Success",
      description: "Budget item added successfully",
    });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Budget item removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <BudgetForm onAddItem={addItem} />
      <BudgetSummary items={items} />
      <BudgetList items={items} onRemoveItem={removeItem} />
    </div>
  );
};

export default BudgetPlanner;