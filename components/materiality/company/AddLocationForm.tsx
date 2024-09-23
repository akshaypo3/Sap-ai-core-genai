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

export default async function AddLocationForm() {
    const locationTypes = await getLocationTypes();
    const countries = await getCountries();

    return (
        <form action={addLocation}>
            <div className="grid w-full items-center gap-1.5 mb-2">
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