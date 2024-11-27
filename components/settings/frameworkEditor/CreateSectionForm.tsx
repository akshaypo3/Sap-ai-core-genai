"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sectionEditorFormSchema } from "@/schemas/sectionFormSchema";
import { createSection } from "@/lib/settings/frameworkEditor/action";
import { UUID } from "crypto";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

interface SectionFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentSections: UUID
  frameworkId :UUID
}

export default function CreateSectionEditorForm({
  open,
  setOpen,
  parentSections,
  frameworkId
}: SectionFormProps) {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof sectionEditorFormSchema>>({
    resolver: zodResolver(sectionEditorFormSchema),
    defaultValues: {
      section_code: "",
      name: "",
      description: "",
      is_required: true,
      metadata: ""
    },
  });

  const closeDialog = () => {
    setTimeout(() => setOpen(false), 100);
  };

  const onSubmit = async (data: z.infer<typeof sectionEditorFormSchema>) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("section_code", data.section_code);
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("parent_section_id", parentSections || ""); // Only append the ID value
    formData.append("is_required", data.is_required.toString());
    formData.append("metadata", data.metadata || "");
    formData.append("framework_id",frameworkId);

    await createSection(formData);
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

          {/* <FormField
            control={form.control}
            name="parent_section_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Section</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange} // Update the form value with the selected ID
                    value={field.value} // Bind the selected value
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Parent Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {parentSections.map((section) => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

<FormField
            control={form.control}
            name="is_required"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Section</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value} // Bind to the field value
                      onCheckedChange={(checked) => field.onChange(checked)} // Handle changes in state
                      className="h-6 w-6" // Adjust size here
                    />
                    <span>{field.value ? "Required" : "Non Required"}</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="order_index"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Index</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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
              {loading ? 'Creating...' : 'Create Section'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
