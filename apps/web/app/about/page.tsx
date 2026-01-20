import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getTeamMembers } from "@/services/teamMemberService";
import { TeamMember } from "@/types/team";

type TeamCard = {
    id: number;
    fullName: string;
    jobTitle: string;
    description: string;
    avatar: string;
}

const toCard = (member: TeamMember): TeamCard => ({
    id: member.id,
    fullName: member.name,
    jobTitle: member.shortTitle || member.position,
    description: member.bio,
    avatar: member.profileImagePath || "/images/dumy/avatar.png",
})

const pickCategory = (members: TeamMember[], category: string): TeamCard[] => {
    const filtered = members
        .filter((member) => (member.category ?? "board") === category && member.isActive)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.id - b.id);
    return filtered.map(toCard);
}

export default async function About() {
    let members: TeamMember[] = [];
    try {
        members = await getTeamMembers();
    } catch {
        members = [];
    }

    const boardCards = pickCategory(members, "board");
    const fundCards = pickCategory(members, "fund");
    const keyCards = pickCategory(members, "key");

    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">About Ceybank</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>About</BreadcrumbPage>
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
                            <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2 text-primary">About Ceybank</p>
                            <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0 text-black/60 hidden lg:block">With over 35 years of trusted experience, Ceybank Asset Management Ltd. is one of Sri Lanka’s leading investment management companies, offering a range of Unit Trust Fund designed to meet the needs of individual and corporate investors.</p>
                            <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0 text-black/60 hidden lg:block">Our mission is to help Sri Lankans grow their wealth through secure, transparent, and professionally managed investment solutions. Backed by a team of experts and strong institutional partnerships, Ceybank is a name synonymous with stability, performance, and investor trust.</p>
                        </FadeIn>
                        <FadeIn delay={.5} className="w-full lg:w-1/2 aspect-square p-8 relative overflow-hidden rounded-2xl">
                            <Image fill className="object-cover" src={"/images/businessman-analyzing-data.jpg"} alt="" />
                        </FadeIn>
                        <p className="mt-4 text-center font-light mx-auto text-black/60 lg:hidden block">With over 35 years of trusted experience, Ceybank Asset Management Ltd. is one of Sri Lanka’s leading investment management companies, offering a range of Unit Trust Fund designed to meet the needs of individual and corporate investors.</p>
                        <p className="mt-4 text-center font-light mx-auto text-black/60 lg:hidden block">Our mission is to help Sri Lankans grow their wealth through secure, transparent, and professionally managed investment solutions. Backed by a team of experts and strong institutional partnerships, Ceybank is a name synonymous with stability, performance, and investor trust.</p>
                    </div>
                    {/* <div className="py-16">
                        <StatusOverview />
                    </div> */}
                </div>
            </div>
            {/* our mission */}
            <div className="container flex flex-row-reverse py-16 lg:py-32 relative">
                <div className="flex flex-col lg:max-w-1/2 w-full gap-y-10">
                    <FadeIn className="mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                        <div className="flex justify-center lg:justify-start items-center gap-2">
                            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                            <p className="lg:text-xl uppercase font-medium">Vision</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">Our Vision</p>
                        <p className="mt-4 lg:text-2xl text-center lg:text-start font-light max-w-lg mx-auto lg:mx-0">To be Sri Lanka’s most trusted and accessible Fund manager, delivering value to investors through inclusive, innovative and ethical investment solution.</p>
                    </FadeIn>
                    <FadeIn className="mx-auto lg:mx-0 flex lg:inline-block flex-col items-center z-10">
                        <div className="flex justify-center lg:justify-end items-center gap-2">
                            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                            <p className="lg:text-xl uppercase font-medium">Mission</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-end mt-2">Our Mission</p>
                        <p className="mt-4 lg:text-2xl text-center lg:text-end font-light max-w-lg mx-auto lg:mx-0 w-full float-end">To build a financially empowered country by broadening access to wealth creation across all communities.</p>
                    </FadeIn>
                </div>
                <FadeIn delay={.5} className="w-full h-[calc(100%+100px)] absolute -top-[100px] left-[-10vw] select-none z-0 hidden lg:block">
                    <Image fill className="object-contain object-top-left absolute left-0 -top-[120px]" src={"/images/low-angle-business-man-with-clipboard.png"} alt="" />
                </FadeIn>
            </div>
            {/* trusted by
            <div className="bg-background">
                <FundTypes/>
            </div> */}
            <div className="py-16 bg-background"></div>
            {/* operations overview */}
            <div className="relative">
                <div className="container flex flex-col lg:flex-row py-16 gap-y-8 relative z-20">
                    <FadeIn className="w-full lg:w-1/2 space-y-8 font-light text-center leading-relaxed flex flex-col items-center">
                        <p className="text-2xl lg:text-3xl font-medium">Compliance and <br /> Risk Management</p>
                        <p className="max-w-xl">Compliance and Risk Management at Ceybank happens at multiple levels. The Board Risk Committee overlooks the risk structure and varied risk parameters, which the Risk & Compliance Officer monitors. These include Investment Risk, Operational risks.</p>
                        <p className="max-w-xl">The Compliance officer is also responsible for all other compliance issues related to the Investment Funds as well as the Management Company. This ensures adherence to SEC Rules and regulations.</p>
                    </FadeIn>
                    <FadeIn delay={.5} className="w-full lg:w-1/2 space-y-8 font-light text-center leading-relaxed flex flex-col items-center">
                        <p className="text-2xl lg:text-3xl font-medium">Marketing and Distribution <br /> Network</p>
                        <p className="max-w-xl">Ceybank leverages the Bank of Ceylon&apos;s nationwide branch network as its primary distribution channel. Regional offices are located in key cities, enhancing accessibility and enabling deep penetration of capital market products to the broader population. Ceybank continues to align with BoC to maximize synergies and take Sri Lanka’s capital market to the grassroots.</p>
                    </FadeIn>
                </div>
                <div className="absolute w-full lg:w-1/2 h-1/2 lg:h-full bottom-0 lg:top-0 right-0 z-0">
                    <div className="w-full h-full bg-primary/80 absolute z-10"></div>
                    <Image fill className="object-cover" src={"/images/top-view-office-desk-with-laptop.jpg"} alt="" />
                </div>
            </div>
            {/* our team */}
            <div className="bg-background">
                <div className="container my-20">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">Our Team</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Board of Directors</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">The management of Ceybank Asset Management Limited is vested in the Board, comprising eight Directors with rich experience and expertise in the financial sector in Sri Lanka and abroad.</p>
                    <Carousel className="container mt-16 mb-32">
                        <CarouselContent>
                            {boardCards.map(({fullName,description,jobTitle,avatar,id}, index) => (
                                <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/3 flex justify-center items-center" key={id}>
                                    <FadeIn delay={index%4/10} className="w-full lg:w-[98%] max-w-sm p-3 md:p-4 lg:p-6 xl:p-8 rounded-2xl border border-border relative">
                                        <div className="w-full aspect-square relative overflow-hidden rounded-2xl">
                                            <Image fill className="object-cover" src={avatar} alt="" />
                                        </div>
                                        <p className="text-primary font-medium text-2xl mt-2 line-clamp-1">{fullName}</p>
                                        <p className="text-primary font-medium text-lg mt-2">{jobTitle}</p>
                                        <p className="text-black/60 font-light mt-8 line-clamp-3">{description}</p>
                                        <Button variant={"link"} className="px-0 underline cursor-pointer" asChild>
                                            <Link href={`${appRoute.employee}/${id}`}>Read more</Link>
                                        </Button>
                                    </FadeIn>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-primary hover:!bg-primary/80" />
                        <CarouselNext className="bg-primary hover:!bg-primary/80" />
                    </Carousel>
                </div>
                <div className="container my-20">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">Our Team</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Fund Management Team</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">The Fund Management Division comprises experienced professionals providing ethical investment management backed by up-to-date research. The team has received in-depth training in investment management and trading operations under UTI’s supervision through a Technical Assistance Agreement. Expatriates from Unit Trust of India have also provided specialized training. Mr. Ian Ferdinands, CEO of Ceybank Asset Management Limited, leads the team in formulating and implementing investment strategies.</p>
                    <Carousel className="container mt-16 mb-32">
                        <CarouselContent>
                            {fundCards.map(({fullName, description, jobTitle, avatar, id}, index) => (
                                <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/3 flex justify-center items-center" key={id}>
                                    <FadeIn delay={index%4/10} className="w-full lg:w-[98%] max-w-sm p-3 md:p-4 lg:p-6 xl:p-8 rounded-2xl border border-border relative">
                                        <div className="w-full aspect-square relative overflow-hidden rounded-2xl">
                                            <Image fill className="object-cover" src={avatar} alt="" />
                                        </div>
                                        <p className="text-primary font-medium text-2xl mt-2 line-clamp-1">{fullName}</p>
                                        <p className="text-primary font-medium text-lg mt-2">{jobTitle}</p>
                                        <p className="text-black/60 font-light mt-8 line-clamp-4">{description}</p>
                                        <Button variant={"link"} className="px-0 underline cursor-pointer" asChild>
                                            <Link href={`${appRoute.employee}/${id}`}>Read more</Link>
                                        </Button>
                                    </FadeIn>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-primary hover:!bg-primary/80" />
                        <CarouselNext className="bg-primary hover:!bg-primary/80" />
                    </Carousel>
                </div>
                <div className="container my-20">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">Our Team</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Other Key Management Team</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">The Senior Members of the Fund Management Division consists of well-qualified experienced personnel involved in providing a proficient and ethical investment management service, backed by up-to-date investment research.</p>
                    <Carousel className="container mt-16 mb-32">
                        <CarouselContent>
                            {keyCards.map(({fullName, description, jobTitle, avatar, id}, index) => (
                                <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/3 flex justify-center items-center" key={id}>
                                    <FadeIn delay={index%4/10} className="w-full lg:w-[98%] max-w-sm p-3 md:p-4 lg:p-6 xl:p-8 rounded-2xl border border-border relative">
                                        <div className="w-full aspect-square relative overflow-hidden rounded-2xl">
                                            <Image fill className="object-cover" src={avatar} alt="" />
                                        </div>
                                        <p className="text-primary font-medium text-2xl mt-2 line-clamp-1">{fullName}</p>
                                        <p className="text-primary font-medium text-lg mt-2">{jobTitle}</p>
                                        <p className="text-black/60 font-light mt-8 line-clamp-4">{description}</p>
                                        <Button variant={"link"} className="px-0 underline cursor-pointer" asChild>
                                            <Link href={`${appRoute.employee}/${id}`}>Read more</Link>
                                        </Button>
                                    </FadeIn>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-primary hover:!bg-primary/80" />
                        <CarouselNext className="bg-primary hover:!bg-primary/80" />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}
