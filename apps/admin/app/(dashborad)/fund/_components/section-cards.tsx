"use client"

import Link from "next/link"
import { Fund } from "@/types/fund"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { getFunds } from "@/services/fundService"
import { Skeleton } from "@/components/ui/skeleton"
import { IconTrendingDown } from "@tabler/icons-react"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSnapshotPath } from "../_lib/fund-snapshot-routes"

export function SectionCards() {
  const { data: funds, isLoading } = useQuery<Fund[]>({
    queryKey: ["funds"],
    queryFn: getFunds,
    initialData: undefined,
  });
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {isLoading && Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="@container/card h-32" />)}
      {funds?.map((fund) => {
        const snapshotPath = getSnapshotPath(fund.id, fund.category)
        return (
        <Card key={fund.id} className="@container/card">
          <CardContent className="space-y-1 flex flex-col items-end">
            <span className="size-5 text-muted-foreground tracking-widest">LKR</span>
            <div className="text-xl font-semibold @[250px]/card:text-2xl flex justify-between items-center w-full">
              <div className="">
                <p className="">1,234</p>
                <p className="text-xs font-light">Bid Price</p>
              </div>
              <Badge variant="outline">
                <IconTrendingDown />
                -20%
              </Badge>
            </div>
            <CardDescription className="w-full">{fund.name}</CardDescription>
            {snapshotPath && (
              <div className="w-full flex justify-end pt-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={snapshotPath}>Snapshots</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        )
      })}
    </div>
  )
}
