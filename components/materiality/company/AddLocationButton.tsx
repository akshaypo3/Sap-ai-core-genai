'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddLocationForm from "@/components/materiality/company/AddLocationForm";

interface AddLocationButtonFormProps {
    type: string[];
    api: string;
    companyID:string;
}

export function AddLocationButton({ type, api,companyID }: AddLocationButtonFormProps) {
    const [open, setOpen] = React.useState(false);

    const handleInteractOutside = (e: any) => {
        const hasPacContainer = e.composedPath().some((el: EventTarget) => {
            if ("classList" in el) {
                return Array.from((el as Element).classList).includes("pac-container");
            }
            return false;
        });

        if (hasPacContainer) {
            e.preventDefault();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
            <div className="px-4 py-2 bg-black text-white font-semibold rounded-md text-sm cursor-pointer hover:bg-gray-800">
            Add Location
            </div>
            </DialogTrigger>
            <DialogContent 
                className="overflow-visible"
                onInteractOutside={handleInteractOutside}
            >
                <DialogHeader>
                    <DialogTitle>Add Location</DialogTitle>
                    <DialogDescription>
                        Add all Locations of your company around the world
                    </DialogDescription>
                </DialogHeader>
                <div className="relative">
                        <AddLocationForm type={type} api={api} companyID={companyID} open={open}  setOpen={setOpen} onClose={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}