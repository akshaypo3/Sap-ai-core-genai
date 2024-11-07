"use server";

import { createClient } from "@/utils/supabase/server"; // Ensure path is correct

// Function to fetch only active BRSR assessments
export async function fetchAssessments() {
  const supabase = createClient(); // Initialize supabase client

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
  const supabase = createClient(); // Initialize supabase client inside the function
  
  const { id, fyear, description, total_data_points, completed, under_review, to_be_assessed } = assessment;
  
  try {
    const { data, error } = await supabase
      .from('brsr_assessments') // Replace 'assessments' with your actual table name
      .update({
        fyear,
        description,
        total_data_points,
        completed,
        under_review,
        to_be_assessed
      })
      .eq('id', id); // Match the ID to update the correct record
    
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
  const supabase = createClient(); // Initialize supabase client

  try {
    const { data, error } = await supabase
      .from("brsr_assessments") // Table name
      .insert([{
        fyear: newAssessment.fyear,
        description: newAssessment.description,
        total_data_points: newAssessment.total_data_points,
        completed: newAssessment.completed,
        under_review: newAssessment.under_review,
        to_be_assessed: newAssessment.to_be_assessed
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
