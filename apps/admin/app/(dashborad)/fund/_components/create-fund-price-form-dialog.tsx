"use client"

import { z } from "zod"
import { toast } from "sonner"
import { Fund } from "@/types/fund"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { getFunds } from "@/services/fundService"
import { DialogProps } from "@radix-ui/react-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFundPrice } from "@/services/fundPriceService"
import { createFundPriceSchema } from "@/lib/validation-schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"

type CreateFundPriceForm = z.infer<typeof createFundPriceSchema>

export default function CreateFundPriceDialogForm({ open, onOpenChange }: DialogProps) {
    const queryClient = useQueryClient()
    // 1️⃣ Try to get cached funds first
    const cachedFunds = queryClient.getQueryData<Fund[]>(["funds", "fund"])

    // 2️⃣ Fetch funds only if cache is empty
    const { data: fetchedFunds } = useQuery<Fund[]>({
        queryKey: ["funds", "fund"],
        queryFn: getFunds,
        enabled: !cachedFunds
    })

    const funds = cachedFunds || fetchedFunds || []
    // 2. React Hook Form
    const form = useForm<CreateFundPriceForm>({
        resolver: zodResolver(createFundPriceSchema),
        defaultValues: {
            fundId: "",
            bidPrice: 0,
            offerPrice: 0,
            date: "",
        },
    })

    // 3. Mutation
    const createFundPriceMutation = useMutation({
        mutationFn: (data: CreateFundPriceForm) => createFundPrice(data),
        onSuccess: () => {
            toast.success("Fund price added successfully")
            queryClient.invalidateQueries({ queryKey: ["funds", "fund-price"] })
            onOpenChange?.(false)
            form.reset()
        },
        onError: (err) => toast.error(err?.message || "Failed to add fund price"),
    })

    const onSubmit = (values: CreateFundPriceForm) => {
        createFundPriceMutation.mutate(values)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <IconPlus />
                    <span className="hidden lg:inline">Add Fund Price</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Fund Price</DialogTitle>
                    <DialogDescription>Enter fund price details below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="fundId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fund</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a fund" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {funds?.map((fund) => (
                                                <SelectItem key={fund.id} value={fund.id.toString()}>
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
                            name="bidPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bid Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Bid price" {...field} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="offerPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Offer Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Offer price" {...field} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
