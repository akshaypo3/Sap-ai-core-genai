"use server"

import { createClient } from "@/utils/supabase/server";
const supabase = createClient()

export async function createStakeholder(){
    const newStakeholder = await supabase.from('stakeholders').insert(
      {name:"Test1",description:"test desc1",group_id:"95ef2a35-d6e4-4579-913d-b59e01a3b214"}
    );
    console.log("Create Stakeholder: "+JSON.stringify(newStakeholder))
    //return newStakeholder;
};

export async function createStakeholderGroup(){
  const newStakeholderGroup = await supabase.from('stakeholder_groups').insert(
    {
      group:"Test Group",
      description:"Test Group description"
    }
  )
  console.log("Create Stakeholder Group: "+JSON.stringify(newStakeholderGroup))
}