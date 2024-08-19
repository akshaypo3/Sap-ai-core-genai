import { createClient } from "@/utils/supabase/server";
const supabase = createClient()

export async function getAR16Items(){
    const { data: ar16Items } = await supabase.from('esrs_ar16').select();
    //console.log("AR16 Items: "+ ar16Items.length)
    return ar16Items;
};

