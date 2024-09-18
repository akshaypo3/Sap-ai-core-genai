import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import AddTaskForm from "@/components/dashboard/createTaskForm";

export function AddTask(){
    return (
      <Dialog>
      <DialogTrigger><Button className="mb-3 bg-green-600">Add Task</Button></DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle >Add Task</DialogTitle>
          <DialogDescription>
            Add Task Function Description
          </DialogDescription>
        </DialogHeader>
        <AddTaskForm/>
      </DialogContent>
    </Dialog>
    )
};
