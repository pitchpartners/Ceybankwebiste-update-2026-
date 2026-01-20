"use client"

import * as React from "react"
import { z } from "zod"
import { toast } from "sonner"
import { Fund } from "@/types/fund"
import { Input } from "@/components/ui/input"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { getFunds } from "@/services/fundService"
import { DialogProps } from "@radix-ui/react-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { addTodayFundPrice } from "@/services/fundPriceService"
import { addTodayFundPriceSchema } from "@/lib/validation-schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"

type AddTodayFundPriceForm = z.infer<typeof addTodayFundPriceSchema>

export default function AddTodayCreateFundPriceDrawerForm({ open, onOpenChange }: DialogProps) {
    const isMobile = useIsMobile()
    const queryClient = useQueryClient()
    // 1️⃣ Try to get cached funds first
    const cachedFunds = queryClient.getQueryData<Fund[]>(["funds", "fund"])

    // 2️⃣ Fetch funds only if cache is empty
    const { data: fetchedFunds } = useQuery<Fund[]>({
        queryKey: ["funds", "fund"],
        queryFn: getFunds,
        enabled: !cachedFunds
    })

    const funds = React.useMemo(() => cachedFunds || fetchedFunds || [], [cachedFunds, fetchedFunds])
    // 2. React Hook Form
    const form = useForm<AddTodayFundPriceForm>({
        resolver: zodResolver(addTodayFundPriceSchema),
        defaultValues: {
            prices: funds.map(({ id }) => ({ fundId: String(id), bidPrice: 0, offerPrice: 0 }))
        },
    })

    React.useEffect(() => {
        if (funds.length) {
            form.reset({
                prices: funds.map(({ id }) => ({ fundId: String(id), bidPrice: 0, offerPrice: 0 }))
            })
        }
    }, [funds, form])

    const { fields } = useFieldArray({
        control: form.control,
        name: "prices",
    })

    // 3. Mutation
    const createFundPriceMutation = useMutation({
        mutationFn: (data: AddTodayFundPriceForm) => addTodayFundPrice(data),
        onSuccess: () => {
            toast.success("Fund price added successfully")
            queryClient.invalidateQueries({ queryKey: ["funds", "fund-price"] })
            onOpenChange?.(false)
            form.reset()
        },
        onError: (err) => toast.error(err?.message || "Failed to add fund price"),
    })

    const onSubmit = (values: AddTodayFundPriceForm) => {
        createFundPriceMutation.mutate(values)
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button size="sm">
                    <IconPlus />
                    <span className="hidden lg:inline">Add Today Fund Prices</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add Toady Fund Price</DrawerTitle>
                    <DrawerDescription>Enter today&apos;s bid and offer prices for each fund.</DrawerDescription>
                </DrawerHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 overflow-y-auto px-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 gap-4 items-end">
                                <p className="font-semibold text-sm text-muted-foreground">{funds.find((f) => f.id === field.fundId)?.name}</p>
                                <div className="flex flex-col gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`prices.${index}.bidPrice`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bid Price</FormLabel>
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
                                        name={`prices.${index}.offerPrice`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Offer Price</FormLabel>
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
                                </div>
                            </div>
                        ))}
                        <DrawerFooter className="pt-2 px-0">
                            <Button type="submit">Add Prices</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    )
}
