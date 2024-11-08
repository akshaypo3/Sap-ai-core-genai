import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createStakeholderUser } from "@/lib/stakeholders/action";
import { getTranslations } from "next-intl/server";
// import { getUserProfiles } from "@/lib/task/data";

export default async function CreateUserForm({
  assessmentId,
  stakeHolderId,
}: {
  assessmentId: string;
  stakeHolderId: string;
}) {
  return (
    <form action={createStakeholderUser}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Input type="hidden" value={assessmentId} name="assessmentId" />
        <Input type="hidden" value={stakeHolderId} name="stakeHolderId" />
        <Label htmlFor="email">Email</Label>
        <Input type="text" name="email" placeholder="youremail@gmail.com"/>
        <Label htmlFor="password">Password</Label>
        <Input type="password"  name="password" placeholder="Password"/>
        <Label htmlFor="group">Group</Label>
        <Input type="text"  name="group" value="stakeholder" readOnly/>
        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                Add User
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
