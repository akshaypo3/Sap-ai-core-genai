"use client"

import { useState } from 'react';
import { useTransition } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteAssessmentWithId } from '@/lib/assessments/action'; 
import { useTranslations } from 'next-intl';

export function DeleteAssessmentDialog({ assessmentId, isOpen, setIsOpen }: { assessmentId: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAssessmentWithId(assessmentId);
      setIsOpen(false);
    });
  };
  const  t = useTranslations("materiality-com")
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("assessment.Delete Assessment")}</DialogTitle>
          <DialogDescription>
            {t("assessment.Are you sure you want to delete the assessment?")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => setIsOpen(false)} className="bg-green-500 hover:bg-green-600">
            {("assessment.Cancel")}
          </Button>
          <Button 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? t('assessment.Deleting') : t('assessment.Delete')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}