"use client"

import { z } from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { teamMemberSchema } from "@/lib/validation-schema"
import { TeamMemberInput } from "@/types/team"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTeamMember } from "@/services/teamMemberService"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useIsMobile } from "@/hooks/use-mobile"
import { IconPlus } from "@tabler/icons-react"

type TeamFormValues = z.infer<typeof teamMemberSchema>

export default function TeamMemberDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      position: "",
      shortTitle: "",
      bio: "",
      category: "board",
      order: 0,
      location: "",
      isSupportContact: false,
      supportPhone: "",
      supportOrder: 0,
      isActive: true,
    },
  })

  const mutation = useMutation({
    mutationFn: (payload: TeamMemberInput) => createTeamMember(payload),
    onSuccess: () => {
      toast.success("Team member created")
      queryClient.invalidateQueries({ queryKey: ["team-members"] })
      form.reset()
      setFile(null)
      onOpenChange(false)
    },
    onError: (err) => toast.error(err?.message || "Failed to create team member"),
  })

  const onSubmit = (values: TeamFormValues) => {
    mutation.mutate({
      ...values,
      shortTitle: values.shortTitle || null,
      profileImage: file,
      location: values.location || null,
      isSupportContact: values.isSupportContact ?? false,
      supportOrder: values.supportOrder ?? values.order ?? 0,
    })
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Team Member</span>
          <span className="lg:hidden">Add</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[540px] ml-auto">
        <DrawerHeader>
          <DrawerTitle>Add Team Member</DrawerTitle>
          <DrawerDescription>Fill in details to add a new member.</DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 overflow-y-auto px-4 pb-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
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
                    <Input placeholder="Position" {...field} />
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
                    <Input placeholder="Short title" {...field} />
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
                    <Input placeholder="City or location" {...field} />
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
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(!!value)} />
                    <FormLabel className="!mt-0">Support Contact</FormLabel>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="supportPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+94..." {...field} />
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
                <div className="flex items-center space-x-2">
                  <Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(!!value)} />
                  <FormLabel className="!mt-0">Active</FormLabel>
                </div>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Profile Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file && <p className="text-xs text-muted-foreground line-clamp-1">{file.name}</p>}
            </div>

            <DrawerFooter className="px-0">
              <div className="flex flex-col gap-2 sm:flex-row">
                <DrawerClose asChild>
                  <Button variant="outline" type="button">Cancel</Button>
                </DrawerClose>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
