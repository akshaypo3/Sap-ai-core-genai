import { useState } from 'react';
import { useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { deleteGlossary } from '@/lib/settings/administration/action';

export function DeleteGlossaryButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const id1=id.id;
  const lang = id.language;
 
  
  const handleDelete = () => {
    startTransition(async () => {
      await deleteGlossary(id1,lang);
      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-2 h-7 rounded-md bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900"
        >
          <Trash2 className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete Glossary</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="title" className="text-center">
              Are you sure to delete the Glossary:{" "}
              <b className="font-bold text-lg font-semibold text-red-600">
                {id.title} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleDelete} 
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete Glossary'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}