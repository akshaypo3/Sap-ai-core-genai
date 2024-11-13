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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to archive the task?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          {/* Cancel only closes the child dialog */}
          <Button onClick={() => setIsOpen(false)} className="bg-green-500 hover:bg-green-600">
            Cancel
          </Button>
          <Button 
            onClick={handleArchive} 
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? 'Archiving...' : 'Archive'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
