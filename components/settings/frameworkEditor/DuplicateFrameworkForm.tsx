'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFramework, updateFramework } from "@/lib/settings/frameworkEditor/action";
import { frameworkEditorformSchema } from "@/schemas/frameworkEditorFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface FormFields {
  name: string;
  description: string;
  framework_type: string;
  version: string;
  reporting_year: string;
  status: string;
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface UpdateFrameworkFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  frameworkData: FormFields; // This will be passed as the framework data to update
}

export default function DuplicateFrameworkEditorForm({
  open,
  setOpen,
  userId,
  frameworkData,
}: UpdateFrameworkFormProps) {
  function closeDialoge() {
    wait().then(() => setOpen(false));
  }
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof frameworkEditorformSchema>>({
    resolver: zodResolver(frameworkEditorformSchema),
    defaultValues: {
      name: frameworkData.name || "",
      description: frameworkData.description || "",
      framework_type: frameworkData.framework_type || "",
      version: "1.0",
      reporting_year: frameworkData.reporting_year || "",
      status: "draft",
      userId: userId,
    },
  });

  const onSubmit = async (data: z.infer<typeof frameworkEditorformSchema>) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("framework_type", data.framework_type);
    formData.append("version", data.version);
    formData.append("reporting_year", data.reporting_year);
    formData.append("status", data.status);
    formData.append("userId", data.userId || "");

    await createFramework(formData);
    closeDialoge();
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <Input type="hidden" name="userId" value={userId} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Framework Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Framework Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter framework description..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="framework_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Framework Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""} disabled
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Framework Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CDP">CDP</SelectItem>
                      <SelectItem value="BRSR">BRSR</SelectItem>
                      <SelectItem value="GRI">GRI</SelectItem>
                      <SelectItem value="ESRS">ESRS</SelectItem>
                      <SelectItem value="SASB">SASB</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Version</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="1.0" {...field} disabled/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reporting_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reporting Year</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="2024"
                    pattern="^[0-9]{4}$"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""} disabled
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex mt-5">
          <div className="flex-auto">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Framework"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
