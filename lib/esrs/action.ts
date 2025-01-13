"use server";

import { createClient } from "@/utils/supabase/server"; 


export async function fetchAssessments() {
  const supabase = await createClient();

  try {
    
    const { data, error } = await supabase
      .from("esrs_assessments")
      .select();

    if (error) {
      throw new Error(error.message);
    }

    console.log("Fetched Assessments Data:", data);
    return data || []; 
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return []; 
  }
}


export const updateAssessment = async (assessment) => {
  const supabase = await createClient();
  
  const { id, fyear, description, total_data_points, completed, under_review, to_be_assessed, status, material, non_material, frameworks } = assessment;
  
  try {
    const { data, error } = await supabase
      .from('esrs_assessments') 
      .update({
        fyear,
        description,
        total_data_points,
        completed,
        under_review,
        to_be_assessed,
        status,
        material,
        non_material,
        frameworks
      })
      .eq('id', id);
    
    if (error) {
      console.error("Error updating assessment:", error);
      return false;
    }
    console.log("Assessment updated successfully:", data);
    return true;
  } catch (error) {
    console.error("Error in updateAssessment function:", error);
    return false;
  }
};


export const createAssessment = async (newAssessment) => {
  const supabase = await createClient(); 

  try {
    const { data, error } = await supabase
      .from("esrs_assessments") 
      .insert([{
        fyear: newAssessment.fyear,
        description: newAssessment.description,
        total_data_points: newAssessment.total_data_points,
        completed: newAssessment.completed,
        under_review: newAssessment.under_review,
        to_be_assessed: newAssessment.to_be_assessed,
        status:newAssessment.status,
        material:newAssessment.material,
        non_material:newAssessment.non_material,
        frameworks:newAssessment.frameworks
        
      }]);

    if (error) {
      throw new Error(error.message); 
    }

    console.log("New Assessment Created:", data);
    return true; 
  } catch (error) {
    console.error("Error creating assessment:", error);
    return false; 
  }
};

export const deleteAssessment = async (id, fetchAssessments) => {
  const supabase = await createClient(); 

  console.log("Attempting to delete assessment with ID:", id); 

  try {
    
    const { data, error } = await supabase
      .from("esrs_assessments")
      .delete()
      .eq("id", id);

    
    if (error) {
      console.error("Error during deletion:", error.message);
      return false;
    }

    
    if (data && data.length === 0) {
      console.warn("No assessment found with the specified ID during delete:", id);
      return false;
    }

    console.log("Assessment Deleted Successfully:", data);

    
    if (fetchAssessments && typeof fetchAssessments === 'function') {
      fetchAssessments(); // Re-fetch the assessments data
    }

    return true;
  } catch (error) {
    console.error("Unexpected error during deletion:", error);
    return false;
  }
};
