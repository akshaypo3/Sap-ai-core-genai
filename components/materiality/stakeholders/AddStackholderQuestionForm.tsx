import React from 'react';
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createStakeholderQuestions } from '@/lib/stakeholders/action';

export default async function AddStackholderquestionsForm(id:any) {
    
    const Assessmentid = id.id.id.id;
    const Createquestion = createStakeholderQuestions.bind(null, Assessmentid);
    return (
        <form action={Createquestion}>
            <div className="grid w-full items-center gap-1.5 mb-2">
                <Label htmlFor="question"> Question</Label>
                <Input type="text" id="question" name="question" required/>
                &nbsp;
                <Label htmlFor="mandatory">Mandatory</Label>
<div>
    <label>
        <input type="radio" name="mandatory" value="true" />
        &nbsp;True&nbsp;
    </label>
    <label>
        <input type="radio" name="mandatory" value="false" />
        &nbsp;False
    </label>
</div>


                <div className="flex mt-5">
                    <div className="flex-auto">
                        <DialogClose asChild>
                        <Button className="w-full" type="submit">
                            Add Stackholder question
                        </Button>
                        </DialogClose>
                    </div>
                </div>
                
            </div>
        </form>
    )
}

