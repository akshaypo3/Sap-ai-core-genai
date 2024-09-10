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

export async function createRole(formData:FormData){
  const supabase = createClient()

  const RoleName = formData.get("role");
  const RoleDesc = formData.get("description")

  console.log(RoleName,RoleDesc);

  try {
    const newRoleGroup = await supabase.from('Test_Role').insert(
      {
        role:RoleName,
        description:RoleDesc
      }
    );
    console.log("Create Role: "+JSON.stringify(newRoleGroup))
  } catch (error) {
    console.error("Error while adding Role");
  } finally {
    revalidatePath('/settings/users');
    redirect('/settings/users');
  }
}

export async function deleteRole(id:any){
  const supabase = createClient()
  try {
    const deletedRole = await supabase.from('Test_Role').delete().eq("id",id)
  } catch (error) {
    console.error("Error while deleting Role");
  } finally {
    revalidatePath('/settings/users');
    redirect('/settings/users');
  }
}