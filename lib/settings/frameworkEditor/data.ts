import { createClient } from "@/utils/supabase/server";

export async function getFEFrameworkById(frameworkId:string) {
    const supabase = await createClient();

    const { data: frameworks } = await supabase
    .from("fe_frameworks")
    .select()
    .eq("id", frameworkId)
    .single()

    return frameworks;
  }


  export async function getAssessmentQuestionById(questionId: string) {
    const supabase = await createClient();
  
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

  export async function getSectionsById(framework_id:any) {
    const supabase = await createClient();
  
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
  
  export async function getSections(frameworkId: string) {
    const supabase = await createClient();
  
    const { data: sections, error } = await supabase
      .from("fe_sections")
      .select("id, section_code, name")
      .eq("framework_id", frameworkId);
  
    if (error) {
      console.error("Error fetching sections:", error);
      return [];
    }
  
  
    const formattedSections = sections.map((section) => ({
      section_id: section.id,
      section_code: section.section_code,
      section_name: section.name,
    }));
  
    return formattedSections;
  }
  
  export async function getQuestion(frameworkId: string) {
    const supabase = await createClient();
  
    try {
      const { data, error } = await supabase
        .from("fe_questions")
        .select()
        .eq("framework_id", frameworkId)

      return data;
    } catch (error) {
      console.error("Error while fetching question:", error);
      return [];
    }
  }

  export async function getAssesmentQuestion(id1) {
    const supabase = await createClient();
  
    try {
      const { data, error } = await supabase
        .from("fe_assessment_questions")
        .select()
        .eq("id", id1)
        .single()

      return data;
    } catch (error) {
      console.error("Error while fetching question:", error);
      return [];
    }
  }