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
  