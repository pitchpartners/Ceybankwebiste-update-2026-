"use client"

import * as React from "react";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { getFundReports } from "@/services/fundReportService";
import { FundReport, FundReportType } from "@/types/fund";

export default function Reports() {
    const [activeType, setActiveType] = React.useState<FundReportType>("ANNUAL");
    const [page, setPage] = React.useState(1);
    const pageSize = 8;

    const { data, isLoading } = useQuery({
        queryKey: ["fund-reports", activeType, page],
        queryFn: () => getFundReports({ type: activeType, page, pageSize, isActive: true }),
        placeholderData: (prev) => prev,
    });

    const reports = data?.data || [];
    const totalPages = data?.totalPages ?? 1;

    const handlePageChange = (next: number) => {
        if (next < 1 || next > totalPages) return;
        setPage(next);
    };

    const renderGrid = (items: FundReport[]) => {
        if (isLoading) {
            return <p className="text-center text-muted-foreground py-8">Loading reports...</p>;
        }
        if (!items.length) {
            return <p className="text-center text-muted-foreground py-8">No reports available.</p>;
        }
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 my-10">
                {items.map((report, index) => (
                    <FadeIn delay={index / 10} key={report.id} className="w-full h-auto">
                        <a href={report.filePath} target="_blank" rel="noreferrer">
                            <div className="w-28 h-40 lg:w-44 lg:h-64 relative mx-auto overflow-hidden rounded-md border bg-secondary/40">
                                <Image className="object-contain" fill src={"/images/reports/thumbnail.png"} alt={report.title} />
                            </div>
                            <p className="text-xs lg:text-base font-medium text-center mt-2 text-black uppercase line-clamp-3">
                                {report.title}
                            </p>
                            <p className="text-[11px] text-muted-foreground text-center">
                                {report.fund?.name} • {report.periodLabel || report.year}
                            </p>
                        </a>
                    </FadeIn>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col">
            {/* breadcrumbs section */}
            <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
                <p className="text-center font-bold text-2xl lg:text-5xl">Fund Reports</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Fund Reports</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* content */}
            <div className="bg-background">
                <div className="container my-20">
                    <div className="flex justify-center items-center gap-2">
                        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
                        <p className="lg:text-xl text-primary-foreground uppercase font-medium">Reports</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Ceybank Fund Reports</p>
                    <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
                    <Tabs defaultValue="ANNUAL" className="container mt-12" onValueChange={(v) => { setActiveType(v as FundReportType); setPage(1); }}>
                        <TabsList className="grid w-full max-w-lg grid-cols-2 mx-auto">
                            <TabsTrigger value="ANNUAL">Annual Reports</TabsTrigger>
                            <TabsTrigger value="INTERIM">Interim Reports</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ANNUAL">
                            {renderGrid(activeType === "ANNUAL" ? reports : [])}
                        </TabsContent>
                        <TabsContent value="INTERIM">
                            {renderGrid(activeType === "INTERIM" ? reports : [])}
                        </TabsContent>
                    </Tabs>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page - 1); }} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                            {totalPages > page && (
                                <PaginationItem>
                                    <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }}>
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )}
                            {totalPages > page + 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}
