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

  export async function getParentSections() {
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase
        .from("fe_sections")
        .select()
        .eq("id", "d6c31261-9fc8-4068-9cc8-0dd01be92640")
        .single()
  
      
      return data;
    } catch (error) {
      console.error("Error while fetching parent sections:", error);
      return [];
    }
  }
  
  export async function getSections(frameworkId: string) {
    const supabase = createClient();
  
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
  
  export async function getQuestion() {
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase
        .from("fe_questions")
        .select()
        .eq("id", "6924f18c-9935-4d0d-88ab-e603d32a5e0f")
        .single()
  
      
      return data;
    } catch (error) {
      console.error("Error while fetching question:", error);
      return [];
    }
  }