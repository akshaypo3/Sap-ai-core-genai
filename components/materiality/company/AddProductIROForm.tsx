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
import { getIROLocationTypes } from "@/lib/company/data";
import {  addIROProduct } from '@/lib/company/action';

export default async function AddLocationIROForm({ companyId, productId }) {
    const locationTypes = await getIROLocationTypes();
    const company_id = companyId
    const product_id= productId

    return (
        <form action={addIROProduct}>
            <div className="grid w-full items-center gap-1.5 mb-2">
            <Input type="hidden" name="companyid" value ={company_id} />
            <Input type="hidden" name="productid" value ={product_id} />
                <Label htmlFor="name"> Name</Label>
                <Input type="text" id="name" name="name" required/>
                
                <Label htmlFor="description">Description</Label>
                {/* <Input type="text" id="description" name="description"/> */}
                <textarea
                    id="description"
                    name="description"
                    rows="4" // Set the number of rows as needed
                    className="flex h-32 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>

                <div className="w-full">
                    <Label htmlFor="location_type">Type</Label>
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

                <Label htmlFor="topic">Topic</Label>
                <Input type="text" id="topic" name="topic" required/>

                <Label htmlFor="subtopic">Sub Topic</Label>
                <Input type="text" id="subtopic" name="subtopic" required/>

                <Label htmlFor="subsubtopic">Sub Sub Topic</Label>
                <Input type="text" id="subsubtopic" name="subsubtopic" required/>

                <div className="flex mt-5">
                    <div className="flex-auto">
                        <DialogClose asChild>
                        <Button className="w-full" type="submit">
                            Add IRO Product/Service
                        </Button>
                        </DialogClose>
                    </div>
                </div>
                
            </div>
        </form>
    )
}