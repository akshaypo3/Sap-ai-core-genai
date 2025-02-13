import { createClient } from "@/utils/supabase/server";

export async function getTemplates() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("reporting_templates").select();

  if (error) {
    console.error("Error fetching templates", error);
    return [];
  }
  return data;
}

export async function getUsers(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profile")
    .select("username")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching users:", error);
  }
  return data;
}

export async function getAnsweredQuestions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("fe_assessment_questions")
    .select(`
      *,
      fe_assessments(name),
      fe_answers(answer_value)
    `)
    .eq("answered", true)
    .order("assessment_id", { ascending: true });

  if (error) {
    console.error("Error fetching answered questions:", error);
    return [];
  }

  const groupedQuestions = data.reduce((acc, question) => {
    const { assessment_id, fe_assessments, fe_answers } = question;
    const assessmentName = fe_assessments ? fe_assessments.name : "Unknown";

    if (!acc[assessmentName]) {
      acc[assessmentName] = [];
    }
    
    acc[assessmentName].push({
      ...question,
      answer_value: fe_answers.length > 0 ? fe_answers[0].answer_value : null,
    });

    return acc;
  }, {});

  return groupedQuestions;
}
