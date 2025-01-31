"use client";

import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useState } from "react";
import { userSchema } from "@/schemas/userFormSchema";
import {
  getUserGroups,
  getRoles,
  createUser,
} from "@/lib/settings/users/action";

const wait = () => new Promise((resolve) => setTimeout(resolve, 20));

interface CreateUserFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateUserForm({ open, setOpen }: CreateUserFormProps) {
  const [groupsData, setGroups] = useState<any[]>([]);
  const [rolesData, setRoles] = useState<any[]>([]);

  function closeDialoge() {
    wait().then(() => setOpen(false));
  }

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      groupID: "",
      roleID: "",
    },
  });

  useEffect(() => {
    form.reset({
      email: "",
      password: "",
      groupID: "",
      roleID: "",
    });
    const fetchData = async () => {
      const groupsData = await getUserGroups();
      setGroups(groupsData);
      const rolesData = await getRoles();
      setRoles(rolesData);
    };

    fetchData();
  }, []);

  async function onSubmit(data) {
    try {
      const selectedGroup = groupsData.find(group => group.id === data.groupID);
      const selectedRole = rolesData.find(role => role.id === data.roleID);

      const formData = new FormData();
      formData.append("name", data.email);
      formData.append("password", data.password);
      formData.append("groupID", data.groupID);
      formData.append("roleID", data.roleID);
      formData.append("groupName", selectedGroup ? selectedGroup.group : "NA");
      formData.append("roleName", selectedRole ? selectedRole.role : "NA");

      const response = await createUser(formData);
      closeDialoge();
      form.reset({
        email: "",
        password: "",
        groupID: "",
        roleID: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupsData.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.group || "NA"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="roleID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {rolesData.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.role || "NA"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <DialogClose asChild> */}
        <div className="flex justify-center mt-4">
          <Button type="submit" className="w-full max-w-xs">
            Create User
          </Button>
        </div>

        {/* </DialogClose> */}
      </form>
    </Form>
  );
}
