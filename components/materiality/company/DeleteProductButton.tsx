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
  import { deleteCompanyProductWithId } from "@/lib/company/action";
  import { Trash2 } from "lucide-react";

export function DeleteProductButton({ product }) {

    async function handleSubmit(){
        await deleteCompanyProductWithId(product.id);
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
            <DialogTitle>Delete Product/Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the following product/service?
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm">
            <div className="font-bold">{product.type}</div>
            <div>
              <span className="font-bold">Name: </span>
              {product.name}
            </div>
            <div>
              <span className="font-bold">Turnover: </span>
              {product.turnover_percentage} %
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <form action={handleSubmit}>
                <DialogClose asChild>
                    <Button type="submit" variant="destructive">Delete Product/Service</Button>
                </DialogClose>
            </form>
          </div>
        </DialogContent>
      </Dialog>   
    )
  }