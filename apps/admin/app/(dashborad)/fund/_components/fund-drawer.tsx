"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CreateFundDto, Fund } from "@/types/fund";
import { createFund, updateFund } from "@/services/fundService";
import { createFundSchema } from "@/lib/validation-schema";
import { useIsMobile } from "@/hooks/use-mobile";

type FormValues = z.infer<typeof createFundSchema>;

const defaultValues: FormValues = {
  name: "",
  slug: "",
  code: "",
  category: "MONEY_MARKET",
  riskLevel: "",
  shortDescription: "",
  longDescription: "",
  order: 0,
  isActive: true,
};

function getDefaults(item?: Fund): FormValues {
  return {
    name: item?.name ?? "",
    slug: item?.slug ?? "",
    code: item?.code ?? "",
    category: item?.category ?? "MONEY_MARKET",
    riskLevel: item?.riskLevel ?? "",
    shortDescription: item?.shortDescription ?? "",
    longDescription: item?.longDescription ?? "",
    order: item?.order ?? 0,
    isActive: item?.isActive ?? true,
  };
}

export function FundDrawer({
  item,
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  item?: Fund;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(createFundSchema),
    defaultValues: item ? getDefaults(item) : defaultValues,
  });

  React.useEffect(() => {
    if (item) {
      form.reset(getDefaults(item));
    } else {
      form.reset(defaultValues);
    }
  }, [item, form, open]);

  const mutation = useMutation({
    mutationFn: (values: CreateFundDto) =>
      item ? updateFund(item.id, values) : createFund(values),
    onSuccess: () => {
      toast.success(item ? "Fund updated successfully" : "Fund created successfully");
      queryClient.invalidateQueries({ queryKey: ["funds"] });
      if (!item) {
        form.reset(defaultValues);
      }
      setOpen(false);
    },
    onError: (err) => toast.error(err?.message || "Failed to save fund"),
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction={isMobile ? "bottom" : "right"}>
      {children ? <DrawerTrigger asChild>{children}</DrawerTrigger> : null}
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item ? "Edit Fund" : "Add Fund"}</DrawerTitle>
          <DrawerDescription>{item ? "Update fund details" : "Create a new fund"}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4 text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Fund name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="fund-slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MONEY_MARKET">MONEY_MARKET</SelectItem>
                            <SelectItem value="EQUITY">EQUITY</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="riskLevel"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Risk Level</FormLabel>
                      <FormControl>
                        <Input placeholder="Low, Moderate, High..." {...field} />
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
                          min={0}
                          value={field.value ?? 0}
                          onChange={(event) =>
                            field.onChange(
                              Number.isNaN(event.target.valueAsNumber)
                                ? 0
                                : event.target.valueAsNumber,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="One paragraph summary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Long Description</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="Detailed description" {...field} />
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
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter className="px-0">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" type="button">
                      Close
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
