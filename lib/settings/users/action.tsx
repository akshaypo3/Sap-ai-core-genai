"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "@/lib/settings/users/data";

export async function deleteGroup(id: any) {
  const supabase = createClient();
  const userData = await getUserInfo(); 
  const userEmail= userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf('@'));
 
  try {
    const { data } = await supabase.from('groups').select().eq('id', id);

    console.log("fetch the data",data)

    const { error } = await supabase.from("groups").delete().eq("id", id);

    if (!error && data) {
      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(), 
        activity: `Group '${data[0]?.group}' deleted`,
        user:userName,
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
  const userData = await getUserInfo(); 
  const userEmail= userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf('@'));

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

    if (!error && data) {
      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(), 
        activity: `Group '${groupName}' created`, 
        user:userName,
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
  const userData = await getUserInfo(); 
  const userEmail= userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf('@'));
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
        user:userName,
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
  const userData = await getUserInfo(); 
  const userEmail= userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf('@'));

    try {
    const { data } = await supabase.auth.admin.getUserById(user_id);

    const { error } = await supabase.auth.admin.deleteUser(user_id);

    if (!error) {
      if (data && data.user && data.user.email) {
        await supabase.from("activitylog").insert({
          created_at: new Date().toISOString(),
          activity: `User '${data.user.email}' deleted`,
          user: userName,
        });
      } else {
        console.warn("User data is invalid or email is missing:", data);
      }
    }
    console.log("User deleted successfully! " + JSON.stringify(data));
     } catch (error) {
      console.log("Error while deleting User",error);
     } finally {
       revalidatePath('/settings/users');
       redirect('/settings/users');
     };
};

export async function createRole(formData: FormData) {
  const supabase = createClient();
  const userData = await getUserInfo(); 
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf('@'));

  const RoleName = formData.get("role");
  const RoleDesc = formData.get("description");

  console.log(RoleName, RoleDesc);

  try {
    const { data, error } = await supabase
      .from("Test_Role")
      .insert({
        role: RoleName,
        description: RoleDesc,
      })
      .select();

    if (!error && data) {
      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `Role '${RoleName}' created`,
        user: userName,
      });
    }
  } catch (error) {
    console.error("Error while adding Role", error);
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}

export async function deleteRole(id: any) {
  const supabase = createClient();
  const userData = await getUserInfo(); 
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf('@'));

  try {
    const { data } = await supabase.from('Test_Role').select().eq('id', id)

    const { error } = await supabase.from('Test_Role').delete().eq("id", id);

    if (!error && data) {
      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `Role '${data[0]?.role}' deleted`,
        user: userName,
      });
    }
  } catch (error) {
    console.error("Error while deleting Role", error);
  } finally {
    revalidatePath('/settings/users');
    redirect('/settings/users');
  }
}
