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
import { getFrameworks } from "@/lib/assessments/data";
import { createAssessment } from "@/lib/assessments/action";
import { getTranslations } from "next-intl/server";
import { useState, useEffect } from "react";

interface NewStakeholderFormData {
    name: string;
    description: string;
    groupId: any;
}

export default async function CreateAssessmentForm() {
    const t = await getTranslations("materiality-com");
    const frameworks = await getFrameworks();
    
    // Filter frameworks where needsAssessment is true
    const relevantFrameworks = frameworks?.filter((item: any) => item.needsAssessment);
    
    // Check if ESRS is in the list and use it as the default if available
    const defaultFramework = relevantFrameworks?.find((item: any) => item.title === "ESRS") || relevantFrameworks[0];

    return (
        <form action={createAssessment}>
            <div className="grid w-full items-center gap-1.5 mb-2">
                <Label htmlFor="year">Year</Label>
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
                </div>

                <div className="flex mt-5">
                    <div className="flex-auto">
                        <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                Create Assessment
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </form>
    );
}
