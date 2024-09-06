import { Label } from "@/components/ui/label";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser} from "@/lib/settings/users/action";


export default async function CreateUserForm(){
    return (
        <form action={createUser}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="name">Email</Label>
                    <Input type="text" name="email" placeholder="Email"/>
                    <Label htmlFor="description">Password</Label>
                    <Input type="text" name="password" placeholder="Password"/>

                      <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                               Create User
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};