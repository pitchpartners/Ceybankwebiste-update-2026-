import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { questions } from "@/components/faqs";
import TrustedBy from "@/components/trusted-by";
import { Button } from "@/components/ui/button";
import FundTypes from "@/components/fund-types";
import OurValues from "@/components/our-values";
import { formatDateWithSuffix } from "@/lib/date-format";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HomeReportsSection from "@/components/home-reports";
import { getFunds } from "@/services/fundService";

export default async function Home() {
  const funds = await getFunds().catch(() => []);
  return (
    <div className="flex flex-col">
      <div className="container overflow-hidden relative flex items-center lg:h-[calc(100dvh-166px)] min-h-[420px] md:min-h-[480px] lg:min-h-[520px] xl:min-h-[640px] 2xl:min-h-[720px]">
        {/* <FadeIn delay={.5} className="w-full absolute h-full hidden lg:block z-[-1]">
          <Image fill src={"/images/home-hero-banner.png"} className="object-contain object-right" alt="" />
        </FadeIn> */}
        <FadeIn className="flex flex-col w-full items-center lg:items-start">
          <p className="font-bold text-3xl sm:text-5xl md:text-6xl max-w-xl lg:max-w-4xl leading-snug -mt-16 text-center lg:text-start">Where Everyday Investors Grow Their Wealth</p>
          <p className="font-light text-base sm:text-xl md:text-2xl mt-4 text-center">Expertly managed investments for long-term financial success</p>
          <div className="flex mx-auto lg:mx-0 mt-12">
            <Button type="submit" variant={"secondary"} asChild>
              <Link href={appRoute.invest_now} target="_blank">Invest Now</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
      <div className="w-full bg-background">
        {/* trust by */}
        <FadeIn className="container">
          <TrustedBy />
        </FadeIn>
        {/* funds types */}
        <FundTypes funds={funds} />
      </div>
      {/* about */}
      <div className="container flex py-20 relative">
        <FadeIn className="max-w-xl mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
          <div className="flex justify-center lg:justify-start items-center gap-2">
            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
            <p className="lg:text-xl uppercase font-medium">About us</p>
          </div>
          <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">About Ceybank</p>
          <p className="mt-4 lg:text-2xl text-center lg:text-start font-light max-w-5xl mx-auto lg:mx-0">At Ceybank Asset Management, we offer personalized wealth management solutions designed to help individuals, families, and businesses achieve their financial goals with confidence and clarity.</p>
          <div className="flex flex-col gap-y-5 lg:gap-y-9 mt-6">
            <div className="flex gap-x-7 items-center lg:text-xl">
              <Image width={40} height={40} src={"/icons/quality.png"} alt="" />
              <p className="">35+ years of experience in fund management</p>
            </div>
            <div className="flex gap-x-7 items-center lg:text-xl">
              <Image width={40} height={40} src={"/icons/opportunity.png"} alt="" />
              <p className="">Wide range of investment solutions for individuals and cooperates</p>
            </div>
            <div className="flex gap-x-7 items-center lg:text-xl">
              <Image width={40} height={40} src={"/icons/padlock.png"} alt="" />
              <p className="">Regulated by the Securities & Exchange Commission of Sri Lanka</p>
            </div>
            <div className="flex gap-x-7 items-center lg:text-xl">
              <Image width={40} height={40} src={"/icons/administration.png"} alt="" />
              <p className="">Trusted by thousands of Sri Lankans across all walks of life</p>
            </div>
          </div>
          <div className="mt-9 mx-auto lg:mx-0 block">
            <Button variant={"secondary"} asChild>
              <Link href={appRoute.about}>Read more</Link>
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={.5} className="w-full h-[calc(100%+120px)] absolute -top-[120px] right-0 select-none z-0 hidden lg:block">
          <Image fill className="object-contain object-top-right absolute right-0 -top-[120px]" src={"/images/home-about-banner.png"} alt="" />
        </FadeIn>
      </div>
      <div className="w-full bg-background">
        {/* investment path */}
        <div className="container my-20">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
            <p className="lg:text-xl text-primary-foreground uppercase font-medium">Investment path</p>
          </div>
          <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">How to Start Investing with Ceybank</p>
          <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">At Ceybank Asset Management, we make investing accessible and straightforward for individuals, corporate, and institutions. Whether you&apos;re looking for growth, income, or capital preservation, our range of unit trust funds and investment plans are designed to match your financial goals and risk appetite.</p>
          <div className="flex flex-col md:flex-row justify-center gap-x-5 gap-y-8 my-10">
            <FadeIn className="flex justify-center w-full">
              <div className="w-full flex flex-col items-center space-y-4 h-auto p-8 rounded-2xl">
                <div className="size-[120px] bg-primary rounded-full flex items-center justify-center shadow-primary shadow-lg relative">
                  <Image width={40} height={40} src="/icons/cursor.png" alt="" />
                  <div className="absolute size-10 rounded-full border border-white bg-primary top-0 right-0 flex justify-center items-center font-bold">1</div>
                </div>
                <p className="text-black/70 text-2xl font-semibold text-center max-w-56">Choose Your Investment Fund</p>
                <p className="text-black/60 font-medium text-center max-w-2xs">Not all investments are created equal. At Ceybank, we offer a wide range of Unit Trust Funds tailored to match your investment goals, risk appetite, and time horizon.</p>
              </div>
            </FadeIn>
            <FadeIn delay={.1} className="w-1/3 relative hidden md:block">
              <Image fill src={"/icons/round-arrow.svg"} alt="" />
            </FadeIn>
            <FadeIn delay={.2} className="flex justify-center w-full">
              <div className="w-full flex flex-col items-center space-y-4 h-auto p-8 rounded-2xl">
                <div className="size-[120px] bg-amber-500 rounded-full flex items-center justify-center shadow-amber-500 shadow-lg relative">
                  <Image width={40} height={40} src="/icons/clipboard.png" alt="" />
                  <div className="absolute size-10 rounded-full border border-white bg-amber-500 top-0 right-0 flex justify-center items-center font-bold">2</div>
                </div>
                <p className="text-black/70 text-2xl font-semibold text-center max-w-56">Apply Online or Visit a Branch</p>
                <p className="text-black/60 font-medium text-center max-w-2xs">At Ceybank Asset Management, we make it easy for you to begin your investment journey — whether you prefer the convenience of applying online or the personal touch of visiting one of our branches.</p>
              </div>
            </FadeIn>
            <FadeIn delay={.3} className="w-1/3 relative hidden xl:block">
              <Image fill src={"/icons/round-arrow.svg"} alt="" />
            </FadeIn>
            <FadeIn delay={.4} className="justify-center w-full md:hidden xl:flex">
              <div className="w-full flex flex-col items-center space-y-4 h-auto p-8 rounded-2xl">
                <div className="size-[120px] bg-red-700 rounded-full flex items-center justify-center shadow-red-700 shadow-lg relative">
                  <Image width={40} height={40} src="/icons/profit.png" alt="" />
                  <div className="absolute size-10 rounded-full border border-white bg-red-700 top-0 right-0 flex justify-center items-center font-bold">3</div>
                </div>
                <p className="text-black/70 text-2xl font-semibold text-center max-w-56">Start Growing Your Investment</p>
                <p className="text-black/60 font-medium text-center max-w-2xs">Achieve financial success with Ceybank—trusted Unit Trusts for growth, income, or savings with daily access and expert management.</p>
              </div>
            </FadeIn>
          </div>
          <div className="justify-center w-full hidden xl:hidden md:flex">
            <div className="w-full flex flex-col items-center space-y-4 h-auto p-8 rounded-2xl">
              <div className="size-[120px] bg-red-700 rounded-full flex items-center justify-center shadow-red-700 shadow-lg relative">
                <Image width={40} height={40} src="/icons/profit.png" alt="" />
                <div className="absolute size-10 rounded-full border border-white bg-red-700 top-0 right-0 flex justify-center items-center font-bold">3</div>
              </div>
              <p className="text-black/70 text-2xl font-semibold text-center max-w-56">Start Growing Your Investment</p>
              <p className="text-black/60 font-medium text-center max-w-2xs">Achieve financial success with Ceybank—trusted Unit Trusts for growth, income, or savings with daily access and expert management.</p>
            </div>
            <div className="right-1/4 md:w-32 md:h-7 lg:w-44 lg:h-9 absolute hidden md:block xl:hidden">
              <Image fill className="rotate-[130deg]" src={"/icons/round-arrow.svg"} alt="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="lg:container flex flex-col lg:flex-row">
            <div className="w-full h-auto py-12 px-2 lg:py-32 bg-primary flex flex-col items-center gap-y-2">
              <p className="text-center font-medium text-xl md:text-2xl lg:text-3xl">Are You Individual Investor ?</p>
              <p className="text-center font-semibold text-base md:text-lg lg:text-xl max-w-sm text-white/70 mt-12">Discover smart, secure ways to grow your wealth</p>
              <p className="text-center font-light text-base md:text-lg lg:text-xl max-w-sm text-white/70">Invest smart with Ceybank—professionally managed Unit Trusts for savings, retirement, and long-term goals.</p>
              <p className="text-center font-light text-base md:text-lg lg:text-xl max-w-sm text-white/70">Ceybank funds suit your goals—whether it&apos;s growth, income, or preservation—making it easy to invest with confidence.</p>
              <Button variant={"secondary"} className="mt-12" asChild>
                <Link href={`${appRoute.how_to_invest}/#new-investors`}>Get Start</Link>
              </Button>
            </div>
            <div className="w-full h-auto py-12 px-2 lg:py-32 relative">
              <Image fill className="object-cover absolute z-1" src={"/images/home-individual-investor-banner.png"} alt="" />
              <div className="absolute size-full bg-primary/60 z-[5] top-0 right-0"></div>
              <div className="flex flex-col items-center gap-y-2 z-10 relative">
                <p className="text-center font-medium text-xl md:text-2xl lg:text-3xl">Are You a Corporate Investor?</p>
                <p className="text-center font-semibold text-base md:text-lg lg:text-xl max-w-sm text-white/70 mt-12">Maximize returns while managing risk with tailored investment solutions</p>
                <p className="text-center font-light text-base md:text-lg lg:text-xl max-w-sm text-white/70">Ceybank offers tailored investments for businesses and high-net-worth clients to grow capital and manage liquidity.</p>
                <p className="text-center font-light text-base md:text-lg lg:text-xl max-w-sm text-white/70">Our Unit Trusts and portfolios match your goals and risk profile, with expert management and clear governance.</p>
                <Button variant={"outline"} className="mt-12" asChild>
                  <Link href={`${appRoute.how_to_invest}/#corporate-investor`}>Get Start</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="container py-20">
            <StatusOverview />
          </div> */}
        </div>
        {/* our values */}
        <div className="container my-20">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
            <p className="lg:text-xl text-primary-foreground uppercase font-medium">Our Values</p>
          </div>
          <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Performance</p>
          <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">At Ceybank Asset Management, our values are the foundation of every investment decision we make. We are committed to delivering trust, transparency, and long-term success to our clients through the following core principles:</p>
          <div className="flex justify-center mt-8 gap-x-1 text-lg md:text-xl lg:text-2xl font-medium">
            <p className="text-black/70 text-center">Unit Trust Prices :</p>
            <p className="text-red-800/70 text-center">{formatDateWithSuffix(new Date())}</p>
          </div>
          <OurValues/>
        </div>
      </div>
      {/* reports */}
      <HomeReportsSection />
      <div className="w-full bg-background">
        {/* testimoinals */}
        {/* <div className="container mt-20 mb-28">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
            <p className="lg:text-xl text-primary-foreground uppercase font-medium">Testimoinals</p>
          </div>
          <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">What Our Investors Say</p>
          <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">At Ceybank Asset Management, we measure our success by the satisfaction and trust of our investors. Here’s what some of our valued clients have to say about their experience with our funds and services.</p>
          <Carousel className="container my-16">
            <CarouselContent>
              {testimonials.map(({ name, role, rating, message }, index) => (
                <CarouselItem className="basis-1/1 xl:basis-1/3 flex justify-center items-center" key={index}>
                  <FadeIn className="w-full lg:w-[98%] p-3 md:p-4 lg:p-6 xl:p-8 rounded-2xl border border-border">
                    <Quote className="rotate-180 text-primary" />
                    <p className="font-medium text-primary text-center">{name}</p>
                    <p className="text-sm text-black/60 text-center">{role}</p>
                    <div className="flex gap-1 justify-center mt-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < rating ? "text-amber-500" : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                    <p className="font-medium text-sm lg:text-base text-black/70 text-center mt-4 line-clamp-4">{message}</p>
                  </FadeIn>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-primary hover:!bg-primary/80" />
            <CarouselNext className="bg-primary hover:!bg-primary/80" />
          </Carousel>
        </div> */}
        {/* faq */}
        <div className="container mt-20 mb-28">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
            <p className="lg:text-xl text-primary-foreground uppercase font-medium">Know more</p>
          </div>
          <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Frequently Ask Question</p>
          <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Still have questions about investing with Ceybank Asset Management? <br /> Here are quick answers to some of the most common queries from new and experienced investors.</p>
          <FadeIn className="my-12">
            <Accordion type="single" collapsible className="flex flex-col gap-y-4 max-w-3xl mx-auto">
              {questions.slice(0, 5).map(({ question, answer }, index) => (
                <AccordionItem key={index} value={`${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
          <div className="flex justify-center mt-6">
            <Button variant={"secondary"} asChild>
              <Link href={appRoute.faq}>Read more</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* <Subscription /> */}
    </div>
  );
}
