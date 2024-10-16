import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function DetailsTable(){
const t = useTranslations("reporting-com")
    return (
        <>
    <form>
                <div className="grid w-full items-center gap-1.5 mb-2 mt-3">
                    <Label htmlFor="cin">{t("Corporate Identity Number (CIN) of the Listed Entity")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Name of the Listed Entity")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Year of incorporation")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Registered office address")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Corporate address")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("E-Mail")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Telephone")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Website")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Financial Year for which the reporting is being done")}</Label>
                    <Input type="text" name="cin" placeholder="2024"/>
                    <Label className="mt-3" htmlFor="cin">{t("Name of Stock Exchange where shares are listed")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Paid-up capital")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Name of assurance provider")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">{t("Type of assurance obtained")}</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Button className="w-full block bg-green-500 hover:bg-green-600 text-white hover:text-white">{t("Save")}</Button>
                </div>
            </form>
        </>
    )
}