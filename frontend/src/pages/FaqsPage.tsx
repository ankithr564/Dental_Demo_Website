import React from "react";
import { useListFaqs } from "../api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqsPage() {
  const { data: faqs, isLoading, error } = useListFaqs();

  return (
    <div className="w-full flex flex-col py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600">
            Find answers to common questions about our services, insurance, and what to expect during your visit.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">Failed to load FAQs.</div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {(Array.isArray(faqs) ? faqs : []).map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-slate-900 hover:text-teal-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
