'use client';

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
import { ArchiveTaskWithId } from '@/lib/task/action';
import { useTranslations } from 'next-intl';

export function ArchiveTaskButtonDialog({
  taskId,
  isOpen,
  setIsOpen,
  handleCloseBoth
}: {
  taskId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCloseBoth: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleArchive = () => {
    startTransition(async () => {
      await ArchiveTaskWithId(taskId);
      handleCloseBoth(); // Close both the parent and child dialogs
    });
  };

  const t = useTranslations('tasks-com')

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Archive Task")}</DialogTitle>
          <DialogDescription>
            {t("Are you sure you want to archive the task?")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          {/* Cancel only closes the child dialog */}
          <Button onClick={() => setIsOpen(false)} className="bg-green-500 hover:bg-green-600">
            {t("Cancel")}
          </Button>
          <Button 
            onClick={handleArchive} 
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? t('Archiving') : t('Archive')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
