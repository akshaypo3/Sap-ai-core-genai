"use client"

import { useState } from "react";
import { createGroup } from "@/lib/settings/users/action";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { groupFormSchema } from "@/schemas/groupFormSchema";
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

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface CreateGroupFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateGroupForm({ open, setOpen }: CreateGroupFormProps) {
  
  function closeDialoge(){
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof groupFormSchema>>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof groupFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
  
    await createGroup(formData);
    closeDialoge()
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
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
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex mt-5">
            <div className="flex-auto">
                <Button className="w-full" type="submit">
                  Create Group
                </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
