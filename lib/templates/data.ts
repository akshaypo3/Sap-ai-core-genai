import { createClient } from "@/utils/supabase/server";

export async function getTemplates() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reporting_templates")
    .select()

  if (error) {
    console.error("Error fetching templates", error);
    return [];
  }
  return data;
}
