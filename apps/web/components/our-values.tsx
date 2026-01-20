"use client"

import FadeIn from "./fade-in";
import { FundPrice } from "@/types/fund";
import { useQuery } from "@tanstack/react-query";
import { getFundsPrice } from "@/services/fundPriceService";

export default function OurValues() {
    const { data: fundPrices } = useQuery<FundPrice[]>({
        queryKey: ["funds", "latest"],
        queryFn: ()=>getFundsPrice(),
        refetchInterval: 5 * 60 * 1000,
    });
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 my-10">
            {!!fundPrices?.length ? fundPrices?.map(({ fund, bidPrice, offerPrice }, index) => (
                <FadeIn key={index} delay={index / 10} className="w-full space-y-5 h-auto hover:shadow-lg p-8 rounded-2xl border border-border bg-primary/10">
                    <p className="text-primary text-2xl font-semibold">{fund.name}</p>
                    <hr className="" />
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-5">
                            <p className="font-light text-black">Bid Price(LKR)</p>
                            <p className="font-semibold text-primary text-3xl">{bidPrice}</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="font-light text-black">Offer Price(LKR)</p>
                            <p className="font-semibold text-primary text-3xl">{offerPrice}</p>
                        </div>
                    </div>
                </FadeIn>
            )):<p className="text-red-800/70 text-center w-full text-2xl col-span-full">Not Update Today Price List</p>}
        </div>
    )
}