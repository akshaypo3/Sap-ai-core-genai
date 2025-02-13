"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import CreateUserForm from "@/components/settings/users/CreateUserForm";
import EditProfileForm from "@/components/settings/users/editProfileButton";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { useState } from "react";

export function AddUserButton() {
  const [open, setOpen] = useState(false);
  let t = useTranslations("settings-com");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <div className="px-4 py-2 bg-black text-white font-semibold rounded-md text-sm cursor-pointer hover:bg-gray-800">
        {t("Add User")}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Add User Function Description</DialogDescription>
        </DialogHeader>
        <CreateUserForm open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export function EditProfileButton(Profile: any) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("settings-com");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Edit Profile Function Description
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm data2={Profile} open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
