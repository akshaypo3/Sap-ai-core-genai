import { createClient } from "@/utils/supabase/server";

export async function fetchEmailTemplates() {
    const supabase = createClient();
    const { data, error } = await supabase.from("email_templates").select();
    
    if (error) {
        console.error("Error fetching email templates:", error);
        return null;
    }

    return data;
}
