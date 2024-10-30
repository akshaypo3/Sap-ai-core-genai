import { createClient } from "@/utils/supabase/server";

export async function fetchPlans() {
    const supabase = createClient();
    const { data, error } = await supabase.from("plans").select();
    
    if (error) {
        console.error("Error fetching plans:", error);
        return null; // or handle the error as needed
    }

    return data;
}
