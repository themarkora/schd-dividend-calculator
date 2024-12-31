import React, { useState, useMemo, useRef } from 'react';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { DividendChart } from '@/components/DividendChart';
import { calculateDividendResults } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FaqSection from '@/components/FaqSection';
import EtfComparison from '@/components/EtfComparison';
import HistoricalData from '@/components/HistoricalData';

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" ref={pageRef}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="header-section">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">SCHD Dividend Calculator</h1>
            <p className="text-lg text-gray-600">Plan your dividend investment strategy</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-1">
              <CalculatorForm values={values} onChange={handleChange} />
            </div>
          </div>
        </div>
          
        <div className="results-section lg:col-span-2 space-y-8">
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
          
          <Card>
            <CardHeader>
              <CardTitle>Dividend Growth Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <DividendChart data={results.yearlyData} />
            </CardContent>
          </Card>

          <HistoricalData />
          <EtfComparison />
          <FaqSection />
        </div>
      </div>
    </div>
  );
};

export default Index;