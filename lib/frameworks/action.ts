"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserInfo } from "@/lib/settings/users/data";

export async function createCdpAssessment(formData: FormData) {
    const supabase = createClient();
  
    const fyear = formData.get("fyear");
  
    try {
      const { data: newAssessment, error } = await supabase.from('cdp_assessments').insert(
        {
          fyear: fyear,
          step: 1,
        }
      ).select('id');
  
      if (error) {
        throw new Error("Error creating assessment: " + error.message);
      }
  
      // const newAssessmentId = newAssessment[0].id;
  
      console.log("Created cdp Assessment: " + JSON.stringify(newAssessment));
  
      // await populateLonglist(newAssessmentId);
  
    } catch (error) {
      console.error("Error while adding cdp assessment: ", error);
    } finally {
      revalidatePath('/reporting/frameworks/cdp');
      redirect('/reporting/frameworks/cdp');
    }
  }

  
export async function deleteCdpAssessmentWithId(id:string) {
    let assessmentId = id;
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase
        .from('cdp_assessments')
        .delete()
        .eq('id', assessmentId)
        .select();
  
      if (error) {
        throw new Error(`Failed to delete cdp assessment: ${error.message}`);
      }
  
      if (data === null) {
        console.warn(`No assessment found with id: ${id}`);
      }
  
      console.log(`Successfully deleted cdp assessment with id: ${id}`);
  
      revalidatePath("/reporting/frameworks/cdp");
      // return { success: true, message: "Assessment deleted successfully" };
  
    } catch (error) {
      console.error("Error deleting assessment:", error);
      return { success: false, message: error };
    }
  }

export async function createactiveAssessment(formData: FormData) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const name = formData.get("name");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const frameworkId = formData.get("frameworkId");
  const userId = userData.id;
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
  
  try {
    const { data, error } = await supabase
      .from('fe_assessments')
      .insert({
        name: name,
        reporting_period_start: startDate,
        reporting_period_end: endDate,
        framework_id: frameworkId,
        created_by: userId,
        username: userName
      })
      .select();
 
    if (error) {
      throw new Error("Error while creating assessment: " + error.message);
    }

    const assessment_id = data[0].id; 
    const { data: dataquestion, error: errorquestion } = await supabase
      .from("fe_questions")
      .select("*, section:section_id(section_code)")
      .eq("framework_id", frameworkId);
 
    if (errorquestion) {
      throw new Error(`Error fetching questions: ${errorquestion.message}`);
    }
   
    const mappedQuestions = dataquestion.map((question) => ({
      assessment_id: assessment_id,
      original_question_id: question.id,
      section_code: question.section.section_code,
      question_code: question.question_code,
      question_text: question.question_text,
      help_text: question.help_text,
      question_type: question.question_type,
      order_index: question.order_index,
      is_required: question.is_required,
      is_repeatable: question.is_repeatable,
      answer_config: question.answer_config,
      validation_rules: question.validation_rules,
      metadata: question.metadata,
      qu_columns: question.qu_columns,
    }));
    
    const { data: insertData, error: insertError } = await supabase
      .from("fe_assessment_questions")
      .upsert(mappedQuestions);

    if (insertError) {
      throw new Error(`Error inserting/updating questions: ${insertError.message}`);
    }

  } catch (error) {
    console.error("Error while adding new assessment: ", error);
  } finally {
    revalidatePath(`/reporting/frameworks/${frameworkId}`);
    redirect(`/reporting/frameworks/${frameworkId}`);
  }
}