import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { AtSign, Headset, Inbox, Link, MapPinHouse } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { info } from "@/constants/links";

export default function MonthlyInvestment() {
    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">Ceybank Investment Plans</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.service}>Our Services</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Investment Plans</BreadcrumbPage>
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
                                <p className="lg:text-xl uppercase font-medium text-primary">CeyMIPs</p>
                            </div>
                            <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2 text-primary">Turn Your Dreams Into Reality</p>
                            <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0 text-black/60 hidden lg:block">Whether you&apos;re planning for your children&apo;s future, your retirement, or a dream home—realizing your dreams depends on how you invest your money.</p>
                            <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0 text-black/60 hidden lg:block">With CeyMIPs, you can start a smart, disciplined investment journey with a monthly plan designed to help you build wealth for tomorrow.</p>
                        </FadeIn>
                        <FadeIn delay={.5} className="w-full lg:w-1/2 aspect-square p-8 relative overflow-hidden rounded-2xl">
                            <Image fill className="object-cover" src={"/images/monthly-investment-plan-banner-1.jpg"} alt="" />
                        </FadeIn>
                        <p className="mt-4 text-center font-light mx-auto text-black/60 lg:hidden block">Whether you&apos;re planning for your children&apo;s future, your retirement, or a dream home—realizing your dreams depends on how you invest your money.</p>
                        <p className="mt-4 text-center font-light mx-auto text-black/60 lg:hidden block">With CeyMIPs, you can start a smart, disciplined investment journey with a monthly plan designed to help you build wealth for tomorrow.</p>
                    </div>
                </div>
            </div>
            {/* about us */}
            <div className="container flex py-20 relative">
                <FadeIn className="max-w-xl mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">About us</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">How to Start Your Investment Plan</p>
                    <div className="flex flex-col gap-y-5 lg:gap-y-9 mt-8">
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Choose the Ceybank fund(s) that match your long-term goals.</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Set your monthly investment (e.g., Rs. 1,000) — a consistent amount is key.</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Fill in the application form and make your initial deposit.</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Make monthly payments via bank standing order or direct deposit.</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Receive regular updates, including transaction confirmations and statements.</p>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={.5} className="w-full h-[calc(100%+120px)] absolute lg:-top-[40px] xl:-top-[120px] right-0 select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-right absolute" src={"/images/image-handsome-smiling-businessman-black-suit-pointing-finger-clipboard-with-documents-stan.png"} alt="" />
                </FadeIn>
            </div>
            {/* about us */}
            <div className="bg-background py-16">
                <div className="container">
                    <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">How Much Could You Accumulate?</p>
                    <p className="font-light mt-2 text-primary text-center">Here&apos;s what a monthly investment of Rs. 1,000 can grow into over time at various expected return rates:</p>
                    <div className="overflow-x-auto w-full mt-16">
                        <Table className="max-w-4xl mx-auto">
                            <TableCaption>Figures shown are illustrative and based on compound interest. Actual performance may vary</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Period</TableHead>
                                    <TableHead>5%</TableHead>
                                    <TableHead>10%</TableHead>
                                    <TableHead>15%</TableHead>
                                    <TableHead>20%</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({length:4}).map((_,index) => (
                                    <TableRow key={index}>
                                        <TableCell>5 years</TableCell>
                                        <TableCell>68,060</TableCell>
                                        <TableCell>77,437</TableCell>
                                        <TableCell>88,574</TableCell>
                                        <TableCell>88,574</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {/* about us */}
            <div className="container flex flex-row-reverse py-20 relative">
                <FadeIn className="max-w-xl mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">About us</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">About Ceybank Asset Management Ltd</p>
                    <p className="mt-4 lg:text-2xl text-center lg:text-start font-light max-w-5xl mx-auto lg:mx-0">Ceybank is a trusted Sri Lankan Asset Management Company with over 20 years of experience in helping individuals and corporations grow their wealth through:</p>
                    <div className="flex flex-col gap-y-5 lg:gap-y-9 mt-8">
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Unit Trusts</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Tailored Investment Plans</p>
                        </div>
                        <div className="flex gap-x-7 items-center lg:text-xl">
                            <Image width={40} height={40} src={"/icons/arrow.png"} alt="" />
                            <p>Private Portfolio Management</p>
                        </div>
                        <p className="mt-4 lg:text-2xl text-center lg:text-start font-light max-w-5xl mx-auto lg:mx-0">We are licensed by the Securities and Exchange Commission of Sri Lanka, ensuring transparency and trust.</p>
                    </div>
                </FadeIn>
                <FadeIn delay={.5} className="w-full h-[calc(100%+120px)] absolute lg:-top-[120px] xl:-top-[120px] left-0 select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-left absolute" src={"/images/image-handsome-smiling-businessman-black-suit-pointing-finger-clipboard-with-documents-stan-left.png"} alt="" />
                </FadeIn>
            </div>
            {/* about us */}
            <div className="bg-background py-16">
                <div className="container">
                    <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">How Much Could You Accumulate?</p>
                    <p className="font-light mt-2 text-primary text-center">Here&apos;s what a monthly investment of Rs. 1,000 can grow into over time at various expected return rates:</p>
                    <div className="overflow-x-auto w-full mt-16">
                        <Table className="max-w-4xl mx-auto">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Investment Period</TableHead>
                                    <TableHead>Ceybank Century Growth Fund</TableHead>
                                    <TableHead>Ceybank Century Growth Fund</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({length:4}).map((_,index) => (
                                    <TableRow key={index}>
                                        <TableCell>5 years</TableCell>
                                        <TableCell>29.77%</TableCell>
                                        <TableCell>17.19%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {/* about us */}
            <div className="container flex py-20 relative">
                <FadeIn className="max-w-xl mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">Contact Info</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">More Business Info</p>
                    <p className="text-xl lg:text-2xl font-semibold text-center lg:text-start mt-8">Ceybank Asset Management Ltd</p>
                    <div className="flex flex-col gap-y-5 lg:gap-y-9 mt-8">
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <MapPinHouse/>
                            <p>{info.address}</p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <Headset/>
                            <p>Call: 011 760 2007</p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <Inbox/>
                            <p>Fax: 011 268 3095</p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <AtSign/>
                            <p>Mail: {info.mail} </p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <Link/>
                            <p>Web: www.ceybank.com</p>
                        </div>
                    </div>
                    <div className="lg:text-xl text-center lg:text-start">
                        <p className="font-semibold lg:text-start mt-6">Regional Centres</p>
                        <p className="lg:text-start mt-2">Kandy, Matara, Nugegoda, Jaffna, Negombo, Kurunegala</p>
                        <p className="font-semibold lg:text-start mt-4">Start your investment journey today with CeyMIPs.</p>
                        <p className="lg:text-start mt-2">Because dreams deserve a plan.</p>
                    </div>
                </FadeIn>
                <FadeIn delay={.5} className="w-full h-[calc(100%+120px)] absolute lg:top-[95px] xl:-top-[75px] 2xl:-top-[120px] right-0 select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-right absolute" src={"/images/woman-customer-service-worker-smiling-operator-with-phone-heads.png"} alt="" />
                </FadeIn>
            </div>
        </div>
    )
}