import { createClient } from "@/utils/supabase/server";

export async function getFramework(){
    const supabase = createClient();

    const { data: frameworks } = await supabase.from('framework').select();
    return frameworks;
};

