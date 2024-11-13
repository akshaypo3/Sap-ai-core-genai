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
import { ArchiveTaskWithId, deleteTaskWithId } from '@/lib/task/action';

export function ArchiveTaskDialog({ taskId, isOpen, setIsOpen }: { taskId: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const [isPending, startTransition] = useTransition();

  const handleArchive = () => {
    startTransition(async () => {
      await ArchiveTaskWithId(taskId);
      setIsOpen(false);
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