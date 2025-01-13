import { createClient } from "@/utils/supabase/server";

export interface DataPoint {
  [key: string]: string | number;
}

export async function getAR16Items(){
    const supabase = await createClient()
    const { data: ar16Items } = await supabase.from('esrs_ar16').select();
    //console.log("AR16 Items: "+ ar16Items.length)
    return ar16Items;
};

export async function getAssessments(){
    const supabase = await createClient();
    const { data: assessments } = await supabase.from('materialityassessments').select(`
        id,
        fyear,
        created_at,
        state,
        statecode,
        framework_id,
        frameworks (
            title
        ),
        step
    `);
    return assessments;
};

export async function getFrameworks(){
    const supabase = await createClient();
    const { data: frameworks } = await supabase.from('frameworks').select();
    return frameworks;
};


export async function getAssessmentData(materialityassessmentsid) {
  const supabase = await createClient();

  try {
    const { data: esrsIrosData, error: irosError } = await supabase
      .from('esrs_iros')
      .select('*')
      .eq('assessment_id', materialityassessmentsid)
      .order('esrs_id', { ascending: true });

    if (irosError) {
      throw new Error("Error fetching data from esrs_iros: " + irosError.message);
    }

    const { data: stakeholderData, error: stakeholderError } = await supabase
      .from('esrs_iros_stakeholders')
      .select(`
        esrs_iro_id,
        stakeholder:stakeholders(id, name)
      `)
      .in('esrs_iro_id', esrsIrosData.map(iro => iro.id));

    if (stakeholderError) {
      throw new Error("Error fetching stakeholder data: " + stakeholderError.message);
    }

    const processedData = esrsIrosData.map(iro => ({
      ...iro,
      stakeholders: stakeholderData
        .filter(s => s.esrs_iro_id === iro.id)
        .map(s => s.stakeholder)
        .flat()  
    }));

    // console.log("Processed data:", JSON.stringify(processedData, null, 2));

    return processedData;

  } catch (error) {
    console.error("Error while fetching esrs_iros data: ", error.message);
    return [];
  }
}

  export async function getAssessmentDataforchart(materialityassessmentsid) {
    const supabase = await createClient();
  
    try {
      // Query the esrs_iros table to fetch and sort rows with the specified assessment_id
      const { data: esrsIrosData, error } = await supabase
        .from('esrs_iros')
        .select('*')
        .eq('assessment_id', materialityassessmentsid)
        .or('impact_score.gt.0,financial_score.gt.0')
        .order('esrs_id', { ascending: true });
  
      // Handle errors
      if (error) {
        throw new Error("Error fetching data from esrs_iros: " + error.message);
      }
      //console.log(esrsIrosData);
      return esrsIrosData;
      
  
    } catch (error) {
      console.error("Error while fetching esrs_iros data: ", error.message);
      return [];
    }
  }

  export async function getIroData(iroId:any) {
    const supabase = await createClient();
  
    try {

      const { data: IrosData, error } = await supabase
        .from('esrs_iros')
        .select()
        .eq('id', iroId);
  
      if (error) {
        throw new Error("Error fetching data from esrs_iros: " + error.message);
      }
      return IrosData;
  
    } catch (error) {
      console.error("Error while fetching esrs_iros data: ", error.message);
      return [];
    }
  }

  export async function getEsrsIrosStats(materialityassessmentsid) {
    const supabase = await createClient();
  
    try {
      const { data, error } = await supabase
        .from('esrs_iros')
        .select('status', { count: 'exact' })
        .eq('assessment_id', materialityassessmentsid);
  
      if (error) {
        throw new Error("Error fetching data from esrs_iros: " + error.message);
      }
  
      const total_count = data.length;
      const statusCounts = {
        material: 0,
        not_material: 0,
        under_review: 0,
        to_be_assessed: 0
      };
  
      data.forEach(item => {
        switch (item.status) {
          case 'Material':
            statusCounts.material++;
            break;
          case 'Not Material':
            statusCounts.not_material++;
            break;
          case 'Under Review':
            statusCounts.under_review++;
            break;
          case 'To Be Assessed':
            statusCounts.to_be_assessed++;
            break;
        }
      });
  
      return {
        total_count,
        ...statusCounts
      };
  
    } catch (error) {
      console.error("Error while fetching esrs_iros stats: ", error.message);
      return {
        total_count: 0,
        material: 0,
        not_material: 0,
        under_review: 0,
        to_be_assessed: 0
      };
    }
  }

  export async function getEsrsIrosStatscount(materialityassessmentsid) {
    const supabase = await createClient();
  
    try {
      const { data: esrsIrosData, error } = await supabase
        .from('esrs_iros')
        .select('*')
        .eq('assessment_id', materialityassessmentsid);
  
      if (error) {
        throw new Error("Error fetching data from esrs_iros: " + error.message);
      }
  
      // Check if data is retrieved
      //console.log("Fetched Data:", esrsIrosData);
  
      // Ensure esrsIrosData is an array before mapping
      if (Array.isArray(esrsIrosData)) {
        // Add a count column to each row
        const dataWithCount = esrsIrosData.map(item => ({
          ...item,
          count: 1, // Add the count property with value 1
        }));
  
        //console.log("Data with Count Added:", dataWithCount); // Log the new data
        return dataWithCount;
      } else {
        console.error("Fetched data is not an array:", esrsIrosData);
        return [];
      }
    } catch (error) {
      console.error("Error while fetching esrs_iros data: ", error.message);
      return [];
    }
  }  

