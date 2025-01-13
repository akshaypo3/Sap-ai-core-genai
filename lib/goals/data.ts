import { createClient } from "@/utils/supabase/server";

export async function getGoals() {
  const supabase = await createClient();

  const { data: goals, error } = await supabase
    .from("goals")
    .select()
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching goals:", error);
    return [];
  }

  return goals;
}

export async function getGoalById(goalId: string) {
  const supabase = await createClient();

  const { data: goal, error } = await supabase
    .from("goals")
    .select()
    .eq("id", goalId)
    .single(); 

  if (error) {
    console.error("Error fetching goal:", error);
    return null;
  }

  return goal;
}

export async function getActivityLogById(activityId: string) {
  const supabase = await createClient();

  const { data: log, error } = await supabase
    .from("goals-activitylog")
    .select()
    .eq("id", activityId)
    .single(); 

  if (error) {
    console.error("Error fetching activity logs:", error);
    return null;
  }

  return log;
}

export async function getActivityGoalLogs() {
  const supabase = await createClient();

  const { data: activities, error } = await supabase
    .from("goals-activitylog")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching activity logs for goals:", error);
    return [];
  }

  return activities;
}
export async function Goalhistory() {
  const supabase = await createClient();

  const { data: goalsWithHistory, error } = await supabase
    .from("goals")
    .select(`
      *,
      goal_history (
         *
      )
    `)
    .order("created_at", { ascending: true });


  if (error) {
    console.error("Error fetching activity logs for goals:", error);
    return [];
  }
   // Sort the goal_history for each goal by recorded_at
   goalsWithHistory.forEach(goal => {
    if (goal.goal_history) {
      goal.goal_history.sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    }
  });

  return goalsWithHistory;
}