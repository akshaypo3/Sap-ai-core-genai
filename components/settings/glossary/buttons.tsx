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

//Add for the Glossary english
export async function AddGlossaryButton(language) {
    let t = await getTranslations("settings-com")
    return (
      <Dialog>
        <DialogTrigger>
          <Button className="bg-black dark:bg-green-600 dark:text-neutral-50">Add Glossary</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Glossary</DialogTitle>
            <DialogDescription>Add Glossary Function Description</DialogDescription>
          </DialogHeader>
          <CreateGlossaryForm language={language}/>
        </DialogContent>
      </Dialog>
    );
  }