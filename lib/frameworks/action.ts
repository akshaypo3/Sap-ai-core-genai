"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserInfo } from "@/lib/settings/users/data";
import { getTimeZone } from "@/lib/settings/timezone/action";

export async function createCdpAssessment(formData: FormData) {
    const supabase = await createClient();
  
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
    const supabase = await createClient();
  
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
  const supabase = await createClient();
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
    revalidatePath(`/reporting/frameworks/${frameworkId}`);
  } catch (error) {
    console.error("Error while adding new assessment: ", error);
  }
}


export async function creatanswerAssessment(formData: FormData, frameworkId: any, isUpdate: boolean,assessmentID:any) {
  const supabase = await createClient();
  const userData = await getUserInfo();
  const userId = userData.id;
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
 
  const assessment_id = formData.get("assessment_id");
  const assessment_question_id = formData.get("id");
  const answer_value = formData.get("answer");
  const metadata = formData.get("metadata");
 
  const stripHTML = (input: string) => {
    return input.replace(/<\/?[^>]+(>|$)/g, ""); 
  };

  try {
    let result;
    if (isUpdate) {

       const { data: existingAnswer, error: fetchError } = await supabase
        .from('fe_answers')
        .select('answer_value')
        .eq('assessment_question_id', assessment_question_id)
        .eq('assessment_id', assessment_id)
        .single(); 
      
      if (fetchError) {
        console.error("Error fetching previous answer: ", fetchError);
      }

      const previousAnswerValue = existingAnswer ? existingAnswer.answer_value : "N/A";

      const cleanPreviousAnswer = stripHTML(previousAnswerValue);
      const cleanAnswerValue = stripHTML(answer_value);

      result = await supabase
        .from('fe_answers')
        .update({
          answer_value: answer_value,
        })
        .eq('assessment_question_id', assessment_question_id)
        .eq('assessment_id', assessment_id)
        .select();

      const {data, error} = await supabase
      .from('fe_question_logs')
      .insert({
        assessment_id: assessment_id,
        question_id: assessment_question_id,
        activity: `Changed from "${cleanPreviousAnswer}" to "${cleanAnswerValue}"`,
        user: userName
      })

      if(error){
        console.log("Error while inserting the update log in fe_question_logs:",error)
      }

    } else {

      const cleanAnswerValue = stripHTML(answer_value);
      
      result = await supabase
        .from('fe_answers')
        .insert({
          assessment_id: assessment_id,
          assessment_question_id: assessment_question_id,
          answer_value: answer_value,
          created_by: userId,
          metadata: metadata,
        })
        .select();

      const {data, error} = await supabase
        .from('fe_question_logs')
        .insert({
          assessment_id: assessment_id,
          question_id: assessment_question_id,
          activity: `Changed to ${cleanAnswerValue}`,
          user: userName
        })

      if(error){
        console.log("Error while inserting the insert log in fe_question_logs:",error)
      }
    }
 
    const { data, error } = result;
    if (error) {
      throw new Error("Error while creating/updating assessment: " + error.message);
    }
    const { error: updateErrorquestion } = await supabase
    .from('fe_assessment_questions')
    .update({
      answered: true,
    })
    .eq('id', assessment_question_id);

  if (updateErrorquestion) {
    throw new Error("Error updating assessment: " + updateErrorquestion.message);
  }

  } catch (error) {
    console.error("Error while adding/updating answer: ", error);
  } finally {
    revalidatePath(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
    redirect(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
  }
}

export async function fetchExistingAnswerForText(questionId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('fe_answers')
      .select('answer_value')
      .eq('assessment_question_id', questionId)
      .single();
 
    if (error) {
      console.error("Error while fetching answer: " + error.message);
    }
 
    return data?.answer_value || null;
  } catch (error) {
    console.error("Error fetching answer: ", error);
    return null;
  }
}


export async function fetchExistingAnswerForMultipleChoice(questionId: string) {
  const supabase = await createClient();
 
  try {
    const { data, error } = await supabase
      .from('fe_answers')
      .select('answer_value')
      .eq('assessment_question_id', questionId)
      .single();
 
    if (error) {
      console.error("Error while fetching answer: " + error.message);
      return null;
    }
 
    if (data?.answer_value) {
      const trimmedAnswer = data.answer_value.trim();
 
      if (trimmedAnswer.includes(",")) {
        return trimmedAnswer.split(",").map((val: string) => val.trim());
      }
 
      return [trimmedAnswer];
    }
 
    return null;
  } catch (error) {
    console.error("Error fetching answer: ", error);
    return null;
  }
}
export async function fetchExistingAnswerForCheckbox(questionId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('fe_answers')
      .select('answer_value')
      .eq('assessment_question_id', questionId)
      .single();
 
    if (error) {
      console.error("Error while fetching answer: " + error.message);
      return null;
    }
 
    return data?.answer_value || "No";
  } catch (error) {
    console.error("Error fetching answer: ", error);
    return "No";
  }
}
export async function fetchExistingAnswerForNumeric(questionId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('fe_answers')
      .select('answer_value')
      .eq('assessment_question_id', questionId)
      .single();
 
    if (error) {
      console.error("Error while fetching answer: " + error.message);
      return null;
    }
 
    return data?.answer_value ? parseFloat(data.answer_value) : 0;  
  } catch (error) {
    console.error("Error fetching answer: ", error);
    return 0;  
  }
}
export async function fetchExistingAnswerForTable(questionId: string) {
  const supabase = await createClient();
 
  try {
    const { data, error } = await supabase
      .from('fe_answers')
      .select('answer_value')
      .eq('assessment_question_id', questionId);
 
    if (error) {
      console.error("Error while fetching answers: " + error.message);
      return [];
    }
 
    // if (!data || data.length === 0) {
    //   console.warn("No data returned for questionId:", questionId);
    //   return [];
    // }
 
    // console.log("Raw fetched data:", JSON.stringify(data, null, 2));
 
    const parsedAnswers = data
      .map((row) => row.answer_value)
      .flat();
 
    return parsedAnswers;
  } catch (error) {
    console.error("Error fetching answers: ", error);
    return [];
  }
}
export async function creatanswerAssessmentTable(formData: FormData, frameworkId: any,assessmentID:any) {
  const supabase = await createClient();
  const userData = await getUserInfo();
  const userId = userData.id;
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
 
  const assessment_id = formData.get("assessment_id");
  const assessment_question_id = formData.get("id");
  const answer_value = formData.get("answer");
  const answer = JSON.parse(answer_value);
  const metadata = formData.get("metadata");

  const formatAnswerValue = (input: any): string => {
    if (typeof input === 'string') {
      try {
        input = JSON.parse(input);
      } catch (e) {
        return input;
      }
    }
  
    if (Array.isArray(input)) {
      return input.map(item =>
        Object.entries(item)
          .map(([key, value]) => `${key}:${value}`)
          .join(',')
      ).join('; ');
    }
    
    if (typeof input === 'object' && input !== null) {
      return Object.entries(input)
        .map(([key, value]) => `${key}:${value}`)
        .join(',');
    }
      return input.toString();
  };

  try {
    const { data: existingData, error: fetchError } = await supabase
      .from('fe_answers')
      .select('id, answer_value')
      .eq('assessment_id', assessment_id)
      .eq('assessment_question_id', assessment_question_id)
      .maybeSingle();
 
    if (fetchError) {
      throw new Error("Error checking for existing record: " + fetchError.message);
    }
 
    const previousAnswerValue = existingData ? existingData.answer_value : {};
    const cleanPreviousAnswer = formatAnswerValue(previousAnswerValue);
    const cleanAnswerValue = formatAnswerValue(answer_value); 
  
    if (existingData) {
 
      const { error: updateError } = await supabase
        .from('fe_answers')
        .update({
          answer_value: answer,
        })
        .eq('assessment_id', assessment_id)
        .eq('assessment_question_id', assessment_question_id);
 
      if (updateError) {
        throw new Error("Error updating assessment: " + updateError.message);
      }

      const {data, error} = await supabase
      .from('fe_question_logs')
      .insert({
        assessment_id: assessment_id,
        question_id: assessment_question_id,
        activity: `Changed from "${cleanPreviousAnswer}" to "${cleanAnswerValue}"`,
        user: userName
      })

      if(error){
        console.log("Error while inserting the update log in fe_question_logs:",error)
      }

    } else {
      const { error: insertError } = await supabase
        .from('fe_answers')
        .insert({
          assessment_id: assessment_id,
          assessment_question_id: assessment_question_id,
          answer_value: answer,
          created_by: userId,
          metadata: metadata,
        })
        .select();
 
      if (insertError) {
        throw new Error("Error inserting new assessment: " + insertError.message);
      }
      const { error: updateErrorquestion } = await supabase
        .from('fe_assessment_questions')
        .update({
          answered: true,
        })
        .eq('id', assessment_question_id);
 
      if (updateErrorquestion) {
        throw new Error("Error updating assessment: " + updateErrorquestion.message);
      }
 
      const {data, error} = await supabase
        .from('fe_question_logs')
        .insert({
          assessment_id: assessment_id,
          question_id: assessment_question_id,
          activity: `Changed to ${cleanAnswerValue}`,
          user: userName
        })

      if(error){
        console.log("Error while inserting the insert log in fe_question_logs:",error)
      }
    }
 
  } catch (error) {
    console.error("Error while adding/updating answer: ", error);
  } finally {
    revalidatePath(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
    redirect(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
  }
}

export async function getQuestionLogsById(questionId: string) {
  const supabase = await createClient();
  const { data: questionsLogs, error } = await supabase
    .from("fe_question_logs")
    .select()
    .eq("question_id", questionId)
    .order('created_at', { ascending: true });
    
  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  return questionsLogs;
}

export async function getQuestionComments(QuestionId: string,assessmentID:string) {
  const supabase = await createClient();
  const userData = await getUserInfo();
  const timezone1 = await getTimeZone({ userId: userData.id })
  const userId=userData.id;
  const timezone = timezone1.userWithTimezone?.timezone || "UTC";
  try {
    const { data: comment, error } = await supabase
      .from('fe_assessment_questions_comments')
      .select('*')
      .eq('assessment_id', assessmentID)
	  .eq('assessment_question_id', QuestionId)
    if (error) {
      console.error("Error while fetching answer: " + error.message);
    }
    
    const result = {
      comment,
      timezone,
      userId
    };
    return result
  } catch (error) {
    console.error("Error fetching comments: ", error);
    return null;
  }
}

export const deleteQuestionCommentDialog = async (commentId: string, frameworkId: any,assessmentID:any) => {
  const supabase = await createClient();

  try { 
    const { data, error } = await supabase
      .from("fe_assessment_questions_comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("Error deleting comment:", error);
      return null;
    }

  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  } finally {
   revalidatePath(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
    redirect(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
  }
};
export const createQuestionCommentDialog = async (formData: FormData) => {
  const supabase = await createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
  const userId = userData.id;

  const assessmentID = formData.get("assessmentID");
  const commentText = formData.get("comment");
  const assessment_question_id= formData.get("QuestionId");
  const frameworkId=formData.get("frameworkId");

  if (!commentText) {
    console.error("Comment cannot be empty");
    return null;
  }

  try {
    const { data: newComment, error } = await supabase.from("fe_assessment_questions_comments").insert({
      comment: commentText,
      user: userName,
      assessment_id: assessmentID,
	  assessment_question_id:assessment_question_id,
      user_id: userId,
    });

    if (error) {
      console.error("Error creating comment:", error);
      return null;
    }

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  } finally {
    revalidatePath(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
    redirect(`/reporting/frameworks/${frameworkId}/${assessmentID}`);
  }
};