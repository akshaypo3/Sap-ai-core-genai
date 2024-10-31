"use server";

import { createClient } from "@/utils/supabase/server"; // Adjust the path based on your project structure

// Function to fetch only active frameworks
export async function fetchActiveFrameworks() {
    const supabase = createClient();

    // Fetching only frameworks with active status set to true
    const { data, error } = await supabase
        .from("frameworks")
        .select()

    if (error) {
        console.error("Error fetching active frameworks:", error);
        return []; // Return an empty array on error
    }

    console.log("Fetched Active Frameworks Data:", data); // Log the fetched active data
    return data || []; // Ensure to return an empty array if data is null or undefined
}

// Function to create a new framework
export async function createFramework(frameworkData) {
    const supabase = createClient();

    // Insert a new framework into the frameworks table
    const { data, error } = await supabase
        .from("frameworks")
        .insert([frameworkData]);

    if (error) {
        console.error("Error creating framework:", error);
        return { success: false, error: "Failed to create framework" }; // Return error on failure
    }

    console.log("Created Framework:", data); // Log the created data
    return { success: true, framework: data[0] }; // Return success and the created framework
}

// Function to update a specific framework by ID
export async function updateFramework(id, updatedFields) {
    const supabase = createClient();

    // Update the framework with the given ID
    const { data, error } = await supabase
        .from("frameworks")
        .update(updatedFields)
        .eq("id", id);

    if (error) {
        console.error(`Error updating framework with ID ${id}:`, error);
        return { success: false, error: "Failed to update framework" };
    }

    console.log(`Updated Framework ID ${id}:`, data); // Log the updated data
    return { success: true, framework: data[0] }; // Return success and the updated framework
}
