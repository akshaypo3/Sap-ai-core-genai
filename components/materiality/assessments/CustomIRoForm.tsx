"use client"

import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateCustomIRo } from "@/lib/assessments/action";
import { customIroFormSchema } from "@/schemas/customIroFormSchema";
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
    assesmentId: string
}

export default function CustomIRoForm({ open, setOpen, assesmentId }: CreateRoleFormProps) {

  function closeDialoge(){
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof customIroFormSchema>>({
    resolver: zodResolver(customIroFormSchema),
    defaultValues: {
      topic: "",
      sub_topic: "",
      sub_sub_topic:"",
      assesmentId: assesmentId
    },
  });

  const onSubmit = async (data: z.infer<typeof customIroFormSchema>) => {
    const formData = new FormData();
    formData.append("topic", data.topic);
    formData.append("sub_topic", data.sub_topic);
    formData.append("sub_sub_topic", data.sub_sub_topic);
    formData.append("assesmentId", data.assesmentId || ""); 
  
    await CreateCustomIRo(formData);
    closeDialoge()
  };

  return (
    <Form {...form}>
    <form
      className={`p-4`}
      onSubmit={form.handleSubmit(onSubmit)}
    >

      <div className="grid w-full items-center gap-1.5 mb-2">
      <FormField
        control={form.control}
        name="topic"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Topic</FormLabel>
            <FormControl>
            <Input placeholder="Klimawandel" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="sub_topic"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Sub Topic</FormLabel>
            <FormControl>
            <Input placeholder="Anpassung an den Klimawandel" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="sub_sub_topic"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Sub Sub Topic</FormLabel>
            <FormControl>
            <Input placeholder="Wuestenbildung" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
      />
      <Input type="hidden" name="assesmentId" value={assesmentId}/>
        <div className="flex mt-5">
          <div className="flex-auto">
              <Button className="w-full" type="submit">
               Add Custom IRo
              </Button>
          </div>
        </div>
      </div>
    </form>
    </Form>
  );
}
