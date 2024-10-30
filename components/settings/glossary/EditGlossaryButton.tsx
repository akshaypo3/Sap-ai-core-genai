'use client';
import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { editLocationIRO } from '@/lib/company/action';
import { editGlossary } from '@/lib/settings/administration/action';

export default function EditGlossaryButton({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState(id.description || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      formData.set('description', description);
      await editGlossary(id.id,id.language, formData);
      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="px-2 bg-green-600 h-9 hover:bg-green-900 rounded-md"
        >
          <Pencil className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle id="dialog-title" className="text-center">Edit Glossary</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Title</label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-gray-200 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={id.title}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex h-32 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="dialog-description"
              />
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex-auto">
              <DialogClose asChild>
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save Glossary'}
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
