import { createClient } from "@/utils/supabase/server";


export async function getAR16Items(){
    const supabase = createClient()
    const { data: ar16Items } = await supabase.from('esrs_ar16').select();
    //console.log("AR16 Items: "+ ar16Items.length)
    return ar16Items;
};

export async function getAssessments(){
    const supabase = createClient();
    const { data: assessments } = await supabase.from('materialityassessments').select(`
        id,
        fyear,
        created_at,
        state,
        statecode,
        framework_id,
        frameworks (
            title
        )
    `);
    return assessments;
};

export async function getFrameworks(){
    const supabase = createClient();
    const { data: frameworks } = await supabase.from('frameworks').select();
    console.log("frameworks: "+frameworks);
    return frameworks;
};


export async function getAssessmentData(materialityassessmentsid) {
    const supabase = createClient();
  
    try {
      // Query the esrs_iros table to fetch and sort rows with the specified assessment_id
      const { data: esrsIrosData, error } = await supabase
        .from('esrs_iros')
        .select('*')
        .eq('assessment_id', materialityassessmentsid)
        .order('esrs_id', { ascending: true });
  
      // Handle errors
      if (error) {
        throw new Error("Error fetching data from esrs_iros: " + error.message);
      }
  
      // Return the data
      return esrsIrosData;
  
    } catch (error) {
      console.error("Error while fetching esrs_iros data: ", error.message);
      return [];
    }
  }

  export async function getIroData(iroId:any) {
    const supabase = createClient();
  
    try {

      const { data: IrosData, error } = await supabase
        .from('esrs_iros')
        .select()
        .eq('id', iroId);
  
      if (error) {
        throw new Error("Error fetching data from esrs_iros: " + error.message);
      }
      console.log("IroDataInSF: "+IrosData);
      return IrosData;
  
    } catch (error) {
      console.error("Error while fetching esrs_iros data: ", error.message);
      return [];
    }
  }

