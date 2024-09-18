import { createClient } from "@/utils/supabase/server";

export async function getSmtpSettings(){
    const supabase = createClient();
    const settings = await supabase.from("smtpsettings").select().single();
    // console.log(settings);
    return settings;
};

