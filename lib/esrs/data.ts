import { createClient } from "@/utils/supabase/server";

export async function getBrsrAssessments() {
    const supabase = await createClient();
    const { data: brsrAssessments } = await supabase
        .from('brsr_assessments')
        .select('fyear, description, total_data_points, completed, under_review, to_be_assessed')
        .order('fyear', { ascending: false });
    return brsrAssessments;
};
