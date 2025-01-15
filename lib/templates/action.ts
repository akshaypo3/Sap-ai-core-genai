"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTemplate(templateId:any) {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("reporting_templates")
      .delete()
      .eq("id", templateId);
      
  } catch (error) {
    console.error("Error while deleting Template", error);
  } finally {
    revalidatePath("/reporting/templates");
    redirect("/reporting/templates");
  }
}
