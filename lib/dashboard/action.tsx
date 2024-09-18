"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import { getUserInfo } from "@/lib/settings/users/data"

export async function createTask(formData: FormData) {
    const supabase = createClient();
    // const userData = await getUserInfo(); 
    // const userEmail= userData.email;
    // const userName = userEmail.substring(0, userEmail.indexOf('@'));
  
    const title = formData.get("title");
    const description = formData.get("description");
    const assigned_to  = formData.get("assigned_to");
    const created_by = formData.get("created_by");
    const status = formData.get("status");
    const start_date = formData.get("start_date");
    const due_date = formData.get("due_date");
    const updated_at = formData.get("updated_at");
  
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          title: title,
          description: description,
          assigned_to: assigned_to,
          created_by: created_by,
          status:status,
          start_date:start_date,
          due_date: due_date,
          updated_at: updated_at
        })
        .select();
  
      // if (!error && data) {
      //   await supabase.from("activitylog").insert({
      //     created_at: new Date().toISOString(), 
      //     activity: `Group '${groupName}' created`, 
      //   //   user:userName,
      //   });
      // }
    } catch (error) {
      console.error("Error while adding task:", error);
    } finally {
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  }
  