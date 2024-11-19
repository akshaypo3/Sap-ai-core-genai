"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { editAnthropic } from "@/lib/settings/administration/action";
import { editAnthropicSchema } from "@/schemas/editAnthropicSchema";

export default function EditAnthropicButton({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<any>(null);

  const [apiKey, setApiKey] = useState(id.API_Key || "");
  const [model, setModel] = useState(id.Model || "");
  const [tokenLimit, setTokenLimit] = useState(id.Token_Limit_per_Month || "");

  const models = [
    { value: "claude-3-5-sonnet-20241022", label: "claude-3-5-sonnet-20241022" },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const parsedTokenLimit = Number(tokenLimit);

    const result = editAnthropicSchema.safeParse({
      API_Key: apiKey,
      Model: model,
      Token_Limit_per_Month: parsedTokenLimit,
    });

    if (!result.success) {
      setErrors(result.error.errors);
      return;
    }

    setErrors(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.set("API_Key", apiKey);
      formData.set("Model", model);
      formData.set("Token_Limit_per_Month", parsedTokenLimit.toString());
      await editAnthropic(id.id, formData);
      setIsOpen(false);
    });
  };

  const getErrorMessage = (field: string) =>
    errors?.find((error) => error.path?.[0] === field)?.message;

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
          <DialogTitle id="dialog-title" className="text-center">
            Edit Anthropic
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="API_Key">API Key</Label>
              <input
                id="API_Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              {getErrorMessage("API_Key") && (
                <span className="text-red-500 text-xs">
                  {getErrorMessage("API_Key")}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Model">Model</Label>
              <select
                id="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select a model
                </option>
                {models.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              {getErrorMessage("Model") && (
                <span className="text-red-500 text-xs">
                  {getErrorMessage("Model")}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Token_Limit_per_Month">
                Token Limit per Month
              </Label>
              <input
                id="Token_Limit_per_Month"
                value={tokenLimit}
                onChange={(e) => setTokenLimit(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              {getErrorMessage("Token_Limit_per_Month") && (
                <span className="text-red-500 text-xs">
                  {getErrorMessage("Token_Limit_per_Month")}
                </span>
              )}
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex-auto">
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Anthropic"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
  