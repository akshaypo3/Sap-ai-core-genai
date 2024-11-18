"use client"

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"  
import { CircleHelp } from "lucide-react";
import { createRole } from "@/lib/settings/users/action";
// import { getTranslations } from "next-intl/server";
import { roleFormSchema } from "@/schemas/roleFormSchema";
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

interface CreateRoleFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRoleForm({ open, setOpen }: CreateRoleFormProps){

    function closeDialoge(){
        wait().then(() => setOpen(false));
    }

    const form = useForm<z.infer<typeof roleFormSchema>>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: {
          role: "",
          description: "",
        },
      });

    const onSubmit = async (data: z.infer<typeof roleFormSchema>) => {
        const formData = new FormData();
        formData.append("role", data.role);
        formData.append("description", data.description);
      
        await createRole(formData);
        closeDialoge()
    };
      
    // const t = await getTranslations("settings-com")
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                   <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                            <Input placeholder="role" {...field} />
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
                                Add Role
                            </Button>                
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
};