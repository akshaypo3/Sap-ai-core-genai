"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "@/lib/settings/users/data";

export async function getAllUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data.users;
}

export async function getUserGroups() {
  const supabase = createClient();

  const { data: userGroups } = await supabase.from("groups").select();

  return userGroups;
}

export async function getRoles() {
  const supabase = createClient();
  const { data: roles } = await supabase.from("Test_Role").select(`
      id,
      role,
      description
    `);
  return roles;
}

export async function deleteGroup(id: any) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  try {
    const { data } = await supabase.from("groups").select().eq("id", id);

    //console.log("fetch the data", data);

    const { error } = await supabase.from("groups").delete().eq("id", id);

    if (!error && data) {
      console.log("deleting group");
      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `Group '${data[0]?.group}' deleted`,
        user: userName,
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
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

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
        user: userName,
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
  console.log("formData", formData);
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
  const email = formData.get("name");
  const password = formData.get("password");
  const userGroupID = formData.get("groupID");
  const userRoleID = formData.get("roleID");
  const profileUserName = email.substring(0, email.indexOf("@"));

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, //default flag to auto verify the email
    });

    if (!error && data) {
      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `User with '${email}' created`,
        user: userName,
      });
      // create a new user profile in the database for the supabase user with details
      await supabase.from("user_profile").insert({
        id: data.user.id,
        username: profileUserName,
        user_groupID: userGroupID,
        user_roleID: userRoleID,
        userEmail: email,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}

// Delete the user from the Supabase
export async function deleteUser(user_id: any) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
  console.log("user_id", user_id);

  try {
    // delete the attached user profile

    const { data } = await supabase.auth.admin.getUserById(user_id);

    const { error } = await supabase.auth.admin.deleteUser(user_id);

    const { error: deleteError, data: deletedData } = await supabase
      .from("user_profile")
      .delete()
      .eq("id", user_id);

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
    console.log("Error while deleting User", error);
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}

export async function createRole(formData: FormData) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

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
  //console.log("delete role", id);
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  try {
    const { data } = await supabase.from("Test_Role").select().eq("id", id);

    const { error } = await supabase.from("Test_Role").delete().eq("id", id);

    if (!error && data) {
      console.log("deleting role");
      await supabase.from("activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `Role '${data[0]?.role}' deleted`,
        user: userName,
      });
    }
  } catch (error) {
    console.error("Error while deleting Role", error);
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}

// Create/Assign role Group & Role

export async function editProfile(formData: FormData) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userID = userData.id;
  const userName = formData.get("username");
  const userEmail = formData.get("userEmail");
  try {
    const { data, error } = await supabase
      .from("user_profile")
      .update({
        username: userName,
        //userEmail:userEmail
      })
      .eq("id", userID);

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  } catch (error) {
    console.error("Error while adding Profile", error.message);
  } finally {
    revalidatePath("/account");
    redirect("/account");
  }
}

// Edit the user profile from the Supabase
export async function editUserRoleGroup(user_id: any, formData) {
  console.log("user_id", user_id);
  const supabase = createClient();
  // const userName = formData.get("username");
  // const userEmail = formData.get("userEmail");
  const userGroupId = formData.get("groupID");
  const userRoleId = formData.get("roleID");
  console.log("SELECTD ID", user_id);
  try {
    const { data, error } = await supabase
      .from("user_profile")
      .update({
        user_groupID: userGroupId,
        user_roleID: userRoleId,
      })
      .eq("id", user_id);
    // const newProfile = await supabase.from('user_profile').insert(
    //   {
    //     user_groupID:userGroupId,
    //     user_roleID:userRoleId,
    //     username:userName,
    //     userEmail:userEmail
    //   });

    if (error) {
      throw new Error(error.message);
    }
    console.log("data", data);
    // Return the updated data to the calling component
    return { success: true, data };
  } catch (error) {
    console.error("Error while adding Profile", error.message);
  } finally {
    revalidatePath("/settings/users");
    redirect("/settings/users");
  }
}

// Assign the role to user
export async function assignRole(role_ID: any, formData) {
  const supabase = createClient();
  const userID = formData.get("userID");
  const roleID = role_ID;
  try {
    const { data, error } = await supabase
      .from("user_profile")
      .update({
        user_roleID: roleID,
      })
      .eq("id", userID);
  } catch (error) {
    console.error("Error while adding UserProfile", error.message);
  } finally {
    revalidatePath(`/settings/roles/${role_ID}`); //redirect to same role detais page
    redirect(`/settings/roles/${role_ID}`);
  }
}

// Assign the role to user
export async function assignGroup(group_ID: any, formData) {
  const supabase = createClient();
  const userID = formData.get("userID");
  const groupID = group_ID;
  try {
    const { data, error } = await supabase
      .from("user_profile")
      .update({
        user_groupID: groupID,
      })
      .eq("id", userID);
  } catch (error) {
    console.error("Error while adding UserProfile", error.message);
  } finally {
    revalidatePath(`/settings/groups/${groupID}`); //redirect to same role detais page
    redirect(`/settings/groups/${groupID}`);
  }
}

export async function changelanguage(language: any) {
  const supabase = createClient();
  console.log(language);

  try {
    const { data, error } = await supabase
      .from("global_language")
      .select("*")
      .single();

    if (error) {
      throw new Error(
        `Error checking existing language record: ${error.message}`
      );
    }

    if (data) {
      const { error: updateError } = await supabase
        .from("global_language")
        .update({ language: language })
        .eq("id", data.id); // Update using the existing record's id (assuming single record)

      if (updateError) {
        throw new Error(`Failed to update language: ${updateError.message}`);
      }

      console.log("Language updated successfully", data);
    }
  } catch (error) {
    console.error("Error while updating language", error.message);
  } finally {
    // Revalidate the path and redirect after changing language
    revalidatePath("/settings/administration");
    redirect("/settings/administration");
  }
}

export async function Globallanguagedata() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("global_language")
    .select("*")
    .single();

  return data;
}

export async function NotificationToggler(newStatus: any, userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profile")
    .update({ notifications: newStatus })
    .eq("id", userId);

  if (error) {
    console.error("Error updating notification status:", error);
  }
  return data;
}
