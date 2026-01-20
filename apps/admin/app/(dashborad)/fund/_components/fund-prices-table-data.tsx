"use client"

import * as React from "react"
import { CreateFundPriceDto, FundPrice } from "@/types/fund" // make sure you have FundPrice type
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { ColumnDef } from "@tanstack/react-table"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateFundPrice } from "@/services/fundPriceService"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

// -------------------------
// Zod Schema
// -------------------------
const toNumber = (val: unknown) => (typeof val === "string" && val.trim() === "" ? NaN : Number(val))
const fundPriceSchema = z.object({
  bidPrice: z.preprocess(toNumber, z.number().min(0, "Bid price must be at least 0")),
  offerPrice: z.preprocess(toNumber, z.number().min(0, "Offer price must be at least 0")),
})

// -------------------------
// Table Columns
// -------------------------
export const columns: ColumnDef<FundPrice>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-16">{row.original.id}</div>,
  },
  {
    accessorKey: "fundName",
    header: "Fund",
    cell: ({ row }) => <div className="w-full">{row.original.fund.name}</div>,
  },
  {
    accessorKey: "bidPrice",
    header: "Bid Price",
    cell: ({ row }) => <div>{row.original.bidPrice}</div>,
  },
  {
    accessorKey: "offerPrice",
    header: "Offer Price",
    cell: ({ row }) => <div>{row.original.offerPrice}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.original.date.split("T")[0]}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
  },
]

// -------------------------
// Table Cell Viewer Component
// -------------------------
function TableCellViewer({ item }: { item: FundPrice }) {
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()

  const [bidPrice, setBidPrice] = React.useState(item.bidPrice.toString())
  const [offerPrice, setOfferPrice] = React.useState(item.offerPrice.toString())
  const [error, setError] = React.useState<string | null>(null)

  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false)
  const displayDate = React.useMemo(() => item.date.split("T")[0], [item.date])

  // Update Fund Price Mutation
  const updateMutation = useMutation({
    mutationFn: (payload: Pick<CreateFundPriceDto, "bidPrice" | "offerPrice" | "date">) =>
      updateFundPrice(item.id, {
        ...payload,
        fundId: item.fund.id,
      }),
    onSuccess: () => {
      toast.success("Fund price updated successfully")
      queryClient.invalidateQueries({ queryKey: ["funds", "fund-price"] })
      setOpenUpdateDialog(false)
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update price")
    },
  })

  const handleApply = () => {
    const validation = fundPriceSchema.safeParse({
      bidPrice,
      offerPrice,
    })
    if (!validation.success) {
      setError(validation.error.issues[0].message)
      return
    }
    setError(null)
    setOpenUpdateDialog(true)
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="outline">Action</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.fund.name}</DrawerTitle>
          <DrawerDescription>Edit Fund Price</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Label htmlFor="bidPrice">Bid Price</Label>
          <Input
            id="bidPrice"
            type="number"
            value={bidPrice}
            onChange={(e) => setBidPrice(e.target.value)}
          />

          <Label htmlFor="offerPrice">Offer Price</Label>
          <Input
            id="offerPrice"
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
          />

          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={displayDate} disabled />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DrawerFooter className="flex gap-4">
          <div className="grid grid-cols-1 gap-4">
            <Button onClick={handleApply} disabled={updateMutation.isPending}>
              {updateMutation.isPending && <Loader2 className="animate-spin" />} Apply Changes
            </Button>
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>

      {/* Update Confirmation Dialog */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update this fund price?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenUpdateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => updateMutation.mutate({ bidPrice: Number(bidPrice), offerPrice: Number(offerPrice), date: `${displayDate}T00:00:00.000Z` })}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Drawer>
  )
}
