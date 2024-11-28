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

  export async function getSectionsById(framework_id:any) {
    const supabase = createClient();
  
    const { data: sections, error } = await supabase
      .from("fe_sections")
      .select(`
        *,
        fe_frameworks(name)  
      `)
      .eq("framework_id", framework_id)
      .order("order_index", { ascending: true }); 
  
    if (error) {
      console.error("Error fetching sections:", error);
      return [];
    }
  
    return sections;
  }

export async function getQuestionColumnById(questionId:any) {
  const supabase = createClient();

  const { data: columns, error } = await supabase
    .from("fe_questions")
    .select("qu_columns, question_text")
    .eq("id", questionId)
    .single()

  if (error) {
    console.error("Error fetching columns:", error);
    return [];
  }

  return columns;
}