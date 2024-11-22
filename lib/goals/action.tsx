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
  const targetValue = parseFloat(formData.get("target_value") as string) || 0;
  const unitOfMeasure = formData.get("unit_of_measure");
  const startDate = formData.get("start_date");
  const endDate = formData.get("end_date");
  const baselineValue =
    parseFloat(formData.get("baseline_value") as string) || 0;
  const currentValue = parseFloat(formData.get("current_value") as string) || 0;
  const owner = formData.get("owner");
  const status = formData.get("status");
  const keyActions = formData.get("key_actions");
  const frequencyOfMeasurement = formData.get("frequency_of_measurement");
  const completionDate = formData.get("completion_date");
  const risks = formData.get("risks");
  const comments = formData.get("comments");
  const visualization = formData.get("visualization");

  const calculateProgress = (
    currentValue: number,
    baselineValue: number,
    targetValue: number,
  ): number => {
    if (currentValue < baselineValue) {
      return 0;
    } else if (currentValue >= targetValue) {
      return 100;
    } else {
      return Math.min(
        ((currentValue - baselineValue) / (targetValue - baselineValue)) * 100,
        100,
      );
    }
  };

  const progress = calculateProgress(currentValue, baselineValue, targetValue);
  const progressInt = Math.round(progress);

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
        progress: progressInt,
        owner: owner,
        status: status,
        key_actions: keyActions,
        frequency_of_measurement: frequencyOfMeasurement,
        completion_date: completionDate,
        risks: risks,
        comments: comments,
        visualization: visualization,
      })
      .select();

    if (data && data.length > 0 && data[0].id) {
      const goalId = data[0].id;
      const { data: historyData, error: historyDataError } = await supabase
        .from("goal_history")
        .insert({
          goal_id: goalId,
          target_value: targetValue,
          baseline_value: baselineValue,
          current_value: currentValue,
          progress: progressInt, 
          status: status,
          comments: comments,
          unit_of_measure: unitOfMeasure
        });

      if (historyDataError) {
        console.error("Error inserting into goal-history:", historyDataError);
      }
    }

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
          progress: progressInt,
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
    //console.log("Created Goal: " + JSON.stringify(data));
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
          deleted_at: new Date().toISOString(),
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
    const updatedGoal: any = {};

    for (const key in goalData) {
      if (
        goalData[key] !== undefined &&
        String(goalData[key]) !== String(currentGoal[key])
      ) {
        updatedGoal[key] = goalData[key];
      }
    }

    if (!("status" in goalData)) {
      updatedGoal["status"] = currentGoal["status"];
    }

    if (Object.keys(updatedGoal).length === 0) {
      console.log("No fields were updated.");
      return;
    }

    const updatedFields: any = {};
    for (const key in goalData) {
      if (String(goalData[key]) !== String(currentGoal[key])) {
        updatedFields[key] = {
          previous: currentGoal[key] || "N/A",
          updated: goalData[key] || "N/A",
        };
      }
    }

    const { data, error } = await supabase
      .from("goals")
      .update(goalData)
      .eq("id", id);

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

export async function addValue(formData:FormData) {
  const supabase = createClient();

  const targetValue = parseFloat(formData.get("target_value") as string) || 0;
  const baselineValue = parseFloat(formData.get("baseline_value") as string) || 0;
  const currentValue = parseFloat(formData.get("current_value") as string) || 0;
  const comments = formData.get("comments");
  const status = formData.get("status");
  const unitOfMeasure = formData.get("unit_of_measure");
  const goalId = formData.get("goalId");
  console.log(targetValue);
  console.log(baselineValue);
  console.log(currentValue);
  console.log(status);
  console.log(unitOfMeasure);
  console.log(comments);
  console.log("Goal id from action.ts ",goalId);

  const calculateProgress = (
    currentValue: number,
    baselineValue: number,
    targetValue: number,
  ): number => {
    if (currentValue < baselineValue) {
      return 0;
    } else if (currentValue >= targetValue) {
      return 100;
    } else {
      return Math.min(
        ((currentValue - baselineValue) / (targetValue - baselineValue)) * 100,
        100,
      );
    }
  };

  const progress = calculateProgress(currentValue, baselineValue, targetValue);
  const progressInt = Math.round(progress);

  try {
    const { data: value, error: valueError } = await supabase
      .from("goal_history")
      .insert({
        goal_id: goalId,
        target_value: targetValue,
        baseline_value: baselineValue,
        current_value: currentValue,
        progress: progressInt, 
        status: status,
        comments: comments,
        unit_of_measure : unitOfMeasure
      })
      .select();

    if (valueError) {
      console.error("Error adding into goal-history:", valueError);
    }

    const { data: goalValue, error: goalValueError } = await supabase
      .from("goals")
      .update({
        target_value: targetValue,
        baseline_value: baselineValue,
        current_value: currentValue,
        progress: progressInt, 
        status: status,
        comments: comments,
        unit_of_measure : unitOfMeasure
      })
      .eq("id", goalId);

    if (!goalValueError && goalValue) {
      console.log("New goal current value is added");
    }

    //console.log("Added Value:", value);
  } catch (error) {
    console.error("Error while adding value:", error);
  } finally {
    revalidatePath("/materiality/goals");
    redirect("/materiality/goals");
  }
}
