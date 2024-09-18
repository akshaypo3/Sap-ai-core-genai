import { createClient } from "@/utils/supabase/server";

export async function getTasks() {
  const supabase = createClient();

  const { data: tasks, error } = await supabase.from("tasks").select();

  if (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }

  return tasks;
}

export async function getUserProfiles() {
  const supabase = createClient();

  const { data: userProfiles, error } = await supabase
    .from("user_profile")
    .select()

  if (error) {
    console.error("Error fetching user profiles:", error);
    return [];
  }

  return userProfiles;
}

export async function getUserTasks(userId : string) {
  const supabase = createClient();

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select()
    .or(`assigned_to.eq.${userId},created_by.eq.${userId}`);

  if (error) {
    console.error(error);
    return [];
  }

  return tasks;
}

