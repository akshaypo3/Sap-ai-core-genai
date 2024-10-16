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
  import { useTranslations } from 'next-intl';


export function DeleteLocationButton({ location }) {

    async function handleSubmit(){
        await deleteCompanyLocationWithId(location.id);
    }
    const t = useTranslations("materiality-com")

    return (
      <Dialog>
        <DialogTrigger asChild>
            <Button className="p-2 ml-2 ">
                <span className="sr-only">{t("company.Delete")}</span>
            <Trash2 className="w-4" />
            </Button>
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
              <span className="font-bold">{t("company.Address:")} </span>
              {location.address}
            </div>
            <div>
              <span className="font-bold">{t("company.Postal Code:")} </span>
              {location.postalcode}
            </div>
            <div>
              <span className="font-bold">{t("company.City:")} </span>
              {location.city}
            </div>
            <div>
              <span className="font-bold">{t("company.Country:")} </span>
              {location.country}
            </div>
            <div>
              <span className="font-bold">{t("company.Employees:")} </span>
              {location.employee_count}
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button variant="outline">{t("company.Cancel")}</Button>
            </DialogTrigger>
            <form action={handleSubmit}>
                <DialogClose asChild>
                    <Button type="submit" variant="destructive">{t("company.Delete Location")}</Button>
                </DialogClose>
            </form>
          </div>
        </DialogContent>
      </Dialog>   
    )
  }