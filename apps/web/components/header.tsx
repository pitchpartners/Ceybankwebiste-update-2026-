"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { appRoute } from "@/constants/routes";
import { ArrowLeft, ChevronRightIcon, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Fund } from "@/types/fund";

export default function Header({ funds }: { funds: Fund[] }) {
    const [submenu, setSubmenu] = useState<"investment" | "fund">();
    const activeFunds = [...funds]
        .filter((fund) => fund.isActive)
        .sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return a.name.localeCompare(b.name);
        });
    return (
        <header className="h-[62px] lg:h-[92px] container">
            <div className="h-full bg-background rounded-full flex items-center justify-between px-4 lg:px-7">
                <Link href={appRoute.home} className="relative w-[129px] lg:w-[184px] h-[32px] lg:h-[48px]">
                    <Image src={"/images/logo.svg"} fill alt="Ceybank" />
                </Link>
                <div className="space-x-8 text-black/70 text-lg font-medium hidden lg:flex">
                    <Link href={appRoute.home}>Home</Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Funds</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    {activeFunds.map((fund) => (
                                        <NavigationMenuLink asChild key={fund.id}>
                                            <Link href={`${appRoute.funds}/${fund.slug}`}>{fund.name}</Link>
                                        </NavigationMenuLink>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Investment</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink asChild>
                                        <Link href={appRoute.how_to_invest}>How to Invest in Units</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href={appRoute.monthly_investment_plan}>Investment Plan</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Link href={appRoute.private_wealth}>PWM</Link>
                    <Link href={appRoute.about}>About</Link>
                    <Link href={appRoute.contact}>Contact Us</Link>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant={"link"} size={"icon"} className="cursor-pointer size-6 lg:size-10 block lg:hidden relative">
                            <Image fill className="object-contain" src={"/images/menu.svg"} alt="" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="sr-only">
                                menu
                            </SheetTitle>
                            <SheetClose className="text-primary" asChild>
                                <X />
                            </SheetClose>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            {submenu == "investment" ? <div className="flex flex-col items-center gap-y-8 text-black/70 text-lg font-medium">
                                <Button variant={"link"} className="hover:no-underline text-lg cursor-pointer text-black/70" onClick={() => setSubmenu(undefined)}>
                                    <ArrowLeft />
                                    Back
                                </Button>
                                <SheetClose asChild>
                                    <Link href={appRoute.how_to_invest}>How to Invest in Units</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href={appRoute.monthly_investment_plan}>Investment Plan</Link>
                                </SheetClose>
                            </div>
                                : submenu == "fund" ? <div className="flex flex-col items-center gap-y-8 text-black/70 text-lg font-medium">
                                    <Button variant={"link"} className="hover:no-underline text-lg cursor-pointer text-black/70" onClick={() => setSubmenu(undefined)}>
                                        <ArrowLeft />
                                        Back
                                    </Button>
                                    {activeFunds.map((fund) => (
                                        <SheetClose asChild key={fund.id}>
                                            <Link href={`${appRoute.funds}/${fund.slug}`}>{fund.name}</Link>
                                        </SheetClose>
                                    ))}
                                </div>
                                    : <div className="flex flex-col items-center gap-y-8 text-black/70 text-lg font-medium">
                                        <SheetClose asChild>
                                            <Link href={appRoute.home}>Home</Link>
                                        </SheetClose>
                                        <Button variant={"link"} className="hover:no-underline text-lg cursor-pointer text-black/70" onClick={() => setSubmenu("fund")}>
                                            Funds
                                            <ChevronRightIcon />
                                        </Button>
                                        <Button variant={"link"} className="hover:no-underline text-lg cursor-pointer text-black/70" onClick={() => setSubmenu("investment")}>
                                            Investment
                                            <ChevronRightIcon />
                                        </Button>
                                        <SheetClose asChild>
                                            <Link href={appRoute.private_wealth}>Private Wealth</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href={appRoute.about}>About</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href={appRoute.contact}>Contact Us</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href={appRoute.news}>News</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href={appRoute.faq}>FAQs</Link>
                                        </SheetClose>
                                    </div>}
                        </div>
                        <SheetFooter>
                            {/* <Button onClick={comingSoon}>Sign Up</Button> */}
                            <Button type="submit" asChild>
                                <Link href={appRoute.sign_up} target="_blank">Sign Up</Link>
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                {/* <Button onClick={comingSoon} className="hidden lg:flex">Sign Up</Button> */}
                <Button className="hidden lg:flex" asChild>
                    <Link href={appRoute.sign_up} target="_blank">Sign Up</Link>
                </Button>
            </div>
        </header>
    )
}
