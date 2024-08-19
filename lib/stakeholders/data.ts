import { createClient } from "@/utils/supabase/server";
const supabase = createClient()

export async function getStakeholders(){
    const { data: stakeholders } = await supabase.from('stakeholders').select(`
        id,
        name,
        description,
        interest_score,
        influence_score,
        knowledge_score,
        relevance_score,
        stakeholder_groups (
          group,
          description
        )
      `)
    //console.log("Stakeholders: "+JSON.stringify(stakeholders))
    return stakeholders;
};

export async function getStakeholderGroups(){
    const { data: stakeholderGroups } = await supabase.from('stakeholder_groups').select().order('group')
    return stakeholderGroups;
};
