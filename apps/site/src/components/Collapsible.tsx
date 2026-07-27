import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@melikechan/ui";

interface CollapsibleProps {
  title: string;
  children?: React.ReactNode;
}

export default function Collapsible({ title, children }: CollapsibleProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
