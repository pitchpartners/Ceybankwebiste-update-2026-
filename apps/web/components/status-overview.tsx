import { counts } from "@/constants/content";
import CountUp from "./ui/count-up";
import Image from "next/image";

export default function StatusOverview() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-9 gap-x-12">
            {counts.map(({ iconPath, title, count, symbol }, index) => (
                <div key={index} className="hover:shadow-xl bg-background rounded-2xl flex flex-col justify-center items-center gap-y-4 p-9">
                    <Image width={60} height={60} src={iconPath} alt="" />
                    <p className="text-black/70 text-xl font-medium">{title}</p>
                    <div className="flex text-primary font-semibold text-4xl">
                        <span>{symbol}</span>
                        <CountUp to={count} />
                    </div>
                </div>
            ))}
        </div>
    )
}