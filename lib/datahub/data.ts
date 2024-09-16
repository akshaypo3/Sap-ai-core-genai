import { createClient } from "@/utils/supabase/server";

// Fetch all the files from Supabase
export async function getallFiles() {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from('uploads').list('files', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })  
    if (error) {        
      console.error("Error fetching users:", error);
      return [];      
    }  
      return data; // Return the users data
  }


