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
import { deleteTaskWithId } from '@/lib/task/action';
import { useTranslations } from 'next-intl';

export function DeleteTaskDialog({ taskId, isOpen, setIsOpen }: { taskId: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTaskWithId(taskId);
      setIsOpen(false);
    });
  };
  const t = useTranslations("tasks-com");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Delete Task")}</DialogTitle>
          <DialogDescription>
            {t("Are you sure you want to delete the task?")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => setIsOpen(false)} className="bg-green-500 hover:bg-green-600">
            {t("Cancel")}
          </Button>
          <Button 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? t('Deleting') : t('Delete')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}