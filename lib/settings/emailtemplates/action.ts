"use server";
import { createClient } from "@/utils/supabase/server"; 

export async function fetchEmailTemplates() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("email_templates").select();
  if (error) {
    console.error("Error fetching email templates:", error);
    throw new Error(`Error fetching email templates: ${error.message}`);
  }
  return data; 
}

export const deleteEmailTemplate = async (id: string) => {
  const supabase = await createClient(); 
  const { error } = await supabase
    .from("email_templates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting email template:", error);
    throw new Error(`Error deleting email template: ${error.message}`);
  }
};

export const addEmailTemplate = async (
  name: string,
  description: string,
  subject: string,
  body_html: string,
  body_text: string,
  template_key: string,
  active: boolean,
  variables: object,
  category: string,
  sender_name: string,
  sender_email: string,
  reply_to: string,
  version: number
) => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("email_templates")
    .insert([{
      name,
      description,
      subject,
      body_html,
      body_text,
      template_key,
      active,
      variables,
      category,
      sender_name,
      sender_email,
      reply_to,
      version
    }])
    .select();
  
  if (error) {
    console.error("Error adding email template:", error);
    throw new Error(`Error adding email template: ${error.message}`);
  }
  return data;
};

export const updateEmailTemplate = async (
  name: string,
  description: string,
  subject: string,
  body_html: string,
  body_text: string,
  template_key: string,
  active: boolean,
  variables: object,
  category: string,
  sender_name: string,
  sender_email: string,
  reply_to: string,
  version: number,
  id: string 
) => {
  const supabase = await createClient(); 

  const { data, error } = await supabase
    .from("email_templates")
    .update([{
      name,
      description,
      subject,
      body_html,
      body_text,
      template_key,
      active,
      variables,
      category,
      sender_name,
      sender_email,
      reply_to,
      version,
    }])
    .eq("id", id); 

  if (error) {
    console.error("Error updating email template:", error); 
    throw new Error(`Error updating email template: ${error.message}`); 
  }

  return data;
};

export const fetchEmailTemplateById = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("email_templates") 
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message); 
  }

  return data;
};
