"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { openAISchema } from "@/schemas/OpenAISchema";
import { editOpenAPI } from "@/lib/settings/administration/action";

export default function EditOpenAIButton({ id }: { id: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Initialize form with validation schema and default values
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(openAISchema),
    defaultValues: {
      api_key: id.API_Key || "",
      token: id.Token_Limit_per_Month || "",
    },
  });
  const { isValid } = form.formState; // Track if form is valid
  // Form submission handler
  const onSubmit = async (data: { api_key: string; token: string }) => {
    console.log("data", data);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("API_Key", data.api_key);
      formData.set("Token_Limit_per_Month", data.token);
      await editOpenAPI(id.id, formData);
      setIsOpen(false);
    });
  };

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="px-2 bg-green-600 h-9 hover:bg-green-900 rounded-md"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[500px]"
          aria-labelledby="dialog-title"
        >
          <DialogHeader>
            <DialogTitle id="dialog-title" className="text-center">
              Edit OpenAI
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input {...field} id="API_Key" autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Limit per Month</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="Token_Limit_per_Month"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex mt-5">
              <div className="flex-auto">
                <DialogClose asChild>
                  <Button
                    className="w-full"
                    type="submit"
                    //disabled={isPending}
                    disabled={!isValid || isPending} // Disable if form is invalid or saving
                  >
                    {isPending ? "Saving..." : "Save OpenAI"}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
