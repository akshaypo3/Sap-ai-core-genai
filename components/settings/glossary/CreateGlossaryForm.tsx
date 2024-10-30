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
import { createGlossary } from "@/lib/settings/administration/action";


export default async function CreateGlossaryForm(language){
    const language1=language.language.language
    return (
        <form action={createGlossary}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" name="title" placeholder="Title"/>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                    id="description"
                    name="description"
                    rows="4" // Set the number of rows as needed
                    className="flex h-32 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
                 {/* Hidden input for language */}
                 <input type="hidden" name="language" value={language1} />
                    </div>                                   
                      <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                               Create Glossary
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
            </form>
    )
};