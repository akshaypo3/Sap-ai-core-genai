"use client"

import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createGlossary } from "@/lib/settings/administration/action";
import { glossaryFormSchema } from "@/schemas/glossaryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface CreateGlossaryFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  language: any;
}

export default function CreateGlossaryForm({ open, setOpen, language }: CreateGlossaryFormProps) {

  function closeDialog() {
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof glossaryFormSchema>>({
    resolver: zodResolver(glossaryFormSchema),
    defaultValues: {
      title: "",
      description: "",
      language: language.language || "",  // Set the language prop correctly
    },
  });

  const onSubmit = async (data: z.infer<typeof glossaryFormSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("language", data.language || "");  // Pass language properly
    
    await createGlossary(formData); // Make sure this function is working
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          {/* Title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message} {/* Display validation error */}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" rows={4} {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description?.message} {/* Display validation error */}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Hidden Language input */}
          <Input type="hidden" name="language" value={language.language || ""} />

        </div>

        <div className="flex mt-5">
          <div className="flex-auto">
            <Button className="w-full" type="submit">
              Create Glossary
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
