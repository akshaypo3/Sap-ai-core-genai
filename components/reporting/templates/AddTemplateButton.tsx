"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CreateTemplateForm from "./CreateTemplateForm";

export function AddTemplateButton() {
  const [open, setOpen] = useState(false);
  let t = useTranslations("reporting.templates");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-black dark:bg-green-600 dark:text-neutral-50">
          {t("AddTemplate")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("AddTemplate")}</DialogTitle>
          <DialogDescription>{t("AddDescription")}</DialogDescription>
        </DialogHeader>
        <CreateTemplateForm open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}