'use client'

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import FadeIn from "./fade-in";

export default function Subscription() {
    return (
        <div className="container">
            <div className="flex flex-col lg:flex-row my-20 max-w-6xl mx-auto gap-x-4 gap-y-8 items-center">
                <FadeIn className="w-full lg:w-2/5 shrink-0">
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl uppercase font-medium">Subscribe</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-start mt-2">Get the Latest News & Investment Insight</p>
                    <p className="mt-4 lg:text-2xl text-center lg:text-start font-light mx-auto lg:mx-0">Join Ceybank&apos;s mailing list for the latest fund news and investment tips.</p>
                </FadeIn>
                <FadeIn delay={.5} className="flex flex-col lg:flex-row w-full px-8 gap-x-8 gap-y-4">
                    <Input className="w-full !bg-secondary-foreground text-primary-foreground" placeholder="Enter your email" />
                    <Button variant={"secondary"}>Subscribe</Button>
                </FadeIn>
            </div>
        </div>
    )
}