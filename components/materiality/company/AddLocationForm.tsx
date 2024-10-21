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
    const company_id = 'cc3de9de-f00b-49b7-ad4e-1db31a49ef11'//added static company id
    const t = await getTranslations();

    return (
        <form action={addLocation}>
            <div className="grid w-full items-center gap-1.5 mb-2">
            <Input type="hidden" name="companyid" value ={company_id} />
                <Label htmlFor="name">Location Name</Label>
                <Input type="text" id="name" name="name" required/>
                
                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" name="description"/>

                <Label htmlFor="street">Street</Label>
                <Input type="text" id="street" name="street" required/>

                <Label htmlFor="postalcode">Postal Code</Label>
                <Input type="number" id="postalcode" name="postalcode" required/>

                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" name="city" required/>

                <SearchableCountrySelect countries={countries}/>
                
                <div className="w-full">
                    <Label htmlFor="location_type">Location Type</Label>
                    <Select name="location_type" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a type"/>
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
                    <Label htmlFor="employee_count">Employee Count</Label>
                    <Select name="employee_count" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a size"/>
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
                            Add Location
                        </Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </form>
    )
}