"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Fund } from "@/types/fund"
import { FundReport, FundReportType } from "@/types/report"
import { getFunds } from "@/services/fundService"
import { createFundReport, deleteFundReport, getFundReports, updateFundReport } from "@/services/fundReportService"
import { fundReportSchema } from "@/lib/validation-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { toast } from "sonner"
import { IconPlus } from "@tabler/icons-react"
import { useIsMobile } from "@/hooks/use-mobile"

type FormValues = z.infer<typeof fundReportSchema>

const typeOptions: { value: FundReportType; label: string }[] = [
  { value: "ANNUAL", label: "Annual" },
  { value: "INTERIM", label: "Interim" },
]

function FundReportDrawer({
  mode,
  report,
  funds,
}: {
  mode: "create" | "edit"
  report?: FundReport
  funds: Fund[]
}) {
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()
  const [file, setFile] = React.useState<File | null>(null)
  const [open, setOpen] = React.useState(false)
  const noFunds = !funds.length

  const defaults: FormValues = React.useMemo(() => ({
    fundId: (report?.fundId ?? funds[0]?.id ?? "").toString(),
    title: report?.title ?? "",
    year: report?.year ?? new Date().getFullYear(),
    periodLabel: report?.periodLabel ?? "",
    type: report?.type ?? "ANNUAL",
    publishedAt: report?.publishedAt?.slice(0, 10) ?? "",
    isActive: report?.isActive ?? true,
    order: report?.order ?? 0,
  }), [report, funds])

  const form = useForm<FormValues>({
    resolver: zodResolver(fundReportSchema),
    defaultValues: defaults,
  })

  React.useEffect(() => {
    form.reset(defaults)
    if (!open) setFile(null)
  }, [defaults, form, open])

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      if (mode === "create" && !file) {
        toast.error("Please attach the PDF report")
        return Promise.reject()
      }
      const payload = {
        ...values,
        periodLabel: values.periodLabel || null,
        publishedAt: values.publishedAt || null,
        file: file || undefined,
      }
      return mode === "create"
        ? createFundReport(payload)
        : updateFundReport(report!.id, payload)
    },
    onSuccess: () => {
      toast.success(mode === "create" ? "Report created" : "Report updated")
      queryClient.invalidateQueries({ queryKey: ["fund-reports"] })
      if (mode === "create") {
        form.reset(defaults)
        setFile(null)
      }
      setOpen(false)
    },
    onError: (err) => {
      if (err) toast.error(err?.message || "Failed to save report")
    },
  })

  return (
    <Drawer open={open} onOpenChange={setOpen} direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        {mode === "create" ? (
          <Button size="sm" disabled={noFunds}><IconPlus/> Add Report</Button>
        ) : (
          <Button variant="outline" size="sm">Action</Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{mode === "create" ? "Add Fund Report" : "Edit Fund Report"}</DrawerTitle>
          <DrawerDescription>{mode === "create" ? "Upload a new fund report PDF" : "Update report details or replace the PDF"}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
              <FormField
                control={form.control}
                name="fundId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fund</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fund" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {funds.map((fund) => (
                          <SelectItem key={fund.id} value={String(fund.id)}>
                            {fund.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl><Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="periodLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period Label</FormLabel>
                      <FormControl><Input placeholder="e.g. 2023/2024 or Q1 2024" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Published Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
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
                      <FormControl><Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
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
                <FormLabel>Report PDF</FormLabel>
                <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                {mode === "edit" && report?.filePath && (
                  <p className="text-xs text-muted-foreground">
                    Current file: <a className="text-primary underline" href={report.filePath} target="_blank" rel="noreferrer">Open</a>
                  </p>
                )}
                {file && <p className="text-xs text-muted-foreground line-clamp-1">{file.name}</p>}
              </div>
              <DrawerFooter className="px-0">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function FundReportsTable() {
  const [selectedType, setSelectedType] = React.useState<FundReportType>("ANNUAL")
  const [fundId, setFundId] = React.useState<string | undefined>(undefined)
  const [year, setYear] = React.useState<number | undefined>(undefined)
  const [page, setPage] = React.useState(1)
  const [activeFilter, setActiveFilter] = React.useState<"active" | "all">("active")

  const { data: funds = [] } = useQuery<Fund[]>({
    queryKey: ["funds"],
    queryFn: getFunds,
  })

  const { data, isLoading } = useQuery({
    queryKey: ["fund-reports", { selectedType, fundId, year, page, activeFilter }],
    queryFn: () =>
      getFundReports({
        type: selectedType,
        fundId,
        year,
        page,
        isActive: activeFilter === "active" ? true : undefined,
      }),
    placeholderData: (previousData) => previousData,
  })

  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFundReport(id),
    onSuccess: () => {
      toast.success("Report deleted")
      queryClient.invalidateQueries({ queryKey: ["fund-reports"] })
    },
    onError: (err) => toast.error(err?.message || "Failed to delete report"),
  })

  const reports = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={selectedType} onValueChange={(v: FundReportType) => { setSelectedType(v); setPage(1); }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={fundId ? String(fundId) : "all"} onValueChange={(val) => { setFundId(val === "all" ? undefined : val); setPage(1); }}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Fund" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Funds</SelectItem>
              {funds.map((fund) => (
                <SelectItem key={fund.id} value={String(fund.id)}>{fund.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Year"
            className="w-28"
            type="number"
            value={year ?? ""}
            onChange={(e) => { const val = e.target.value ? Number(e.target.value) : undefined; setYear(val); setPage(1); }}
          />
          <div className="flex items-center space-x-2">
            <Checkbox checked={activeFilter === "active"} onCheckedChange={(v) => setActiveFilter(v ? "active" : "all")} />
            <span className="text-sm text-muted-foreground">Active only</span>
          </div>
        </div>
        <FundReportDrawer mode="create" funds={funds} />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Fund</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Year</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Published</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Active</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7} className="py-8 text-center">Loading...</td></tr>
            ) : reports.length ? reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="px-4 py-3 text-sm">{report.fund?.name}</td>
                <td className="px-4 py-3 text-sm">{report.type === "ANNUAL" ? "Annual" : "Interim"}</td>
                <td className="px-4 py-3 text-sm">{report.title}</td>
                <td className="px-4 py-3 text-sm">{report.year}</td>
                <td className="px-4 py-3 text-sm">{report.publishedAt ? new Date(report.publishedAt).toLocaleDateString() : "-"}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={report.isActive ? "text-green-600" : "text-red-600"}>
                    {report.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <FundReportDrawer mode="edit" report={report} funds={funds} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(report.id)}
                    disabled={deleteMutation.isPending}
                  >
                    Delete
                  </Button>
                  {report.filePath && (
                    <Button asChild size="sm" variant="secondary">
                      <a href={report.filePath} target="_blank" rel="noreferrer">Open</a>
                    </Button>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={7} className="py-8 text-center">No reports found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing page {data?.page ?? 1} of {data?.totalPages ?? 1} ({data?.total ?? 0} total)
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={(data?.page ?? 1) <= 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Previous</Button>
          <Button variant="outline" size="sm" disabled={(data?.page ?? 1) >= (data?.totalPages ?? 1)} onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        </div>
      </div>
    </div>
  )
}
