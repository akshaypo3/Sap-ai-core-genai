import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

export default function DetailsTable(){

    return (
        <>
    <form>
                <div className="grid w-full items-center gap-1.5 mb-2 mt-3">
                    <Label htmlFor="cin">Corporate Identity Number (CIN) of the Listed Entity</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Name of the Listed Entity</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Year of incorporation</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Registered office address</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Corporate address</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">E-Mail</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Telephone</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Website</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Financial Year for which the reporting is being done</Label>
                    <Input type="text" name="cin" placeholder="2024"/>
                    <Label className="mt-3" htmlFor="cin">Name of Stock Exchange where shares are listed</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Paid-up capital</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Name of assurance provider</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Label className="mt-3" htmlFor="cin">Type of assurance obtained</Label>
                    <Input type="text" name="cin" placeholder=""/>
                    <Button className="w-full block bg-green-500 hover:bg-green-600 text-white hover:text-white">Save</Button>
                </div>
            </form>
        </>
    )
}