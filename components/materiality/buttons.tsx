

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
// import CreateStakeholderForm from "@/components/materiality/stakeholders/CreateSteakholderForm";
// import CreateStakeholderGroupForm from "@/components/materiality/stakeholders/CreateSteakholderGroup";
// import { deleteStakeholder } from "@/lib/stakeholders/action";

export async function AddAssessmentButton(){
  const t = await getTranslations("materiality-com")
    return (
      <Dialog>
      <DialogTrigger><Button>{t("New Assessment")}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start new Assessment</DialogTitle>
          <DialogDescription>
            New Assessment function description
          </DialogDescription>
        </DialogHeader>
        <CreateAssessmentForm/>
      </DialogContent>
    </Dialog>
    )
};