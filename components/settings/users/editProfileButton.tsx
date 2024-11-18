"use client";

import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { editProfile } from "@/lib/settings/users/action";
import { getAllUsers } from "@/lib/settings/users/action";
import { useEffect, useState } from "react";
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
import { profileSchema } from "@/schemas/profileFormSchema";

interface EditProfileFormProps {
  data2: { data1: any[] };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProfileForm({
  data2,
  open,
  setOpen,
}: EditProfileFormProps) {
  const [profileData, setProfile] = useState<any[]>([]);

  const ediprofileData = data2?.data1?.[0];

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: ediprofileData?.username || "",
      userEmail: ediprofileData?.userEmail || "",
    },
  });

  useEffect(() => {
    //const profileData = Data.data2.data1[0];
    const fetchData = async () => {
      const users = await getAllUsers();
      setProfile(users);
    };

    fetchData();
  }, [data2]);

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("userEmail", data.userEmail);

      const response = await editProfile(formData);
      // Close dialog box

      form.reset({
        username: "",
        userEmail: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2 ">
          <div className="w-full">
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Email List</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={ediprofileData?.userEmail || ""}
                      disabled
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={ediprofileData?.userEmail || ""}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {profileData.map((user) => (
                          <SelectItem key={user.id} value={user.email}>
                            {user.email || "NA"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div>
              <Label htmlFor="userEmail">User Email List</Label>

              <Select
                name="userEmail"
                defaultValue={fetchData?.userEmail || ""}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Default Email"
                    defaultValue={fetchData?.userEmail || ""}
                  />
                </SelectTrigger>
                <SelectContent>
                  {profileData?.map((user) => (
                    // <SelectItem key={user.id} value={user.id}>{user.user_metadata?.full_name || user.email.substring(0, user.email.indexOf('@'))}</SelectItem>
                    <SelectItem key={user.id} value={user.email}>
                      {user.email}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    //placeholder="Username"
                    autoComplete="off"
                    {...field}
                    defaultValue={ediprofileData?.username || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Label htmlFor="name" className="space-y-2 m-2">
            User Name
          </Label>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={fetchData?.username || ""}
          /> */}
          <div className="flex mt-5">
            <div className="flex-auto">
              <DialogClose asChild>
                <Button type="submit" className="w-full">
                  Save Profile
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
