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