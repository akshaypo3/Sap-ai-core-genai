"use client"

import { Button } from "@/components/ui/button"
import { createStakeholder, createStakeholderGroup } from "@/lib/stakeholders/action"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import CreateAssessmentForm from "@/components/materiality/CreateNewAssessmentForm"
import { getTranslations } from "next-intl/server"
import { useState } from "react"
import { useTranslations } from "next-intl"
// import CreateStakeholderForm from "@/components/materiality/stakeholders/CreateSteakholderForm";
// import CreateStakeholderGroupForm from "@/components/materiality/stakeholders/CreateSteakholderGroup";
// import { deleteStakeholder } from "@/lib/stakeholders/action";

export function AddAssessmentButton({getFrameworks}:{getFrameworks:any}){
  const [open, setOpen] = useState(false);
  const t =  useTranslations("materiality-com")
    return (
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <div className="px-4 py-2 bg-black text-white font-semibold rounded-md text-sm cursor-pointer hover:bg-gray-800">
        {t("New Assessment")}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start new Assessment</DialogTitle>
          <DialogDescription>
            New Assessment function description
          </DialogDescription>
        </DialogHeader>
        <CreateAssessmentForm getFrameworks={getFrameworks} open={open} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
    )
};