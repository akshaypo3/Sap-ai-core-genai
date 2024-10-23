import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AddStackholderquestionsForm from "./AddStackholderQuestionForm";

  export function AddStackholderButton(id:any){
    
    return (
      <>
      <Dialog>
        <DialogTrigger><Button>Add Question</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
            <DialogDescription>
              Add the Question for the Stack Holder
            </DialogDescription>
          </DialogHeader>
          <AddStackholderquestionsForm id={id}/>
        </DialogContent>
      </Dialog>
      </>
    )
}