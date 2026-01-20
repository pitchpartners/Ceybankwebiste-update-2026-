import Link from "next/link";
import Image from "next/image";
import { social } from "@/constants/links";
import { appRoute } from "@/constants/routes";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getTeamMemberById } from "@/services/teamMemberService";
import { notFound } from "next/navigation";

export default async function Reports({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let member;
    try {
        member = await getTeamMemberById(id);
    } catch {
        return notFound();
    }

    const avatar = member?.profileImagePath || "/images/dumy/avatar.png";
    const title = member?.shortTitle || member?.position;
    const bioParagraphs = member?.bio?.split("\n").filter(Boolean) || [];

    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">Employee</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Employee</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* trusted by */}
            <div className="bg-background">
                <div className="container my-20 gap-12 flex flex-col lg:flex-row">
                    <div className="w-full">
                        <div className="w-full aspect-square relative overflow-hidden rounded-2xl">
                            <Image fill className="object-cover" src={avatar} alt={member?.name || ""} />
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 shrink-0">
                        <div className="flex flex-col lg:flex-row items-center gap-x-6 gap-y-2">
                            <p className="text-3xl font-medium text-primary">{member?.name}</p>
                            <p className="text-2xl font-medium text-primary lg:hidden block">{title}</p>
                            <div className="flex space-x-2 lg:space-x-4 text-primary">
                                <Link href={social.facebook}>
                                    <Facebook size={20} />
                                </Link>
                                <Link href={social.instagram}>
                                    <Instagram size={20} />
                                </Link>
                                <Link href={social.twitter}>
                                    <Twitter size={20} />
                                </Link>
                                <Link href={social.linkedin}>
                                    <Linkedin size={20} />
                                </Link>
                            </div>
                        </div>
                        <p className="text-2xl font-medium text-primary mt-2 hidden lg:block">{title}</p>
                        <p className="text-black/80 font-medium mt-16">About {member?.name}</p>
                        {bioParagraphs.length
                            ? bioParagraphs.map((paragraph, index) => (
                                <p key={index} className="text-black/80 font-light mt-4">
                                    {paragraph}
                                </p>
                            ))
                            : (
                                <p className="text-black/80 font-light mt-4">No biography available.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
