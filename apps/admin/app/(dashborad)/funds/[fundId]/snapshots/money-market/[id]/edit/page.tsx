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
import {
  getSnapshot,
  updateSnapshot,
} from "@/lib/api/moneyMarketSnapshots";
import { toast } from "sonner";

const schema = z.object({
  asOfDate: z.string().min(1, "Required"),
  commentary: z.string().min(1, "Required"),
  ytdReturn: z.coerce.number(),
  oneMonthAnn: z.coerce.number(),
  threeMonthAnn: z.coerce.number(),
  currentYield: z.coerce.number(),
  weightedMaturityMonths: z.coerce.number(),
  weightedRating: z.string().min(1, "Required"),
  fundSizeMillions: z.coerce.number(),
  unitPrice: z.coerce.number(),
  unitHolders: z.coerce.number().int(),
  creditProfile: z
    .array(z.object({ label: z.string(), value: z.coerce.number() }))
    .default([]),
  assetAllocation: z
    .array(z.object({ label: z.string(), value: z.coerce.number() }))
    .default([]),
});

type FormValues = z.infer<typeof schema>;

export default function EditMoneyMarketSnapshotPage() {
  const params = useParams<{ fundId: string; id: string }>();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      creditProfile: [],
      assetAllocation: [],
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["mm-snapshot", params.id],
    queryFn: () => getSnapshot(params.id),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        asOfDate: data.asOfDate.slice(0, 10),
        commentary: data.commentary,
        ytdReturn: data.ytdReturn,
        oneMonthAnn: data.oneMonthAnn,
        threeMonthAnn: data.threeMonthAnn,
        currentYield: data.currentYield,
        weightedMaturityMonths: data.weightedMaturityMonths,
        weightedRating: data.weightedRating,
        fundSizeMillions: data.fundSizeMillions,
        unitPrice: data.unitPrice,
        unitHolders: data.unitHolders,
        creditProfile: data.creditProfileJson ?? [],
        assetAllocation: data.assetAllocationJson ?? [],
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) => updateSnapshot(params.id, values),
    onSuccess: () => {
      toast.success("Snapshot updated");
      router.push(`/funds/${params.fundId}/snapshots/money-market`);
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
      <SnapshotFormLayout title="Edit Money Market Snapshot">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>As of Date</Label>
              <Input type="date" {...form.register("asOfDate")} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Commentary</Label>
              <Input {...form.register("commentary")} />
            </div>
            <div className="space-y-2">
              <Label>YTD Return</Label>
              <Input type="number" step="any" {...form.register("ytdReturn", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>1 Month Annualized</Label>
              <Input type="number" step="any" {...form.register("oneMonthAnn", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>3 Month Annualized</Label>
              <Input type="number" step="any" {...form.register("threeMonthAnn", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Current Yield</Label>
              <Input type="number" step="any" {...form.register("currentYield", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Weighted Maturity (months)</Label>
              <Input type="number" step="any" {...form.register("weightedMaturityMonths", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Weighted Rating</Label>
              <Input {...form.register("weightedRating")} />
            </div>
            <div className="space-y-2">
              <Label>Fund Size (mn)</Label>
              <Input type="number" step="any" {...form.register("fundSizeMillions", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Unit Price</Label>
              <Input type="number" step="any" {...form.register("unitPrice", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Unit Holders</Label>
              <Input type="number" {...form.register("unitHolders", { valueAsNumber: true })} />
            </div>
          </div>

          <PieChartEditor
            control={form.control}
            register={form.register}
            name="creditProfile"
            title="Credit Profile"
          />
          <PieChartEditor
            control={form.control}
            register={form.register}
            name="assetAllocation"
            title="Asset Allocation"
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
