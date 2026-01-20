"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  deleteSnapshot,
  listSnapshots,
  EquitySnapshot,
} from "@/lib/api/equitySnapshots";
import { toast } from "sonner";
import { IconPlus } from "@tabler/icons-react";
import { getFunds } from "@/services/fundService";
import { Fund } from "@/types/fund";

export default function EquitySnapshotsPage() {
  const params = useParams<{ fundId: string }>();
  const fundId = params.fundId;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["eq-snapshots", fundId],
    queryFn: () => listSnapshots(fundId),
  });
  const { data: funds } = useQuery<Fund[]>({
    queryKey: ["funds"],
    queryFn: getFunds,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSnapshot(id),
    onSuccess: () => {
      toast.success("Snapshot deleted");
      queryClient.invalidateQueries({ queryKey: ["eq-snapshots", fundId] });
    },
    onError: () => toast.error("Failed to delete snapshot"),
  });

  const onDelete = (snapshot: EquitySnapshot) => {
    if (confirm("Delete this snapshot?")) {
      deleteMutation.mutate(snapshot.id);
    }
  };

  const fundName = useMemo(
    () => funds?.find((f) => String(f.id) === String(fundId))?.name ?? "Fund",
    [funds, fundId],
  );

  const formatDate = (value: string) =>
    new Date(value).toISOString().slice(0, 10);

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" type="button" onClick={() => router.back()}>
          ← Back
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{fundName}</h1>
        <Button asChild>
          <Link href={`/funds/${fundId}/snapshots/equity/create`}>
            <IconPlus className="mr-2 h-4 w-4" />
            Add New Snapshot
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Snapshots</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : !data || data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No snapshots yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">As of</th>
                    <th className="p-2">YTD CY</th>
                    <th className="p-2">1Y</th>
                    <th className="p-2">NAV</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((snap) => (
                    <tr key={snap.id} className="border-t">
                      <td className="p-2">
                        {formatDate(snap.asOfDate)}
                      </td>
                      <td className="p-2">{snap.ytdCY}</td>
                      <td className="p-2">{snap.oneYear}</td>
                      <td className="p-2">{snap.navMillions}</td>
                      <td className="p-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/funds/${fundId}/snapshots/equity/${snap.id}/edit`,
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(snap)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
