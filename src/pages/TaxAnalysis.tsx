import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, DollarSign, PieChart, FileText } from "lucide-react";

const TaxAnalysis = () => {
  const taxTools = [
    {
      title: "Tax Impact Calculator",
      description: "Calculate the tax implications of your dividend investments",
      icon: DollarSign,
      metrics: [
        { label: "Federal Tax", value: "Coming Soon" },
        { label: "State Tax", value: "Coming Soon" },
      ]
    },
    {
      title: "Tax Distribution Analysis",
      description: "Analyze how your taxes are distributed across different categories",
      icon: PieChart,
      metrics: [
        { label: "Dividend Tax", value: "Coming Soon" },
        { label: "Capital Gains", value: "Coming Soon" },
      ]
    },
    {
      title: "Tax Documentation",
      description: "Access and organize your tax-related documents",
      icon: FileText,
      metrics: [
        { label: "Documents", value: "Coming Soon" },
        { label: "Reports", value: "Coming Soon" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tax & Cost Analysis</h1>
          <p className="mt-4 text-lg text-gray-600">
            Understand the tax implications and costs of your investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {taxTools.map((tool, index) => {
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
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {tool.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-medium text-gray-500">{metric.label}</div>
                        <div className="mt-1 text-xl font-semibold">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaxAnalysis;