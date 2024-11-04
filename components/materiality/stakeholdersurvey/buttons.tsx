"use client"

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

export function StakeholderSurveyEditButton(){
    const { toast } = useToast();
    const t = useTranslations("materiality-com")

    return(
        <>
        <button onClick={() => {
        toast({
          variant: "destructive",
          title: t("stakeholderSurvey.Uncaught Error"),
          description: t("stakeholderSurvey.Please contact your Sustena administrator for more details"),
        })
      }} className="rounded-md border p-2 hover:bg-gray-100">
                  <span className="sr-only">Edit</span>
                  <Pencil className="w-4" />
        </button> 
        </>
    )
}