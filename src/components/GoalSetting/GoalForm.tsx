import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Goal } from "./types";

interface GoalFormProps {
  onAddGoal: (goal: Omit<Goal, "id">) => void;
}

const GoalForm = ({ onAddGoal }: GoalFormProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newCurrent, setNewCurrent] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newTitle || !newTarget || !newCurrent || !newDeadline) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const targetAmount = parseFloat(newTarget);
    const currentAmount = parseFloat(newCurrent);

    if (isNaN(targetAmount) || isNaN(currentAmount) || targetAmount <= 0 || currentAmount < 0) {
      toast({
        title: "Error",
        description: "Please enter valid amounts",
        variant: "destructive",
      });
      return;
    }

    if (currentAmount > targetAmount) {
      toast({
        title: "Error",
        description: "Current amount cannot be greater than target amount",
        variant: "destructive",
      });
      return;
    }

    onAddGoal({
      title: newTitle,
      targetAmount,
      currentAmount,
      deadline: newDeadline,
    });

    setNewTitle("");
    setNewTarget("");
    setNewCurrent("");
    setNewDeadline("");
    
    toast({
      title: "Success",
      description: "Goal added successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Financial Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input
            placeholder="Goal Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Target Amount"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Current Amount"
            value={newCurrent}
            onChange={(e) => setNewCurrent(e.target.value)}
          />
          <Input
            type="date"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            <Plus className="mr-2 h-4 w-4" /> Add Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalForm;