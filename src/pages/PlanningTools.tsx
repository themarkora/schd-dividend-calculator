import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Calculator, TrendingUp, PiggyBank, DollarSign, CalendarIcon, ChartBar, Check, ArrowUp, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import BudgetPlanner from "@/components/BudgetPlanner";
import GoalSetting from "@/components/GoalSetting";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlanningTools = () => {
  const [activeTab, setActiveTab] = useState("budget");

  const comingSoonTools = [
    {
      title: "Retirement Calculator",
      description: "Plan your retirement savings and estimate future needs",
      icon: PiggyBank,
      comingSoon: true
    },
    {
      title: "Investment Portfolio Planner",
      description: "Build and analyze your investment portfolio strategy",
      icon: TrendingUp,
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Planning Tools</h1>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive tools to help you plan and achieve your financial goals
          </p>
        </div>

        <Tabs defaultValue="budget" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="budget">Budget Planner</TabsTrigger>
            <TabsTrigger value="goals">Goal Setting</TabsTrigger>
          </TabsList>
          <TabsContent value="budget">
            <BudgetPlanner />
          </TabsContent>
          <TabsContent value="goals">
            <GoalSetting />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comingSoonTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full"
                      variant="outline"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningTools;