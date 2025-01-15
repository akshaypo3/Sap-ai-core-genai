
"use server";

const cron = require("node-cron");
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { sendMail } from "@/lib/settings/smtp/action";
import { getUserInfo } from "@/lib/settings/users/data";
import { getTimeZone } from "@/lib/settings/timezone/action";

export async function createTemplate(formData: FormData) {
    const supabase = await createClient();
    const userData = await getUserInfo();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const content = formData.get("content");
    const userId = userData.id;
    const userEmail = userData.email;
    const userName = userEmail.substring(0, userEmail.indexOf("@"));
    
    try {
      const { data, error } = await supabase
        .from('reporting_templates')
        .insert({
          name: name,
          description: description,
          category: category,
          content: content,
          created_by: userId,
          updated_by: userId
        })
        .select();
   
      if (error) {
        throw new Error("Error while creating templates: " + error.message);
      }
  
      revalidatePath(`/reporting/templates`);
    } catch (error) {
      console.error("Error while adding new templates: ", error);
    }
  }

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

