import { createClient } from "@/utils/supabase/server";

export async function fetchAllData() {
    const supabase = createClient();

    const frameworksResponse = await supabase.from("frameworks").select();

    // Handle error for frameworks fetch
    if (frameworksResponse.error) {
        console.error("Error fetching frameworks:", frameworksResponse.error);
        return null; // or handle the error as needed
    }

    // Return only frameworks data
    return {
        frameworks: frameworksResponse.data
    };
}
