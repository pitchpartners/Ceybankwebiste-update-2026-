"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getNews, softDeleteNews, updateNewsStatus } from "@/services/newsService"
import { NewsPost } from "@/types/news"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconPencil, IconPlus, IconTrash, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react"

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

export default function NewsTable() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all")
  const [search, setSearch] = useState("")

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-news", { page, limit, status, search }],
    queryFn: () => getNews({ page, limit, status, q: search || undefined }),
    placeholderData: (prev) => prev,
  })

  const toggleStatus = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => updateNewsStatus(id, isActive),
    onSuccess: () => {
      toast.success("Status updated")
      queryClient.invalidateQueries({ queryKey: ["admin-news"] })
    },
    onError: (err) => toast.error(err?.message || "Failed to update status"),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => softDeleteNews(id),
    onSuccess: () => {
      toast.success("News archived")
      queryClient.invalidateQueries({ queryKey: ["admin-news"] })
    },
    onError: (err) => toast.error(err?.message || "Failed to archive news"),
  })

  const items = data?.items || []
  const pagination = data?.pagination
  const totalPages = pagination?.totalPages ?? 0
  const hasNextPage = totalPages ? page < totalPages : false

  const statusLabel = useMemo(
    () => ({
      active: "Active",
      inactive: "Inactive",
    }),
    [],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Search title or slug..."
            value={search}
            onChange={(e) => {
              setPage(1)
              setSearch(e.target.value)
            }}
            className="max-w-xs"
          />
          <Select
            value={status}
            onValueChange={(value) => {
              setPage(1)
              setStatus(value as typeof status)
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/news/create">
            <IconPlus />
            <span className="hidden sm:inline">Create News</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : items.length ? (
              items.map((item: NewsPost) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-2">{item.excerpt}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.slug}</TableCell>
                  <TableCell className="text-sm">{formatDate(item.publishedAt)}</TableCell>
                  <TableCell>
                    <span className={item.isActive ? "text-green-600" : "text-red-600"}>
                      {item.isActive ? statusLabel.active : statusLabel.inactive}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/news/${item.id}/edit`}>
                        <IconPencil size={16} />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleStatus.mutate({ id: item.id, isActive: !item.isActive })}
                      disabled={toggleStatus.isPending}
                    >
                      {item.isActive ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                      {item.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(item.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <IconTrash size={16} />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No news found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {pagination?.page ?? 1} of {totalPages || 1} {isFetching ? "(updating...)" : ""}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (hasNextPage) {
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
            }}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
