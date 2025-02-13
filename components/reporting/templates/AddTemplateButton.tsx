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
      <div className="px-4 py-2 bg-black text-white font-semibold rounded-md text-sm cursor-pointer hover:bg-gray-800">
        {t("AddTemplate")}
            </div>
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