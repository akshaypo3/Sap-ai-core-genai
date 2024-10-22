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
import { useTranslations } from "next-intl";

export function SaveIroButton(){
  "use client"
    const { toast } = useToast();

    return(
        <>
        <Button className="w-full bg-green-500 hover:bg-green-600" type="submit" onClick={() => {
        toast({
          variant: "destructive",
          title: "Uncaught Error",
          description: "Please contact your Sustena administrator for more details.",
        })
      }} >
                                Save
        </Button>
        </>
    )
}

export function SaveLocationButton(){
  "use client"
    const { toast } = useToast();
    return(
        <>
        <Button className="w-full bg-green-500 hover:bg-green-600" type="submit" onClick={() => {
        toast({
          variant: "destructive",
          title: "Uncaught Error",
          description: "Please contact your Sustena administrator for more details.",
        })
      }} >
                                Add Location
        </Button>
        </>
    )
}

export function MarkAsNotMaterialButton({ assessmentId, iroId }){
  return(
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
    </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as "Not material"</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this topic as not material?
            Please provide a detailed description.
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
  
  return(
    <Dialog>
      <DialogTrigger>
        <Button className="mx-2 p-2 bg-red-500">
          <span className="sr-only">View</span>
          <Trash2 className="w-4 text-red-100" />
         </Button>
    </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Assessment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the assessment?
          </DialogDescription>
        </DialogHeader>
        <form action={deleteAssessmentWithId}>
          <DialogClose asChild>
            <Button type="submit" className="bg-red-500 hover:bg-red-600 w-full block">Delete</Button>
          </DialogClose>
        </form>
        <DialogClose asChild>
        <Button className="bg-green-500 hover:bg-green-600">Discard</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}