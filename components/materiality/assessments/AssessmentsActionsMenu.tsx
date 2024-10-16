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
import { useTranslations } from 'use-intl';

  export function AssessmentsActionsMenu({ id }: { id: string }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const t = useTranslations("materiality-com")
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant="outline" className="px-3 border-none">...</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t("assessment.Actions")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/materiality/assessments/${id}`} className="hover:cursor-pointer">
                {t("assessment.View")}
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