"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactSettings, getContactSettings, updateContactSettings } from "@/lib/api/contactSettings";
import { toast } from "sonner";

const schema = z.object({
  mainEmail: z.string().email("Valid email required"),
  mainPhone: z.string().min(1, "Phone is required"),
  officeAddress: z.string().min(1, "Address is required"),
  facebookUrl: z.string().url().optional().or(z.literal("")).transform((v) => v || undefined),
  linkedinUrl: z.string().url().optional().or(z.literal("")).transform((v) => v || undefined),
  twitterUrl: z.string().url().optional().or(z.literal("")).transform((v) => v || undefined),
  instagramUrl: z.string().url().optional().or(z.literal("")).transform((v) => v || undefined),
  youtubeUrl: z.string().url().optional().or(z.literal("")).transform((v) => v || undefined),
  googleMapsEmbedUrl: z.string().url().optional().or(z.literal("")).transform((v) => v || undefined),
});

type FormValues = z.infer<typeof schema>;

export default function ContactSettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      mainEmail: "",
      mainPhone: "",
      officeAddress: "",
      facebookUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      instagramUrl: "",
      youtubeUrl: "",
      googleMapsEmbedUrl: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["contact-settings"],
    queryFn: getContactSettings,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        mainEmail: data.mainEmail,
        mainPhone: data.mainPhone,
        officeAddress: data.officeAddress,
        facebookUrl: data.facebookUrl || "",
        linkedinUrl: data.linkedinUrl || "",
        twitterUrl: data.twitterUrl || "",
        instagramUrl: data.instagramUrl || "",
        youtubeUrl: data.youtubeUrl || "",
        googleMapsEmbedUrl: data.googleMapsEmbedUrl || "",
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (values: ContactSettings) => updateContactSettings(values),
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({ queryKey: ["contact-settings"] });
      router.refresh();
    },
    onError: () => toast.error("Failed to update settings"),
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values as ContactSettings);
  };

  return (
    <div className="p-4 lg:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact & Social Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mainEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Email</FormLabel>
                        <FormControl>
                          <Input placeholder="customercare@ceybank.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mainPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+94 117 602000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="officeAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Address</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="No. 85, York Street, Colombo 01, Sri Lanka" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="facebookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitterUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://twitter.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagramUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="youtubeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://youtube.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="googleMapsEmbedUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Maps Embed URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.google.com/maps/embed?..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
