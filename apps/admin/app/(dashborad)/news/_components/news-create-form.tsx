"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createNews } from "@/services/newsService"
import { Button } from "@/components/ui/button"
import { NewsForm, NewsFormSubmit } from "./news-form"

export default function NewsCreateForm() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: NewsFormSubmit) =>
      createNews({
        ...payload.values,
        coverImage: payload.coverImage || undefined,
        galleryFiles: payload.galleryFiles,
        existingImages: payload.existingImages,
        galleryOrder: payload.galleryOrder,
      }),
    onSuccess: () => {
      toast.success("News created")
      queryClient.invalidateQueries({ queryKey: ["admin-news"] })
      router.push("/news")
    },
    onError: (err) => toast.error(err?.message || "Failed to create news"),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Create News</h1>
          <p className="text-sm text-muted-foreground">Add a new news post.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/news">Back</Link>
        </Button>
      </div>
      <NewsForm onSubmit={(payload) => mutation.mutate(payload)} submitting={mutation.isPending} submitLabel="Create" />
    </div>
  )
}
