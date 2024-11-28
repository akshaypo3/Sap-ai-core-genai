"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addQuestionColumn } from "@/lib/settings/frameworkEditor/action";
import { questionColumnFormSchema } from "@/schemas/QuestionColumnFormSchema";
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

interface CreateQuestionColumnFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateQuestionColumns({
  open,
  setOpen,
}: CreateQuestionColumnFormProps) {
  function closeDialoge() {
    wait().then(() => setOpen(false));
  }

  const form = useForm<z.infer<typeof questionColumnFormSchema>>({
    resolver: zodResolver(questionColumnFormSchema),
    defaultValues: {
      name: "",
      questionId: "10e6ef2c-8e42-4598-bc01-50e437a3194a",
    },
  });

  const onSubmit = async (data: z.infer<typeof questionColumnFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("questionId", data.questionId || "");

    await addQuestionColumn(formData);
    closeDialoge();
  };

  const QUESTION_ID = "10e6ef2c-8e42-4598-bc01-50e437a3194a";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Column Name</FormLabel>
                <FormControl>
                  <Input placeholder="Total locations" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Input type="hidden" name="questionId" value={form.getValues("questionId")} /> */}
          <Input type="hidden" name="questionId" value={QUESTION_ID} />
          <div className="flex mt-5">
            <div className="flex-auto">
              <Button className="w-full" type="submit">
                Add Column
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
