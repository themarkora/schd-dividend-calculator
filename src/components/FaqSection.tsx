import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const FaqSection = () => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is SCHD?</AccordionTrigger>
            <AccordionContent>
              SCHD is the Schwab U.S. Dividend Equity ETF, which tracks the Dow Jones U.S. Dividend 100 Index. It focuses on high-quality, dividend-paying U.S. companies with a history of consistent dividend payments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Why invest in SCHD?</AccordionTrigger>
            <AccordionContent>
              SCHD offers a combination of dividend growth and quality screening, low expense ratio (0.06%), and strong historical performance. It's popular among dividend growth investors for its focus on companies with strong fundamentals and growing dividends.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className={isMobile ? "text-left leading-normal pr-8" : ""}>
              How often does SCHD pay dividends?
            </AccordionTrigger>
            <AccordionContent>
              SCHD pays dividends quarterly, typically in March, June, September, and December. The fund has a history of consistently growing its dividend payments year over year.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What are SCHD's top holdings?</AccordionTrigger>
            <AccordionContent>
              SCHD typically holds around 100 stocks. Top holdings often include well-known companies like Broadcom, Merck, AbbVie, Cisco, and Amgen. The fund rebalances quarterly to maintain its quality and dividend criteria.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FaqSection;