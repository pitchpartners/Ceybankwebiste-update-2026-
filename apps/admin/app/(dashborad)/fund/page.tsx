import { Tabs } from "@radix-ui/react-tabs"
import { Label } from "@/components/ui/label"
import { DataTable } from "./_components/data-table"
import { SectionCards } from "./_components/section-cards"
import { columns as fundColumn } from "./_components/fund-table-data"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { columns as fundPricesColumn } from "./_components/fund-prices-table-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <Tabs defaultValue="fund" className="w-full flex-col justify-start gap-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
              <Label htmlFor="view-selector" className="sr-only">
                View
              </Label>
              <Select defaultValue="fund">
                <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
                  <SelectValue placeholder="Select a view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fund">Fund</SelectItem>
                  <SelectItem value="fund-price">Fund Prices</SelectItem>
                </SelectContent>
              </Select>
              <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                <TabsTrigger value="fund">Fund</TabsTrigger>
                <TabsTrigger value="fund-price">Fund Price</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="fund" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
              <DataTable columns={fundColumn} tab="fund" />
            </TabsContent>
            <TabsContent value="fund-price" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
              <DataTable columns={fundPricesColumn} tab="fund-price" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
