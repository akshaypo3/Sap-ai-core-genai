"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { taskFormSchema } from "@/schemas/taskFormSchema";
import { z } from "zod";
import { createTask } from "@/lib/task/action";
import { getUserProfiles } from "@/lib/task/data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const wait = () => new Promise((resolve) => setTimeout(resolve, 20));

interface AddTaskFormProps {
  createdId: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTaskForm({ createdId,open,setOpen }: AddTaskFormProps) {
  const [users, setUsers] = useState<any[]>([]);  // State for storing fetched users
  const [createdByUser, setCreatedByUser] = useState<any | null>(null);  // State for storing 'created_by' user
  const [loading, setLoading] = useState(false);

  function closeDialoge(){
    wait().then(() => setOpen(false));
  }
  // Fetch users and set the createdByUser when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const userProfiles = await getUserProfiles();  // Fetch user profiles
      setUsers(userProfiles);

      // Set createdByUser based on `createdId`
      const extractedCreatedId = createdId?.createdId;
      const user = userProfiles.find((user) => user.id === extractedCreatedId);
      setCreatedByUser(user);
    };

    fetchData();
  }, [createdId]);  // Fetch only when createdId changes

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assigned_to: "",
      created_by: createdByUser?.id || "",
      status: "TODO", // Default status is TODO
      start_date: "",
      due_date: "",
    },
  });

  const { handleSubmit, control, formState: { errors } } = form;

  async function onSubmit(data) {
    try {
      setLoading(true); // Set loading state to true when submitting
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("assigned_to", data.assigned_to);
      formData.append("created_by", createdByUser.id);
      formData.append("status", data.status);
      formData.append("start_date", data.start_date);
      formData.append("due_date", data.due_date);

      const response = await createTask(formData);
      closeDialoge();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false); 
    }
  }
  // If users or createdByUser is still loading, you can show a loading spinner or message.
  if (users.length === 0 || !createdByUser) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          {/* Task Title Field */}
          <FormField control={control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Task Title" {...field} />
              </FormControl>
              <FormMessage>{errors.title?.message}</FormMessage>
            </FormItem>
          )} />

          {/* Description Field */}
          <FormField control={control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Task Description" {...field} />
              </FormControl>
              <FormMessage>{errors.description?.message}</FormMessage>
            </FormItem>
          )} />

          {/* Assigned To Field */}
          <FormField control={control} name="assigned_to" render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.username || "NA"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.assigned_to?.message}</FormMessage>
            </FormItem>
          )} />

          {/* Created By Field */}
          <FormField control={control} name="created_by" render={({ field }) => (
            <FormItem>
              <FormLabel>Created By</FormLabel>
              {createdByUser ? (
                <>
                  <Input
                    type="text"
                    name="created_by_display"
                    defaultValue={createdByUser.username || "Unknown"}
                    readOnly
                  />
                  <Input type="hidden" name="created_by" value={createdByUser.id} />
                </>
              ) : (
                <p>User not found</p>
              )}
            </FormItem>
          )} />

          {/* Start Date Field */}
          <FormField control={control} name="start_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage>{errors.start_date?.message}</FormMessage>
            </FormItem>
          )} />

          {/* Due Date Field */}
          <FormField control={control} name="due_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage>{errors.due_date?.message}</FormMessage>
            </FormItem>
          )} />

          {/* Submit Button */}
          <div className="flex mt-5">
            <div className="flex-auto">
                <Button className="w-full" type="submit">
                {loading ? "Adding..." : "Add Task"}
                </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
