"use client"

import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useElementSize } from "@/hooks/useElementSize";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSupportTeamMembers } from "@/services/teamMemberService";
import { getBranches, sendContactMessage } from "@/services/contactService";
import { Branch } from "@/types/contact";
import { TeamMember } from "@/types/team";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function FAQ() {
    const { ref } = useElementSize<HTMLDivElement>();
    const { data: supportMembers = [] } = useQuery<TeamMember[]>({
        queryKey: ["team-members", "support"],
        queryFn: getSupportTeamMembers,
    });

    const { data: branchList = [] } = useQuery<Branch[]>({
        queryKey: ["branches"],
        queryFn: getBranches,
    });

    const contactSchema = z.object({
        name: z.string().trim().min(1, "Name is required"),
        email: z.string().trim().email("Valid email required"),
        subject: z.string().trim().min(1, "Subject is required").max(200, "Subject too long"),
        message: z.string().trim().min(5, "Message is required").max(2000, "Message too long"),
    });

    type ContactForm = z.infer<typeof contactSchema>;

    const form = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const submitMutation = useMutation({
        mutationFn: (payload: ContactForm) => sendContactMessage(payload),
        onSuccess: () => {
            toast.success("Message sent successfully");
            form.reset();
        },
        onError: (err) => {
            toast.error(err?.message || "Failed to send message");
        },
    });

    const onSubmit = (values: ContactForm) => {
        submitMutation.mutate(values);
    };

    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">Contact us</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Contact</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="bg-background">
                {/* contact us */}
                <div className="container py-20">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">Contact Info</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">More Business Info</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Ceybank is led by eight experts ensuring strong governance and strategic, performance-driven fund management.</p>
                    <div className="max-w-4xl mx-auto my-12 flex flex-col lg:flex-row gap-6">
                        <FadeIn className="w-full lg:w-[calc(50%-12px)] shrink-0 space-y-6">
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label className="text-black/80" htmlFor="name">Your Name</Label>
                                    <Input className="w-full !bg-secondary-foreground text-primary-foreground" type="text" id="name" placeholder="Enter Your Name" {...form.register("name")} />
                                    {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label className="text-black/80" htmlFor="email">Your Email Address</Label>
                                    <Input className="w-full !bg-secondary-foreground text-primary-foreground" type="email" id="email" placeholder="Enter Your Email Address" {...form.register("email")} />
                                    {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label className="text-black/80" htmlFor="subject">Subject</Label>
                                    <Input className="w-full !bg-secondary-foreground text-primary-foreground" type="text" id="subject" placeholder="Enter Subject" {...form.register("subject")} />
                                    {form.formState.errors.subject && <p className="text-sm text-red-500">{form.formState.errors.subject.message}</p>}
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label className="text-black/80" htmlFor="message">Your message</Label>
                                    <Textarea className="w-full !bg-secondary-foreground text-primary-foreground" rows={6} placeholder="Type your message here." id="message" {...form.register("message")} />
                                    {form.formState.errors.message && <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>}
                                </div>
                                <Button variant={"secondary"} className="w-36 block mx-auto lg:mx-0" type="submit" disabled={submitMutation.isPending}>
                                    {submitMutation.isPending ? "Sending..." : "Send"}
                                </Button>
                            </form>
                        </FadeIn>
                        <div ref={ref} className="w-full lg:w-[calc(50%-12px)] min-h-96 shrink-0">
                            <FadeIn delay={.5} className="w-full h-full">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6257844510837!2d79.8450902!3d6.935250299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2598f71d8f16b%3A0xfb10d7c5722b0bae!2sCeyBank%20Asset%20Management%20LTD.!5e0!3m2!1sen!2slk!4v1768501536365!5m2!1sen!2slk" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </FadeIn>
                        </div>
                    </div>
                </div>
                <div className="container py-20">
                    <p className="text-center text-2xl lg:text-3xl font-medium text-primary">Our dedicated support team via the contact form below</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 my-16">
                        {supportMembers.map(({ profileImagePath, name, position, location, supportPhone, id }, index) => (
                            <FadeIn key={id} delay={index / 10} className="w-full">
                                <div className="w-full max-w-xs mx-auto gap-y-2 flex flex-col h-auto hover:shadow-lg p-8 rounded-2xl border border-border">
                                    <div className="size-14 rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
                                        <Image fill className="object-cover" src={profileImagePath || "/images/dumy/avatar.png"} alt={name} />
                                    </div>
                                    <p className="text-primary text-xl font-medium text-center">{name}</p>
                                    <p className="text-primary font-semibold text-center text-sm">{position}</p>
                                    <p className="text-primary font-semibold text-center text-sm">{location}</p>
                                    <Button className="mx-auto mt-6 rounded-lg" asChild>
                                        <a href={`tel:${supportPhone ?? ""}`} className="flex items-center gap-2">
                                            <Image width={24} height={24} src={"/icons/support.svg"} alt=""/>
                                            {supportPhone}
                                        </a>
                                    </Button>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
                <div className="container py-20">
                    <p className="text-center text-2xl lg:text-3xl font-medium text-primary">our authorized branches for your convenience</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 my-16">
                        {branchList.map(({ id, name, primaryPhone, secondaryPhone, email }, index) => (
                            <FadeIn key={id} delay={index / 10} className="w-full">
                                <div className="max-w-xs w-full mx-auto flex flex-col gap-y-4 h-auto hover:shadow-lg p-6 rounded-2xl border border-border">
                                    {name && <div className="flex gap-x-3 items-center">
                                        <Image width={30} height={30} src={"/icons/building.png"} alt=""/>
                                        <p className="font-bold text-primary">{name}</p>
                                    </div>}
                                    {primaryPhone && <div className="flex gap-x-3 items-center">
                                        <Image width={30} height={30} src={"/icons/old-typical-phone.png"} alt=""/>
                                        <p className="font-bold text-primary">{primaryPhone}</p>
                                    </div>}
                                    {secondaryPhone && <div className="flex gap-x-3 items-center">
                                        <Image width={30} height={30} src={"/icons/printer.png"} alt=""/>
                                        <p className="font-bold text-primary">{secondaryPhone}</p>
                                    </div>}
                                    {email && <div className="flex gap-x-3 items-center">
                                        <Image width={30} height={30} src={"/icons/email.png"} alt=""/>
                                        <p className="font-bold text-primary">{email}</p>
                                    </div>}
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
