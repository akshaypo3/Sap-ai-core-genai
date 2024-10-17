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
import { getLocationTypes, getCountries } from "@/lib/company/data";
import SearchableCountrySelect from '@/components/materiality/company/SearchableCountrySelect';
import { addLocation } from '@/lib/company/action';
import { getTranslations } from 'next-intl/server';

export default async function AddLocationForm() {
    const locationTypes = await getLocationTypes();
    const countries = await getCountries();
    const t = await getTranslations("materiality-com")
    return (
        <form action={addLocation}>
            <div className="grid w-full items-center gap-1.5 mb-2">
                <Label htmlFor="name">{t("company.Location Name")}</Label>
                <Input type="text" id="name" name="name" required/>
                
                <Label htmlFor="description">{t("company.Description")}</Label>
                <Input type="text" id="description" name="description"/>

                <Label htmlFor="street">{t("company.Street")}</Label>
                <Input type="text" id="street" name="street" required/>

                <Label htmlFor="postalcode">{t("company.Postal Code")}</Label>
                <Input type="number" id="postalcode" name="postalcode" required/>

                <Label htmlFor="city">{t("company.City")}</Label>
                <Input type="text" id="city" name="city" required/>

                <SearchableCountrySelect countries={countries}/>
                
                <div className="w-full">
                    <Label htmlFor="location_type">{t("company.Location Type")}</Label>
                    <Select name="location_type" required>
                        <SelectTrigger>
                            <SelectValue placeholder={t("company.Select a type")}/>
                        </SelectTrigger>
                        <SelectContent>
                            {locationTypes && locationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full">
                    <Label htmlFor="employee_count">{t("company.Employee Count")}</Label>
                    <Select name="employee_count" required>
                        <SelectTrigger>
                            <SelectValue placeholder={t("company.Select a size")}/>
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value="0-10">
                                    0-10
                                </SelectItem>
                                <SelectItem value="11-50">
                                    11-50
                                </SelectItem>
                                <SelectItem value="51-100">
                                    51-100
                                </SelectItem>
                                <SelectItem value="100-500">
                                    100-500
                                </SelectItem>
                                <SelectItem value="500-1.000">
                                    500-1.000
                                </SelectItem>
                                <SelectItem value="1000-5.000">
                                    1.000-5.000
                                </SelectItem>
                                <SelectItem value="5000-10.000">
                                    5.000-10.000
                                </SelectItem>
                                <SelectItem value="> 10.000">
                                    {t("company.more than 10_000")}
                                </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="flex mt-5">
                    <div className="flex-auto">
                        <DialogClose asChild>
                        <Button className="w-full" type="submit">
                            {t("company.Add Location")}
                        </Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </form>
    )
}