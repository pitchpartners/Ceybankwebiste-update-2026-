"use client"

import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getNewsById, updateNews, updateNewsStatus } from "@/services/newsService"
import { Button } from "@/components/ui/button"
import { NewsForm, NewsFormSubmit } from "./news-form"

export default function NewsEditForm({ newsId }: { newsId: string }) {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["admin-news", newsId],
    queryFn: () => getNewsById(newsId),
    enabled: !!newsId,
  })

  const updateMutation = useMutation({
    mutationFn: (payload: NewsFormSubmit) =>
      updateNews(
        newsId,
        {
          ...payload.values,
          coverImage: payload.coverImage || undefined,
          galleryFiles: payload.galleryFiles,
          existingImages: payload.existingImages,
          galleryOrder: payload.galleryOrder,
        },
        { galleryChanged: payload.galleryChanged },
      ),
    onSuccess: () => {
      toast.success("News updated")
      queryClient.invalidateQueries({ queryKey: ["admin-news"] })
      queryClient.invalidateQueries({ queryKey: ["admin-news", newsId] })
    },
    onError: (err) => toast.error(err?.message || "Failed to update news"),
  })

  const statusMutation = useMutation({
    mutationFn: (isActive: boolean) => updateNewsStatus(newsId, isActive),
    onSuccess: () => {
      toast.success("Status updated")
      queryClient.invalidateQueries({ queryKey: ["admin-news"] })
      queryClient.invalidateQueries({ queryKey: ["admin-news", newsId] })
    },
    onError: (err) => toast.error(err?.message || "Failed to update status"),
  })

  const handleSubmit = (payload: NewsFormSubmit) => {
    updateMutation.mutate(payload)
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Edit News</h1>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/news">Back</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Edit News</h1>
          <p className="text-sm text-muted-foreground">{data.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={data.isActive ? "secondary" : "default"}
            onClick={() => statusMutation.mutate(!data.isActive)}
            disabled={statusMutation.isPending}
          >
            {data.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/news">Back</Link>
          </Button>
        </div>
      </div>
      <NewsForm
        defaultValues={{
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          publishedAt: data.publishedAt,
          order: data.order,
          isActive: data.isActive,
        }}
        initialCoverUrl={data.coverImageUrl || data.coverImagePath || null}
        initialGallery={data.images || []}
        onSubmit={handleSubmit}
        submitting={updateMutation.isPending}
        submitLabel="Save changes"
      />
    </div>
  )
}
