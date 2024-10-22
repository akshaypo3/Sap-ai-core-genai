import { createGroup } from "@/lib/settings/users/action";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function CreateGroupForm() {
  return (
    <form action={createGroup}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" />
        <Label htmlFor="description">Description</Label>
        <Input type="text" name="description" />
        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                Create Group
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
