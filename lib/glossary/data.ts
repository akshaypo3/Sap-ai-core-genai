import { createClient } from "@/utils/supabase/server";


export async function getGlossaryitems(){
    const supabase = await createClient()
    const { data: glossaryItems } = await supabase.from('glossary_items').select().order('title');
    //console.log("Glossary Items: "+ glossaryItems.length)
    return glossaryItems;
};

export async function getGlossary_en(){
    const supabase = await createClient()
    const { data: glossaryItems } = await supabase.from('glossary_en').select().order('title');
    return glossaryItems;
  };
  
  export async function getGlossary_de(){
    const supabase = await createClient()
    const { data: glossaryItems } = await supabase.from('glossary_de').select().order('title');
    return glossaryItems;
  };