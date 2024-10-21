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
import { getStakeholderGroups } from "@/lib/stakeholders/data";
import { createStakeholder } from "@/lib/stakeholders/action";

interface NewStakeholderFormData {
    name: string;
    description: string;
    groupId: any;
}



export default async function CreateSteakholderForm(){
    const stakeholderGroups = await getStakeholderGroups();
    return (
        <form action={createStakeholder}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" name="name" placeholder="Max Mustermann"/>
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" name="description" placeholder="Kreditgeber"/>
                    <div className="w-full">
                        <div>
                            <Label htmlFor="groupId">Stakeholder Group</Label>
                            <Select name="groupId">
                                <SelectTrigger>
                                    <SelectValue placeholder="Default Group"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {stakeholderGroups?.map((item) =>(
                                        <SelectItem key={item.id} value={item.id}>{item.group}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full">
                        <div>
                            <Label htmlFor="stakeholderInterest" className="flex items-center">
                                Stakeholder Interest
                                <Popover>
                                    <PopoverTrigger className="inline-flex ml-2 h-4 w-4 items-center"><CircleHelp/></PopoverTrigger>
                                    <PopoverContent className="text-sm">{t("stakeholders.The level of concern or dependency a stakeholder has on the company or its activities")}</PopoverContent>
                                </Popover>
                            </Label>
                            <Select name="stakeholderInterest">
                                <SelectTrigger>
                                    <SelectValue placeholder="Interest"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="1">Low</SelectItem>
                                        <SelectItem value="2">Medium</SelectItem>
                                        <SelectItem value="3">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full">
                        <div>
                            <Label htmlFor="stakeholderInfluence" className="flex items-center">
                                Stakeholder Influence
                                <Popover>
                                    <PopoverTrigger className="inline-flex ml-2 h-4 w-4 items-center"><CircleHelp/></PopoverTrigger>
                                    <PopoverContent className="text-sm">{t("stakeholders.The degree to which a stakeholder can impact the company’s decisions, operations, or outcomes")}</PopoverContent>
                                </Popover>
                            </Label>
                            <Select name="stakeholderInfluence">
                                <SelectTrigger>
                                    <SelectValue placeholder="Influence"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="1">Low</SelectItem>
                                        <SelectItem value="2">Medium</SelectItem>
                                        <SelectItem value="3">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full">
                        <div>
                            <Label htmlFor="stakeholderKnowledge" className="flex items-center">
                                Stakeholder Knowledge
                                <Popover>
                                    <PopoverTrigger className="inline-flex ml-2 h-4 w-4 items-center"><CircleHelp/></PopoverTrigger>
                                    <PopoverContent className="text-sm">{t("stakeholders.The extent of relevant information or expertise a stakeholder holds that the company depends on")}</PopoverContent>
                                </Popover>
                            </Label>
                            <Select name="stakeholderKnowledge">
                                <SelectTrigger>
                                    <SelectValue placeholder="Knowledge"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="1">Low</SelectItem>
                                        <SelectItem value="2">Medium</SelectItem>
                                        <SelectItem value="3">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                Add Stakeholder
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};