import { createClient } from "@/utils/supabase/server";

export async function getFramework() {
  const supabase = createClient();

  const { data: frameworks } = await supabase.from("framework").select();
  return frameworks;
}

export async function getCdpAssessments() {
  const supabase = createClient();
  const { data: assessments } = await supabase.from("cdp_assessments").select();

  return assessments;
}

export async function getFEFramework() {
  const supabase = createClient();
  

  const { data: frameworks } = await supabase.from("fe_frameworks").select().order("reporting_year", { ascending: true });;
  return frameworks;
}

export async function getActiveAssessmentsById(frameworkId:string) {
  const supabase = createClient();
  const { data: assessments } = await supabase.from("fe_assessments")
  .select()
  .eq("framework_id", frameworkId)

  return assessments;
}

export async function getAssessmentQuestionsById(assessmentId: string) {
  const supabase = createClient();
  const { data: questions, error } = await supabase
    .from("fe_assessment_questions")
    .select(`
      *,
      fe_assessments(name)
    `)
    .eq("assessment_id", assessmentId)
    .order('question_code', { ascending: true });
    
  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  return questions;
}