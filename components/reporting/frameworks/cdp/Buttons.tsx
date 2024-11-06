import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateCdpAssessmentForm from "./CreateCdpAssessmentForm"
import { useTranslations } from "next-intl"

export function AddCdpAssessmentButton(){
  const t =  useTranslations("reporting-com")
    return (
      <Dialog>
      <DialogTrigger><Button>{t("cdp.New Assessment")}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("cdp.Start new CDP Assessment")}</DialogTitle>
          <DialogDescription>
            {t("cdp.New Assessment function description")}
          </DialogDescription>
        </DialogHeader>
        <CreateCdpAssessmentForm/>
      </DialogContent>
    </Dialog>
    )
};