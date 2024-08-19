import { createClient } from "@/utils/supabase/server";
const supabase = createClient()

export async function getGlossaryitems(){
    const { data: glossaryItems } = await supabase.from('glossary_items').select().order('title');
    //console.log("Glossary Items: "+ glossaryItems.length)
    return glossaryItems;
};

