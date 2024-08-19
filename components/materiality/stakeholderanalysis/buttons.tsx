

import { Button } from "@/components/ui/button"
import { createStakeholder, createStakeholderGroup } from "@/lib/stakeholders/action"

async function handleCreateStakeholder(){
    try {
      const result = await createStakeholder();
      console.log("Stakeholder added: "+result)
    } catch (error) {
      console.error("Error while creating new stakeholder: "+error)
    }
  };

export async function AddStakeholderButton(){
    return (
    <form action={createStakeholder}>
        <button type="submit" className="bg-green-600">Add Stakeholder</button>
    </form>
    )
};

export async function AddStakeholderGroupButton(){
  return (
    <form action={createStakeholderGroup}>
        <Button type="submit" className="bg-green-600">Add Group</Button>
    </form>
  )
}