import Link from "next/link";
import Image from "next/image";
import { appRoute } from "@/constants/routes";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { ContactSettings } from "@/lib/contact-settings";
import { Fund } from "@/types/fund";

type Props = {
  contactSettings: ContactSettings;
  funds: Fund[];
};

export default function Footers({ contactSettings, funds }: Props) {
    const email = contactSettings.mainEmail || "";
    const phone = contactSettings.mainPhone || "";
    const address = contactSettings.officeAddress || "";
    const activeFunds = [...funds]
        .filter((fund) => fund.isActive)
        .sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return a.name.localeCompare(b.name);
        });
    return (
        <div className="bg-slate-200 pt-16 pb-4">
            <div className="container flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/3 shrink-0">
                    <Link href={appRoute.home} className="relative block w-[129px] lg:w-[184px] h-[32px] lg:h-[48px]">
                        <Image src={"/images/logo.svg"} fill alt="Ceybank" />
                    </Link>
                    <p className="font-medium text-black/80 max-w-sm mt-4">With 35+ years of trusted experience, Ceybank is a leading Sri Lankan investment firm offering secure, expert-managed Unit Trusts for individuals and corporates.</p>
                    <div className="space-x-2 lg:space-x-4 text-black/80 mt-8 hidden lg:flex">
                        {contactSettings.facebookUrl && (
                            <Link href={contactSettings.facebookUrl}>
                                <Facebook size={16} />
                            </Link>
                        )}
                        {contactSettings.instagramUrl && (
                            <Link href={contactSettings.instagramUrl}>
                                <Instagram size={16} />
                            </Link>
                        )}
                        {contactSettings.twitterUrl && (
                            <Link href={contactSettings.twitterUrl}>
                                <Twitter size={16} />
                            </Link>
                        )}
                        {contactSettings.linkedinUrl && (
                            <Link href={contactSettings.linkedinUrl}>
                                <Linkedin size={16} />
                            </Link>
                        )}
                    </div>
                    <div className="mt-8 text-black/80 font-semibold gap-x-2 hidden lg:flex">
                        <Link href={"/docs/privacy-policy.txt"}>Privacy Policy</Link>
                        {/* | <Link href={"/"}>Terms & Conditions</Link> */}
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                    <div className="space-y-4">
                        <p className="font-medium lg:text-2xl text-primary">Navigation</p>
                        <div className="flex flex-col space-y-2 text-black/80 text-sm lg:text-base font-medium">
                            <Link href={appRoute.home}>Home</Link>
                            <Link href={appRoute.about}>About</Link>
                            <Link href={appRoute.private_wealth}>PWM</Link>
                            {/* <Link href={appRoute.service}>Services</Link> */}
                            <Link href={appRoute.faq}>FAQ</Link>
                            <Link href={appRoute.contact}>Contact</Link>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="font-medium lg:text-2xl text-primary">Quick Links</p>
                        <div className="flex flex-col space-y-2 text-black/80 text-sm lg:text-base font-medium">
                            {activeFunds.map((fund) => (
                                <Link key={fund.id} href={`${appRoute.funds}/${fund.slug}`}>
                                    {fund.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4 col-span-2 lg:col-span-1">
                        <p className="font-medium lg:text-2xl text-primary">Visit us</p>
                        <div className="flex flex-col space-y-2 text-black/80 text-sm lg:text-base font-medium">
                            <Link href={appRoute.home} className="flex items-start gap-x-2">
                                <MapPin className="size-6 shrink-0" />
                                <p>{address}</p>
                            </Link>
                            <Link href={appRoute.home} className="flex items-start gap-x-2">
                                <Phone className="size-6 shrink-0" />
                                <p>{phone}</p>
                            </Link>
                            <Link href={email ? `mailto:${email}` : "#"} className="flex items-start gap-x-2">
                                <Mail className="size-6 shrink-0" />
                                <p>{email}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gap-y-4 flex flex-col items-center mt-6">
                <div className="space-x-2 lg:space-x-4 text-black/80 lg:hidden flex">
                    {contactSettings.facebookUrl && (
                        <Link href={contactSettings.facebookUrl}>
                            <Facebook size={16} />
                        </Link>
                    )}
                    {contactSettings.instagramUrl && (
                        <Link href={contactSettings.instagramUrl}>
                            <Instagram size={16} />
                        </Link>
                    )}
                    {contactSettings.twitterUrl && (
                        <Link href={contactSettings.twitterUrl}>
                            <Twitter size={16} />
                        </Link>
                    )}
                    {contactSettings.linkedinUrl && (
                        <Link href={contactSettings.linkedinUrl}>
                            <Linkedin size={16} />
                        </Link>
                    )}
                </div>
                <div className="text-black/80 font-semibold gap-x-2 lg:hidden flex">
                    <Link href="" rel="noopener noreferrer" download target="_blank">Download</Link> | <Link href={"/"}>Terms & Conditions</Link>
                </div>
            </div>
            <div className="container my-4 flex flex-col gap-y-4 relative">
                <hr className="w-full h-[2px] bg-black/30" />
                <div className="text-black/80 flex flex-col lg:flex-row gap-y-2">
                    <p className="text-center text-xs md:text-sm lg:text-base w-full">COPYRIGHT © 2025 Ceybank Asset Management Ltd. ALL RIGHTS RESERVED.</p>
                    <p className="lg:absolute right-5 text-center">Powered by <Link href={"/"} className="font-bold text-xl text-primary">Pitch Partners</Link></p>
                </div>
            </div>
        </div>
    )
}
