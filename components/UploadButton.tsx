"use client"

import React, { useState, useRef } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Button } from '@/components/ui/button';
import { useTranslations } from 'use-intl';

// Initialize Supabase client
const supabase = createClient();

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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

      alert('File uploaded successfully!');
      console.log('File uploaded:', data);
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
      setFile(null);
    }
  };
  const t = useTranslations("ui")
  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button onClick={handleSelectFile} variant="outline">
        {file ? file.name : t('Select File')}
      </Button>
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? t('Uploading') : t('Upload to Supabase')}
      </Button>
    </div>
  );
};

export default UploadButton;