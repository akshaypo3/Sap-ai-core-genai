"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { createQuestion } from "@/lib/settings/frameworkEditor/action"; 
import { questionSchema } from "@/schemas/questionSchema"; 

const AddQuestionsForm = () => {
  const form = useForm({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const result = await createQuestion(data);
      if (result.success) {
        console.log("Question added successfully:", result.data);
      } else {
        console.error("Error while adding question:", result.error);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-md border">
        <FormField
          control={form.control}
          name="section_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter section code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter question code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter question text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order_index"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Index</FormLabel>
              <FormControl>
                <Input placeholder="Enter order index" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-black text-white hover:bg-gray-800 w-full"
        >
          Add Question
        </Button>
      </form>
    </Form>
  );
};

export default AddQuestionsForm;
