"use client"

import React from 'react';
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createStakeholderQuestions } from '@/lib/stakeholders/action';
import { stakeholderQuestionFormSchema  } from "@/schemas/stakeholderQuestionFormSchema";
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
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface stakeholderQuestionFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: any
}

export default function AddStackholderquestionsForm({ open, setOpen, id }: stakeholderQuestionFormProps) {
    
    const Assessmentid = id;
    const Createquestion = createStakeholderQuestions.bind(null, Assessmentid);

    function closeDialoge(){
        wait().then(() => setOpen(false));
    }

    const form = useForm<z.infer<typeof stakeholderQuestionFormSchema>>({
        resolver: zodResolver(stakeholderQuestionFormSchema),
        defaultValues: {
        question: "",
        mandatory: true,
        },
    });

    const onSubmit = async (data: z.infer<typeof stakeholderQuestionFormSchema>) => {
        const formData = new FormData();
        formData.append("question", data.question);
        formData.append("mandatory", String(data.mandatory));
    
        await Createquestion(formData);
        closeDialoge()
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-1.5 mb-2">
               <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter question" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
          control={form.control}
          name="mandatory"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Mandatory</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={field.value ? "true" : "false"}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">True</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">False</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                {/* <Label htmlFor="question"> Question</Label>
                <Input type="text" id="question" name="question" required/>
                &nbsp;
                <Label htmlFor="mandatory">Mandatory</Label>
<div>
    <label>
        <input type="radio" name="mandatory" value="true" />
        &nbsp;True&nbsp;
    </label>
    <label>
        <input type="radio" name="mandatory" value="false" />
        &nbsp;False
    </label>
</div> */}


                <div className="flex mt-5">
                    <div className="flex-auto">
                        <Button className="w-full" type="submit">
                            Add Stackholder question
                        </Button>
                    </div>
                </div>
                
            </div>
        </form>
        </Form>
    )
}

