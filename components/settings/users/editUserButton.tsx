import { Label } from "@/components/ui/label";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { editUserRoleGroup} from "@/lib/settings/users/action";
import { getAllUsers,getUserGroups,getRoles,getProfile,getProfileByID } from "@/lib/settings/users/data";
import { getTranslations } from "next-intl/server";

interface clickID {
    id: number;
  }

export default async function EditUserForm(clickID:any){
    //const users = await getAllUsers();
    const groups = await getUserGroups();
    const roles = await getRoles();
    //const profile = await getProfile();
    const profilebyID= await getProfileByID(clickID);
    console.log("SelectedID",clickID);
    const t = await getTranslations("settings-com")
        return (
        <form action={editUserRoleGroup}>
                <div className="grid w-full items-center gap-1.5 mb-2 ">
                <Label htmlFor="userEmail">{t("UserfEmail")}</Label>
                <Input type="text" name="userEmail" />
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
                               {t("Save Profile")}
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};