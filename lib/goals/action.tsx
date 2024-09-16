"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "@/lib/settings/users/data";

export async function createGoal(formData: FormData) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  const goalName = formData.get("name");
  const goalDesc = formData.get("description");
  const targetValue = formData.get("target_value");
  const unitOfMeasure = formData.get("unit_of_measure");
  const startDate = formData.get("start_date");
  const endDate = formData.get("end_date");
  const baselineValue = formData.get("baseline_value");
  const currentValue = formData.get("current_value");
  const progress = formData.get("progress");
  const owner = formData.get("owner");
  const status = formData.get("status") === "true";
  const keyActions = formData.get("key_actions");
  const frequencyOfMeasurement = formData.get("frequency_of_measurement");
  const completionDate = formData.get("completion_date");
  const risks = formData.get("risks");
  const comments = formData.get("comments");

  console.log(
    goalName,
    goalDesc,
    targetValue,
    unitOfMeasure,
    startDate,
    endDate,
  );

  try {
    const { data, error } = await supabase
      .from("goals")
      .insert({
        name: goalName,
        description: goalDesc,
        target_value: targetValue,
        unit_of_measure: unitOfMeasure,
        start_date: startDate,
        end_date: endDate,
        baseline_value: baselineValue,
        current_value: currentValue,
        progress: progress,
        owner: owner,
        status: status,
        key_actions: keyActions,
        frequency_of_measurement: frequencyOfMeasurement,
        completion_date: completionDate,
        risks: risks,
        comments: comments,
      })
      .select();

    if (!error && data) {
      await supabase.from("goals-activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `Goal '${goalName}' created`,
        user: userName,
        changes: {
          user: userName,
          activity: `Goal '${goalName}' created`,
          created_at: new Date().toISOString(),
          name: goalName,
          target_value: targetValue,
          unit_of_measure: unitOfMeasure,
          baseline_value: baselineValue,
          current_value: currentValue,
          progress: progress,
          description: goalDesc,
          owner: owner,
          start_date: startDate,
          end_date: endDate,
          status: status,
          key_actions: keyActions,
          frequency_of_measurement: frequencyOfMeasurement,
          completion_date: completionDate,
          risks: risks,
          comments: comments,
        },
      });
    }

    console.log("Created Goal: " + JSON.stringify(data));
  } catch (error) {
    console.error("Error while adding Goal:", error);
  } finally {
    revalidatePath("/materiality/goals");
    redirect("/materiality/goals");
  }
}

export async function deleteGoal(id: any) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  try {
    const { data } = await supabase.from("goals").select().eq("id", id);

    console.log("deleted data", data);

    const { error } = await supabase.from("goals").delete().eq("id", id);

    if (!error && data) {
      await supabase.from("goals-activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `Goal '${data[0]?.name}' deleted`,
        user: userName,
        changes: {
          user: userName,
          activity: `Goal '${data[0]?.name}' deleted`,
          deleted_at: new Date().toISOString()
        },
      });
    }
  } catch (error) {
    console.error("Error while deleting Goal:", error);
  } finally {
    revalidatePath("/materiality/goals");
    redirect("/materiality/goals");
  }
}

export async function updateGoal(id: string, goalData: any) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  try {
    const { data: currentGoal, error: fetchError } = await supabase
      .from("goals")
      .select()
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching current goal data:", fetchError);
      return;
    }

    const updatedFields: any = {};
    for (const key in goalData) {
      if (String(goalData[key]) !== String(currentGoal[key])) {
        updatedFields[key] = {
          previous: currentGoal[key] || "N/A", 
          updated: goalData[key] || "N/A"
        };
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      console.log("No fields were updated.");
      return;
    }

    const { data, error } = await supabase
      .from("goals")
      .update(goalData)
      .eq("id", id);

    console.log("Previous data", currentGoal);
    console.log("Updated data", data);

    if (!error) {
      await supabase.from("goals-activitylog").insert({
        created_at: new Date().toISOString(),
        activity: `Goal '${goalData.name}' updated`,
        user: userName,
        changes: updatedFields,
      });
    }
  } catch (error) {
    console.error("Error updating goal:", error);
  } finally {
    revalidatePath("/materiality/goals");
    redirect("/materiality/goals");
  }
}
