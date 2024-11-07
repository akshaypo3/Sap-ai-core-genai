"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "@/lib/settings/users/data";

export async function createGlossary(formData: FormData) {
    const supabase = createClient();
  
    const GlossaryName = formData.get("title");
    const GlossaryDesc = formData.get("description");
    const language = formData.get("language");
    console.log("tset123"+language);

    let tableName;
  switch (language) {
    case "English":
      tableName = "glossary_en";
      break;
    case "Deutsch":
      tableName = "glossary_de"; // Adjust as needed for other languages
      break;
    // Add more cases for other languages
    default:
      tableName = "glossary_en"; // Fallback to English or handle as needed
      break;
  }
  
  
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert({
          title: GlossaryName,
          description: GlossaryDesc,
        })
        .select();
  
    } catch (error) {
      console.error("Error while adding Glossary", error);
    } finally {
      revalidatePath("/settings/administration");
      redirect("/settings/administration");
    }
  }

  export async function deleteGlossary(id: any,language: any) {
    const supabase = createClient();
    
     let tableName;
    switch (language) {
      case "English":
        tableName = "glossary_en";
        break;
      case "Deutsch":
        tableName = "glossary_de"; // Adjust as needed for other languages
        break;
      // Add more cases for other languages
      default:
        tableName = "glossary_en"; // Fallback to English or handle as needed
        break;
    }
  
  
    try {
   
      const { error: deleteError, data: deletedData } = await supabase
        .from(tableName)
        .delete()
        .eq("id", id);
  
    } catch (error) {
      console.log("Error while deleting Glossary", error);
    } finally {
      revalidatePath("/settings/administration");
      redirect("/settings/administration");
    }
  }

  export async function editGlossary(id,language, formData) {
    const supabase = createClient();
    const description1 = formData.get("description");
    const id1=id

    let tableName;
      switch (language) {
        case "English":
          tableName = "glossary_en";
          break;
        case "Deutsch":
          tableName = "glossary_de"; // Adjust as needed for other languages
          break;
        // Add more cases for other languages
        default:
          tableName = "glossary_en"; // Fallback to English or handle as needed
          break;
      }
  
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update({
          description: description1
        })
        .eq("id", id1);
  
      if (error) {
        throw new Error(error.message);
      }
  
      return { success: true, data };
    } catch (error) {
      console.error("Error while updating glossary:", error);
      return { success: false, message: error.message }; // Return error details
    } finally {
      revalidatePath("/settings/administration");
      redirect("/settings/administration");
    }
  }

  export async function editAnthropic(id:any,formData: FormData) {
    const supabase = createClient();
    
   
    const API_Key = formData.get("API_Key");
    const Model = formData.get("Model");
    const Token_Limit_per_Month = formData.get("Token_Limit_per_Month");
    
    try {
      const { data, error } = await supabase
        .from("Anthropic")
        .update({
          API_Key: API_Key,
      Model: Model,
      Token_Limit_per_Month: Token_Limit_per_Month,
        })
        .eq("id", id);
  
      if (error) {
        throw new Error(`Failed to update Antropic: ${error.message}`);
      }
    } catch (error) {
      console.error("Error while update Antropic", error.message);
    } finally {
      revalidatePath("/settings/administration");
        redirect("/settings/administration");
    }
  }
  
  export async function editOpenAPI(id:any,formData: FormData) {
    const supabase = createClient();
    const API_Key = formData.get("API_Key");
    const Token_Limit_per_Month = formData.get("Token_Limit_per_Month");
    console.log(id,API_Key,Token_Limit_per_Month);
    
    try {
      const { data, error } = await supabase
        .from("open_ai")
        .update({
          API_Key: API_Key,
      Token_Limit_per_Month: Token_Limit_per_Month,
        })
        .eq("id", id);
  
      if (error) {
        throw new Error(`Failed to update OpenAI: ${error.message}`);
      }
    } catch (error) {
      console.error("Error while update OpenAI", error.message);
    } finally {
      revalidatePath("/settings/administration");
        redirect("/settings/administration");
    }
  }