"use server";

import { createClient } from "@/utils/supabase/server"; // Adjust the path based on your project structure

// Function to fetch only active BRSR assessments
export async function fetchAssessments() {
  const supabase = await createClient();

  // Fetch all assessments from the esrs_assessments table
  const { data, error } = await supabase
    .from("esrs_assessments")
    .select();

  if (error) {
    console.error("Error fetching assessments:", error);
    return []; // Return an empty array on error
  }

  console.log("Fetched Assessments Data:", data); // Log the fetched data
  return data || []; // Ensure to return an empty array if data is null or undefined
}

// Function to edit a specific assessment by ID
export async function updateAssessment(id, updatedFields) {
  const supabase = await createClient();

  // Update the assessment with the given ID
  const { data, error } = await supabase
    .from("esrs_assessments")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    console.error(`Error updating assessment with ID ${id}:`, error);
    return { success: false, error: "Failed to update assessment" };
  }

  console.log(`Updated Assessment ID ${id}:`, data); // Log the updated data
  return { success: true, data };
}

// Function to create a new assessment
export async function createAssessment(newAssessment) {
  const supabase = await createClient();

  // Insert a new assessment into the esrs_assessments table
  const { data, error } = await supabase
    .from("esrs_assessments")
    .insert([newAssessment]);

  if (error) {
    console.error("Error creating assessment:", error);
    return { success: false, error: "Failed to create assessment" };
  }

  console.log("Created New Assessment:", data); // Log the new assessment data
  return { success: true, data };
}
