"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { deleteCompanyLocationWithId } from "@/lib/company/action";
  import { Trash2 } from "lucide-react";

export function DeleteLocationButton({ location }) {

    async function handleSubmit(){
        await deleteCompanyLocationWithId(location.id);
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
            <Button className="p-2 ml-2 ">
                <span className="sr-only">Delete</span>
            <Trash2 className="w-4" />
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Company Location</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the following location?
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm">
            <div className="font-bold">{location.name}</div>
            <div>
              <span className="font-bold">Address: </span>
              {location.address}
            </div>
            <div>
              <span className="font-bold">Postal Code: </span>
              {location.postalcode}
            </div>
            <div>
              <span className="font-bold">City: </span>
              {location.city}
            </div>
            <div>
              <span className="font-bold">Country: </span>
              {location.country}
            </div>
            <div>
              <span className="font-bold">Employees: </span>
              {location.employee_count}
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <form action={handleSubmit}>
                <DialogClose asChild>
                    <Button type="submit" variant="destructive">Delete Location</Button>
                </DialogClose>
            </form>
          </div>
        </DialogContent>
      </Dialog>   
    )
  }