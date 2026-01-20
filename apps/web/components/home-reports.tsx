"use client"

import * as React from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import FadeIn from "./fade-in"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { appRoute } from "@/constants/routes"
import { FundReport } from "@/types/fund"
import { getLatestFundReports } from "@/services/fundReportService"

const placeholderThumb = "/images/reports/thumbnail.png"

function ReportGrid({ reports }: { reports: FundReport[] }) {
  if (!reports.length) {
    return <p className="text-center text-sm text-muted-foreground py-6">No reports available yet.</p>
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 my-10">
      {reports.map((report, index) => (
        <FadeIn delay={index / 10} key={report.id} className="w-full h-auto">
          <Link href={report.filePath} target="_blank" className="block">
            <div className="w-28 h-40 lg:w-44 lg:h-64 relative mx-auto overflow-hidden rounded-md border bg-secondary/40">
              <Image className="object-contain" fill src={placeholderThumb} alt={report.title} />
            </div>
            <p className="text-xs lg:text-base font-medium text-center mt-2 uppercase text-gray-300 line-clamp-3">
              {report.title || `${report.fund?.name} ${report.type} ${report.year}`}
            </p>
            <p className="text-[11px] text-muted-foreground text-center">
              {report.fund?.name} • {report.periodLabel || report.year}
            </p>
          </Link>
        </FadeIn>
      ))}
    </div>
  )
}

export default function HomeReportsSection() {
  const { data: annual = [] } = useQuery<FundReport[]>({
    queryKey: ["fund-reports", "home", "annual"],
    queryFn: () => getLatestFundReports(4, "ANNUAL"),
  })
  const { data: interim = [] } = useQuery<FundReport[]>({
    queryKey: ["fund-reports", "home", "interim"],
    queryFn: () => getLatestFundReports(4, "INTERIM"),
  })

  return (
    <div className="container my-20">
      <div className="flex justify-center items-center gap-2">
        <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
        <p className="lg:text-xl uppercase font-medium">Reports</p>
      </div>
      <p className="text-2xl lg:text-3xl font-semibold text-center mt-2">Ceybank Funds Reports</p>
      <p className="mt-4 lg:text-xl text-center font-semibold max-w-5xl mx-auto">Stay Informed with the Latest Performance & Portfolio&nbsp;Updates</p>
      <p className="mt-4 lg:text-2xl text-center font-light max-w-5xl mx-auto">Access the latest fund performance reports, portfolio summaries, and NAV data for all Ceybank Unit Trust Funds. Our detailed reports help investors make informed decisions by offering transparent insights into fund activity, asset allocation, market outlooks,&nbsp;and&nbsp;returns.</p>
      <Tabs defaultValue="ANNUAL" className="container mt-12">
        <TabsList className="grid w-full max-w-lg grid-cols-2 mx-auto">
          <TabsTrigger value="ANNUAL">Annual Reports</TabsTrigger>
          <TabsTrigger value="INTERIM">Interim Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="ANNUAL">
          <ReportGrid reports={annual} />
        </TabsContent>
        <TabsContent value="INTERIM">
          <ReportGrid reports={interim} />
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex justify-center">
        <Button variant={"secondary"} asChild>
          <Link href={appRoute.reports}>View All</Link>
        </Button>
      </div>
    </div>
  )
}
