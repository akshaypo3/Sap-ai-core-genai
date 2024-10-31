import { createClient } from "@/utils/supabase/server";

export async function fetchAllData() {
    const supabase = createClient();

    // Fetching data from frameworks, materialityassessment, and plans tables
    const [frameworksResponse, materialityAssessmentResponse, plansResponse] = await Promise.all([
        supabase.from("frameworks").select(),
        supabase.from("materialityassessment").select(),
        supabase.from("plans").select()
    ]);

    // Handle errors for each fetch
    if (frameworksResponse.error) {
        console.error("Error fetching frameworks:", frameworksResponse.error);
        return null; // or handle the error as needed
    }

    if (materialityAssessmentResponse.error) {
        console.error("Error fetching materiality assessments:", materialityAssessmentResponse.error);
        return null; // or handle the error as needed
    }

    if (plansResponse.error) {
        console.error("Error fetching plans:", plansResponse.error);
        return null; // or handle the error as needed
    }

    // Return combined data from all three fetches
    return {
        frameworks: frameworksResponse.data,
        materialityAssessments: materialityAssessmentResponse.data,
        plans: plansResponse.data
    };
}
