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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { getFrameworks } from "@/lib/assessments/data";
import { createAssessment } from "@/lib/assessments/action";
import { getTranslations } from "next-intl/server";
import { useState, useEffect } from "react";
import { assessmentFormSchema  } from "@/schemas/assessmentFormSchema";
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
import { useTranslations } from "next-intl";

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface CreateAssessmentFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getFrameworks: any
}

export default function CreateAssessmentForm({ open, setOpen, getFrameworks }: CreateAssessmentFormProps) {
    const t = useTranslations("materiality-com");
    // const frameworks = await getFrameworks();
    
    // Filter frameworks where needsAssessment is true
    const relevantFrameworks = getFrameworks?.filter((item: any) => item.needsAssessment);
    
    // Check if ESRS is in the list and use it as the default if available
    const defaultFramework = relevantFrameworks?.find((item: any) => item.title === "ESRS") || relevantFrameworks[0];

    function closeDialoge(){
        wait().then(() => setOpen(false));
    }

    const form = useForm<z.infer<typeof assessmentFormSchema>>({
        resolver: zodResolver(assessmentFormSchema),
        defaultValues: {
        year: undefined,
        framework: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof assessmentFormSchema>) => {
        const formData = new FormData();
        formData.append("year", data.year?.toString() || "");
        formData.append("framework", data.framework);
    
        await createAssessment(formData);
        closeDialoge()
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-1.5 mb-2">
               <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                        <Input placeholder="2025" type="number"{...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="framework"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Framework</FormLabel>
                        <FormControl>
                            <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={defaultFramework?.id}
                            >
                            <SelectTrigger>
                                <SelectValue placeholder={defaultFramework ? defaultFramework.title : "Select a Framework"} />
                            </SelectTrigger>
                            <SelectContent>
                                {relevantFrameworks?.map((item: any) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.title}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <Label htmlFor="year">Year</Label>
                <Input type="number" name="year" placeholder="2024" />

                <div className="w-full">
                    <div>
                        <Label htmlFor="framework">Framework</Label>
                        <Select name="framework" defaultValue={defaultFramework?.id}>
                            <SelectTrigger>
                                <SelectValue placeholder={defaultFramework ? defaultFramework.title : "Select a Framework"} />
                            </SelectTrigger>
                            <SelectContent>
                                {relevantFrameworks?.map((item: any) => (
                                    <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div> */}
                <div className="flex mt-5">
                    <div className="flex-auto">
                        <Button className="w-full" type="submit">
                            Create Assessment
                        </Button>
                    </div>
                </div>
            </div>
        </form>
        </Form>
    );
}
