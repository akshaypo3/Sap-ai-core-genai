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
import { getFrameworks } from "@/lib/assessments/data";
import { createAssessment } from "@/lib/assessments/action";
import { getTranslations } from "next-intl/server"

interface NewStakeholderFormData {
    name: string;
    description: string;
    groupId: any;
}



export default async function CreateAssessmentForm(){
    const t = await getTranslations("materiality-com")
    const frameworks = await getFrameworks();
    return (
        <form action={createAssessment}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="year">{t("Year")}</Label>
                    <Input type="number" name="year" placeholder="2024"/>
                    <div className="w-full">
                        <div>
                            <Label htmlFor="framework">{t("Framework")}</Label>
                            <Select name="framework">
                                <SelectTrigger>
                                    <SelectValue placeholder={t("ESRS")}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {frameworks?.map((item:any) =>(
                                        <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>                  
                    
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                {t("Create Assessment")}
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};