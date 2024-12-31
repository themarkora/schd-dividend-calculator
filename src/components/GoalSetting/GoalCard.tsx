import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Trash2, Check } from "lucide-react";
import { Goal } from "./types";

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (id: string, amount: number) => void;
  onRemoveGoal: (id: string) => void;
}

const GoalCard = ({ goal, onUpdateProgress, onRemoveGoal }: GoalCardProps) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const isCompleted = progress >= 100;

  return (
    <Card>
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
                        onUpdateProgress(goal.id, amount);
                        input.value = "";
                      }
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveGoal(goal.id)}
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
};

export default GoalCard;