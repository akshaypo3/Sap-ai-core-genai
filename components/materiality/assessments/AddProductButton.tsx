import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import AddProductFormAssessment from "@/components/materiality/assessments/AddProductFormAssessment";

  export function AddProductButton(id:any){
    const assessmentId = id.id;
    console.log("ID INSIDE BUTTON:",assessmentId);
    return (
      <>
      <Dialog>
        <DialogTrigger><Button>Add Product/Service</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product/Service</DialogTitle>
            <DialogDescription>
              Add the products and services accounting for 90% of the turnover
            </DialogDescription>
          </DialogHeader>
          <AddProductFormAssessment id={assessmentId}/>
        </DialogContent>
      </Dialog>
      </>
    )
}