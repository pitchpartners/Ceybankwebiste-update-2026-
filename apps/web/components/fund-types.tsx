import Link from "next/link";
import Image from "next/image";
import FadeIn from "./fade-in";
import { Button } from "./ui/button";
import { fundTypes as fallbackFundTypes } from "@/constants/content";
import { Fund } from "@/types/fund";
import { appRoute } from "@/constants/routes";

const fallbackBySlug = fallbackFundTypes.reduce<Record<string, typeof fallbackFundTypes[number]>>((acc, item) => {
    const slug = item.path.split("/").pop() || item.path;
    acc[slug] = item;
    return acc;
}, {});

export default function FundTypes({ funds }: { funds: Fund[] }) {
    const activeFunds = [...funds]
        .filter((fund) => fund.isActive)
        .sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return a.name.localeCompare(b.name);
        });

    const fundCards =
        activeFunds.length > 0
            ? activeFunds.map((fund) => {
                  const fallback = fallbackBySlug[fund.slug];
                  return {
                      title: fund.name,
                      description: fund.shortDescription || fallback?.description || "",
                      iconPath: fallback?.iconPath || "/icons/fund-1.png",
                      path: `${appRoute.funds}/${fund.slug}`,
                  };
              })
            : fallbackFundTypes;

    return (
        <div className="container my-20">
            <div className="flex justify-center items-center gap-2">
                <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                <p className="lg:text-xl text-primary-foreground uppercase font-medium">Fund Types</p>
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">What we offer</p>
            <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Investment Solutions Tailored to Your Financial Goals At CAML, we recognize that individual and corporate investors have diverse financial objectives. Whether you&apos;re looking to grow your wealth, earn regular income, or preserve your capital, our investment solutions are designed to help you succeed.</p>
            <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Some investors seek high capital growth through equity investments. Others prioritize stable returns and income generation, while conservative investors may focus on capital preservation with low-risk strategies. Additional financial needs often include efficient cash management, tax planning, and short-term liquidity.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 my-10">
                {fundCards.map(({ title, description, iconPath, path }, index) => (
                    <FadeIn key={index} delay={index / 10} className="w-full space-y-5 h-auto hover:shadow-lg p-8 rounded-2xl border border-border bg-primary/10">
                        <div className="size-[72px] bg-primary rounded-full flex items-center justify-center">
                            <Image width={36} height={36} src={iconPath} alt={title} />
                        </div>
                        <p className="text-black/70 text-2xl font-semibold">{title}</p>
                        <p className="text-black/60 font-light line-clamp-3">{description}</p>
                        <Button variant={"link"} className="px-0 underline cursor-pointer" asChild>
                            <Link href={path}>Read more</Link>
                        </Button>
                    </FadeIn>
                ))}
            </div>
        </div>
    )
}
