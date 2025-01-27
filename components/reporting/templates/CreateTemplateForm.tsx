"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TemplateFormSchema } from "@/schemas/TemplateFormSchema"; // Import schema
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
import { useTranslations } from "next-intl";
import { createTemplate } from "@/lib/templates/action";


const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface TemplateFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateTemplateForm({ open, setOpen }: TemplateFormProps) {
  function closeDialoge() {
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof TemplateFormSchema>>({
    resolver: zodResolver(TemplateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      created_by: "",
      updated_by: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof TemplateFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    await createTemplate(formData);
    closeDialoge();
  };

  const t = useTranslations("reporting.templates");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          {/* Template Name */}
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Template Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Template Name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Description */}
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Description")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Description")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Category */}
          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Category")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Category")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Submit Button */}
          <div className="flex">
            <div className="flex-auto">
              <Button className="w-full" type="submit">
                {t("Create")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
