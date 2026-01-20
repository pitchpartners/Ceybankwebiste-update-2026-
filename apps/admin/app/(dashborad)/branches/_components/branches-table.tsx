"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Branch, BranchInput } from "@/types/contact"
import { getBranches, createBranch, updateBranch, deleteBranch } from "@/services/branchService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { BranchForm } from "./branch-form"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox"
import { useIsMobile } from "@/hooks/use-mobile"
import { IconPlus } from "@tabler/icons-react"

function BranchDrawer({
  mode,
  branch,
}: {
  mode: "create" | "edit"
  branch?: Branch
}) {
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (payload: BranchInput) => mode === "create" ? createBranch(payload) : updateBranch(branch!.id, payload),
    onSuccess: () => {
      toast.success(mode === "create" ? "Branch created" : "Branch updated")
      queryClient.invalidateQueries({ queryKey: ["branches"] })
    },
    onError: (err) => toast.error(err?.message || "Failed to save branch"),
  })

  const defaults: BranchInput = {
    name: branch?.name || "",
    city: branch?.city || "",
    primaryPhone: branch?.primaryPhone || "",
    secondaryPhone: branch?.secondaryPhone || "",
    email: branch?.email || "",
    order: branch?.order ?? 0,
    isActive: branch?.isActive ?? true,
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        {mode === "create" ? (
          <Button size="sm"><IconPlus/> Add Branch</Button>
        ) : (
          <Button variant="outline" size="sm">Action</Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{mode === "create" ? "Add Branch" : "Edit Branch"}</DrawerTitle>
          <DrawerDescription>{mode === "create" ? "Create a new branch" : "Update branch details"}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <BranchForm
            defaults={defaults}
            submitLabel={mode === "create" ? "Create" : "Save"}
            onSubmit={(values) => mutation.mutate(values)}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild><Button variant="outline">Close</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default function BranchesTable() {
  const [search, setSearch] = React.useState("")
  const [onlyActive, setOnlyActive] = React.useState(false)
  const { data = [], isLoading } = useQuery<Branch[]>({
    queryKey: ["branches"],
    queryFn: getBranches,
  })
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBranch(id),
    onSuccess: () => {
      toast.success("Branch deleted")
      queryClient.invalidateQueries({ queryKey: ["branches"] })
    },
    onError: (err) => toast.error(err?.message || "Failed to delete"),
  })

  const filtered = data
    .filter((branch) => {
      if (onlyActive && !branch.isActive) return false
      if (search && !branch.name.toLowerCase().includes(search.toLowerCase()) && !(branch.city || "").toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 items-center">
          <Input placeholder="Search by name or city" value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
          <div className="flex items-center space-x-2">
            <Checkbox checked={onlyActive} onCheckedChange={(v) => setOnlyActive(!!v)} />
            <span className="text-sm text-muted-foreground">Active only</span>
          </div>
        </div>
        <BranchDrawer mode="create" />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">City</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Primary Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Secondary Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Order</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Active</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={8} className="py-8 text-center">Loading...</td></tr>
            ) : filtered.length ? filtered.map((branch) => (
              <tr key={branch.id} className="border-t">
                <td className="px-4 py-3 text-sm">{branch.name}</td>
                <td className="px-4 py-3 text-sm">{branch.city}</td>
                <td className="px-4 py-3 text-sm">{branch.primaryPhone}</td>
                <td className="px-4 py-3 text-sm">{branch.secondaryPhone}</td>
                <td className="px-4 py-3 text-sm">{branch.email}</td>
                <td className="px-4 py-3 text-sm">{branch.order}</td>
                <td className="px-4 py-3 text-sm">{branch.isActive ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <BranchDrawer mode="edit" branch={branch} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(branch.id)}
                    disabled={deleteMutation.isPending}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={8} className="py-8 text-center">No results.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
