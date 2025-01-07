"use client"
import React, { useState, useRef } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation'; // Import useRouter
import { useTranslations } from 'next-intl';

// Initialize Supabase client
const supabase = createClient();

const UploadButton = () => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter(); // Initialize useRouter

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
      alert('Please select a file first!');
      return;
    }

    setUploading(true);

    try {
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(`files/${file.name}`, file);
      if (error) throw error;      
      toast({
        variant: "success",
        title: "File Uploaded Successfully!",
        description: `${file.name} File Uploaded Successfully to Supabase`,
      })
      console.log('File uploaded:', data);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error uploading file:",
            description: error.message,
          })
      //alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
      setFile(null);
     // Refresh the current page after successful upload
      router.refresh();
    }
  };
  const t = useTranslations('datahub')

  return (

    <div className="flex flex-row items-center space-x-4">
    <input
      type="file"
      onChange={handleFileChange}
      className="hidden"
      ref={fileInputRef}
    />
    <Button onClick={handleSelectFile} variant="outline">
      {file ? file.name : 'Select File'}
    </Button>
    <Button onClick={handleUpload} disabled={!file || uploading} className="bg-green-600">
      {uploading ? t('Uploading') : t('Upload to Supabase')}
    </Button>
  </div>
  
  );
};

export default UploadButton;