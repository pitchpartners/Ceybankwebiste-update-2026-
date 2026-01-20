"use client"

import * as React from "react"
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember, TeamMemberInput } from "@/types/team"
import { teamMemberSchema } from "@/lib/validation-schema"
import { createTeamMember, getTeamMembers, updateTeamMember } from "@/services/teamMemberService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"
import { IconPlus } from "@tabler/icons-react"

const columns = ["Name", "Position", "Location", "Support Phone", "Support", "Active", "Actions"]

type FormValues = z.infer<typeof teamMemberSchema>

function getDefaults(item?: TeamMember): FormValues {
  return {
    name: item?.name ?? "",
    position: item?.position ?? "",
    shortTitle: item?.shortTitle ?? "",
    bio: item?.bio ?? "",
    category: item?.category ?? "support",
    order: item?.order ?? 0,
    location: item?.location ?? "",
    isSupportContact: item?.isSupportContact ?? true,
    supportPhone: item?.supportPhone ?? "",
    supportOrder: item?.supportOrder ?? item?.order ?? 0,
    isActive: item?.isActive ?? true,
  }
}

function SupportDrawer({ item, children }: { item?: TeamMember; children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()
  const [file, setFile] = React.useState<File | null>(null)
  const [open, setOpen] = React.useState(false)

  const defaults = React.useMemo(() => getDefaults(item), [item])

  const form = useForm<FormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: defaults,
  })

  React.useEffect(() => {
    form.reset(defaults)
    if (!open) {
      setFile(null)
    }
  }, [defaults, form, open])

  const mutation = useMutation({
    mutationFn: (payload: TeamMemberInput) => item ? updateTeamMember(item.id, payload) : createTeamMember(payload),
    onSuccess: () => {
      toast.success(item ? "Support contact updated" : "Support contact created")
      queryClient.invalidateQueries({ queryKey: ["team-members"] })
      if (!item) {
        form.reset(getDefaults())
        setFile(null)
      }
      setOpen(false)
    },
    onError: (err) => toast.error(err?.message || "Failed to save"),
  })

  const handleSubmit = (values: FormValues) => {
    const payload: TeamMemberInput = {
      ...values,
      shortTitle: values.shortTitle || null,
      location: values.location || null,
      isSupportContact: values.isSupportContact ?? true,
      supportOrder: values.supportOrder ?? values.order ?? 0,
      profileImage: file,
    }
    mutation.mutate(payload)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item ? "Edit support contact" : "Add support contact"}</DrawerTitle>
          <DrawerDescription>{item ? "Update support contact details" : "Create a new support contact"}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4 text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl><input type="hidden" {...field} value={field.value || "support"} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
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
                    <FormControl><Input {...field} /></FormControl>
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
                    <FormControl><Input {...field} /></FormControl>
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
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supportPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Phone</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>
                      <FormControl><Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
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
                      <FormControl><Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={4}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isSupportContact"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(!!value)} /></FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="!mt-0">Support Contact</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(!!value)} /></FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="!mt-0">Active</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormLabel>Profile Image</FormLabel>
                <div className="flex items-center gap-3">
                  <div className="relative size-16 overflow-hidden rounded-md border bg-muted/50">
                    {item?.profileImagePath ? (
                      <Image src={item.profileImagePath} alt={item.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground text-xs">No image</div>
                    )}
                  </div>
                  <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </div>
              </div>

              <DrawerFooter className="px-0">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Saving..." : "Save changes"}</Button>
                  <DrawerClose asChild><Button variant="outline" type="button">Close</Button></DrawerClose>
                </div>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function SupportTeamTable() {
  const [search, setSearch] = React.useState("")
  const [showOnlySupport, setShowOnlySupport] = React.useState(true)
  const [showOnlyActive, setShowOnlyActive] = React.useState(false)

  const { data = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["team-members"],
    queryFn: getTeamMembers,
  })

  const filtered = data.filter((member) => {
    if (showOnlySupport && !member.isSupportContact) return false;
    if (showOnlyActive && !member.isActive) return false;
    if (search && !member.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 items-center">
          <Input placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
          <div className="flex items-center space-x-2">
            <Checkbox checked={showOnlySupport} onCheckedChange={(v) => setShowOnlySupport(!!v)} />
            <span className="text-sm text-muted-foreground">Support only</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked={showOnlyActive} onCheckedChange={(v) => setShowOnlyActive(!!v)} />
            <span className="text-sm text-muted-foreground">Active only</span>
          </div>
        </div>
        <SupportDrawer>
          <Button size="sm"><IconPlus/> Add Support Contact</Button>
        </SupportDrawer>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={columns.length} className="text-center py-8">Loading...</td></tr>
            ) : filtered.length ? filtered.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-4 py-3 text-sm">{row.name}</td>
                <td className="px-4 py-3 text-sm">{row.position}</td>
                <td className="px-4 py-3 text-sm">{row.location}</td>
                <td className="px-4 py-3 text-sm">{row.supportPhone}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={row.isSupportContact ? "text-green-600" : "text-red-600"}>{row.isSupportContact ? "Yes" : "No"}</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={row.isActive ? "text-green-600" : "text-red-600"}>{row.isActive ? "Active" : "Inactive"}</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <SupportDrawer item={row}>
                    <Button variant="outline" size="sm">Action</Button>
                  </SupportDrawer>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={columns.length} className="text-center py-8">No results.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
