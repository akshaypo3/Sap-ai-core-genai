import { createClient } from "@/utils/supabase/server";

export async function getSmtpSettings(){
    const supabase = await createClient();
    const settings = await supabase.from("smtpsettings").select().single();
    // console.log(settings);
    return settings;
};

