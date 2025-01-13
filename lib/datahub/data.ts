import { createClient } from "@/utils/supabase/server";

export async function getallFiles() {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from('uploads').list('files', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
  });
  
  if (error) {
      console.error("Error fetching files:", error);
      return [];
  }

  const filteredData = data.filter(file => file.name !== '.emptyFolderPlaceholder');
  return filteredData;
}



