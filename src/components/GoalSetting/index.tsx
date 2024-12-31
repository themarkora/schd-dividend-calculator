import { useState, useEffect } from "react";
import GoalForm from "./GoalForm";
import GoalCard from "./GoalCard";
import { Goal } from "./types";
import { useToast } from "@/components/ui/use-toast";

const GoalSetting = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { toast } = useToast();

  // Load goals from session storage on component mount
  useEffect(() => {
    const savedGoals = sessionStorage.getItem("financialGoals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem("financialGoals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = (newGoal: Omit<Goal, "id">) => {
    const goalWithId: Goal = {
      ...newGoal,
      id: crypto.randomUUID(),
    };
    setGoals([...goals, goalWithId]);
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
      <GoalForm onAddGoal={addGoal} />
      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onUpdateProgress={updateProgress}
            onRemoveGoal={removeGoal}
          />
        ))}
        {goals.length === 0 && (
          <p className="text-center text-gray-500">No financial goals added yet</p>
        )}
      </div>
    </div>
  );
};

export default GoalSetting;