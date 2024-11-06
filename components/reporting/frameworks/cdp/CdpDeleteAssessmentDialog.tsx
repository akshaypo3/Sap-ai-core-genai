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
import { deleteCdpAssessmentWithId } from '@/lib/frameworks/action';
import { useTranslations } from 'next-intl';

export function CdpDeleteAssessmentDialog({ assessmentId, isOpen, setIsOpen }: { assessmentId: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteCdpAssessmentWithId(assessmentId);
      setIsOpen(false);
    });
  };

  const t = useTranslations("reporting-com")

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("cdp.Delete CDP Assessment")}</DialogTitle>
          <DialogDescription>
            {t("cdp.Are you sure you want to delete the assessment?")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => setIsOpen(false)} className="bg-green-500 hover:bg-green-600">
            {t("cdp.Cancel")}
          </Button>
          <Button 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? t('cdp.Deleting') : t('cdp.Delete')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}