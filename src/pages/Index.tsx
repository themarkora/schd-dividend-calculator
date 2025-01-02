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

const Index = () => {
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState({
    investmentAmount: 0,
    sharePrice: 0,
    dividendAmount: 0,
    dividendFrequency: 'quarterly',
    dividendGrowthRate: 0,
    sharePriceGrowthRate: 0,
    extraInvestment: 0,
    extraInvestmentFrequency: 'monthly',
    years: 0,
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
      values.sharePrice,
      values.dividendAmount,
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
    if (!resultsRef.current) return;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      let currentY = margin;

      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FAFAFA'
      });

      const imgWidth = pageWidth - (2 * margin);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        margin,
        currentY,
        imgWidth,
        imgHeight
      );

      pdf.save('dividend-calculator-results.pdf');

      toast({
        title: "Success",
        description: "Results exported to PDF successfully",
      });
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast({
        title: "Error",
        description: "Failed to export results to PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
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
          <div className="lg:col-span-8 space-y-8" ref={resultsRef}>
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