"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import CreateUserForm from "@/components/settings/users/CreateUserForm";
import { deleteUser, editUserRoleGroup } from "@/lib/settings/users/action";
import { Label } from "@/components/ui/label";
import EditProfileForm from "@/components/settings/users/editProfileButton";
import { getUserGroups, getRoles, getProfile } from "@/lib/settings/users/data";
import { useTranslations } from "next-intl";
import { getTranslations } from 'next-intl/server';
import CreateGlossaryForm from "./CreateGlossaryForm";
import { useState } from "react";

//Add for the Glossary english
export function AddGlossaryButton(language:any) {
   const [open, setOpen] = useState(false);
    let t = useTranslations("settings-com")
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
        <div className="px-4 py-2 bg-black text-white font-semibold rounded-md text-sm cursor-pointer hover:bg-gray-800">
          Add Glossary
            </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Glossary</DialogTitle>
            <DialogDescription>Add Glossary Function Description</DialogDescription>
          </DialogHeader>
          <CreateGlossaryForm language={language} open={open} setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    );
  }