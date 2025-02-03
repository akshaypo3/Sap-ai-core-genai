import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { AddProductFormAssessment } from "./AddProductFormAssessment";

  interface AddProductButtonFormProps {
    id:string;
      companyID:string;
  }
  
  export function AddProductButton({ id, companyID }: AddProductButtonFormProps) {
    const assessmentId = id;
    console.log("ID INSIDE BUTTON:",assessmentId ,companyID);
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
          <AddProductFormAssessment id={assessmentId} companyID={companyID}/>
        </DialogContent>
      </Dialog>
      </>
    )
}