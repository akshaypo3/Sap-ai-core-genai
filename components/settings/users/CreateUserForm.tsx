import { Label } from "@/components/ui/label";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser} from "@/lib/settings/users/action";
import { getAllUsers,getUserGroups,getRoles,getProfile } from "@/lib/settings/users/data";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { getTranslations } from "next-intl/server";

export default async function CreateUserForm(){
    const t = await getTranslations("settings-com")
    const groups = await getUserGroups();
    const roles = await getRoles();
    return (
        <form action={createUser}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="name">{t("Email")}</Label>
                    <Input type="text" name="email" placeholder={t("Email")}/>
                    <Label htmlFor="description">{t("Password")}</Label>
                    <Input type="text" name="password" placeholder={t("Password")}/>
                    <div className="w-full">
                        <div>
                            <Label htmlFor="groupID">{t("Group")}</Label>
                            <Select name="groupID">
                                <SelectTrigger>
                                    <SelectValue placeholder={t("Default Group")}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {groups?.map((group) =>(
                                        <SelectItem key={group.id} value={group.id}>{group.group || t('NA')}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="w-full">
                        <div>
                            <Label htmlFor="roleID">{t("Role")}</Label>
                            <Select name="roleID">
                                <SelectTrigger>
                                    <SelectValue placeholder={t("Default Role")}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {roles?.map((role) =>(
                                        <SelectItem key={role.id} value={role.id}>{role.role || t('NA')}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>                                      

                      <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                               {t("Create User")}
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};