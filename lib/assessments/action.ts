"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function populateLonglist(assessmentId:string) {
  const supabase = createClient();
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
  const supabase = createClient();

  const year = formData.get("year");
  const framework = formData.get("framework");

  try {
    const { data: newAssessment, error } = await supabase.from('materialityassessments').insert(
      {
        fyear: year,
        framework_id: framework
      }
    ).select('id');

    if (error) {
      throw new Error("Error creating assessment: " + error.message);
    }

    const newAssessmentId = newAssessment[0].id;

    console.log("Created Assessment: " + JSON.stringify(newAssessment));

    await populateLonglist(newAssessmentId);

  } catch (error) {
    console.error("Error while adding assessment: ", error.message);
  } finally {
    revalidatePath('/materiality/assessments');
    redirect('/materiality/assessments');
  }
}

export async function saveIroEntries(formData: FormData) {
  const supabase = createClient();

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
    revalidatePath(`/materiality/assessments/${assessment_id}`);
    redirect(`/materiality/assessments/${assessment_id}`);
  }
}

export async function markIroAsNotMaterial(formData:FormData){
  const supabase = createClient();

  const assessmentId = formData.get("assessment_id");
  const iroId = formData.get("iro_id");
  const description = formData.get("description");

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
    revalidatePath(`/materiality/assessments/${assessmentId}`);
    redirect(`/materiality/assessments/`);
  }
}

export async function deleteAssessmentWithId(id) {
  let assessmentId = id.assessmentId;
  const supabase = createClient();

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
    return { success: true, message: "Assessment deleted successfully" };

  } catch (error) {
    console.error("Error deleting assessment:", error.message);
    return { success: false, message: error.message };
  }
}