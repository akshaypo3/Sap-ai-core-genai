import { createClient } from "@/utils/supabase/server";

// export async function fetchEmailTemplates() {
//     const supabase = await createClient();
//     const { data, error } = await supabase.from("email_templates").select();
    
//     if (error) {
//         console.error("Error fetching email templates:", error);
//         return null;
//     }

//     return data;
// }

export async function fetchEmailLogs() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("email_logs").select();
    
    if (error) {
        console.error("Error fetching email logs:", error);
        return null;
    }

    return data;
}