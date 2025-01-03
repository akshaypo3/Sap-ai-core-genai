"use client"
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
import { useState } from "react";

  export function AddStackholderButton(id:any){
    const [open, setOpen] = useState(false);
    console.log("test2",id.id);
    const assessmentId=id.id
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger><Button>Add Question</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
            <DialogDescription>
              Add the Question for the Stack Holder
            </DialogDescription>
          </DialogHeader>
          <AddStackholderquestionsForm id={assessmentId} open={open} setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    )
}