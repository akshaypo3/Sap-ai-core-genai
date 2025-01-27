import { createClient } from "@/utils/supabase/server";

export async function getFramework() {
  const supabase = await createClient();

  const { data: frameworks } = await supabase.from("framework").select();
  return frameworks;
}

export async function getCdpAssessments() {
  const supabase = await createClient();
  const { data: assessments } = await supabase.from("cdp_assessments").select();

  return assessments;
}

export async function getFEFramework() {
  const supabase = await createClient();
  

  const { data: frameworks } = await supabase.from("fe_frameworks").select().order("reporting_year", { ascending: true });;
  return frameworks;
}

export async function getActiveAssessmentsById(frameworkId:string) {
  const supabase = await createClient();
  const { data: assessments } = await supabase.from("fe_assessments")
  .select()
  .eq("framework_id", frameworkId)

  return assessments;
}

export async function getAssessmentQuestionsById(assessmentId: string) {
  const supabase = await createClient();
  const { data: questions, error } = await supabase
    .from("fe_assessment_questions")
    .select(`
      *,
      fe_assessments(name),
      original_question_id (
        section_id (
          name
        )
      )
    `)
    .eq("assessment_id", assessmentId)
    .order('question_code', { ascending: true });
    
  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  return questions;
}

export async function getAssessmentQuestionsByIdnew(assessmentId: string, frameworkId: string) {
  const supabase = await createClient();

  const { data: sections, error } = await supabase
  .from("fe_sections")
  .select(`
    *,
    parent_section:parent_section_id (
      name
    ),
    fe_questions (
      *,
      fe_assessment_questions (
        *,
        assessment_id
      )
    )
  `)
  .eq("framework_id", frameworkId)  // Filter by framework_id
  .eq("fe_questions.fe_assessment_questions.assessment_id", assessmentId)

  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  sections.forEach(section => {
    if (section.fe_questions) {
      section.fe_questions.forEach((feQuestion: any) => {
        if (feQuestion.fe_assessment_questions) {
          // Sort fe_assessment_questions by order_index
          feQuestion.fe_assessment_questions.sort((a: any, b: any) => {
            return a.order_index - b.order_index;
          });
        }
      });
    }
  });
  
  // Now, sort the sections array itself by order_index
  sections.sort((a: any, b: any) => {
    return a.order_index - b.order_index;  // Sorting sections by order_index
  });
  

  return sections;
}


