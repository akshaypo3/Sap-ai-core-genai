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

  export function AssessmentsActionsMenu({ id }: { id: string }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant="outline" className="px-3 border-none">...</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/materiality/assessments/${id}`} className="hover:cursor-pointer">
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