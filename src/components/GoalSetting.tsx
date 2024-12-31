import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Plus, Trash2, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
};

const GoalSetting = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newCurrent, setNewCurrent] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const { toast } = useToast();

  const addGoal = () => {
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

    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title: newTitle,
      targetAmount,
      currentAmount,
      deadline: newDeadline,
    };

    setGoals([...goals, newGoal]);
    setNewTitle("");
    setNewTarget("");
    setNewCurrent("");
    setNewDeadline("");
    
    toast({
      title: "Success",
      description: "Goal added successfully",
    });
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Success",
      description: "Goal removed successfully",
    });
  };

  const updateProgress = (id: string, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newAmount = goal.currentAmount + amount;
        if (newAmount > goal.targetAmount) {
          toast({
            title: "Error",
            description: "Cannot exceed target amount",
            variant: "destructive",
          });
          return goal;
        }
        return { ...goal, currentAmount: newAmount };
      }
      return goal;
    }));
  };

  return (
    <div className="space-y-6">
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
            <Button onClick={addGoal}>
              <Plus className="mr-2 h-4 w-4" /> Add Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const isCompleted = progress >= 100;
          
          return (
            <Card key={goal.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Target className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <p className="text-sm text-gray-500">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">
                        ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">{progress.toFixed(1)}% Complete</p>
                    </div>
                    
                    {!isCompleted && (
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Amount"
                          className="w-24"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const input = e.currentTarget as HTMLInputElement;
                              const amount = parseFloat(input.value);
                              if (!isNaN(amount) && amount > 0) {
                                updateProgress(goal.id, amount);
                                input.value = "";
                              }
                            }
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {isCompleted && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="h-5 w-5" />
                        <span>Completed!</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
        {goals.length === 0 && (
          <p className="text-center text-gray-500">No financial goals added yet</p>
        )}
      </div>
    </div>
  );
};

export default GoalSetting;