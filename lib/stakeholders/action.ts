"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendMail } from "@/lib/settings/smtp/action";

// Create Stakeholder

export async function createStakeholder(formData: FormData) {
  const supabase = createClient();

  const levels = ["low", "medium", "high"];

  const stakeholderName = formData.get("name");
  const stakeholderDescription = formData.get("description");
  const stakeholderGroupId = formData.get("groupId");

  const stakeholderInterest = parseInt(formData.get("stakeholderInterest"));
  const stakeholderInfluence = parseInt(formData.get("stakeholderInfluence"));
  const stakeholderKnowledge = parseInt(formData.get("stakeholderKnowledge"));

  const mapLevel = (value: any) => levels[value - 1] || "unknown";

  const stakeholderInterestRationale = mapLevel(stakeholderInterest);
  const stakeholderInfluenceRationale = mapLevel(stakeholderInfluence);
  const stakeholderKnowledgeRationale = mapLevel(stakeholderKnowledge);

  let stakeholderRelevance = stakeholderInterest + stakeholderInfluence;

  try {
    const newStakeholder = await supabase.from("stakeholders").insert({
      name: stakeholderName,
      description: stakeholderDescription,
      group_id: stakeholderGroupId,
      interest_score: stakeholderInterest,
      interest_score_rationale: stakeholderInterestRationale,
      influence_score: stakeholderInfluence,
      influence_score_rationale: stakeholderInfluenceRationale,
      knowledge_score: stakeholderKnowledge,
      knowledge_score_rationale: stakeholderKnowledgeRationale,
      relevance_score: stakeholderRelevance,
    });
    console.log("Create Stakeholder: " + JSON.stringify(newStakeholder));
  } catch (error) {
    console.error("Error while adding stakeholder");
  } finally {
    revalidatePath("/materiality/stakeholders");
    redirect("/materiality/stakeholders");
  }
}

// Delete Stakeholder

export async function deleteStakeholder(id: any) {
  //console.log("stakeholder", id);
  const supabase = createClient();
  try {
    const deletedStakeholder = await supabase
      .from("stakeholders")
      .delete()
      .eq("id", id);
  } catch (error) {
    console.error("Error while deleting stakeholder");
  } finally {
    revalidatePath("/materiality/stakeholders");
    redirect("/materiality/stakeholders");
  }
}

// Create Stakeholder Group

export async function createStakeholderGroup(formData: FormData) {
  const supabase = createClient();

  const groupName = formData.get("name");
  const groupDesc = formData.get("description");

  console.log(groupName, groupDesc);

  try {
    const newStakeholderGroup = await supabase
      .from("stakeholder_groups")
      .insert({
        group: groupName,
        description: groupDesc,
      });
    console.log(
      "Create Stakeholder Group: " + JSON.stringify(newStakeholderGroup),
    );
  } catch (error) {
    console.error("Error while adding stakeholder group");
  } finally {
    revalidatePath("/materiality/stakeholders");
    redirect("/materiality/stakeholders");
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
export async function createStakeholderQuestions(id: any, formData) {
  const supabase = createClient();
  const question1 = formData.get("question");
  const mandatory1 = formData.get("mandatory");

  try {
    const newStakeholderQuestions = await supabase
      .from("stakeholder_questions")
      .insert({
        question: question1,
        mandatory: mandatory1,
      });
  } catch (error) {
    console.error("Error while adding stakeholder question");
  } finally {
    revalidatePath(`/materiality/assessments/${id}/4`);
    redirect(`/materiality/assessments/${id}/4`);
  }
}
export async function deleteStakeholderQuestions(id: any, assessmentId: any) {
  const supabase = createClient();
  try {
    const deletedStakeholder = await supabase
      .from("stakeholder_questions")
      .delete()
      .eq("id", id);
  } catch (error) {
    console.error("Error while deleting stakeholder questions");
  } finally {
    revalidatePath(`/materiality/assessments/${assessmentId}/4`);
    redirect(`/materiality/assessments/${assessmentId}/4`);
  }
}

export async function createStakeholderUser(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");
  const group = formData.get("group");
  const assessmentId = formData.get("assessmentId");
  const stakeHolderId = formData.get("stakeHolderId");

  const profileUserName = email.substring(0, email.indexOf("@"));

  if (!email || typeof email !== "string") {
    console.error("Invalid or missing email");
    return;
  }

  if (!password || typeof password !== "string") {
    console.error("Invalid or missing password");
    return;
  }

  console.log("okok", group)
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (!error) {
      await supabase
      .from("user_profile")
      .insert({
        id: data.user.id,
        username: profileUserName,
        userEmail: email,
      });
    }

    const { data: groupsData, error: groupsError } = await supabase
      .from("groups")
      .insert({
        group: group,
      });

    if (groupsError) {
      console.log("error while inserting group details in groups", groupsError);
    }

    const {data : emailData, error: emailError }= await supabase
    .from("stakeholders")
    .update({
      email: email,
    })
    .eq("id",stakeHolderId)

    if (emailError) {
      console.log("error while updating email details in stakeholders", emailError);
    }

    const emailDetails = {
      to: email,
      subject: "SMTP Test Mail",
      text: `MTP Test Mail , and the password is ${password}`,
      html: `<p><strong>SMTP Test successful, and the password is ${password}</strong>
       <p>Click <a href="http://localhost:3000/materiality/assessments/" target="_blank">here</a> to go for tasks.</p>`,
    };

    const createdEmailResponse = await sendMail(emailDetails);
    if (!createdEmailResponse) {
      console.error("Error sending email notification to created user");
    }
  } catch (error) {
    console.error("Error while adding user");
  } finally {
    revalidatePath(`/materiality/assessments/${assessmentId}/4`);
    redirect(`/materiality/assessments/${assessmentId}/4`);
  }
}
