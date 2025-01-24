
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "@/lib/settings/users/data";

export async function createTemplate(formData: FormData) {
    const supabase = await createClient();
    const userData = await getUserInfo();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const userId = userData.id;
    
    try {
      const { data, error } = await supabase
        .from('reporting_templates')
        .insert({
          name: name,
          description: description,
          category: category,
          created_by: userId,
          updated_by: userId
        })
        .select();
   
      if (error) {
        throw new Error("Error while creating templates: " + error.message);
      }
  
      revalidatePath(`/reporting/templates`);
    } catch (error) {
      console.error("Error while adding new templates: ", error);
    }
  }

export async function deleteTemplate(templateId:any) {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("reporting_templates")
      .delete()
      .eq("id", templateId);
      
    revalidatePath("/reporting/templates");
  } catch (error) {
    console.error("Error while deleting Template", error);
  } 
}

export async function addTemplateContent(templateId:any,content:any) {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("reporting_templates")
      .update({content})
      .eq("id", templateId);
      
    revalidatePath(`/reporting/templates/${templateId}`);
  } catch (error) {
    console.error("Error while adding Template", error);
  }
}

export async function getNewsArticlesForTemplateCards(){
  const supabase = await createClient();

  try {
      const { data: newsArticles, error} = await supabase.from('news_articles').select('*');
      
      if(error){
          console.error("Error while fetching news articles:", error)
      }else{
          return newsArticles;
      };
      
  } catch (error) {
      console.error("Error while fetching news articles:", error)
  }
}

