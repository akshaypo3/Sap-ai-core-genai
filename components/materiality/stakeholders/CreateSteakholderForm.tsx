"use client"
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
// import { getStakeholderGroups } from "@/lib/stakeholders/data";
import { createStakeholder } from "@/lib/stakeholders/action";
import { getTranslations } from "next-intl/server";
import { stakeholderFormSchema  } from "@/schemas/stakeholderSchemaForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface stakeholderFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id:string;
    stakeholderGroups:any
}

export default function CreateSteakholderForm({ open, setOpen, id,stakeholderGroups }: stakeholderFormProps){
    // const stakeholderGroups = await getStakeholderGroups();

    function closeDialoge(){
        wait().then(() => setOpen(false));
    }

    const form = useForm<z.infer<typeof stakeholderFormSchema>>({
        resolver: zodResolver(stakeholderFormSchema),
        defaultValues: {
            name: "",
            description: "",
            groupId: "",
            stakeholderInterest: "1",
            stakeholderInfluence: "1",
            stakeholderKnowledge: "1",
        },
    });

    const onSubmit = async (data: z.infer<typeof stakeholderFormSchema>) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("groupId", data.groupId);
        formData.append("stakeholderInterest", data.stakeholderInterest.toString());
        formData.append("stakeholderInfluence", data.stakeholderInfluence.toString());
        formData.append("stakeholderKnowledge", data.stakeholderKnowledge.toString());
        formData.append("assessmentid",id);

        await createStakeholder(formData);
        closeDialoge()
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Max Mustermann" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder="Kreditgeber" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stakeholder Group</FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={(value) => field.onChange(value)}
                                defaultValue={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Default Group" />
                                </SelectTrigger>
                                 <SelectContent>
                                    {stakeholderGroups?.map((item: any) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.group || "Unnamed Group"}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="stakeholderInterest"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center">
                            Stakeholder Interest
                            <Popover>
                                <PopoverTrigger className="inline-flex ml-2 h-4 w-4 items-center">
                                    <CircleHelp />
                                </PopoverTrigger>
                                <PopoverContent className="text-sm">
                                    The level of concern or dependency a stakeholder has on the company or its activities.
                                </PopoverContent>
                            </Popover>
                        </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={(value) => field.onChange(value)}
                                defaultValue={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Interest" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Low</SelectItem>
                                    <SelectItem value="2">Medium</SelectItem>
                                    <SelectItem value="3">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="stakeholderInfluence"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center">
                            Stakeholder Influence
                            <Popover>
                                <PopoverTrigger className="inline-flex ml-2 h-4 w-4 items-center">
                                    <CircleHelp />
                                </PopoverTrigger>
                                <PopoverContent className="text-sm">
                                    The degree to which a stakeholder can impact the company’s decisions, operations, or outcomes.
                                </PopoverContent>
                            </Popover>
                        </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={(value) => field.onChange(value)}
                                defaultValue={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Influence" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Low</SelectItem>
                                    <SelectItem value="2">Medium</SelectItem>
                                    <SelectItem value="3">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="stakeholderKnowledge"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center">
                            Stakeholder Knowledge
                            <Popover>
                                <PopoverTrigger className="inline-flex ml-2 h-4 w-4 items-center">
                                    <CircleHelp />
                                </PopoverTrigger>
                                <PopoverContent className="text-sm">
                                    The extent of relevant information or expertise a stakeholder holds that the company depends on.
                                </PopoverContent>
                            </Popover>
                        </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={(value) => field.onChange(value)}
                                defaultValue={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Knowledge" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Low</SelectItem>
                                    <SelectItem value="2">Medium</SelectItem>
                                    <SelectItem value="3">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                {/* <Label htmlFor="name">Name</Label>
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
                                <PopoverContent className="text-sm">stakeholders.The level of concern or dependency a stakeholder has on the company or its activities</PopoverContent>
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
                                <PopoverContent className="text-sm">stakeholders.The degree to which a stakeholder can impact the company’s decisions, operations, or outcomes</PopoverContent>
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
                                <PopoverContent className="text-sm">stakeholders.The extent of relevant information or expertise a stakeholder holds that the company depends on</PopoverContent>
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
                </div> */}
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <Button className="w-full" type="submit">
                                Add Stakeholder
                            </Button>                  
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
};