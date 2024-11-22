"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import SendMailForm from "@/components/settings/emailTemp/SendMailForm";

const wait = () => new Promise((resolve) => setTimeout(resolve, 20));

interface AddTaskFormProps {
  createdId: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTaskForm({ createdId, open, setOpen }: AddTaskFormProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [createdByUser, setCreatedByUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);
  const [status, setStatus] = useState("TODO");

  function closeDialoge() {
    wait().then(() => setOpen(false));
  }

  useEffect(() => {
    const fetchData = async () => {
      const userProfiles = await getUserProfiles();
      setUsers(userProfiles);

      const extractedCreatedId = createdId?.createdId;
      const user = userProfiles.find((user) => user.id === extractedCreatedId);
      setCreatedByUser(user);
    };

    fetchData();
  }, [createdId]);

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assigned_to: "",
      created_by: createdByUser?.id || "",
      status: "TODO",
      start_date: "",
      due_date: "",
    },
  });

  const { handleSubmit, control, formState: { errors }, setValue } = form;

  async function onSubmit(data) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("assigned_to", data.assigned_to);
      formData.append("created_by", createdByUser.id);
      formData.append("status", data.status);
      formData.append("start_date", data.start_date);
      formData.append("due_date", data.due_date);

      const response = await createTask(formData);

      setTaskCreated(true);
      closeDialoge();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "DONE" && taskCreated) {
      const assignedUser = users.find(user => user.id === form.getValues("assigned_to"));
      if (assignedUser) {
        const taskLink = `http://localhost:3000/task`; 
        const category = "createTaskForm";

        // Trigger SendMailForm when task status is DONE
        <SendMailForm
          recipientEmail={assignedUser.userEmail}
          placeholders={{
            name: assignedUser.username,
            taskName: form.getValues("title"),
            taskLink: taskLink,
            category: category,
          }}
        />;
      }
    }
  }, [status, taskCreated, form, users]);

  if (users.length === 0 || !createdByUser) {
    return <div>Loading...</div>;
  }

  const assignedUser = users.find(user => user.id === form.getValues("assigned_to"));
  const taskLink = "http://localhost:3000/task"; 
  const category = "createTaskForm";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <FormField control={control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Task Title" {...field} />
              </FormControl>
              <FormMessage>{errors.title?.message}</FormMessage>
            </FormItem>
          )} />

          <FormField control={control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Task Description" {...field} />
              </FormControl>
              <FormMessage>{errors.description?.message}</FormMessage>
            </FormItem>
          )} />

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

          <FormField control={control} name="start_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage>{errors.start_date?.message}</FormMessage>
            </FormItem>
          )} />

          <FormField control={control} name="due_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage>{errors.due_date?.message}</FormMessage>
            </FormItem>
          )} />

          <div className="flex mt-5">
            <div className="flex-auto">
              <Button className="w-full" type="submit">
                {loading ? "Adding..." : "Add Task"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {taskCreated && assignedUser && (
        <SendMailForm
          recipientEmail={assignedUser.userEmail}
          placeholders={{
            name: assignedUser.username,
            taskName: form.getValues("title"),
            taskLink: taskLink,
            category: category,
          }}
        />
      )}
    </Form>
  );
}
