"use client"

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { Pencil } from "lucide-react";

export function SaveIroButton(){
    const { toast } = useToast();

    return(
        <>
        <Button className="w-full bg-green-500 hover:bg-green-600" type="submit" onClick={() => {
        toast({
          variant: "destructive",
          title: "Uncaught Error",
          description: "Please contact your Sustena administrator for more details.",
        })
      }} >
                                Save
        </Button>
        </>
    )
}

export function SaveLocationButton(){
    const { toast } = useToast();

    return(
        <>
        <Button className="w-full bg-green-500 hover:bg-green-600" type="submit" onClick={() => {
        toast({
          variant: "destructive",
          title: "Uncaught Error",
          description: "Please contact your Sustena administrator for more details.",
        })
      }} >
                                Add Location
        </Button>
        </>
    )
}