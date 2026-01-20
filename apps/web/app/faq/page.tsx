import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { questions } from "@/components/faqs";

export default function FAQ() {
    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">Frequently Asked Questions</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>FAQ</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* trusted by */}
            <div className="bg-background">
                <div className="container my-20">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">Reports</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Ceybank Fund Reports</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Still have questions about investing with Ceybank Asset Management? <br /> Here are quick answers to some of the most common queries from new and experienced investors.</p>
                    <FadeIn className="my-12">
                        <Accordion type="single" collapsible className="flex flex-col gap-y-4 max-w-3xl mx-auto">
                            {questions.map(({ question, answer }, index) => (
                                <AccordionItem key={index} value={`${index}`}>
                                    <AccordionTrigger>{question}</AccordionTrigger>
                                    <AccordionContent>{answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}