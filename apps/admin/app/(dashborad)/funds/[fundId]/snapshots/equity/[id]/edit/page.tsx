"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SnapshotFormLayout } from "@/components/fund-snapshots/SnapshotFormLayout";
import { PieChartEditor } from "@/components/fund-snapshots/PieChartEditor";
import { TopHoldingsEditor } from "@/components/fund-snapshots/TopHoldingsEditor";
import { getSnapshot, updateSnapshot } from "@/lib/api/equitySnapshots";
import { toast } from "sonner";

const schema = z.object({
  asOfDate: z.string().min(1, "Required"),
  ytdCY: z.coerce.number(),
  ytdFY: z.coerce.number().optional().nullable(),
  threeMonths: z.coerce.number(),
  sixMonths: z.coerce.number(),
  oneYear: z.coerce.number(),
  threeYears: z.coerce.number(),
  fiveYears: z.coerce.number(),
  tenYears: z.coerce.number(),
  fifteenYears: z.coerce.number(),
  twentyYears: z.coerce.number(),
  cvFund: z.coerce.number(),
  cvMarket: z.coerce.number(),
  beta: z.coerce.number(),
  rSq: z.coerce.number(),
  navMillions: z.coerce.number(),
  sectorAllocation: z
    .array(z.object({ label: z.string(), value: z.coerce.number() }))
    .default([]),
  topHoldings: z
    .array(
      z.object({
        name: z.string(),
        weight: z.coerce.number().optional().nullable(),
      }),
    )
    .default([]),
});

type FormValues = z.infer<typeof schema>;

export default function EditEquitySnapshotPage() {
  const params = useParams<{ fundId: string; id: string }>();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      sectorAllocation: [],
      topHoldings: [],
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["eq-snapshot", params.id],
    queryFn: () => getSnapshot(params.id),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        asOfDate: data.asOfDate.slice(0, 10),
        ytdCY: data.ytdCY,
        ytdFY: data.ytdFY ?? undefined,
        threeMonths: data.threeMonths,
        sixMonths: data.sixMonths,
        oneYear: data.oneYear,
        threeYears: data.threeYears,
        fiveYears: data.fiveYears,
        tenYears: data.tenYears,
        fifteenYears: data.fifteenYears,
        twentyYears: data.twentyYears,
        cvFund: data.cvFund,
        cvMarket: data.cvMarket,
        beta: data.beta,
        rSq: data.rSq,
        navMillions: data.navMillions,
        sectorAllocation: data.sectorAllocationJson ?? [],
        topHoldings: data.topHoldingsJson ?? [],
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) => updateSnapshot(params.id, values),
    onSuccess: () => {
      toast.success("Snapshot updated");
      router.push(`/funds/${params.fundId}/snapshots/equity`);
    },
    onError: () => toast.error("Failed to update snapshot"),
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <Button variant="ghost" type="button" onClick={() => router.back()}>
        ← Back
      </Button>
      <SnapshotFormLayout title="Edit Equity Snapshot">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>As of Date</Label>
              <Input type="date" {...form.register("asOfDate")} />
            </div>
            <div className="space-y-2">
              <Label>YTD CY</Label>
              <Input type="number" step="any" {...form.register("ytdCY", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>YTD FY</Label>
              <Input type="number" step="any" {...form.register("ytdFY", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>3 Months</Label>
              <Input type="number" step="any" {...form.register("threeMonths", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>6 Months</Label>
              <Input type="number" step="any" {...form.register("sixMonths", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>1 Year</Label>
              <Input type="number" step="any" {...form.register("oneYear", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>3 Years</Label>
              <Input type="number" step="any" {...form.register("threeYears", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>5 Years</Label>
              <Input type="number" step="any" {...form.register("fiveYears", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>10 Years</Label>
              <Input type="number" step="any" {...form.register("tenYears", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>15 Years</Label>
              <Input type="number" step="any" {...form.register("fifteenYears", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>20 Years</Label>
              <Input type="number" step="any" {...form.register("twentyYears", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>CV Fund</Label>
              <Input type="number" step="any" {...form.register("cvFund", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>CV Market</Label>
              <Input type="number" step="any" {...form.register("cvMarket", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Beta</Label>
              <Input type="number" step="any" {...form.register("beta", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>R-Squared</Label>
              <Input type="number" step="any" {...form.register("rSq", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>NAV (mn)</Label>
              <Input type="number" step="any" {...form.register("navMillions", { valueAsNumber: true })} />
            </div>
          </div>

          <PieChartEditor
            control={form.control}
            register={form.register}
            name="sectorAllocation"
            title="Sector Allocation"
          />
          <TopHoldingsEditor
            control={form.control}
            register={form.register}
            name="topHoldings"
          />

          <div className="flex gap-3">
            <Button type="submit" disabled={mutation.isPending}>
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </SnapshotFormLayout>
    </div>
  );
}
