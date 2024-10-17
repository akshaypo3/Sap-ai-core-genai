"use client"

import { useTransition } from 'react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import Link from 'next/link';
  import { DeleteAssessmentButton } from '@/components/materiality/assessments/DeleteAssessmentButton';
  import { DeleteAssessmentDialog } from '@/components/materiality/assessments/DeleteAssessmentDialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

  export function AssessmentsActionsMenu({ id,step }: { id: string, step:string }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const t = useTranslations("materiality-com")
    console.log("Step:",step)  
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant="outline" className="px-3 border-none">...</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t("assessment.Actions")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/materiality/assessments/${id}/${step}`} className="hover:cursor-pointer">
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="hover:cursor-pointer">
              {t("assessment.Delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteAssessmentDialog 
          assessmentId={id} 
          isOpen={showDeleteDialog} 
          setIsOpen={setShowDeleteDialog}
        />
      </>
    );
  }