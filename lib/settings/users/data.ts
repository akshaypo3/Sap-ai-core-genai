import { createClient } from "@/utils/supabase/server";

export async function getUserGroups() {
  const supabase = createClient();

  const { data: userGroups } = await supabase.from("groups").select();

  return userGroups;
}

export async function getAllUsers() {
    const supabase = createClient();    
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {        
      console.error("Error fetching users:", error);
      return [];
    }

    return data.users; 
  }

export async function getUserInfo() {
  const supabase = createClient();    
  const { data, error } = await supabase.auth.getUser();

  if (error) {        
    console.error("Error fetching users:", error);
    return [];
  }

 console.log("User data:", data.user);
 const email = data?.user?.email || null; 
  return data.user; 
}

export async function getActivityLog() {
  const supabase = createClient();

  const { data: activities, error } = await supabase
    .from("activitylog")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching activity log:", error);
    return [];
  }

  return activities;
}
