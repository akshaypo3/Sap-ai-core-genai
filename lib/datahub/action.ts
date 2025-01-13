"use server";
import { createClient } from "@/utils/supabase/server";

// Function to generate a signed URL for the file
export async function downloadFile(name: string) {
  const supabase = await createClient();

  try {
    if (!name) {
      console.log("Error: No file name provided");
      return null; // Return null or handle error case
    }

    const { data, error } = await supabase.storage
      .from('uploads')
      .createSignedUrl(`files/${name}`, 3600, {
        download: true,
      });

    if (error) {
      console.log("Error generating signed URL:", error.message);
      return null; // Return null in case of error
    }

    if (!data?.signedUrl) {
      console.log("Error: No signed URL returned");
      return null;
    }

    // Return the signed URL
    //console.log("Signed URL generated:", data.signedUrl);
    return data.signedUrl;
  } catch (error) {
    console.log("Error generating signed URL:", error);
    return null;
  }
}
