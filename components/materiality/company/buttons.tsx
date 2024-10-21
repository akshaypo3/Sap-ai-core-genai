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
  import AddLocationFormAssessment from "@/components/materiality/assessments/AddLocationFormAssessment";
  import AddProductForm from "@/components/materiality/company/AddProductForm";
  import { deleteCompanyLocationWithId } from "@/lib/company/action";
import AddLocationIROForm from "./AddLocationIROForm";
import AddProductIROForm from "./AddProductIROForm";

export function AddLocationButton(){
    return (
        <Dialog>
      <DialogTrigger><Button>Add Location</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>
            {t("company.Add all Locations of your company around the world")}
          </DialogDescription>
        </DialogHeader>
        <AddLocationForm/>
      </DialogContent>
    </Dialog>
        
    )
}

export function AddLocationButtonAssessment(){
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
      <AddLocationFormAssessment/>
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

export function DeleteLocationButton({ location }) {
  "use client"
  const handleDelete = async () => {
    try {
      await deleteCompanyLocationWithId(location.id);
      // The server action handles revalidation and redirection
    } catch (error) {
      console.error("Error deleting location:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
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
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button variant="destructive" onClick={handleDelete}>Delete Location</Button>
        </div>
      </DialogContent>
    </Dialog>   
  )
}

export function AddLocationIROButton({ companyId, locationId }){
  return (
      <Dialog>
    <DialogTrigger><Button>Add IRO Location</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add IRO Location</DialogTitle>
        <DialogDescription>
          Add all IRO Locations of your company .
        </DialogDescription>
      </DialogHeader>
      <AddLocationIROForm companyId={companyId} locationId={locationId}/>
    </DialogContent>
  </Dialog>
      
  )
}

export function AddProductIROButton({ companyId, productId }){
  return (
      <Dialog>
    <DialogTrigger><Button>Add IRO Product/Service</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add IRO Product / Service</DialogTitle>
        <DialogDescription>
          Add all IRO Product / Service of your company .
        </DialogDescription>
      </DialogHeader>
      <AddProductIROForm companyId={companyId} productId={productId}/>
    </DialogContent>
  </Dialog>
      
  )
}