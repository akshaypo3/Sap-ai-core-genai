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
  

  const { data: frameworks } = await supabase.from("fe_frameworks").select();
  return frameworks;
}