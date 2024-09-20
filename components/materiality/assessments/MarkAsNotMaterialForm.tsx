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
import { markIroAsNotMaterial } from "@/lib/assessments/action";

interface NewStakeholderGroupFormData {
    name: string;
    description: string;
}



export default function MarkIroAsNotMaterialForm({assId, iroId}){
    return (
        <form action={markIroAsNotMaterial}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <input type="hidden" name="assessment_id" value={assId}/>
                    <input type="hidden" name="iro_id" value={iroId}/>
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" name="description"/>
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                Mark as "Not Material"
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};