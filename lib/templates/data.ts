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
