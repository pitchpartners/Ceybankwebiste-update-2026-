import Link from "next/link";
import { appRoute } from "@/constants/routes";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ContactSettings } from "@/lib/contact-settings";

type Props = {
  contactSettings: ContactSettings;
};

export default function TopBar({ contactSettings }: Props){
    const email = contactSettings.mainEmail || "";
    const phone = contactSettings.mainPhone || "";
    return(
        <div className="mt-4 lg:mt-10 container flex justify-between">
            <div className=" space-x-2 lg:space-x-4 lg:ms-12">
                <Link href={email ? `mailto:${email}` : "#"} className="font-medium text-xs lg:text-base">{email}</Link>
                <Link href={phone ? `tel:${phone}` : "#"} className="font-medium text-xs lg:text-base">{phone}</Link>
            </div>
            <div className="flex space-x-9 items-center lg:me-12">
                <div className="space-x-4 hidden lg:block">
                    <Link href={appRoute.news} className="font-medium">NEWS</Link>
                    <Link href={appRoute.faq} className="font-medium">FAQS</Link>
                </div>
                <div className="flex space-x-2 lg:space-x-4">
                    {contactSettings.facebookUrl && (
                        <Link href={contactSettings.facebookUrl}>
                            <Facebook size={16}/>
                        </Link>
                    )}
                    {contactSettings.instagramUrl && (
                        <Link href={contactSettings.instagramUrl}>
                            <Instagram size={16}/>
                        </Link>
                    )}
                    {contactSettings.twitterUrl && (
                        <Link href={contactSettings.twitterUrl}>
                            <Twitter size={16}/>
                        </Link>
                    )}
                    {contactSettings.linkedinUrl && (
                        <Link href={contactSettings.linkedinUrl}>
                            <Linkedin size={16}/>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
