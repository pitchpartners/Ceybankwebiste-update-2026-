import Link from "next/link";
import Image from "next/image";
import { info } from "@/constants/links";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { benefits } from "@/constants/content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AtSign, Headset, Inbox, Link as LinkIcon, MapPinHouse } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function HowToInvest() {
    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">How to Invest</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>How to Invest</BreadcrumbPage>
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
                                <p className="lg:text-xl uppercase font-medium text-primary">Introduction</p>
                            </div>
                            <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2 text-primary">About Our Portal</p>
                            <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0 text-black/60 hidden lg:block">At Ceybank Asset Management, we&apos;ve made investing seamless, secure, and accessible through our dedicated online investment portal. Whether you&apos;re a high-net-worth individual, a corporate entity, or an overseas Sri Lankan looking to manage your wealth back home, our platform offers a smooth digital onboarding and investment experience.</p>
                        </FadeIn>
                        <FadeIn delay={.5} className="w-full lg:w-1/2 aspect-square p-8 relative overflow-hidden rounded-2xl">
                            <Image fill className="object-cover" src={"/images/people-hangout-together-coffee-shop.jpg"} alt="" />
                        </FadeIn>
                        <p className="mt-4 text-center font-light mx-auto text-black/60 lg:hidden block">We offer tailored financial solutions to help individuals and businesses achieve their financial goals. With a team of experienced advisors, we prioritize your financial success through strategic planning, investment management, and risk protection.</p>
                    </div>
                </div>
                <div className="container py-12">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">Benefits</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Our Benefits</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Here are three key benefits of the Ceybank Investment Portal — ideal for highlighting on your homepage or onboarding section to attract and guide new clients:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 my-10 max-w-6xl mx-auto">
                        {benefits.map(({ title, iconPath, description }, index) => (
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
            <div className="bg-primary">
                <div id="new-investors" className="container py-16">
                    <FadeIn className="w-full max-w-4xl">
                        <div className="flex items-center gap-2">
                            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                            <p className="lg:text-xl uppercase font-medium">Individual</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-semibold mt-2 uppercase">Individual Local Investors</p>
                        <p className="text-2xl lg:text-3xl font-semibold mt-8">Current Investors</p>
                        <p className="lg:text-xl font-semibold text-background/80 mt-4">Just make the payment and inform Ceybank AML of the amount and fund.</p>
                    </FadeIn>
                    <FadeIn className="w-full mt-8">
                        <p className="text-2xl lg:text-3xl font-semibold mt-2">New Investors</p>
                        <div className="mt-6 flex flex-col lg:flex-row items-start lg:items-center gap-y-4">
                            <div className="w-full">
                                <p className="lg:text-xl font-semibold text-background/80 mt-4">Open a Ceybank Fund Account</p>
                                <p className="lg:text-xl font-light text-background/80">Complete an application form for each fund you choose</p>
                                <p className="text-sm lg:text-base font-light text-background/80">(To download the application, simply press the ”Download” button)</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"secondary"}>Download</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href="/docs/ceybank_application_individual.pdf" rel="noopener noreferrer" download target="_blank">Individual Form</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/docs/ceybank_KYC_individual.pdf" rel="noopener noreferrer" download target="_blank">KYC Individual</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/docs/investment_form_individual.pdf" rel="noopener noreferrer" download target="_blank">Investment Form Individual</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="lg:text-xl font-light text-background/80 mt-4">Include:</p>
                        <ol className="lg:text-xl font-light text-background/80 mt-2 list-disc ms-3">
                            <li>NIC or Passport copy</li>
                            <li>Birth Certificate + NIC/Passport of guardian (for minors)</li>
                            <li>Letter confirming authorized signatories (for corporate applicants)</li>
                            <li>Submit to: Ceybank Asset Management Ltd, 85 York Street, Colombo 01</li>
                        </ol>
                    </FadeIn>
                    <FadeIn className="mt-6">
                        <p className="lg:text-xl font-semibold text-background/80">Make a Payment</p>
                        <ol className="lg:text-xl font-light text-background/80 mt-2 list-disc ms-3">
                            <li>Direct Transfer: Bank of Ceylon, A/C No. 8223</li>
                            <li>Cash: At Ceybank office or any BOC branch (send deposit slip)</li>
                            <li>Cheque: Payable to Ceybank Asset Management Ltd (include with application)</li>
                        </ol>
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-y-4 mt-6">
                            <p className="lg:text-xl font-medium text-background/80 w-full">Register online easily via our portal - just click ”Register now”</p>
                            <Button type="submit" variant={"secondary"} asChild>
                                <Link href={appRoute.sign_up} target="_blank">Register Now</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>
                <div className="bg-background py-16"></div>
                <div id="new-foreign-investors" className="container py-16">
                    <FadeIn className="w-full max-w-4xl">
                        <div className="flex items-center gap-2">
                            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                            <p className="lg:text-xl uppercase font-medium">Individual</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-semibold mt-2 uppercase">Foreign Investors</p>
                        <p className="text-2xl lg:text-3xl font-semibold mt-8">Investing in Ceybank Unit Trusts</p>
                        <p className="lg:text-xl font-semibold text-background/80 mt-4">Open a Securities Investment Account (IIA)</p>
                        <p className="lg:text-xl font-light text-background/80">With any licensed commercial bank in Sri Lanka (BOC recommended)</p>
                    </FadeIn>
                    <FadeIn className="w-full mt-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-y-4">
                            <div className="w-full">
                                <p className="lg:text-xl font-semibold text-background/80 mt-4">Complete Application</p>
                                <p className="lg:text-xl font-light text-background/80">Include IIA bank details; all income and withdrawals go here. Attach:</p>
                                <p className="text-sm lg:text-base font-light text-background/80">(To download the application, simply press the ”Download” button)</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"secondary"}>Download</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href="/docs/ceybank_application_individual.pdf" rel="noopener noreferrer" download target="_blank">Individual Form</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/docs/ceybank_KYC_individual.pdf" rel="noopener noreferrer" download target="_blank">KYC Individual</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/docs/investment_form_individual.pdf" rel="noopener noreferrer" download target="_blank">Investment Form Individual</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="lg:text-xl font-light text-background/80 mt-4">Include:</p>
                        <ol className="lg:text-xl font-light text-background/80 mt-2 list-disc ms-3">
                            <li>NIC or Passport copy</li>
                            <li>Birth Certificate + NIC/Passport of guardian (for minors)</li>
                            <li>Letter confirming authorized signatories (for corporate applicants)</li>
                            <li>Submit to: Ceybank Asset Management Ltd, 85 York Street, Colombo 01</li>
                        </ol>
                    </FadeIn>
                    <FadeIn className="mt-6">
                        <p className="lg:text-xl font-semibold text-background/80">Make a Payment</p>
                        <ol className="lg:text-xl font-light text-background/80 mt-2 list-disc ms-3">
                            <li>Direct Transfer: Bank of Ceylon, A/C No. 8223</li>
                            <li>Cash: At Ceybank office or any BOC branch (send deposit slip)</li>
                            <li>Cheque: Payable to Ceybank Asset Management Ltd (include with application)</li>
                        </ol>
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-y-4 mt-6">
                            <p className="lg:text-xl font-medium text-background/80 w-full">Register online easily via our portal - just click ”Register now”</p>
                            <Button type="submit" variant={"secondary"} asChild>
                                <Link href={appRoute.sign_up} target="_blank">Register Now</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>
                <div className="bg-background py-16"></div>
                <div id="corporate-investor" className="container py-16">
                    <FadeIn className="w-full max-w-4xl">
                        <div className="flex items-center gap-2">
                            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                            <p className="lg:text-xl uppercase font-medium">CORPORATE</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-semibold mt-2 uppercase">CORPORATE INVESTORS</p>
                        <ol className="lg:text-xl font-light text-background/80 mt-6 list-decimal ms-3">
                            <li>Completed and Signed Application form by the authorized officers</li>
                            <li>Completed and signed Corporate KYC form by the authorized officers</li>
                            <li>Completed and signed Individual KYC form by Directors, Beneficial Owners</li>
                            <li>Board resolution authorizing investing in Ceybank Unit Trust funds and specifying authorized officers to act on behalf of the Company.</li>
                            <li>Authorized signatories signature list (to verify signatures) signed by an authorized officer</li>
                            <li>E-mail Indemnity Form signed by an authorized Officer</li>
                            <li>Certificate of Incorporation</li>
                            <li>Form 15 - Annual Return or any other documents to verify who are the existing Directors of the Company and their details</li>
                            <li>Form 20 - Notice of Change of Director/Company Secretary (if applicable)</li>
                            <li>Form 13 - Notice of Change of Registered Address (if applicable)</li>
                            <li>Articles of Association/Memorandum of Association</li>
                            <li>NIC/Passport copies of Directors & Beneficial Owners</li>
                        </ol>
                        <Button type="submit" variant={"secondary"} asChild className="mt-6">
                            <Link href="/docs/corporate_KYC.pdf" rel="noopener noreferrer" download target="_blank">Download</Link>
                        </Button>
                    </FadeIn>
                </div>
                <div className="bg-background py-16"></div>
                <div id="kiid-investor" className="container py-16">
                    <FadeIn className="w-full max-w-4xl">
                        <div className="flex items-center gap-2">
                            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                            <p className="lg:text-xl uppercase font-medium">KIID</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-semibold mt-2 uppercase">KEY INVESTOR INFORMATION DOCUMENT</p>
                        <Button type="submit" variant={"secondary"} asChild className="mt-6">
                            <Link href="/docs/KIID.pdf" rel="noopener noreferrer" download target="_blank">Download</Link>
                        </Button>
                    </FadeIn>
                </div>
            </div>
            <div className="bg-background py-16"></div>
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
                            <MapPinHouse />
                            <p>{info.address}</p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <Headset />
                            <p>Call: 011 760 2007</p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <Inbox />
                            <p>Fax: 011 268 3095</p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <AtSign />
                            <p>Mail: {info.mail} </p>
                        </div>
                        <div className="flex gap-x-4 items-center lg:text-xl">
                            <LinkIcon />
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
