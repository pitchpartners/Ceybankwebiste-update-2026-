import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { insightsAndResearches, philosophiesPWM } from "@/constants/content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function WealthManagement() {
    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">Private Wealth Management</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Private Wealth Management</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* about us */}
            <div className="bg-background py-16">
                <div className="container">
                    <div className="flex flex-col lg:flex-row my-20 max-w-6xl mx-auto gap-x-4 gap-y-8 items-center lg:items-start">
                        <FadeIn className="w-full lg:w-1/2 shrink-0">
                            <div className="flex justify-center lg:justify-start items-center gap-2">
                                <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                                <p className="lg:text-xl uppercase font-medium text-primary">About us</p>
                            </div>
                            <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2 text-primary">About Our Wealth Management Services</p>
                            <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0 text-black/60 hidden lg:block">We offer tailored financial solutions to help individuals and businesses achieve their financial goals. With a team of experienced advisors, we prioritize your financial success through strategic planning, investment management, and risk protection.</p>
                        </FadeIn>
                        <FadeIn delay={.5} className="w-full lg:w-1/2 aspect-square p-8 relative overflow-hidden rounded-2xl">
                            <Image fill className="object-cover" src={"/images/close-up-coins-saved-energy-crisis-expenses.jpg"} alt="" />
                        </FadeIn>
                        <p className="mt-4 text-center font-light mx-auto text-black/60 lg:hidden block">We offer tailored financial solutions to help individuals and businesses achieve their financial goals. With a team of experienced advisors, we prioritize your financial success through strategic planning, investment management, and risk protection.</p>
                    </div>
                </div>
                <div className="container py-12">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">News</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Our Philosophy</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">At Ceybank Asset Management, our philosophy is grounded in delivering long-term value through responsible investing, disciplined fund management, and a client-first approach.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-8 my-10 max-w-6xl mx-auto">
                        {philosophiesPWM.map(({ title, iconPath, description }, index) => (
                            <FadeIn key={index} delay={index / 3} className={`w-full space-y-5 h-auto hover:shadow-lg p-4 lg:p-8 rounded-2xl border border-border flex flex-col items-center ${index == 2 && "col-span-1 md:col-span-2 lg:col-span-1 mx-a w-full md:w-1/2 lg:w-full"}`}>
                                <Image width={60} height={60} src={iconPath} alt={iconPath} />
                                <p className="text-primary text-2xl font-semibold text-center">{title}</p>
                                <p className="text-black/70 font-light text-center">{description}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
            {/* about us */}
            <div className="container flex py-20 relative">
                <FadeIn className="max-w-xl mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                    {/* <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">About us</p>
                    </div> */}
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">Services Offered</p>
                    <p className="mt-4 lg:text-2xl text-center lg:text-start font-light max-w-5xl mx-auto lg:mx-0">Expert wealth solutions for Sri Lankan and global clients, focusing on growth, preservation, and legacy planning.</p>
                    <div className="flex flex-col gap-y-5 lg:gap-y-9 mt-6">
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Customized portfolios aligned with clients&apos; risk tolerance and aspirations.</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Wealth Preservation & Legacy Planning using strategic asset allocation and succession structures.</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Philanthropic Guidance for creating enduring social impact through structured giving.</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Multigenerational Wealth Governance to ensure financial continuity and family stewardship.</p>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={.5} className="w-full h-[calc(100%+120px)] absolute lg:-top-[40px] xl:-top-[120px] right-0 select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-right absolute" src={"/images/image-handsome-smiling-businessman-black-suit-pointing-finger-clipboard-with-documents-stan.png"} alt="" />
                </FadeIn>
            </div>
            <div className="bg-background py-16">
                <div className="container">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">News</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Insights & Research</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Stay informed with expert market analysis, Sri Lankan economic updates, and global investment insights curated by Ceybank specialists.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 my-10 max-w-6xl mx-auto">
                        {insightsAndResearches.map(({ title, iconPath, description }, index) => (
                            <FadeIn key={index} delay={index / 3} className={`w-full space-y-5 h-auto hover:shadow-lg p-4 lg:p-8 rounded-2xl border border-border flex flex-col items-center ${index == 2 && "col-span-1 md:col-span-2 lg:col-span-1 mx-a w-full md:w-1/2 lg:w-full"}`}>
                                <Image width={60} height={60} src={iconPath} alt={iconPath} />
                                <p className="text-primary text-2xl font-semibold text-center">{title}</p>
                                <p className="text-black/70 font-light text-center">{description}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
            {/* operations overview */}
            {/* <div className="relative">
                <div className="container flex flex-col lg:flex-row py-16 gap-y-8 relative z-20">
                    <FadeIn className="w-full lg:w-1/2 space-y-8 font-light text-center leading-relaxed flex flex-col items-center py-10 md:pe-5">
                        <p className="text-2xl lg:text-3xl font-medium">Secure Client Portal</p>
                        <p className="max-w-xl">Gain 24/7 access to your portfolio&apos;s real-time performance metrics, downloadable investment reports, and encrypted advisor communication. Receive customized insights, investment alerts, and direct booking for financial reviews.</p>
                    </FadeIn>
                    <FadeIn delay={.5} className="w-full lg:w-1/2 space-y-8 font-light text-center leading-relaxed flex flex-col items-center py-10 lg:ps-5">
                        <p className="text-2xl lg:text-3xl font-medium">Mobile Accessibility</p>
                        <p className="max-w-xl">Designed with mobile-first in mind, our PWM platform offers seamless access across smartphones and tablets. Enjoy intuitive navigation, fast load times, touch-friendly features, and fully responsive layouts for superior on-the-go wealth management.</p>
                    </FadeIn>
                </div>
                <div className="absolute w-full lg:w-1/2 h-1/2 lg:h-full bottom-0 lg:top-0 right-0 z-0">
                    <div className="w-full h-full bg-primary/80 absolute z-10"></div>
                    <Image fill className="object-cover" src={"/images/mobile-accessibility.jpg"} alt="" />
                </div>
            </div>
            <div className="bg-background py-16"></div> */}
            {/* <Subscription /> */}
        </div>
    )
}
