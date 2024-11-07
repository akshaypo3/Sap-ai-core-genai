"use client";
import React, { useState, useRef, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

// Initialize Supabase client
const supabase = createClient();

export const fetchImages = async () => {
    try {
        const { data: files, error: listError } = await supabase.storage
            .from('uploads')
            .list('frameworks_img'); 
        if (listError) {
            console.error("Error listing files:", listError.message);
            return []; // Return an empty array in case of error
        }

        const signedUrls = await Promise.all(
            files.map(async (file) => {
                const filePath = `frameworks_img/${file.name}`;
                const { data, error } = await supabase.storage
                    .from('uploads')
                    .createSignedUrl(filePath, 3600);

                if (error) {
                    console.error("Error creating signed URL:", error.message);
                    return null;
                }
                return data.signedUrl;
            })
        );

        return signedUrls.filter(Boolean); 
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
};

export const uploadImage = async (imageFile) => {
    const filePath = `frameworks_img/${imageFile.name}`;
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, imageFile);

    if (error) {
        console.error("Error uploading image:", error.message);
        return { success: false, error };
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('uploads')
        .createSignedUrl(filePath, 3600); 

    if (signedUrlError) {
        console.error("Error creating signed URL:", signedUrlError.message);
        return { success: false, error: signedUrlError };
    }

    return { success: true, imageUrl: signedUrlData.signedUrl };
};

const ImageUploader = () => {
    const { toast } = useToast();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const fetchAndSetImages = async () => {
        const fetchedImages = await fetchImages();
        setImages(fetchedImages);
    };

    useEffect(() => {
        fetchAndSetImages();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSelectFile = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        if (!file) {
            toast({
                variant: "destructive",
                title: "Error:",
                description: 'Please select an image file first!',
            });
            return;
        }

        setUploading(true);

        try {
            const { success, imageUrl, error } = await uploadImage(file);
            if (!success) {
                throw new Error(error.message);
            }

            toast({
                variant: "success",
                title: "Image Uploaded Successfully!",
                description: `${file.name} has been uploaded successfully.`,
            });

            fetchAndSetImages();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error uploading image:",
                description: error.message,
            });
        } finally {
            setUploading(false);
            setFile(null);
        }
    };

    return (
        <div>
            <div className="flex flex-row items-center space-x-4 mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                />
                <Button onClick={handleSelectFile} variant="outline">
                    {file ? file.name : 'Select Image'}
                </Button>
                <Button onClick={handleUpload} disabled={!file || uploading} className="bg-black">
                    {uploading ? 'Uploading...' : 'Upload to Supabase'}
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {images.length > 0 ? (
                    images.map((imageUrl, index) => (
                        <div key={index} className="relative">
                            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    alt={`Image ${index + 1}`}
                                    className="object-cover w-full h-48 rounded"
                                />
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No images found.</p>
                )}
            </div>
            <div className="mt-4">
    <h2 className="text-lg font-semibold">Signed Image URLs:</h2>
    <ul className="list-disc pl-5">
        {images.map((imageUrl, index) => (
            <li key={index}>
                <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {imageUrl}
                </a>
            </li>
        ))}
    </ul>
</div>

        </div>
    );
};

export default ImageUploader;
