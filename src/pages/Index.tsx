import React, { useState, useMemo, useRef } from 'react';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { DividendChart } from '@/components/DividendChart';
import { calculateDividendResults } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EtfComparison from '@/components/EtfComparison';
import HistoricalData from '@/components/HistoricalData';
import FaqSection from '@/components/FaqSection';
import CalculatorHeader from '@/components/CalculatorHeader';
import TipsAndFeatures from '@/components/TipsAndFeatures';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const pageRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState({
    investmentAmount: 10000,
    sharePrice: 27.23,
    dividendAmount: 0.2645,
    dividendFrequency: 'quarterly',
    dividendGrowthRate: 11.18,
    sharePriceGrowthRate: 7.34,
    extraInvestment: 0,
    extraInvestmentFrequency: 'monthly',
    years: 20,
    reinvestDividends: true,
    taxRate: 0,
  });

  const handleChange = (field: string, value: number | boolean | string) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const results = useMemo(() => {
    return calculateDividendResults(
      values.investmentAmount,
      (values.dividendAmount / values.sharePrice) * 100,
      values.dividendGrowthRate,
      values.years,
      values.reinvestDividends,
      values.taxRate,
      values.extraInvestment,
      values.extraInvestmentFrequency,
      values.dividendFrequency,
      values.sharePriceGrowthRate
    );
  }, [values]);

  const exportToPDF = async () => {
    if (!pageRef.current) return;

    try {
      const headerSection = pageRef.current.querySelector('.header-section');
      const resultsSection = pageRef.current.querySelector('.results-section');
      
      if (!headerSection || !resultsSection) return;

      const headerCanvas = await html2canvas(headerSection as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const resultsCanvas = await html2canvas(resultsSection as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;

      const headerWidth = pageWidth - (2 * margin);
      const headerHeight = (headerCanvas.height * headerWidth) / headerCanvas.width;
      pdf.addImage(
        headerCanvas.toDataURL('image/png'),
        'PNG',
        margin,
        margin,
        headerWidth,
        headerHeight
      );

      pdf.addPage();
      const resultsWidth = pageWidth - (2 * margin);
      const resultsHeight = (resultsCanvas.height * resultsWidth) / resultsCanvas.width;
      pdf.addImage(
        resultsCanvas.toDataURL('image/png'),
        'PNG',
        margin,
        margin,
        resultsWidth,
        resultsHeight
      );

      pdf.save('dividend-calculator-results.pdf');

      toast({
        title: "Success",
        description: "Results exported to PDF successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export results to PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]" ref={pageRef}>
      {/* Navigation */}
      <div className="border-b bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="h-16 w-full justify-start bg-transparent border-none">
              <TabsTrigger
                value="calculator"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none px-4 h-full"
                asChild
              >
                <Link to="/" className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculator
                </Link>
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none px-4 h-full"
                asChild
              >
                <Link to="/education" className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education Hub
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CalculatorHeader />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Calculator Inputs</h2>
              <CalculatorForm values={values} onChange={handleChange} />
            </div>
          </div>

          {/* Right Column - Results and Charts */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
              <Button 
                onClick={exportToPDF} 
                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-2 font-medium shadow-sm"
              >
                <Download className="h-4 w-4" />
                Export to PDF
              </Button>
            </div>
            
            <ResultsDisplay results={results} />
            
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <DividendChart data={results.yearlyData} />
              </div>
              
              <EtfComparison />
              
              <HistoricalData />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <TipsAndFeatures />
        </div>

        <div className="mt-12">
          <FaqSection />
        </div>
      </div>
    </div>
  );
};

export default Index;