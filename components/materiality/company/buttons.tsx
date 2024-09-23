import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import AddLocationForm from "@/components/materiality/company/AddLocationForm";
  import AddProductForm from "@/components/materiality/company/AddProductForm";

export function AddLocationButton(){
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
        <AddLocationForm/>
      </DialogContent>
    </Dialog>
        
    )
}

export function AddProductButton(){
    return (
        <Dialog>
      <DialogTrigger><Button>Add Product/Service</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product/Service</DialogTitle>
          <DialogDescription>
            Add the products and services accounting for 90% of the turnover
          </DialogDescription>
        </DialogHeader>
        <AddProductForm/>
      </DialogContent>
    </Dialog>
        
    )
}