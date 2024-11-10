"use server";

import { createClient } from "@/utils/supabase/server"; // Ensure the path is correct

// Function to fetch only active BRSR assessments
export async function fetchAssessments() {
  const supabase = createClient(); // Initialize Supabase client

  try {
    // Fetch all assessments from the brsr_assessments table
    const { data, error } = await supabase
      .from("brsr_assessments")
      .select();

    if (error) {
      throw new Error(error.message); // Throw error for better error handling
    }

    console.log("Fetched Assessments Data:", data);
    return data || []; // Ensure to return an empty array if data is null or undefined
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return []; // Return empty array on failure
  }
}

// Function to update a specific assessment by ID
export const updateAssessment = async (assessment) => {
  const supabase = createClient(); // Initialize Supabase client

  const { id, fyear, description, total_data_points, completed, under_review, to_be_assessed ,framework,status,material,non_material} = assessment;

  try {
    const { data, error } = await supabase
      .from("brsr_assessments")
      .update({
        fyear,
        description,
        total_data_points,
        completed,
        under_review,
        to_be_assessed,
        framework,
        status,
        material,
        non_material
      })
      .eq("id", id); // Match the ID to update the correct record

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

// Function to create a new assessment
export const createAssessment = async (newAssessment) => {
  const supabase = createClient(); // Initialize Supabase client

  try {
    const { data, error } = await supabase
      .from("brsr_assessments") // Table name
      .insert([{
        fyear: newAssessment.fyear,
        description: newAssessment.description,
        total_data_points: newAssessment.total_data_points,
        completed: newAssessment.completed,
        under_review: newAssessment.under_review,
        to_be_assessed: newAssessment.to_be_assessed,
        framework:newAssessment.framework,
        status:newAssessment.status,
        material:newAssessment.material,
        non_material:newAssessment.non_material
      }]);

    if (error) {
      throw new Error(error.message); // Throw error for better error handling
    }

    console.log("New Assessment Created:", data);
    return true; // Success
  } catch (error) {
    console.error("Error creating assessment:", error);
    return false; // Failure
  }
};

// Function to delete an assessment by ID with verification
export const deleteAssessment = async (id) => {
  const supabase = createClient(); // Initialize Supabase client

  console.log("Attempting to delete assessment with ID:", id); // Log the ID being passed

  try {
    // First, double-check that we can select the record before deleting
    const { data: fetchData, error: fetchError } = await supabase
      .from("brsr_assessments")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching assessment before delete:", fetchError.message);
      return false;
    }

    if (!fetchData) {
      console.warn("No assessment found with the specified ID before delete:", id);
      return false;
    }

    console.log("Assessment verified before delete:", fetchData);

    // Proceed with the deletion
    const { data: deleteData, error: deleteError } = await supabase
      .from("brsr_assessments")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting assessment:", deleteError.message);
      return false;
    }

    if (!deleteData || deleteData.length === 0) {
      console.warn("No assessment found with the specified ID during delete:", id);
      return false;
    }

    console.log("Assessment Deleted Successfully:", deleteData);
    return true;
  } catch (error) {
    console.error("Unexpected error during deletion:", error);
    return false;
  }
};
