"use server";

import { createClient } from "@/utils/supabase/server"; // Adjust the path based on your project structure

// Function to fetch only active plans
export async function fetchPlans() {
    const supabase = await createClient();

    // Fetching only plans with active status set to true
    const { data, error } = await supabase
        .from("plans")
        .select()
        

    if (error) {
        console.error("Error fetching active plans:", error);
        return []; // Return an empty array on error
    }

    console.log("Fetched Active Plans Data:", data); // Log the fetched active data
    return data || []; // Ensure to return an empty array if data is null or undefined
}

// Function to edit a specific plan by ID
export async function updatePlan(id, updatedFields) {
    const supabase = await createClient();

    // Update the plan with the given ID
    const { data, error } = await supabase
        .from("plans")
        .update(updatedFields)
        .eq("id", id);

    if (error) {
        console.error(`Error updating plan with ID ${id}:`, error);
        return { success: false, error: "Failed to update plan" };
    }

    console.log(`Updated Plan ID ${id}:`, data); // Log the updated data
    return { success: true, data };
}
