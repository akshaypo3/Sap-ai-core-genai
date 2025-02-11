import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createStakeholderUser } from "@/lib/stakeholders/action";
// import { getUserProfiles } from "@/lib/task/data";

export default function CreateUserForm({
  assessmentId,
  stakeHolderId,
  stakeholderName
}: {
  assessmentId: string;
  stakeHolderId: string;
  stakeholderName: string
}) {
  return (
    <form action={createStakeholderUser}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Input type="hidden" value={assessmentId} name="assessmentId" />
        <Input type="hidden" value={stakeHolderId} name="stakeHolderId" />
        <Input type="hidden" value={stakeholderName} name="stakeholderName" />
        <Label htmlFor="email">Email</Label>
        <Input type="text" name="email" placeholder="stakeholderemail@gmail.com" autoComplete="off"/>
        <Label htmlFor="password">Password</Label>
        <Input type="password"  name="password"  placeholder="Password" autoComplete="new-password"/>
        <Label htmlFor="group">Group</Label>
        <Input type="text"  name="group" value="Stakeholder" readOnly/>
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
