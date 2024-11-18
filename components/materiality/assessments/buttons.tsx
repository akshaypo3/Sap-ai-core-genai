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
import CustomIRoForm from "./CustomIRoForm";
import IROCatalog from "./IroCatalog";
import { useState } from "react";

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

export function CustomIROButton({assesmentId}:{assesmentId:string}){
  "use client"
  const [open, setOpen] = useState(false);
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-green-600">Add Custom IRo</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Add Custom IRo</DialogTitle>
          <DialogDescription>Add Custom IRo Description</DialogDescription>
        </DialogHeader>
        <CustomIRoForm assesmentId={assesmentId} open={open} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export function IRoCatalogButton({data,assesmentId}:{data:any,assesmentId:string}){
  return(
    <Dialog>
      <DialogTrigger>
        <Button className="bg-green-600">Add IROs From Catalog</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[35vw] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>IRO Catalog</DialogTitle>
          <DialogDescription>Catalog For ESRS IROS</DialogDescription>
        </DialogHeader>
        <IROCatalog data={data} assesmentId={assesmentId}/>
      </DialogContent>
    </Dialog>
  )
}