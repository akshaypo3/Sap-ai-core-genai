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
import { deleteUser} from "@/lib/settings/users/action";
import { useTranslations } from 'next-intl';

export function DeleteUserButton({ id }: { id: string }) {
  const t = useTranslations("settings-com")
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const id1=id.userId;
  
  const handleDelete = () => {
    startTransition(async () => {
      await deleteUser(id1);
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
          <DialogTitle className="text-center">{t("Delete user")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              {t("Are you sure to delete the user:")}
              <b className="font-bold text-lg font-semibold text-red-600">
                {id.name} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setIsOpen(false)}>{t("Cancel")}</Button>
            <Button 
              onClick={handleDelete} 
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? t('Deleting') : t('Delete User')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}