import { createClient } from "@/utils/supabase/server";

export async function getAssessmentsCBAM() {
    const supabase = await createClient();
    const { data: assessments } = await supabase.from("cbam_assessments").select();
  
    return assessments;
  }