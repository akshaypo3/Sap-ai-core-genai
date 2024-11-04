import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import AddLocationFormAssessment from "@/components/materiality/assessments/AddLocationFormAssessment";

export function AddLocationButtonAssessment(id:any){
    const assessmentId = id.id;
    console.log("Assessment ID inside Button: ",assessmentId)
    
    return (
    <Dialog>
      <DialogTrigger><Button>Add Location</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>
            Add all Locations of your company around the world.
          </DialogDescription>
        </DialogHeader>
        <AddLocationFormAssessment id={assessmentId}/>
      </DialogContent>
    </Dialog>
     
    )
}