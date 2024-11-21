"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFramework(formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name");
  const description = formData.get("description");
  const framework_type = formData.get("framework_type");
  const version = formData.get("version");
  const reporting_year = formData.get("reporting_year");
  const status = formData.get("status");
  const userId = formData.get("userId")

  try {
    const { data, error } = await supabase
      .from("fe_frameworks")
      .insert({
        name: name,
        description: description,
        framework_type: framework_type,
        version: version,
        reporting_year: reporting_year,
        status: status,
        created_by: userId
      })
      .select();

    if (error) {
      console.log("error inserting framework data in to the table", error);
    }
  } catch (error) {
    console.error("Error while adding framework:", error);
  } finally {
    revalidatePath("/settings/frameworkEditor");
    redirect("/settings/frameworkEditor");
  }
}

export async function deleteFramework(id: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("fe_frameworks")
      .delete()
      .eq("id", id)
      .select();

    if (data) {
      console.log("Deleted Framework", data);
    }

    if (error) {
      console.log("error deleting framework data from the table", error);
    }
  } catch (error) {
    console.error("Error while deleting framework:", error);
  } finally {
    revalidatePath("/settings/frameworkEditor");
    redirect("/settings/frameworkEditor");
  }
}

export async function updateFramework(id: string, goalData: any) {
  const supabase = createClient();
  const { name, description, framework_type, version, reporting_year, status } =
    goalData;

  try {
    const { data, error } = await supabase
      .from("fe_frameworks")
      .update({
        name: name,
        description: description,
        framework_type: framework_type,
        version: version,
        reporting_year: reporting_year,
        status: status,
      })
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error while updating framework:", error);
      return;
    }
  } catch (error) {
    console.error("Error updating goal:", error);
  } finally {
    revalidatePath("/materiality/goals");
    redirect("/materiality/goals");
  }
}
