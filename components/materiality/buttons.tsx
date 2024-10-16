

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
import { useTranslations } from "use-intl"
// import CreateStakeholderForm from "@/components/materiality/stakeholders/CreateSteakholderForm";
// import CreateStakeholderGroupForm from "@/components/materiality/stakeholders/CreateSteakholderGroup";
// import { deleteStakeholder } from "@/lib/stakeholders/action";

export async function AddAssessmentButton(){
  const t = useTranslations("materiality-com")
    return (
      <Dialog>
      <DialogTrigger><Button className="w-full mb-3 bg-green-500 hover:bg-green-600">{t("New Assessment")}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Start new Assessment")}</DialogTitle>
          <DialogDescription>
            {t("New Assessment function description")}
          </DialogDescription>
        </DialogHeader>
        <CreateAssessmentForm/>
      </DialogContent>
    </Dialog>
    )
};