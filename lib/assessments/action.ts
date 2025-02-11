"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sendMail } from "@/lib/settings/smtp/action";
import { getUserInfo } from "@/lib/settings/users/data";
import errorMap from "zod/lib/locales/en";

export async function populateLonglist(assessmentId:string) {
  const supabase = await createClient();
  console.log("Trying to populate for Assessment ID: " + assessmentId);

  try {
    const { data: esrsAr16, error } = await supabase.from('esrs_ar16').select();
    
    if (error) {
      throw new Error("Error fetching data from esrs_ar16: " + error.message);
    }

    if (esrsAr16.length === 0) {
      console.log("No data found in esrs_ar16.");
      return;
    }

    const insertPromises = esrsAr16.map((element) => {
      return supabase.from('esrs_iros').insert({
        code: element.esrs_code,
        topic: element.topic,
        sub_topic: element.sub_topic,
        sub_sub_topic: element.sub_sub_topic,
        assessment_id: assessmentId,
        esrs_id: element.esrs_id
      });
    });

    const results = await Promise.all(insertPromises);

    results.forEach((result, index) => {
      if (result.error) {
        console.error(`Error inserting record ${index + 1}: `, result.error.message);
      } else {
        console.log(`Successfully inserted record ${index + 1} into esrs_iros`);
      }
    });

  } catch (error:any) {
    console.error("Error while populating esrs_iros: ", error.message);
  }
}

export async function createAssessment(formData: FormData) {
  const supabase = await createClient();

  const year = formData.get("year");
  const framework = formData.get("framework");

  try {
    const { data: newAssessment, error } = await supabase.from('materialityassessments').insert(
      {
        fyear: year,
        framework_id: framework,
        step: 1
      }
    ).select('id');

    if (error) {
      throw new Error("Error creating assessment: " + error.message);
    }

    // const newAssessmentId = newAssessment[0].id;

    console.log("Created Assessment: " + JSON.stringify(newAssessment));

    // await populateLonglist(newAssessmentId);

  } catch (error) {
    console.error("Error while adding assessment: ", error.message);
  } finally {
    revalidatePath('/materiality/assessments');
    //redirect('/materiality/assessments');
  }
}

export async function saveIroEntries(formData: FormData) {
  const supabase = await createClient();

  const assessment_id = formData.get("assessment_id") as string;
  const iro_id = formData.get("iro_id") as string;
  const materiality_type = formData.get("materiality_type") as string;
  const impact = formData.get("impact") as string;
  const impact_state = formData.get("impact_state") as string;
  const scale_score = parseInt(formData.get("scale_score") as string) || 0;
  const scope_score = parseInt(formData.get("scope_score") as string) || 0;
  const irremediability_score = parseInt(formData.get("irremediability_score") as string) || 0;
  const probability_score = parseFloat(formData.get("probability_score") as string) || 1;


  const totalScore = (scale_score + scope_score + irremediability_score) * probability_score;

  let isMaterial = false;

  if (materiality_type === 'impact') {
    if (impact === 'negative') {
      if (impact_state === 'potential' && totalScore >= 8.1) {
        isMaterial = true;
      } else if (impact_state === 'actual' && totalScore >= 9) {
        isMaterial = true;
      }
    } else if (impact === 'positive') {
      if (impact_state === 'potential' && totalScore >= 5.4) {
        isMaterial = true;
      } else if (impact_state === 'actual' && totalScore >= 6) {
        isMaterial = true;
      }
    }
  } else if (materiality_type === 'financial' && totalScore >= 2.7) {
    isMaterial = true;
  }

  let impact_score = null;
  let financial_score = null;

  if (materiality_type === 'impact') {
    impact_score = totalScore;
  } else {
    financial_score = totalScore;
  }

  const status = isMaterial ? 'Material' : 'Not Material';

  const updateObject = {
    iro_description: formData.get("iro_description") as string,
    materiality_type,
    impact,
    impact_state,
    scale_score,
    scale_reason: formData.get("scale_reason") as string,
    scope_score,
    scope_reason: formData.get("scope_reason") as string,
    irremediability_score,
    irremediability_reason: formData.get("irremediability_reason") as string,
    probability_score,
    probability_reason: formData.get("probability_reason") as string,
    impact_score,
    financial_score,
    is_material: isMaterial,
    status 
  };

  console.log("Updating with:", updateObject);

  try {
    const { data: savedData, error } = await supabase
      .from('esrs_iros')
      .update(updateObject)
      .eq('id', iro_id)
      .select();

    const { data: updatedStatus } = await supabase.from('materialityassessments')
    .update({
      state: "In Progress"
    })
    .eq('id',assessment_id)
    .select();

    if (error) {
      console.error("Error saving IRO Data:", error.message, error.details);
      throw error;
    } else {
      console.log("Data saved successfully:", savedData);
      console.log("Data updated successfully:", updatedStatus);
    }
  } catch (error) {
    console.error("Caught error while saving IRO Data:", error);
  } finally {
    revalidatePath(`/materiality/assessments/${assessment_id}/5`);
    //redirect(`/materiality/assessments/${assessment_id}/5`);
  }
}

export async function markIroAsNotMaterial(formData:FormData){
  const supabase = await createClient();

  const assessmentId = formData.get("assessment_id");
  const iroId = formData.get("iro_id");
  const description = formData.get("description");

  console.log("ID IN NOT MATERIAL FUNCTION: ",assessmentId)
  console.log(`PATH: /materiality/assessments/${assessmentId}/5`)

  try {
    const { data: savedData, error } = await supabase.from('esrs_iros').update(
      {
      is_material: false,
      iro_description: description,
      status: "Not Material"
      }).eq('id',iroId).select();

  } catch (error) {
      console.log(error);
  } finally {
    revalidatePath(`/materiality/assessments/${assessmentId}/5`);
    //redirect(`/materiality/assessments/${assessmentId}/5`);
  }
}

export async function deleteAssessmentWithId(id:string) {
  let assessmentId = id;
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('materialityassessments')
      .delete()
      .eq('id', assessmentId)
      .select();

    if (error) {
      throw new Error(`Failed to delete assessment: ${error.message}`);
    }

    if (data === null) {
      console.warn(`No assessment found with id: ${id}`);
    }

    console.log(`Successfully deleted assessment with id: ${id}`);

    revalidatePath("/materiality/assessments");
    // return { success: true, message: "Assessment deleted successfully" };

  } catch (error) {
    console.error("Error deleting assessment:", error.message);
    return { success: false, message: error.message };
  }
}

export async function handleNextStep(id,nextStep){
  let assessmentId = id;
  const supabase = await createClient();

  try {
    const { data } = await supabase.from('materialityassessments').update({
      step: nextStep
    }).eq('id',assessmentId);
  } catch (error) {
    console.error("Problem updating next Step: ",error)
    throw error;
  } finally {
    revalidatePath(`/materiality/assessments/${assessmentId}/${nextStep}`);
    //redirect(`/materiality/assessments/${assessmentId}/${nextStep}`);
  }
}


export async function duplicateIro(assessmentId: string, iroId: string) {
  const supabase = await createClient();

  try {
    // Fetch the IRO to duplicate
    const { data: iroData, error } = await supabase
      .from("esrs_iros")
      .select("*")
      .eq("id", iroId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch IRO: ${error.message}`);
    }

    // Remove the id field and get the materiality_type
    const { id, materiality_type, ...iroToInsert } = iroData;

    // Determine the new materiality_type
    const newMaterialityType =
      materiality_type === "impact" ? "financial" : "impact";

    // Insert a new IRO with the same details but new materiality_type
    const { data: newIroData, error: insertError } = await supabase
      .from("esrs_iros")
      .insert({
        ...iroToInsert,
        materiality_type: newMaterialityType,
        is_material: false, // Reset materiality
        status: "To Be Assessed", // Reset status
        impact_score: null, // Reset scores
        financial_score: null,
        // Include other fields as necessary
      })
      .select();

    if (insertError) {
      throw new Error(`Failed to insert new IRO: ${insertError.message}`);
    }

    console.log(`Successfully duplicated IRO with new ID: ${newIroData[0].id}`);

    // Revalidate the path to refresh the page
    revalidatePath(`/materiality/assessments/${assessmentId}/5`);
    //redirect(`/materiality/assessments/${assessmentId}/5`);
  } catch (error: any) {
    console.error("Error while duplicating IRO:", error.message);
    throw error;
  }
}

export async function CreateCustomIRo(formData: FormData) {
  const supabase = await createClient();
  const topic = formData.get("topic");
  const sub_topic = formData.get("sub_topic");
  const sub_sub_topic = formData.get("sub_sub_topic");
  const assesmentId = formData.get("assesmentId")

  console.log(topic, sub_topic, sub_sub_topic, assesmentId)

  try {

    const { data: currentIds, error: fetchError } = await supabase
      .from('esrs_iros')
      .select('esrs_id')
      .eq('assessment_id', assesmentId)
      .like('esrs_id', 'c-%')
      .order('esrs_id', { ascending: false })
      .limit(1);
    
    if (fetchError) {
      throw new Error("Error fetching current esrs_id: " + fetchError.message);
    }

    let newEsrsId = "c-1";
    if (currentIds.length > 0) {
      const lastId = currentIds[0].esrs_id; 

      const match = lastId.match(/c-(\d+)$/); 
      if (match) {
        const lastIdNumber = parseInt(match[1]); 
        newEsrsId = `c-${lastIdNumber + 1}`;
      }
    }

    const { data : customIros, error } = await supabase
    .from('esrs_iros')
    .insert({
      code: "Custom",
      topic: topic,
      sub_topic: sub_topic,
      sub_sub_topic: sub_sub_topic,
      assessment_id: assesmentId,
      esrs_id: newEsrsId
    })

    if (error) {
      throw new Error("Error inserting custom iros in esrs_iros: " + error.message);
    }

    revalidatePath(`/materiality/assessments/${assesmentId}/5`);
    // redirect(`/materiality/assessments/${assesmentId}/5`);
  } catch (error:any) {
    console.error("Error while inserting custom IRo in esrs_iros: ", error.message);
  }
}

export async function AddCatalogIro({
  code,
  topic,
  sub_topic,
  sub_sub_topic,
  esrs_id,
  assessment_id,
  }: {
  code: string;
  topic: string;
  sub_topic: string;
  sub_sub_topic: string;
  esrs_id: string;
  assessment_id: string;
  }){
  const supabase = await createClient();

  try {
    const { data : catalogIros, error } = await supabase
    .from('esrs_iros')
    .insert({
      code,
      topic,
      sub_topic,
      sub_sub_topic,
      esrs_id,
      assessment_id,
    });

    if (error) {
      throw new Error("Error inserting catalog iros in esrs_iros: " + error.message);
    }

    // revalidatePath(`/materiality/assessments/${assessment_id}/5`);
    // redirect(`/materiality/assessments/${assessment_id}/5`);
  } catch (error:any) {
    console.error("Error while inserting catalog IRo in esrs_iros: ", error.message);
  } finally{
    revalidatePath(`/materiality/assessments/${assessment_id}/5`);
    //redirect(`/materiality/assessments/${assessment_id}/5`);
  }
}

export async function addIroUserTask(formData: FormData){
  const supabase = await createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  const title = formData.get("title");
  const description = formData.get("description");
  const assigned_to = formData.get("assigned_to");
  const created_by = formData.get("created_by");
  const status = formData.get("status") || "TODO";
  const assessmentId = formData.get("assessmentId");
  const iroId = formData.get("iroId");
  // const start_date = formData.get("start_date");
  // const due_date = formData.get("due_date");

  let due_date: any = new Date(); 

  due_date = new Date(new Date().setDate(new Date().getDate() + 5))
    .toISOString()
    .split("T")[0]; 

  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title: title,
        description: description,
        assigned_to: assigned_to,
        created_by: created_by,
        status: status,
        start_date: new Date().toISOString().split('T')[0],
        due_date: due_date,
        link: `/materiality/assessments/${assessmentId}/5/${iroId}`
      })
      .select();

    if (error) {
      console.log("Error while inserting the task in the database :", error.message);
    }

    if (!error && data) {
      const taskId = data[0]?.id;
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Task '${title}' created`,
          user: userName,
          changes: {
            user: userName,
            activity: `Task '${title}' created`,
            created_at: new Date().toISOString(),
            title: title,
            description: description,
            assigned_to: assigned_to,
            created_by: created_by,
            status: status,
            start_date: new Date().toISOString().split('T')[0],
            due_date: due_date,
          },
          task_id : taskId
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }

    const { data: createdUserData, error: createdUserError } = await supabase
      .from("user_profile")
      .select("userEmail")
      .eq("id", created_by)
      .single();

    if (createdUserError || !createdUserData) {
      throw new Error("Error fetching created user's email");
    }

    const { data: notificationData, error: notificationDataError } = await supabase
    .from("notifications")
    .insert({
      user_id :created_by,
      name : userName,
      message : `'${title}' has been assigned to you`,
      type: "task",
      link: `/task/${data[0]?.id}`
      // archived
    })

    if(notificationDataError){
      console.error("Error while adding notification");
    }
    
    const createdUserEmail = createdUserData.userEmail;

    const createdEmailDetails = {
      to: createdUserEmail,
      subject: "SMTP Test Mail",
      text: "MTP Test Mail",
      html: `<p><strong>SMTP Test successful</strong>
       <p>Click <a href="http://localhost:3000/task" target="_blank">here</a> to go for tasks.</p>`,
    };

    const createdEmailResponse = await sendMail(createdEmailDetails);
    if (!createdEmailResponse) {
      console.error("Error sending email notification to created user");
    }

    if (created_by !== assigned_to) {
      const { data: assignedUserData, error: assignedUserError } =
        await supabase
          .from("user_profile")
          .select("userEmail")
          .eq("id", assigned_to)
          .single();

      if (assignedUserError || !assignedUserData) {
        throw new Error("Error fetching assigned user's email");
      }

      const assignedUserEmail = assignedUserData.userEmail;

      const assignedEmailDetails = {
        to: assignedUserEmail,
        subject: "SMTP Test Mail",
        text: "MTP Test Mail",
        html: `<p><strong>SMTP Test successful</strong>
        <p>Click <a href="http://localhost:3000/task" target="_blank">here</a> to go for tasks.</p>`,
      };

      const assignedEmailResponse = await sendMail(assignedEmailDetails);
      if (!assignedEmailResponse) {
        console.error("Error sending email notification to assigned user");
      }
    }
  } catch (error) {
    console.error("Error while adding task:", error);
  } 
}

export async function addIroUserTaskQuestion(formData: FormData){
  const supabase = await createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const assigned_to = formData.get("assigned_to");
  const created_by = formData.get("created_by");
  const status = formData.get("status") || "TODO";
  const assessmentId = formData.get("assessmentId");
  const frameworkId = formData.get("frameworkId")
  // const start_date = formData.get("start_date");
  // const due_date = formData.get("due_date");

  let due_date: any = new Date(); 

  due_date = new Date(new Date().setDate(new Date().getDate() + 5))
    .toISOString()
    .split("T")[0]; 


  try {

    const { data, error } = await supabase
      .from('fe_assessment_questions')
      .update({
        assigned_to: assigned_to
      })
      .eq('id', id)
      .select();
      
    // const { data, error } = await supabase
    //   .from("tasks")
    //   .insert({
    //     title: title,
    //     description: description,
    //     assigned_to: assigned_to,
    //     created_by: created_by,
    //     status: status,
    //     start_date: new Date().toISOString().split('T')[0],
    //     due_date: due_date,
    //     link: `/reporting/frameworks/${frameworkId}/${assessmentId}`
    //   })
    //   .select();

    // if (error) {
    //   console.log("Error while inserting the task in the database :", error.message);
    // }

    // if (!error && data) {
    //   const taskId = data[0]?.id;
    //   const { error: logError } = await supabase
    //     .from("task-activitylog")
    //     .insert({
    //       created_at: new Date().toISOString(),
    //       activity: `Task '${title}' created`,
    //       user: userName,
    //       changes: {
    //         user: userName,
    //         activity: `Task '${title}' created`,
    //         created_at: new Date().toISOString(),
    //         title: title,
    //         description: description,
    //         assigned_to: assigned_to,
    //         created_by: created_by,
    //         status: status,
    //         start_date: new Date().toISOString().split('T')[0],
    //         due_date: due_date,
    //       },
    //       task_id : taskId
    //     });

    //   if (logError) {
    //     console.error("Error inserting into task-activitylog:", logError);
    //   }
    // }

    // const { data: createdUserData, error: createdUserError } = await supabase
    //   .from("user_profile")
    //   .select("userEmail")
    //   .eq("id", created_by)
    //   .single();

    // if (createdUserError || !createdUserData) {
    //   throw new Error("Error fetching created user's email");
    // }

    // const { data: notificationData, error: notificationDataError } = await supabase
    // .from("notifications")
    // .insert({
    //   user_id :created_by,
    //   name : userName,
    //   message : `'${title}' has been assigned to you`,
    //   type: "task",
    //   link: `/task/${data[0]?.id}`
    //   // archived
    // })

    // if(notificationDataError){
    //   console.error("Error while adding notification");
    // }
    
    // const createdUserEmail = createdUserData.userEmail;

    // const createdEmailDetails = {
    //   to: createdUserEmail,
    //   subject: "SMTP Test Mail",
    //   text: "MTP Test Mail",
    //   html: `<p><strong>SMTP Test successful</strong>
    //    <p>Click <a href="http://localhost:3000/task" target="_blank">here</a> to go for tasks.</p>`,
    // };

    // const createdEmailResponse = await sendMail(createdEmailDetails);
    // if (!createdEmailResponse) {
    //   console.error("Error sending email notification to created user");
    // }

    // if (created_by !== assigned_to) {
    //   const { data: assignedUserData, error: assignedUserError } =
    //     await supabase
    //       .from("user_profile")
    //       .select("userEmail")
    //       .eq("id", assigned_to)
    //       .single();

    //   if (assignedUserError || !assignedUserData) {
    //     throw new Error("Error fetching assigned user's email");
    //   }

    //   const assignedUserEmail = assignedUserData.userEmail;

    //   const assignedEmailDetails = {
    //     to: assignedUserEmail,
    //     subject: "SMTP Test Mail",
    //     text: "MTP Test Mail",
    //     html: `<p><strong>SMTP Test successful</strong>
    //     <p>Click <a href="http://localhost:3000/task" target="_blank">here</a> to go for tasks.</p>`,
    //   };

    //   const assignedEmailResponse = await sendMail(assignedEmailDetails);
    //   if (!assignedEmailResponse) {
    //     console.error("Error sending email notification to assigned user");
    //   }
    // }
    revalidatePath(`/reporting/frameworks/${frameworkId}/${assessmentId}`);
  } catch (error) {
    console.error("Error while adding user to the question task:", error);
  } 
}

export async function addIroUserSectionQuestions(assignments: { questionId: string, userId: string,questionCode:string }[]) {
  const supabase = await createClient();
  try {
    for (const { questionId, userId,questionCode } of assignments) {
      const { data, error } = await supabase
        .from('fe_assessment_questions')
        .update({ assigned_to: userId }) 
        .eq('id', questionId) 
        .select();

      if (error) {
        console.error(`Error updating question with id ${questionId} ${questionCode}:`, error);
      } else {
        console.log(`Successfully updated question with id ${questionId} ${questionCode}`);
      }
    }
  } catch (error) {
    console.error("Error while adding user to the question task:", error);
  }
}
