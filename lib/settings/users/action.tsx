"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function deleteGroup(id: any) {
  const supabase = createClient();

  try {
    const { data: groupData } = await supabase.from('groups').select().eq('id', id);

    const { error } = await supabase.from("groups").delete().eq("id", id);

    if (!error) {
      await supabase.from("activitylog").insert({
        id: groupData?.id,
        created_at: new Date().toISOString(), 
        activity: `Group '${groupData?.group}' deleted`,
      });
    }
  } catch (error) {
    console.error("Error while deleting Group:", error);
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}

export async function createGroup(formData: FormData) {
  const supabase = createClient();

  const groupName = formData.get("name");
  const groupDesc = formData.get("description");

  console.log(groupName, groupDesc);

  try {
    const { data, error } = await supabase
      .from("groups")
      .insert({
        group: groupName,
        description: groupDesc,
      })
      .select();

    const typedData = data as { id: string }[] | null;  

    if (!error && typedData && typedData.length > 0) {
      await supabase.from("activitylog").insert({
        id: typedData[0]?.id,
        created_at: new Date().toISOString(), 
        activity: `Group '${groupName}' created`, 
      });
    }
  } catch (error) {
    console.error("Error while adding Group:", error);
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}

export async function createUser(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data, error } = await supabase.auth.admin.createUser({ 
      email, 
      password, 
      email_confirm: true 
    });

    if (!error && data) {

      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(), 
        activity: `User with '${email}' created`,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    revalidatePath('/settings/users');
    redirect('/settings/users');
  }
}


export async function deleteUser(user_id:any){
  const supabase = createClient()
    try {
    const { data: userData } = await supabase.auth.admin.getUserById(user_id);

    const { error } = await supabase.auth.admin.deleteUser(user_id);

    if (!error) {
      if (userData && userData.user && userData.user.email) {
        await supabase.from("activitylog").insert({
          created_at: new Date().toISOString(),
          activity: `User '${userData.user.email}' deleted`,
        });
      } else {
        console.warn("User data is invalid or email is missing:", userData);
      }
    }
    console.log("User deleted successfully! " + JSON.stringify(userData));
     } catch (error) {
      console.log("Error while deleting User",error);
     } finally {
       revalidatePath('/settings/users');
       redirect('/settings/users');
     };
};