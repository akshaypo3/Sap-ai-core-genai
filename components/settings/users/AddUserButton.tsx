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
        <Button className="bg-black dark:bg-green-600 dark:text-neutral-50">
          {t("Add User")}
        </Button>
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
