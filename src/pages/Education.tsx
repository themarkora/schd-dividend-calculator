import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, DollarSign, Calculator, Percent } from "lucide-react";

const Education = () => {
  const sections = [
    {
      title: "SCHD Basics",
      icon: BookOpen,
      content: [
        "SCHD tracks the Dow Jones U.S. Dividend 100 Index",
        "Focuses on high-quality, dividend-paying companies",
        "Low expense ratio of 0.06%",
        "History of consistent dividend growth"
      ]
    },
    {
      title: "Dividend Investing",
      icon: DollarSign,
      content: [
        "Regular income through dividend payments",
        "Potential for capital appreciation",
        "Benefits of compound growth",
        "Risk diversification strategies"
      ]
    },
    {
      title: "Tax Considerations",
      icon: Calculator,
      content: [
        "Qualified vs. non-qualified dividends",
        "Tax brackets impact",
        "Tax-advantaged accounts",
        "Tax loss harvesting"
      ]
    },
    {
      title: "Key Metrics",
      icon: Percent,
      content: [
        "Dividend yield",
        "Payout ratio",
        "Dividend growth rate",
        "Yield on cost"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Education Hub</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn the fundamentals of dividend investing and how to make informed investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="inline-block h-1.5 w-1.5 mt-2 rounded-full bg-primary shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Glossary of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="font-semibold text-primary">Dividend Yield</dt>
                <dd className="text-gray-600">Annual dividend payment divided by current stock price</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Payout Ratio</dt>
                <dd className="text-gray-600">Percentage of earnings paid as dividends</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Ex-Dividend Date</dt>
                <dd className="text-gray-600">Date when new buyers won't receive the next dividend</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Yield on Cost</dt>
                <dd className="text-gray-600">Current dividend yield based on original purchase price</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Education;