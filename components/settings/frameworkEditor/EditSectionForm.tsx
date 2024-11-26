"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sectionEditorFormSchema } from "@/schemas/sectionFormSchema";
import { updateSection } from "@/lib/settings/frameworkEditor/action";
import { useEffect } from "react";
import { UUID } from "crypto";
import React from "react";

interface SectionFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sectionData: {
    section_code: string;
    name: string;
    description: string;
    is_required: boolean;
    metadata: [];
    parent_section_id: UUID | null;
    framework_id: UUID;
    id: UUID;
  };
}

export default function EditSectionEditorForm({
  open,
  setOpen,
  sectionData,
}: SectionFormProps) {
  const [loading, setLoading] = React.useState(false);
  console.log(sectionData?.is_required);
  const form = useForm<z.infer<typeof sectionEditorFormSchema>>({
    resolver: zodResolver(sectionEditorFormSchema),
    defaultValues: {
      section_code: sectionData?.section_code || "",
      name: sectionData?.name || "",
      description: sectionData?.description || "",
      is_required: sectionData?.is_required === undefined ? true : sectionData.is_required,
      metadata: sectionData?.metadata.additionalInfo || "",
    },
  });

  // Update form values when sectionData changes
  useEffect(() => {
    if (sectionData) {
      form.reset({
        section_code: sectionData?.section_code || "",
        name: sectionData?.name || "",
        description: sectionData?.description || "",
        is_required: sectionData?.is_required || false,
       metadata: sectionData?.metadata.additionalInfo || "",
      });
    }
  }, [sectionData, form]);

  const closeDialog = () => {
    setTimeout(() => setOpen(false), 100);
  };

  const onSubmit = async (data: z.infer<typeof sectionEditorFormSchema>) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("section_code", data.section_code);
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("is_required", data.is_required.toString());
    formData.append("metadata", data.metadata || "");
    formData.append("framework_id", sectionData.framework_id || "");
    formData.append("id", sectionData.id || "");

    await updateSection(formData);
    setLoading(false);
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <FormField
            control={form.control}
            name="section_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="1.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="General Disclosures" {...field} />
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
                  <Textarea placeholder="Enter section description..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_required"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Section</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value} 
                      onCheckedChange={(checked) => field.onChange(checked)}
                      className="h-6 w-6" 
                    />
                    <span>{field.value ? "Required" : "Non Required"}</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metadata"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Metadata</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter additional metadata..." rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex mt-5">
          <div className="flex-auto">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? 'Editing...' : 'Edit Section'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
