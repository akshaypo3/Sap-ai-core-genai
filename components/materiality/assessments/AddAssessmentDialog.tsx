import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateAssessmentForm from "@/components/materiality/CreateNewAssessmentForm"
import { useTranslations } from "next-intl"

export function AddAssessmentButton(){
  const t = useTranslations("materiality-com")
    return (
      <Dialog>
      <DialogTrigger><Button className="w-full mb-3 bg-green-500 hover:bg-green-600">{t("assessment.New Assessment")}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("assessment.Start new Assessment")}</DialogTitle>
          <DialogDescription>
            {t("assessment.New Assessment function description")}
          </DialogDescription>
        </DialogHeader>
        <CreateAssessmentForm/>
      </DialogContent>
    </Dialog>
    )
};