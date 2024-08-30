"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Create Stakeholder

export async function createStakeholder(formData:FormData){
  const supabase = createClient()

  const levels = ["low", "medium", "high"];

  const stakeholderName = formData.get("name");
  const stakeholderDescription = formData.get("description");
  const stakeholderGroupId = formData.get("groupId");
  
  const stakeholderInterest = parseInt(formData.get("stakeholderInterest"));
  const stakeholderInfluence = parseInt(formData.get("stakeholderInfluence"));
  const stakeholderKnowledge = parseInt(formData.get("stakeholderKnowledge"));
  
  const mapLevel = (value:any) => levels[value - 1] || "unknown";
  
  const stakeholderInterestRationale = mapLevel(stakeholderInterest);
  const stakeholderInfluenceRationale = mapLevel(stakeholderInfluence);
  const stakeholderKnowledgeRationale = mapLevel(stakeholderKnowledge);

  let stakeholderRelevance = stakeholderInterest+stakeholderInfluence;
    
  try {
      const newStakeholder = await supabase.from('stakeholders').insert(
        {
          name:stakeholderName,
          description:stakeholderDescription,
          group_id:stakeholderGroupId,
          interest_score: stakeholderInterest,
          interest_score_rationale: stakeholderInterestRationale,
          influence_score: stakeholderInfluence,
          influence_score_rationale: stakeholderInfluenceRationale,
          knowledge_score: stakeholderKnowledge,
          knowledge_score_rationale: stakeholderKnowledgeRationale,
          relevance_score: stakeholderRelevance
        });
      console.log("Create Stakeholder: "+JSON.stringify(newStakeholder))
    } catch (error) {
      console.error("Error while adding stakeholder");
    } finally {
      revalidatePath('/materiality/stakeholders');
      redirect('/materiality/stakeholders');
    };
};

// Delete Stakeholder

export async function deleteStakeholder(id:any){
  const supabase = createClient()
  try {
    const deletedStakeholder = await supabase.from('stakeholders').delete().eq('id',id)
  } catch (error) {
    console.error("Error while deleting stakeholder");
  } finally {
    revalidatePath('/materiality/stakeholders');
    redirect('/materiality/stakeholders');
  }
}


// Create Stakeholder Group

export async function createStakeholderGroup(formData:FormData){
  const supabase = createClient()

  const groupName = formData.get("name");
  const groupDesc = formData.get("description")

  console.log(groupName,groupDesc);

  try {
    const newStakeholderGroup = await supabase.from('stakeholder_groups').insert(
      {
        group:groupName,
        description:groupDesc
      }
    )
    console.log("Create Stakeholder Group: "+JSON.stringify(newStakeholderGroup));
  } catch (error) {
    console.error("Error while adding stakeholder group");
  } finally {
    revalidatePath('/materiality/stakeholders');
    redirect('/materiality/stakeholders');
  }
}



// export async function createOrUpdateEmailSettings(formData:FormData){
//   try {
//     const settings = await prisma.emailSettings.findFirst();
//     if(settings==null){

//       const savedSettings = await prisma.emailSettings.create({
//         data: {
//           host,
//           username,
//           password,
//           ssl,
//           port
//         }
//       });
//     }else{

//       let host = formData.get("host");
//       let username = formData.get("username")
//       let password = formData.get("password")
//       let ssl = formData.get("ssl")
//       let port = parseInt(formData.get("port"))

//       const savedSettings = await prisma.emailSettings.update({
//         where: {
//           id: 1
//         },
//         data: {
//           host,
//           username,
//           password,
//           ssl,
//           port
//         }
//       });
//     }

//   } catch (error){
//     console.log("Error creating or updating E-Mail Settings: ",error)
//   }
// }