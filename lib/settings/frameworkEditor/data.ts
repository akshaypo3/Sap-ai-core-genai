import { createClient } from "@/utils/supabase/server";

export async function getFEFrameworkById(frameworkId:string) {
    const supabase = createClient();

    const { data: frameworks } = await supabase
    .from("fe_frameworks")
    .select()
    .eq("id", frameworkId)
    .single()

    return frameworks;
  }

  export async function getAssessmentQuestionById(questionId: string) {
    const supabase = createClient();
  
    const { data: question, error } = await supabase
      .from("fe_assessment_questions")
      .select()
      .eq("id", questionId)
      .single();
  
    if (error) {
      console.error("Error fetching assessment question:", error);
      return null;
    }
  
    return question;
  }