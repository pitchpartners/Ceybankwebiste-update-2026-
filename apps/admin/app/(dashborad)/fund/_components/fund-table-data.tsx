"use client"

import * as React from "react"
import { Fund } from "@/types/fund"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteFund } from "@/services/fundService"
import { toast } from "sonner"
import { getSnapshotPath } from "../_lib/fund-snapshot-routes"
import { FundDrawer } from "./fund-drawer"

// -------------------------
// Table Columns
// -------------------------
export const columns: ColumnDef<Fund>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-16">{row.original.id}</div>,
  },
  {
    accessorKey: "name",
    header: "Fund Name",
    cell: ({ row }) => <div className="w-full">{row.original.name}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="w-fit">
        {new Date(row.original.createdAt).toISOString().split("T")[0]}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
  },
]

// -------------------------
// Chart Data (example)
// -------------------------
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//   desktop: { label: "Desktop", color: "var(--primary)" },
//   mobile: { label: "Mobile", color: "var(--primary)" },
// } satisfies ChartConfig

// -------------------------
// Zod Schema
// -------------------------
function TableCellViewer({ item }: { item: Fund }) {
  const queryClient = useQueryClient()
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const snapshotPath = getSnapshotPath(item.id, item.category)

  const deleteMutation = useMutation({
    mutationFn: () => deleteFund(item.id),
    onSuccess: () => {
      toast.success("Fund deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["funds"] })
      setOpenDeleteDialog(false)
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete fund")
    },
  })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Action</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">Fund</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
              setOpenEdit(true)
            }}
          >
            Edit Fund
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>Delete Fund</DropdownMenuItem>
          {snapshotPath && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">Monthly Snapshots</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={snapshotPath}>
                  {item.category === "MONEY_MARKET"
                    ? "Manage Money Market Snapshots"
                    : "Manage Equity Snapshots"}
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <FundDrawer item={item} open={openEdit} onOpenChange={setOpenEdit} />
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the fund &quot;{item.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => deleteMutation.mutate()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
