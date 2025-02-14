"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AssessmentFormCBAMSchema } from "@/schemas/AssessmentFormCBAMSchema";
import { createAssessmentCBAM } from "@/lib/cbam/action";
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

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface CreateAssessmentFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateAssessmentFormCBAM({
  open,
  setOpen,
}: CreateAssessmentFormProps) {
  const [loading, setLoading] = useState(false);

  function closeDialoge() {
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof AssessmentFormCBAMSchema>>({
    resolver: zodResolver(AssessmentFormCBAMSchema),
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      cbamStatus: "in_progress",
      framework: "CBAM",
    },
  });

  const onSubmit = async (data: z.infer<typeof AssessmentFormCBAMSchema>) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("cbamStatus", data.cbamStatus || "");
      formData.append("framework", data.framework);

      await createAssessmentCBAM(formData);
      closeDialoge();
    } catch (error) {
      console.error("Error creating assessment:", error);
    } finally {
      setLoading(false);
    }
  };
  const t = useTranslations("reporting-com");
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cbam.Assessment Name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("cbam.Assessment Name")}
                  {...field}
                />
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
              <FormLabel>{t("cbam.Start Date")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("cbam.Start Date")}
                  type="date"
                  {...field}
                />
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
              <FormLabel>{t("cbam.End Date")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("cbam.End Date")}
                  type="date"
                  {...field}
                />
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
              <FormLabel>{t("cbam.Framework")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Input type="hidden" name="cbamStatus" value="cbamStatus" />
        <div className="flex justify-center mt-4">
          <Button type="submit" className="w-full">
            {loading
              ? t("cbam.Creating")
              : t("cbam.Create Assessment")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
