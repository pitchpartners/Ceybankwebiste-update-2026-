"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { newsSchema } from "@/lib/validation-schema"
import { NewsImage } from "@/types/news"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IconChevronDown, IconChevronUp, IconPhoto, IconTrash } from "@tabler/icons-react"

type NewsFormValues = z.infer<typeof newsSchema>

type GalleryItem = {
  key: string
  id?: string
  file?: File
  preview: string
  isNew: boolean
}

export type NewsFormSubmit = {
  values: NewsFormValues
  coverImage: File | null
  galleryFiles: File[]
  existingImages: { id: string; order: number }[]
  galleryOrder: number[]
  galleryChanged: boolean
}

type NewsFormProps = {
  defaultValues?: Partial<NewsFormValues>
  initialCoverUrl?: string | null
  initialGallery?: NewsImage[]
  submitting?: boolean
  submitLabel?: string
  onSubmit: (payload: NewsFormSubmit) => void
}

const formatDateInput = (value?: string) => {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

const buildInitialGallery = (images?: NewsImage[]): GalleryItem[] => {
  if (!images?.length) return []
  return [...images]
    .sort((a, b) => a.order - b.order)
    .map((img) => ({
      key: img.id,
      id: img.id,
      preview: img.imageUrl || img.imagePath || "",
      isNew: false,
    }))
}

export function NewsForm({
  defaultValues,
  initialCoverUrl,
  initialGallery,
  submitting,
  submitLabel = "Save",
  onSubmit,
}: NewsFormProps) {
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      excerpt: defaultValues?.excerpt || "",
      content: defaultValues?.content || "",
      publishedAt: formatDateInput(defaultValues?.publishedAt) || "",
      order: defaultValues?.order ?? 0,
      isActive: defaultValues?.isActive ?? true,
    },
  })

  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(initialCoverUrl || null)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => buildInitialGallery(initialGallery))
  const [galleryChanged, setGalleryChanged] = useState(false)

  useEffect(() => {
    form.reset({
      title: defaultValues?.title || "",
      excerpt: defaultValues?.excerpt || "",
      content: defaultValues?.content || "",
      publishedAt: formatDateInput(defaultValues?.publishedAt) || "",
      order: defaultValues?.order ?? 0,
      isActive: defaultValues?.isActive ?? true,
    })
    setGalleryItems(buildInitialGallery(initialGallery))
    setGalleryChanged(false)
    setCoverFile(null)
    setCoverPreview(initialCoverUrl || null)
  }, [defaultValues, form, initialCoverUrl, initialGallery])

  const handleCoverChange = (file: File | null) => {
    setCoverFile(file)
    if (file) {
      setCoverPreview(URL.createObjectURL(file))
    } else {
      setCoverPreview(initialCoverUrl || null)
    }
  }

  const addGalleryFiles = (files: FileList | null) => {
    if (!files?.length) return
    const newItems: GalleryItem[] = Array.from(files).map((file) => ({
      key: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    }))
    setGalleryItems((prev) => [...prev, ...newItems])
    setGalleryChanged(true)
  }

  const moveItem = (index: number, direction: number) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= galleryItems.length) return
    setGalleryItems((prev) => {
      const next = [...prev]
      const temp = next[index]
      next[index] = next[newIndex]
      next[newIndex] = temp
      return next
    })
    setGalleryChanged(true)
  }

  const removeItem = (index: number) => {
    setGalleryItems((prev) => prev.filter((_, i) => i !== index))
    setGalleryChanged(true)
  }

  const onSubmitForm = (values: NewsFormValues) => {
    const galleryFiles: File[] = []
    const galleryOrder: number[] = []
    const existingImages: { id: string; order: number }[] = []

    galleryItems.forEach((item, index) => {
      if (item.isNew && item.file) {
        galleryFiles.push(item.file)
        galleryOrder.push(index)
      } else if (!item.isNew && item.id) {
        existingImages.push({ id: item.id, order: index })
      }
    })

    const includeGallery = galleryChanged || galleryFiles.length > 0
    const publishedAtIso = values.publishedAt ? new Date(values.publishedAt).toISOString() : values.publishedAt

    onSubmit({
      values: { ...values, publishedAt: publishedAtIso },
      coverImage: coverFile,
      galleryFiles,
      existingImages: includeGallery ? existingImages : [],
      galleryOrder: includeGallery ? galleryOrder : [],
      galleryChanged: includeGallery,
    })
  }

  const coverFallback = (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      <IconPhoto size={20} />
    </div>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="News title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published At</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
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
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <p className="text-sm text-muted-foreground">Controls visibility on the website.</p>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Short summary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Full content"
                  className="min-h-[160px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <FormLabel>Cover Image</FormLabel>
            <div className="flex items-center gap-3">
              <div className="relative h-20 w-28 overflow-hidden rounded-md border bg-muted/40">
                {coverPreview ? <img src={coverPreview} alt="Cover" className="h-full w-full object-cover" /> : coverFallback}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleCoverChange(e.target.files?.[0] || null)}
              />
            </div>
            {coverFile && <p className="text-xs text-muted-foreground line-clamp-1">{coverFile.name}</p>}
          </div>

          <div className="space-y-3">
            <FormLabel>Gallery Images</FormLabel>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => addGalleryFiles(e.target.files)}
            />
            {galleryItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {galleryItems.map((item, index) => (
                  <div
                    key={item.key}
                    className="flex items-center gap-3 rounded-md border p-2"
                  >
                    <div className="relative h-16 w-24 overflow-hidden rounded bg-muted/50">
                      {item.preview ? (
                        <img src={item.preview} alt="Gallery" className="h-full w-full object-cover" />
                      ) : (
                        coverFallback
                      )}
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-2">
                      <div className="flex flex-col text-xs text-muted-foreground">
                        <span>{item.isNew ? "New" : "Existing"}</span>
                        <span>Order: {index + 1}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => moveItem(index, -1)}
                          disabled={index === 0}
                          aria-label="Move up"
                        >
                          <IconChevronUp size={16} />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => moveItem(index, 1)}
                          disabled={index === galleryItems.length - 1}
                          aria-label="Move down"
                        >
                          <IconChevronDown size={16} />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => removeItem(index)}
                          aria-label="Remove"
                        >
                          <IconTrash size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No gallery images added.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}
