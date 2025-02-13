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
    console.log("Step:",step)  
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger><div className="px-3 border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-md cursor-pointer">...</div></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/materiality/assessments/${id}/${step}`} className="hover:cursor-pointer">
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="hover:cursor-pointer">
              Delete
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