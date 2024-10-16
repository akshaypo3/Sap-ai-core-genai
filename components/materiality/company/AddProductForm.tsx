import React from 'react';
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addProductService } from '@/lib/company/action';
import { useTranslations } from 'next-intl';

export default function AddProductForm() {
    const t = useTranslations("materiality-com")
    return (
        <form action={addProductService}>
            <div className="grid w-full items-center gap-1.5 mb-2">
                <Label htmlFor="type">{t("company.Product or Service?")}</Label>
                <Select name="type" required>
                    <SelectTrigger>
                         <SelectValue placeholder={t("company.Select a type")}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Product">{t("company.Product")}</SelectItem>
                        <SelectItem value="Service">{t("company.Service")}</SelectItem>
                     </SelectContent>
                </Select>
                
                <Label htmlFor="name">{t("company.Product/Service name")}</Label>
                <Input type="text" id="name" name="name" required/>

                <Label htmlFor="description">{t("company.Description")}</Label>
                <Input type="text" id="description" name="description"/>

                <Label htmlFor="turnover_percentage">{t("company.Percentage of turnover (%)")}</Label>
                <Input 
                    type="number" 
                    id="turnover_percentage" 
                    name="turnover_percentage" 
                    min="0" 
                    max="100" 
                    step="0.01"
                />

                <div className="flex mt-5">
                    <div className="flex-auto">
                        <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                {t("company.Add Product/Service")}
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </form>
    )
}