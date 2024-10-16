import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { Pencil, X,Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import MarkAsNotMaterialForm from "@/components/materiality/assessments/MarkAsNotMaterialForm";
import { deleteAssessmentWithId } from "@/lib/assessments/action";
import { useTranslations } from "use-intl";

export function SaveIroButton(){
  "use client"
    const { toast } = useToast();
    const t = useTranslations("materiality-com")

    return(
        <>
        <Button className="w-full bg-green-500 hover:bg-green-600" type="submit" onClick={() => {
        toast({
          variant: "destructive",
          title: t("assessment.Uncaught Error"),
          description: t("assessment.Please contact your Sustena administrator for more details"),
        })
      }} >
        {t("assessment.Save")}
        </Button>
        </>
    )
}

export function SaveLocationButton(){
  "use client"
    const { toast } = useToast();
    const t = useTranslations("assessment.materiality-com")
    return(
        <>
        <Button className="w-full bg-green-500 hover:bg-green-600" type="submit" onClick={() => {
        toast({
          variant: "destructive",
          title: t("assessment.Uncaught Error"),
          description: t("assessment.Please contact your Sustena administrator for more details"),
        })
      }} >
       {t("assessment.Add Location")}
        </Button>
        </>
    )
}

export function MarkAsNotMaterialButton({ assessmentId, iroId }){
  const t = useTranslations("materiality-com")
  return(
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
    </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("assessment.Mark as \"Not material\"")}</DialogTitle>
          <DialogDescription>
            {t(`assessment.Are you sure you want to mark this topic as not material?
            Please provide a detailed description`)}
          </DialogDescription>
        </DialogHeader>
        <MarkAsNotMaterialForm assId={assessmentId} iroId={iroId}/>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteAssessmentButton(assessmentId:any){
  console.log(assessmentId);
  const deleted = deleteAssessmentWithId(assessmentId);
  const t = useTranslations("materiality-com")
  return(
    <Dialog>
      <DialogTrigger>
        <Button className="mx-2 p-2 bg-red-500">
          <span className="sr-only">{t("assessment.View")}</span>
          <Trash2 className="w-4 text-red-100" />
         </Button>
    </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("assessment.Delete Assessment")}</DialogTitle>
          <DialogDescription>
            {t("assessment.Are you sure you want to delete the assessment?")}
          </DialogDescription>
        </DialogHeader>
        <form action={deleteAssessmentWithId}>
          <DialogClose asChild>
            <Button type="submit" className="bg-red-500 hover:bg-red-600 w-full block">{t("assessment.Delete")}</Button>
          </DialogClose>
        </form>
        <DialogClose asChild>
        <Button className="bg-green-500 hover:bg-green-600">{t("assessment.Discard")}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}