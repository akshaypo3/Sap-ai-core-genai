import { createClient } from "@/utils/supabase/server";

export async function getStakeholders(){
    const supabase = createClient()
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
    const supabase = createClient()
    const { data: stakeholderGroups } = await supabase.from('stakeholder_groups').select().order('group')
    return stakeholderGroups;
};


export async function Stackholderquestionsdetails(){
  const supabase = createClient()
  const { data: questions } = await supabase.from('stakeholder_questions').select();
  return questions;
};