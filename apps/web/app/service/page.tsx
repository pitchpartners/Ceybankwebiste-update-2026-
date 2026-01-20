import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { fundTypes } from "@/constants/content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function About() {
    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">Our Services</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Our Service</BreadcrumbPage>
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
                            <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2 text-primary">Our Services</p>
                            <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0 text-black/60 hidden lg:block">At Ceybank Asset Management, we understand that individuals and corporate have unique and evolving investment goals. That&apos;s why we offer a comprehensive range of tailored financial solutions to help you achieve growth, security, and financial success. Whether you&apos;re aiming for high capital growth, steady income, or capital preservation, our services are built around your needs.</p>
                        </FadeIn>
                        <FadeIn delay={.5} className="w-full lg:w-1/2 aspect-square p-8 relative overflow-hidden rounded-2xl">
                            <Image fill className="object-cover" src={"/images/start-up-project.jpg"} alt="" />
                        </FadeIn>
                        <p className="mt-4 text-center font-light mx-auto text-black/60 lg:hidden block">At Ceybank Asset Management, we understand that individuals and corporate have unique and evolving investment goals. That&apos;s why we offer a comprehensive range of tailored financial solutions to help you achieve growth, security, and financial success. Whether you&apos;re aiming for high capital growth, steady income, or capital preservation, our services are built around your needs.</p>
                    </div>
                </div>
            </div>
            {/* investment */}
            <div className="container flex flex-row-reverse py-16 lg:py-32 relative">
                <FadeIn className="lg:max-w-1/2 w-full mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">investment</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">Ceybank Investment Plans</p>
                    <p className="mt-4 lg:text-xl text-center lg:text-start font-light max-w-2xl mx-auto lg:mx-0">Our Ceybank Investment Plans are designed for regular investing, helping you meet personal financial goals—whether it&apos;s your wedding, retirement, home purchase, or your children&apos;s education.</p>
                    <p className="mt-4 lg:text-xl text-center lg:text-start font-semibold max-w-lg mx-auto lg:mx-0">CeyMIPs - Ceybank Monthly Investment Plans</p>
                    <p className="mt-4 lg:text-xl text-center lg:text-start font-light max-w-2xl mx-auto lg:mx-0">A systematic investment plan that allows you to invest a fixed amount regularly across a pre-arranged mix of four Ceybank fund, including equities, treasury bills, and corporate debt.</p>
                    <p className="mt-4 text-sm lg:text-lg text-center lg:text-start font-light max-w-2xl mx-auto lg:mx-0">Plan your future with confidence. Talk to us today!</p>
                    <Button variant={"secondary"} className="mt-6">Invest now</Button>
                </FadeIn>
                <FadeIn delay={.5} className="w-full h-[calc(100%+100px)] absolute -top-[100px] left-[-10vw] select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-left absolute left-0 -top-[120px]" src={"/images/handsome-business-guy-with-blue-folder.png"} alt="" />
                </FadeIn>
            </div>
            <div className="bg-background py-16"></div>
            {/* about us */}
            <div className="container flex py-20 relative">
                <FadeIn className="max-w-xl mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">About us</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">Ceybank Units Fund</p>
                    <p className="mt-4 lg:text-2xl text-center lg:text-start font-light max-w-5xl mx-auto lg:mx-0">Our range of Unit Trust Fund enables investors to choose based on their risk appetite, return expectation, and investment duration.</p>
                    <div className="flex flex-col gap-y-5 lg:gap-y-9 mt-6">
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>What are your investment goals and expected returns?</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>What level of risk can you tolerate?</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Do you need regular income?</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>How long do you plan to stay invested?</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Do you need easy access to your fund?</p>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={.5} className="w-full h-[calc(100%+120px)] absolute -top-[120px] right-0 select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-right absolute" src={"/images/picture-optimistic-man-rejoicing-his-prize-hugging-black-briefcase-with-lots-cash-dollar-inside-pointing-upward-isolated-dark-gray.png"} alt="" />
                </FadeIn>
            </div>
            {/* trusted by */}
            <div className="bg-background">
                <div className="container my-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 my-10">
                        {fundTypes.map(({ title, description, iconPath }, index) => (
                            <FadeIn delay={index/10} key={index} className="w-full space-y-5 h-auto hover:shadow-lg p-8 rounded-2xl border border-border">
                                <div className="size-[72px] bg-primary rounded-full flex items-center justify-center">
                                    <Image width={36} height={36} src={iconPath} alt={title} />
                                </div>
                                <p className="text-black/70 text-2xl font-semibold max-w-3xs">{title}</p>
                                <p className="text-black/60 font-light">{description}</p>
                                <Button variant={"link"} className="px-0 underline cursor-pointer">Read more</Button>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container py-16"></div>
            <div className="bg-background py-16"></div>
            {/* investment */}
            <div className="container flex flex-row-reverse py-16 lg:py-32 relative">
                <FadeIn className="lg:max-w-1/2 w-full mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">investment</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">Private Wealth Management</p>
                    <p className="mt-4 lg:text-2xl text-center lg:text-start font-light max-w-lg mx-auto lg:mx-0">At Capital Ventures, we aim to meet the varied needs of investors by offering a wide array of investment opportunities in both capital and money markets. Our services include innovative fund, tailored investment strategies, expert portfolio management, and personalized advisory services.</p>
                    <Button variant={"secondary"} className="mt-6">Read more</Button>
                </FadeIn>
                <FadeIn delay={.5} className="w-full h-[calc(100%+100px)] absolute -top-[100px] left-0 select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-left absolute left-0 -top-[120px]" src={"/images/investment-currency-forex-economy-trade-concept.png"} alt="" />
                </FadeIn>
            </div>
            <div className="bg-background py-16"></div>
            {/* mission */}
            <div className="relative">
                <FadeIn className="container my-20 relative z-10">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">Mission</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center mt-2">Ceybank Portfolio Management</p>
                    <div className="flex flex-col gap-y-6 mt-8">
                        <p className="lg:text-2xl text-center font-light max-w-5xl mx-auto">Ceybank Asset Management Limited is licensed by the Securities & Exchange Commission of Sri Lanka to Manage Private Client portfolios.</p>
                        <p className="lg:text-2xl text-center font-light max-w-5xl mx-auto">The Discretionary Portfolio Management service offered by us covers all asset classes and is guided by a comprehensive Fund Management Agreement between Ceybank Asset Management Limited and the Client. The Investment Policy Statement is a key element of this agreement. All assets of the Client Portfolio are held under the custody of an independent custodian who will look after the Client’s interests.</p>
                        <p className="lg:text-2xl text-center font-light max-w-5xl mx-auto">Portfolio performance in terms of the return generated within the investment parameters set out, will define the success of the Fund Management Exercise. Performance is measured based on agreed parameters and is linked to the Manager’s remuneration in order to be a mutually rewarding exercise.</p>
                        <p className="text-2xl lg:text-3xl text-center font-medium max-w-5xl mx-auto mt-6">Investment Advisory Services</p>
                        <p className="lg:text-2xl text-center font-light max-w-5xl mx-auto">Ceybank AML also offers advisory services to prospective investors exploring the emerging opportunities in the liberalized environment in Sri Lanka.</p>
                    </div>
                </FadeIn>
                <div className="absolute w-full h-full top-0 right-0 z-0">
                    <div className="w-full h-full bg-primary/80 absolute z-10"></div>
                    <Image fill className="object-cover" src={"/images/close-up-report-meeting.jpg"} alt="" />
                </div>
            </div>
            <div className="bg-background py-16"></div>
            {/* <Subscription />
            <div className="bg-background py-16"></div> */}
        </div>
    )
}
