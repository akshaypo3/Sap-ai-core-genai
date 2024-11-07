"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function fetchActiveFrameworks() {
    const { data, error } = await supabase
        .from("frameworks")
        .select("*");

    if (error) {
        console.error("Error fetching frameworks:", error);
        return [];
    }

    return data; 
}

export async function insertFramework(newFramework) {
    const { data, error } = await supabase
        .from("frameworks")
        .insert([newFramework]) 
        .select();

    if (error) {
        console.error("Error inserting framework:", error);
        return { success: false, error: "Failed to insert framework: " + error.message };
    }

    console.log("Framework inserted successfully:", data[0]);
    return { success: true, framework: data[0] };
}

export async function updateFramework(id, updatedFields) {
    console.log("Updating framework with ID:", id);
    console.log("Updated fields:", updatedFields);

    const { data, error } = await supabase
        .from("frameworks")
        .update(updatedFields)
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error updating framework:", error);
        return { success: false, error: "Failed to update framework: " + error.message };
    }

    console.log("Framework updated successfully:", data[0]);
    return { success: true, framework: data[0] };
}

export const fetchImages = async () => {
    try {
        const { data, error } = await supabase
            .from('frameworks') 
            .select('link');

        if (error) {
            console.error("Error fetching images:", error.message);
            return []; 
        }

        const signedUrlsPromises = data.map(async (item) => {
            const { signedURL } = await createSignedUrl(item.link, 60); // URL expires in 60 seconds
            return signedURL;
        });

        // Wait for all signed URLs to be created
        const signedUrls = await Promise.all(signedUrlsPromises);
        return signedUrls; 

    } catch (error) {
        console.error("Error fetching images:", error);
        return []; 
    }
};


export const uploadImage = async (imageFile) => {
    const filePath = `frameworks_img/${imageFile.name}`; // path without 'uploads/' 
    const { data, error } = await supabase.storage
        .from('uploads') 
        .upload(filePath, imageFile);

    if (error) {
        return { success: false, error };
    }

    // Create a signed URL 
    const { signedUrl, error: urlError } = supabase.storage
        .from('uploads')
        .getSignedUrl(filePath, 60); // URL expires in 60 seconds

    if (urlError) {
        return { success: false, error: urlError };
    }

    return { success: true, imageUrl: signedUrl };
};

const createSignedUrl = async (path, expiresIn) => {
    const { data, error } = await supabase.storage
        .from('uploads')
        .createSignedUrl(path, expiresIn);

    if (error) {
        console.error("Error creating signed URL:", error);
        return { error };
    }

    return { signedURL: data.signedUrl };
};
