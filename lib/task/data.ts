import { createClient } from "@/utils/supabase/server";

export async function getTasks() {
  const supabase = createClient();

  const { data: tasks, error } = await supabase.from("tasks").select(`
    *,
      assigned_to: user_profile!tasks_assigned_to_fkey(id, username),
      created_by: user_profile!tasks_created_by_fkey(id, username)
  `);

  if (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }

  const formattedTasks = tasks?.map((task: any) => ({
    ...task,
    assigned_to_username: task.assigned_to?.username || null,
    created_by_username: task.created_by?.username || null,
  }));

  return formattedTasks;
}

export async function getUserProfiles() {
  const supabase = createClient();

  const { data: userProfiles, error } = await supabase
    .from("user_profile")
    .select();

  if (error) {
    console.error("Error fetching user profiles:", error);
    return [];
  }

  return userProfiles;
}

export async function getUserTasks(userId: string) {
  const supabase = createClient();

  const { data: tasks, error } = await supabase.from("tasks").select(`
    *,
      assigned_to: user_profile!tasks_assigned_to_fkey(id, username),
      created_by: user_profile!tasks_created_by_fkey(id, username)
    `)
    .or(`created_by.eq.${userId}`);

  if (error) {
    console.error(error);
    return [];
  }

  const formattedTasks = tasks?.map((task: any) => ({
    ...task,
    assigned_to_username: task.assigned_to?.username || null,
    created_by_username: task.created_by?.username || null,
  }));

  return formattedTasks;
}

export async function getTaskById(taskId: string) {
    const supabase = createClient();

    const { data: task, error } = await supabase
      .from("tasks")
      .select(`
    *,
      assigned_to: user_profile!tasks_assigned_to_fkey(id, username),
      created_by: user_profile!tasks_created_by_fkey(id, username)
    `)
      .eq("id", taskId)
      .single(); 
  
    if (error) {
      console.error("Error fetching task:", error);
      return null;
    }
  
    const formattedTasks = {
        ...task,
        assigned_to_username: task.assigned_to?.username || null,
        created_by_username: task.created_by?.username || null,
      };
    
    return formattedTasks;
  }