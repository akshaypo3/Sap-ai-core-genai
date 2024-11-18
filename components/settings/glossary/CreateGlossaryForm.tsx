"use client"

import { Label } from "@/components/ui/label";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser} from "@/lib/settings/users/action";
import { getAllUsers,getUserGroups,getRoles,getProfile } from "@/lib/settings/users/data";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { createGlossary } from "@/lib/settings/administration/action";
import { glossaryFormSchema } from "@/schemas/glossaryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface CreateGlossaryFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    language: any
}

export default function CreateGlossaryForm({ open, setOpen, language }: CreateGlossaryFormProps){

  function closeDialoge(){
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof glossaryFormSchema>>({
    resolver: zodResolver(glossaryFormSchema),
    defaultValues: {
      title: "",
      description: "",
      language: language
    },
  });

  const onSubmit = async (data: z.infer<typeof glossaryFormSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("language", data.language || "")
  
    await createGlossary(formData);
    closeDialoge()
  };

    const language1=language.language.language
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-1.5 mb-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                        <Input placeholder="title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="description" rows={4} {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Input type="hidden" name="language" value={language1}/>
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
    )
};