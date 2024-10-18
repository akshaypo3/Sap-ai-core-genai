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
import { createRole } from "@/lib/settings/users/action";
import { getTranslations } from "next-intl/server";

interface NewStakeholderGroupFormData {
    role: string;
    description: string;
}



export default async function CreateRoleForm(){
    const t = await getTranslations("settings-com")
    return (
        <form action={createRole}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="name">{t("Role")}</Label>
                    <Input type="text" name="role"/>
                    <Label htmlFor="description">{t("Description")}</Label>
                    <Input type="text" name="description"/>
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                               {t("Add Role")}
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};