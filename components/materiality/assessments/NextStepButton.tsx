"use client"

import react from "react";
import { useState, useTransition } from 'react';
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { handleNextStep } from "@/lib/assessments/action";
import { Button } from "@/components/ui/button";


export default function NextStepButton(id:any){
    let assessmentId = id.id.id;
    const nextStep = parseInt(id.step);
    const assessmentLink = "/materiality/assessments/"+assessmentId+"/"+nextStep;
    console.log("ID IN NEXT STEP BUTTON: ",assessmentId)

    if(nextStep==5){
        assessmentId=id.id;
    }

    const [isPending, startTransition] = useTransition();
    
    const handleClick = () => {
      startTransition(async () => {
        await handleNextStep(assessmentId,nextStep);
      });
    };

    return (
        <>
            <Button
              onClick={handleClick} 
              disabled={isPending}
              className="bg-green-500 hover:bg-green-600 ml-5"
            >
              {isPending ? 'Saving' : 'Next step'}
            </Button>
        </>
    )
}