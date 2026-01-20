"use client"

import * as React from "react"
import Image from "next/image"
import { z } from "zod"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { TeamMember, TeamMemberInput } from "@/types/team"
import { teamMemberSchema } from "@/lib/validation-schema"
import { deleteTeamMember, updateTeamMember } from "@/services/teamMemberService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconPhoto } from "@tabler/icons-react"
import { useIsMobile } from "@/hooks/use-mobile"

const categories: Record<string, string> = {
  board: "Board of Directors",
  fund: "Fund Management Team",
  key: "Other Key Management",
}

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-12">{row.original.id}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        {row.original.shortTitle && <span className="text-xs text-muted-foreground">{row.original.shortTitle}</span>}
      </div>
    ),
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div>{row.original.position}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="text-sm text-muted-foreground">{categories[row.original.category] || row.original.category}</div>,
  },
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => <div>{row.original.order}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <span className={row.original.isActive ? "text-green-600" : "text-red-600"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <TeamActions item={row.original} />,
  },
]

type TeamFormValues = z.infer<typeof teamMemberSchema>

function TeamActions({ item }: { item: TeamMember }) {
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()
  const [file, setFile] = React.useState<File | null>(null)

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: item.name,
      position: item.position,
      shortTitle: item.shortTitle || "",
      bio: item.bio,
      category: item.category || "board",
      order: item.order ?? 0,
      location: item.location || "",
      isSupportContact: item.isSupportContact ?? false,
      supportPhone: item.supportPhone || "",
      supportOrder: item.supportOrder ?? item.order ?? 0,
      isActive: item.isActive,
    },
  })

  React.useEffect(() => {
    form.reset({
      name: item.name,
      position: item.position,
      shortTitle: item.shortTitle || "",
      bio: item.bio,
      category: item.category || "board",
      order: item.order ?? 0,
      location: item.location || "",
      isSupportContact: item.isSupportContact ?? false,
      supportPhone: item.supportPhone || "",
      supportOrder: item.supportOrder ?? item.order ?? 0,
      isActive: item.isActive,
    })
  }, [item, form])

  const updateMutation = useMutation({
    mutationFn: (payload: TeamMemberInput) => updateTeamMember(item.id, payload),
    onSuccess: () => {
      toast.success("Team member updated")
      queryClient.invalidateQueries({ queryKey: ["team-members"] })
    },
    onError: (err) => toast.error(err?.message || "Failed to update team member"),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteTeamMember(item.id),
    onSuccess: () => {
      toast.success("Team member deleted")
      queryClient.invalidateQueries({ queryKey: ["team-members"] })
    },
    onError: (err) => toast.error(err?.message || "Failed to delete team member"),
  })

  const onSubmit = (values: TeamFormValues) => {
    const payload: TeamMemberInput = {
      ...values,
      shortTitle: values.shortTitle || null,
      location: values.location || null,
      isSupportContact: values.isSupportContact ?? false,
      supportOrder: values.supportOrder ?? values.order ?? 0,
      profileImage: file,
    }
    updateMutation.mutate(payload)
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>Edit team member</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4 text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="board">Board of Directors</SelectItem>
                        <SelectItem value="fund">Fund Management Team</SelectItem>
                        <SelectItem value="key">Other Key Management</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supportOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={5}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="isSupportContact"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(!!value)} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="!mt-0">Support Contact</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supportPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(!!value)} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="!mt-0">Active</FormLabel>
                      <p className="text-sm text-muted-foreground">Toggle visibility on the portfolio.</p>
                    </div>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex items-center gap-3">
                  <div className="relative size-16 overflow-hidden rounded-md border bg-muted/50">
                    {item.profileImagePath ? (
                      <Image src={item.profileImagePath} alt={item.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <IconPhoto size={20} />
                      </div>
                    )}
                  </div>
                  <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </div>
                {file && <p className="text-xs text-muted-foreground line-clamp-1">{file.name}</p>}
              </div>

              <DrawerFooter className="px-0">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button type="submit" className="flex-1" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Saving..." : "Save changes"}
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
                <DrawerClose asChild>
                  <Button variant="outline">Done</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
