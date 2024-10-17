import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"  
import { CircleHelp } from "lucide-react";
import { createStakeholderGroup } from "@/lib/stakeholders/action";
import { useTranslations } from "next-intl";

interface NewStakeholderGroupFormData {
    name: string;
    description: string;
}



export default async function CreateSteakholderForm(){
    const t = useTranslations("materiality-com")
    return (
        <form action={createStakeholderGroup}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="name">{t("stakeholders.Name")}</Label>
                    <Input type="text" name="name"/>
                    <Label htmlFor="description">{t("stakeholders.Description")}</Label>
                    <Input type="text" name="description"/>
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                {t("stakeholders.Add Stakeholder Group")}
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};