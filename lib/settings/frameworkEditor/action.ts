"use server";
 
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { json } from "stream/consumers";

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
 
export async function createSection(formData: FormData) {
  const supabase = createClient();
  const section_code = formData.get("section_code");
  const name = formData.get("name");
  const description = formData.get("description");
  let parent_section_id = formData.get("parent_section_id");
  const is_required = formData.get("is_required") === "true";
  const framework_id = formData.get("framework_id");
 
 
  const parentSectionValue = parent_section_id === '' ? null : parent_section_id;
 
  const metadata = formData.get("metadata")
    ? { additionalInfo: formData.get("metadata") }
    : { additionalInfo: "" };
 
  let newOrderIndex = 0;
 
  try {
    if (parentSectionValue) {
      const { data: parentSections, error: parentError } = await supabase
        .from("fe_sections")
        .select("order_index")
        .eq("parent_section_id", parentSectionValue)
        .order("order_index", { ascending: false })
        .limit(1);
 
      if (parentError) {
        console.error("Error fetching parent section order index:", parentError);
      }
 
      if (parentSections && parentSections.length > 0) {
        newOrderIndex = parentSections[0].order_index + 1;
      } else {
        newOrderIndex = 1;
      }
    } else {
      const { data: topLevelSections, error: topLevelError } = await supabase
  .from("fe_sections")
  .select("order_index")
  .is("parent_section_id", null)  // Use .is() to check for NULL values
  .order("order_index", { ascending: false })  // Get the section with the highest order_index
  .limit(1);
 
      if (topLevelError) {
        console.error("Error fetching top-level section order index:", topLevelError);
      }
 
      if (topLevelSections && topLevelSections.length > 0) {
        newOrderIndex = topLevelSections[0].order_index + 1;
      } else {
        newOrderIndex = 1;
      }
    }
 
    const { data, error } = await supabase
      .from("fe_sections")
      .insert({
        section_code: section_code,
        name: name,
        description: description,
        parent_section_id: parentSectionValue,
        is_required: is_required,
        order_index: newOrderIndex,
        framework_id: framework_id,
        metadata: metadata,
      })
      .select();
 
    if (error) {
      console.log("Error inserting section data into the table", error);
    } else {
      console.log("Section created successfully:", data);
    }
  } catch (error) {
    console.error("Error while adding section:", error);
  } finally {
    revalidatePath(`/settings/frameworkEditor/${framework_id}`);
    redirect(`/settings/frameworkEditor/${framework_id}`);
  }
}
 
export async function updateSection(formData: FormData) {
  const supabase = createClient();
  const section_code = formData.get("section_code");
  const name = formData.get("name");
  const description = formData.get("description");
  const is_required = formData.get("is_required") === "true";
  const metadata = formData.get("metadata") || "";
  const section_id = formData.get("id");
  const framework_id = formData.get("framework_id");
 
 
  const updatedMetadata = metadata ? { additionalInfo: metadata } : { additionalInfo: "" };
 
  try {
    const { data, error } = await supabase
      .from("fe_sections")
      .update({
        section_code: section_code,
        name: name,
        description: description || "",
        is_required: is_required,
        metadata: updatedMetadata,
      })
      .eq("id", section_id)  // Update by section_id (ensure this is passed in the formData)
      .select();
 
    if (error) {
      console.log("Error updating section data:", error);
    } else {
      console.log("Section updated successfully:", data);
    }
  } catch (error) {
    console.error("Error while updating section:", error);
  } finally {
    revalidatePath(`/settings/frameworkEditor/${framework_id}`);
    redirect(`/settings/frameworkEditor/${framework_id}`);
  }
}

export async function addQuestionColumn(formData: FormData) {
  const supabase = createClient();

  const columnName = formData.get("name");
  const questionId = formData.get("questionId");

  if (!columnName || !questionId) {
    console.error("Invalid form data: Missing name or questionId");
    return;
  }
  
  try {
    const { data: currentData, error: fetchError } = await supabase
      .from("fe_questions")
      .select("qu_columns")
      .eq("id", questionId)
      .single();

    if (fetchError) {
      console.error("Error fetching current columns:", fetchError);
      return;
    }

    const currentColumns = currentData?.qu_columns || [];

    if (!currentColumns.includes(columnName)) {
      currentColumns.push(columnName);
    }

    const { data, error: updateError } = await supabase
    .from("fe_questions")
    .update({ qu_columns: currentColumns })
    .eq("id", questionId);

    if (updateError) {
      console.error("Error updating columns:", updateError);
      return;
    }
  } catch (error) {
    console.error("Error while adding column:", error);
  } finally {
    revalidatePath("/settings/frameworkEditor/807a68a7-3160-4b0b-871c-e8183daddf86");
    redirect("/settings/frameworkEditor/807a68a7-3160-4b0b-871c-e8183daddf86");
  }
}

export async function createQuestion(formData: FormData) {
  const supabase = createClient();
  const section_code = formData.get("section_code");
  const section_id = formData.get("section_id");
  const question_text=formData.get("questionText");
  const help_text=formData.get("helpText");
  const question_type=formData.get("answerType");
  const is_required=formData.get("isRequired");
  const is_repeatable="false";
  const answer_config=formData.get("answerOptions");
  const min =formData.get("minLength");
  const max =formData.get("maxLength");
  const validation_rules=[{"min":min},{"max":max}]
  const framework_id=formData.get("framework_id");
  const answers=JSON.parse(answer_config);

  let newOrderIndex = 0;

  try {
    if (section_id) {
      const { data: parentSections, error: parentError } = await supabase
        .from("fe_questions")
        .select("order_index")
        .eq("section_id", section_id)
        .order("order_index", { ascending: false }) 
        .limit(1);

      if (parentError) {
        console.error("Error fetching parent section order index:", parentError);
      }

      if (parentSections && parentSections.length > 0) {
        newOrderIndex = parentSections[0].order_index + 1;
      } else {
        newOrderIndex = 1;
      }
    } else {
      newOrderIndex = 1;
    }

    const { data, error } = await supabase
      .from("fe_questions")
      .insert({
        section_id:section_id,
		question_code:section_code+"."+newOrderIndex,
		question_text:question_text,
		help_text:help_text,
		question_type:question_type,
		is_required:is_required,
		is_repeatable:is_repeatable,
		answer_config:answers,
		validation_rules:validation_rules,
        order_index: newOrderIndex, 
        framework_id: framework_id
      })
      .select();

    if (error) {
      console.log("Error inserting questions data into the table", error);
    } else {
      console.log("questions created successfully:", data);
    }
  } catch (error) {
    console.error("Error while adding section:", error);
  } finally {
    revalidatePath(`/settings/frameworkEditor/${framework_id}`);
    redirect(`/settings/frameworkEditor/${framework_id}`);
  }
}

export async function updateQuestion(formData: FormData) {
  const supabase = createClient();
  const question_text=formData.get("questionText");
  const help_text=formData.get("helpText");
  const question_type=formData.get("answerType");
  const is_required=formData.get("isRequired");
  const is_repeatable="false";
  const answer_config=formData.get("answerOptions");
  const min =formData.get("minLength");
  const max =formData.get("maxLength");
  const validation_rules=[{"min":min},{"max":max}]
  const framework_id=formData.get("framework_id");
  const id=formData.get("id");
  const answers=JSON.parse(answer_config);

  try {
    const { data, error } = await supabase
      .from("fe_questions")
      .update({
        question_text: question_text,
        help_text: help_text,
        question_type: question_type,
        is_required: is_required,
        answer_config: answers,
		validation_rules:validation_rules
		
      })
      .eq("id", id) 
      .select();

    if (error) {
      console.log("Error updating question data:", error);
    } else {
      console.log("Question updated successfully:", data);
    }
  } catch (error) {
    console.error("Error while updating question:", error);
  } 
  finally {
    revalidatePath(`/settings/frameworkEditor/${framework_id}`);
    redirect(`/settings/frameworkEditor/${framework_id}`);
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
    revalidatePath(`/settings/frameworkEditor${id}`);
    redirect(`/settings/frameworkEditor${id}`);
  }
};