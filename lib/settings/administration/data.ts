import { createClient } from "@/utils/supabase/server";

export async function getGlossaryitems_en(){
    const supabase = createClient()
    const { data: glossaryItems } = await supabase.from('glossary_en').select().order('title');
    const glossaryItemsWithLanguage = glossaryItems.map(item => ({
      ...item,
      language: 'English'
    }));
    return glossaryItemsWithLanguage;
  };
  
  export async function getGlossaryitems_de(){
    const supabase = createClient()
    const { data: glossaryItems } = await supabase.from('glossary_de').select().order('title');
    const glossaryItemsWithLanguage = glossaryItems.map(item => ({
      ...item,
      language: 'Deutsch'
    }));
    return glossaryItemsWithLanguage;
  };

  export async function Anthropic(){
    const supabase = createClient()
    const { data: Anthropicdata } = await supabase.from('Anthropic').select().single();
    
    return Anthropicdata;
  };
  
  
export async function OpenAI(){
    const supabase = createClient()
    const { data: OpenAIdata } = await supabase.from('open_ai').select().single();
    
    return OpenAIdata;
  };