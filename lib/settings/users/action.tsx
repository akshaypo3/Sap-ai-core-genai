"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function deleteGroup(id: any) {
  const supabase = createClient();
  try {
    const deleteGrp = await supabase.from("groups").delete().eq("id", id);
  } catch (error) {
    console.error("Error while deleting Group");
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}


export  async function createUser(formData:FormData) {
    const supabase = createClient()
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { data, error } = await supabase.auth.admin.createUser({ email,password,email_confirm: true});       
      console.log("User created successfully! "+JSON.stringify(data.user)); 
    } 
    catch (error) {       
        console.error("Error fetching users:", error);
            } finally {
        revalidatePath('/settings/users');
        redirect('/settings/users');
      };     
   }

export async function deleteUser(user_id:any){
  const supabase = createClient()
    try {
      console.log("UserID",user_id);
      const deleteUser = await supabase.auth.admin.deleteUser(user_id);
      console.log("User deleted successfully! "+JSON.stringify(deleteUser));
     } catch (error) {
      console.log("Error while deleting User",error);
     } finally {
       revalidatePath('/settings/users');
       redirect('/settings/users');
     };
};