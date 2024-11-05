'use client';
import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { editAnthropic, editOpenAPI } from '@/lib/settings/administration/action';

export default function EditOpenAIButton({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // State for editable fields
  const [apiKey, setApiKey] = useState(id.API_Key || '');
  const [tokenLimit, setTokenLimit] = useState(id.Token_Limit_per_Month || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.set('API_Key', apiKey);
      formData.set('Token_Limit_per_Month', tokenLimit);
      await editOpenAPI(id.id, formData);
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
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" aria-labelledby="dialog-title">
        <DialogHeader>
          <DialogTitle id="dialog-title" className="text-center">Edit OpenAI</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="API_Key">API Key</Label>
              <input
                id="API_Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input  px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Token_Limit_per_Month">Token Limit per Month</Label>
              <input
                id="Token_Limit_per_Month"
                value={tokenLimit}
                onChange={(e) => setTokenLimit(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex-auto">
              <DialogClose asChild>
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save OpenAI'}
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
