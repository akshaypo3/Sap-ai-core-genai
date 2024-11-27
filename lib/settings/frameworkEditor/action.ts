"use server";

import { createClient } from "@/utils/supabase/server";
import { id } from "date-fns/locale";
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

export async function updateFramework(id: string, formData: any) {
  const supabase = createClient();
  const { name, description, framework_type, version, reporting_year, status } =
  formData;
console.log(formData.get("name"))
  try {
    const { data, error } = await supabase
      .from("fe_frameworks")
      .update({
        name: formData.get("name"),
        description: formData.get("description"),
        framework_type: formData.get("framework_type"),
        version: formData.get("version"),
        reporting_year: formData.get("reporting_year"),
        status: formData.get("status"),
      })
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error while updating framework:", error);
      return;
    }
  } catch (error) {
    console.error("Error updating FrameworkEditor:", error);
  } finally {
    revalidatePath("/settings/frameworkEditor");
    redirect("/settings/frameworkEditor");
  }
}

export async function createQuestion(formData: FormData) {
  const supabase = createClient();

  const assessment_id = formData.get("assessment_id");
  const section_code = formData.get("section_code");
  const question_code = formData.get("question_code");
  const question_text = formData.get("question_text");
  const question_type = formData.get("question_type");
  const order_index = formData.get("order_index");
  const original_question_id = formData.get("original_question_id");
  const help_text = formData.get("help_text");
  const is_required = formData.get("is_required") === "true"; 
  const is_repeatable = formData.get("is_repeatable") === "true"; 

  try {
    const { data, error } = await supabase
      .from("fe_assessment_questions")
      .insert({
        assessment_id,
        section_code,
        question_code,
        question_text,
        question_type,
        order_index,
        original_question_id,
        help_text,
        is_required,
        is_repeatable,
      })
      .select();

    if (error) {
      console.error("Error inserting question into the table:", error);
      return { success: false, error };
    }

    console.log("Question added successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error while adding question:", error);
    return { success: false, error };
  }
}


export const deleteQuestion = async (questionId: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("fe_questions")
      .delete()
      .eq("id", questionId);

    if (error) {
      console.error("Error deleting question:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("An error occurred while deleting the question:", err);
    return { success: false, error: err.message };
  }
};

export const duplicateQuestion = async (duplicatedQuestionData: any) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("fe_questions")
      .insert([duplicatedQuestionData]);

    if (error) {
      console.error("Error duplicating question:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: data[0] };
  } catch (err) {
    console.error("An error occurred while duplicating the question:", err);
    return { success: false, error: err.message };
  }finally {
    // revalidatePath(`/settings/frameworkEditor${id}`);
    // redirect(`/settings/frameworkEditor${id}`);
  }
};