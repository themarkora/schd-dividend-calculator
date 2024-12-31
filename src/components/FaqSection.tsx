import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FaqSection = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is SCHD's dividend frequency?</AccordionTrigger>
            <AccordionContent>
              SCHD pays dividends quarterly, typically in March, June, September, and December. The fund has maintained consistent dividend payments since its inception.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is SCHD's historical dividend growth rate?</AccordionTrigger>
            <AccordionContent>
              SCHD has demonstrated strong dividend growth, with an average annual growth rate of approximately 11-13% over the past several years. However, past performance doesn't guarantee future results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why is SCHD popular for dividend growth?</AccordionTrigger>
            <AccordionContent>
              SCHD is popular because it focuses on quality dividend-paying companies with strong fundamentals and consistent dividend growth histories. It has a low expense ratio and tracks the Dow Jones U.S. Dividend 100 Index.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FaqSection;