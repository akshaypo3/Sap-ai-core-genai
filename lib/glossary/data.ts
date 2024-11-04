import { createClient } from "@/utils/supabase/server";


export async function getGlossaryitems(){
    const supabase = createClient()
    const { data: glossaryItems } = await supabase.from('glossary_items').select().order('title');
    //console.log("Glossary Items: "+ glossaryItems.length)
    return glossaryItems;
};

