"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { activeAssessmentFormSchema } from "@/schemas/ActiveFrameworkFormSchema";
import { createactiveAssessment } from "@/lib/frameworks/action";
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
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface CreateActiveAssessmentFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  framework: string;
  frameworkId: string;
}

export default function CreateActiveAssessmentForm({
  open,
  setOpen,
  framework,
  frameworkId,
}: CreateActiveAssessmentFormProps) {
  const [loading, setLoading] = useState(false);

  function closeDialoge() {
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof activeAssessmentFormSchema>>({
    resolver: zodResolver(activeAssessmentFormSchema),
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      framework: framework,
      frameworkId: frameworkId,
    },
  });

  const onSubmit = async (data: z.infer<typeof activeAssessmentFormSchema>) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("framework", data.framework);
      formData.append("frameworkId", data.frameworkId || "");

      await createactiveAssessment(formData);
      closeDialoge();
    } catch (error) {
      console.error("Error creating assessment:", error);
    } finally {
      setLoading(false);
    }
  };
  const t = useTranslations('reporting-com')
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fe_frameworks.Assessment Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("fe_frameworks.Assessment Name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fe_frameworks.Start Date")}</FormLabel>
              <FormControl>
                <Input placeholder={t("fe_frameworks.Start Date")} type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fe_frameworks.End Date")}</FormLabel>
              <FormControl>
                <Input placeholder={t("fe_frameworks.End Date")} type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="framework"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fe_frameworks.Framework")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Input type="hidden" name="frameworkId" value={frameworkId} />
        <div className="flex justify-center mt-4">
          <Button type="submit" className="w-full">
            {loading ? t("fe_frameworks.Creating") : t("fe_frameworks.Create Assessment")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
