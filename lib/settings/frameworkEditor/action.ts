"use server";
 
import { createClient } from "@/utils/supabase/server";
import { Position } from "@xyflow/react";
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
  const answer_configTable=formData.get("answerOptionsTable");
  const min =formData.get("minLength");
  const max =formData.get("maxLength");
  const validation_rules=[{"min":min},{"max":max}]
  const framework_id=formData.get("framework_id");
  const answers=JSON.parse(answer_config);

  let answersTable = [];
  if( question_type === "Table"){
  if (answer_configTable) {
    try {
      answersTable = JSON.parse(answer_configTable);
    } catch (error) {
      console.error("Error parsing answer_configTable:", error);
    }
  }
  }
  
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
    qu_columns:answersTable,
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
    const { data: questionData, error: fetchError } = await supabase
      .from("fe_questions")
      .select("*, section:section_id(section_code)")
      .eq("id", questionId)
      .single();

    if (fetchError) {
      console.error("Error fetching question:", fetchError.message);
      return { success: false, error: fetchError.message };
    }
	const position=questionData.order_index;
    const section_id=questionData.section_id;
    const section_code=questionData.section.section_code;
	const { data: parentSections, error: parentError } = await supabase
        .from("fe_questions")
		.select("*")
		.eq("section_id", section_id)
		.gt("order_index", position)
		.order("order_index", { ascending: true });
		
      if (parentError) {
        console.error("Error fetching parent section order index:", parentError);
      }

    const { error: deleteError } = await supabase
      .from("fe_questions")
      .delete()
      .eq("id", questionId);

    if (deleteError) {
      console.error("Error deleting question:", deleteError.message);
      return { success: false, error: deleteError.message };
    }

    if(parentSections.length>0)
      {
        for (const parentSection of parentSections) {
          const newOrderIndex = parentSection.order_index - 1;
          const { error: updateError } = await supabase
            .from("fe_questions")
            .update({
              order_index: newOrderIndex,
              question_code: section_code + "." + newOrderIndex,
            })
            .eq("id", parentSection.id);
  
          if (updateError) {
            console.error("Error updating order index for question:", updateError);
          }
      }
      }

     return { success: true, deletedData: questionData };
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

export const fetchQuestions = async (framework_id:string) => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from("fe_questions")
      .select("*,section:section_id(name, section_code, id)")
      .eq("framework_id", framework_id)
      .order("order_index", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data; // Return the fetched data
  } catch (err) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export async function DuplicateQuestion(formData: FormData) {
  const supabase = createClient();
  const section_code = formData.get("section_code");
  const section_id = formData.get("section_id");
  const question_text=formData.get("question_text");
  const help_text=formData.get("help_text");
  const question_type=formData.get("question_type");
  const is_required=formData.get("is_required");
  const is_repeatable="false";
  const answer_config=formData.get("answer_config");
  const validation_rules1=formData.get("validation_rules");
  const framework_id=formData.get("framework_id");
  const minLength = String(validation_rules1[0]?.min || 0);
  const maxLength = String(validation_rules1[1]?.max || 100);
  const validation_rules=[{"min":minLength},{"max":maxLength}]
  const answers=JSON.parse(answer_config);
  const qu_columns1=formData.get("qu_columns");
  const qu_columns=[qu_columns1]

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
        framework_id: framework_id,
        qu_columns:qu_columns
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

export async function upwardDownwardCreateQuestion(formData: FormData) {
  const supabase = createClient();
  const section_code = formData.get("section_code");
  const section_id = formData.get("section_id");
  const question_text = formData.get("questionText");
  const help_text = formData.get("helpText");
  const question_type = formData.get("answerType");
  const is_required = formData.get("isRequired");
  const is_repeatable = "false";
  const answer_config = formData.get("answerOptions");
  const answer_configTable = formData.get("answerOptionsTable");
  const min = formData.get("minLength");
  const max = formData.get("maxLength");
  const validation_rules = [{ "min": min }, { "max": max }];
  const framework_id = formData.get("framework_id");
  const answers = JSON.parse(answer_config);
  const questionData = formData.get("questionData");
  const key1 = formData.get("key1");

  const parsedData = JSON.parse(questionData);
  const orderofthequestiondata = parsedData.order_index;
  const position = key1;

  let answersTable = [];
  if (question_type === "Table") {
    if (answer_configTable) {
      try {
        answersTable = JSON.parse(answer_configTable);
      } catch (error) {
        console.error("Error parsing answer_configTable:", error);
      }
    }
  }

  let postionofnewdata = 0;

  // Logic to determine the position
  if (position === "upward" && orderofthequestiondata === 1) {
    postionofnewdata = 1;
  } else if (position === "upward") {
    postionofnewdata = orderofthequestiondata;
  } else {
    postionofnewdata = orderofthequestiondata + 1;
  }


  try {
    if (section_id) {
      const { data: parentSections, error: parentError } = await supabase
        .from("fe_questions")
        .select("*")
        .eq("section_id", section_id)
        .order("order_index", { ascending: false });

      if (parentError) {
        console.error("Error fetching parent section order index:", parentError);
      }

      // If the new question is being inserted at the first position
      if (postionofnewdata === 1) {
        // Move all existing questions down by 1 order_index, one by one
        for (const parentSection of parentSections) {
          const newOrderIndex = parentSection.order_index + 1;
          const { error: updateError } = await supabase
            .from("fe_questions")
            .update({
              order_index: newOrderIndex,
              question_code: section_code + "." + newOrderIndex, // Update question_code
            })
            .eq("id", parentSection.id);

          if (updateError) {
            console.error("Error updating order index for question:", updateError);
          }
           // Insert the new question at the specified position
        const { data, error } = await supabase
        .from("fe_questions")
        .insert({
          section_id: section_id,
          question_code: section_code + "." + postionofnewdata,
          question_text: question_text,
          help_text: help_text,
          question_type: question_type,
          is_required: is_required,
          is_repeatable: is_repeatable,
          answer_config: answers,
          qu_columns: answersTable,
          validation_rules: validation_rules,
          order_index: postionofnewdata,
          framework_id: framework_id,
        })
        .select();

      if (error) {
        console.log("Error inserting question data into the table", error);
      } else {
        console.log("Question created successfully:", data);
      }
          
        }
      }
      // If the new question is inserted in the middle
      else if (parentSections.length >= postionofnewdata) {
        // Shift all questions from the position down by 1, one by one
        for (const parentSection of parentSections.filter(
          (parentSection) => parentSection.order_index >= postionofnewdata
        )) {
          const newOrderIndex = parentSection.order_index + 1; // Move down by 1
          const { error: updateError } = await supabase
            .from("fe_questions")
            .update({
              order_index: newOrderIndex,
              question_code: section_code + "." + newOrderIndex, // Update question_code
            })
            .eq("id", parentSection.id);

          if (updateError) {
            console.error("Error updating order index for question:", updateError);
          }
        }

        // Insert the new question at the specified position
        const { data, error } = await supabase
          .from("fe_questions")
          .insert({
            section_id: section_id,
            question_code: section_code + "." + postionofnewdata,
            question_text: question_text,
            help_text: help_text,
            question_type: question_type,
            is_required: is_required,
            is_repeatable: is_repeatable,
            answer_config: answers,
            qu_columns: answersTable,
            validation_rules: validation_rules,
            order_index: postionofnewdata,
            framework_id: framework_id,
          })
          .select();

        if (error) {
          console.log("Error inserting question data into the table", error);
        } else {
          console.log("Question created successfully:", data);
        }
      }
      // If the new question is being inserted at the end
      else {
        const { data, error } = await supabase
          .from("fe_questions")
          .insert({
            section_id: section_id,
            question_code: section_code + "." + postionofnewdata, // Use the new order_index for question_code
            question_text: question_text,
            help_text: help_text,
            question_type: question_type,
            is_required: is_required,
            is_repeatable: is_repeatable,
            answer_config: answers,
            qu_columns: answersTable,
            validation_rules: validation_rules,
            order_index: postionofnewdata,
            framework_id: framework_id,
          })
          .select();

        if (error) {
          console.log("Error inserting question data into the table", error);
        } else {
          console.log("Question created successfully:", data);
        }
      }
    }
  } catch (error) {
    console.error("Error while adding section:", error);
  } finally {
    revalidatePath(`/settings/frameworkEditor/${framework_id}`);
    redirect(`/settings/frameworkEditor/${framework_id}`);
  }
}

export async function saveReorderedQuestionsOnServer(questions: any, framework_id: string) {
  const supabase = createClient();

  const firstUpdates = questions.map((question: any) => ({
    id: question.id,
    order_index: question.order_index,
    question_code: question.section?.section_code + "." + question.order_index + "1", 
    question_text: question.question_text || "Untitled Question",
    question_type: question.question_type || "text", 
    is_required: question.is_required ?? true,
  }));

  const secondUpdates = questions.map((question: any) => ({
    id: question.id,
    order_index: question.order_index,
    question_code: question.section?.section_code + "." + question.order_index, 
    question_text: question.question_text || "Untitled Question",
    question_type: question.question_type || "text", 
    is_required: question.is_required ?? true,
  }));

  try {
    const { error: error1 } = await supabase
      .from("fe_questions")
      .upsert(firstUpdates, { onConflict: ["id"] });

    if (error1) {
      console.log("Failed to update questions (first stage):", error1);
      throw new Error("Failed during the first update stage.");
    }

    const { error: error2 } = await supabase
      .from("fe_questions")
      .upsert(secondUpdates, { onConflict: ["id"] });

    if (error2) {
      console.log("Failed to update questions (second stage):", error2);
      throw new Error("Failed during the second update stage.");
    }

  } catch (err) {
    console.error("An error occurred while rearranging questions:", err);
  } finally {
    revalidatePath(`/settings/frameworkEditor/${framework_id}`);
    redirect(`/settings/frameworkEditor/${framework_id}`);
  }
}

