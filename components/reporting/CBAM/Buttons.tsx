"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CreateAssessmentFormCBAM from "./AssessmentFormCBAM";

export function AssessmentButtonCBAM() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("reporting-com");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{t("cbam.Create Assessment")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("cbam.New Assessment")}</DialogTitle>
          <DialogDescription>
            {t("cbam.New Assessment function description")}
          </DialogDescription>
        </DialogHeader>
        <CreateAssessmentFormCBAM open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export function GoodsButtonCBAM() {
    const [open, setOpen] = useState(false);
    const t = useTranslations("reporting-com");
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>{t("cbam.Add Imported Good")}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("cbam.Add Goods")}</DialogTitle>
            <DialogDescription>
              {t("cbam.Enter the imported goods details")}
            </DialogDescription>
          </DialogHeader>
        
        </DialogContent>
      </Dialog>
    );
  }
