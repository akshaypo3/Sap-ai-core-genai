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
import { createStakeholderGroupAssessment } from "@/lib/stakeholders/action";
import { useTranslations } from "next-intl";

interface NewStakeholderGroupFormData {
    name: string;
    description: string;
}



export default async function CreateSteakholderForm(id:any){
    const assessmentId=id.id.id.id;
    return (
        <form action={createStakeholderGroupAssessment}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" name="name"/>
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" name="description"/>
                    <Input type="hidden" name="assessmentId" value={assessmentId} />
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                Add Stakeholder Group
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};