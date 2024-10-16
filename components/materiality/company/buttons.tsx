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
  import { deleteCompanyLocationWithId } from "@/lib/company/action";
  import { useTranslations } from 'next-intl';


export function AddLocationButton(){
  const t = useTranslations("materiality-com")
    return (
        <Dialog>
      <DialogTrigger><Button>{t("company.Add Location")}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("company.Add Location")}</DialogTitle>
          <DialogDescription>
            {t("company.Add all Locations of your company around the world.")}
          </DialogDescription>
        </DialogHeader>
        <AddLocationForm/>
      </DialogContent>
    </Dialog>
        
    )
}

export function AddProductButton(){
  const t = useTranslations("materiality-com")

    return (
        <Dialog>
      <DialogTrigger><Button>{t("company.Add Product/Service")}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("company.Add Product/Service")}</DialogTitle>
          <DialogDescription>
            {t("company.Add the products and services accounting for 90% of the turnover")}
          </DialogDescription>
        </DialogHeader>
        <AddProductForm/>
      </DialogContent>
    </Dialog>
        
    )
}

export function DeleteLocationButton({ location }) {
  "use client"
  console.log("location id",location.id)
  const handleDelete = async () => {
    try {
      await deleteCompanyLocationWithId(location.id);
      // The server action handles revalidation and redirection
    } catch (error) {
      console.error("Error deleting location:", error);
      // Optionally, you can show an error message to the user here
    }
  };
  const t = useTranslations("materiality-com")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{t("company.Delete")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("company.Delete Company Location")}</DialogTitle>
          <DialogDescription>
            {t("company.Are you sure you want to delete the following location?")}
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm">
          <div className="font-bold">{location.name}</div>
          <div>
            <span className="font-bold">{t("company.Address:")}</span>
            {location.address}
          </div>
          <div>
            <span className="font-bold">{t("company.Postal Code:")}</span>
            {location.postalcode}
          </div>
          <div>
            <span className="font-bold">{t("company.City:")}</span>
            {location.city}
          </div>
          <div>
            <span className="font-bold">{t("company.Country:")}</span>
            {location.country}
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <DialogTrigger asChild>
            <Button variant="outline">{t("company.Cancel")}</Button>
          </DialogTrigger>
          <Button variant="destructive" onClick={handleDelete}>{t("company.Delete Location")}</Button>
        </div>
      </DialogContent>
    </Dialog>   
  )
}