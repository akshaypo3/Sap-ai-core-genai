"use client"; 
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchAssessments, createAssessment } from "@/lib/esrs/action"; 
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "use-intl";
const AddEmailButton: React.FC = () => {
  const [newTemplate, setNewTemplate] = useState({ name: '' }); 
  const router = useRouter(); 

  const handleCreateTemplate = async () => {
    try {
      await createAssessment(newTemplate); 
      router.push('/settings/administration/emailTemp');
    } catch (error) {
      console.error('Error creating email template', error);
    }
  };
  const t = useTranslations('settings');
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t">
        <h3 className="text-xl font-semibold">{t('administration.E-Mail Templates')}</h3>

        <Button onClick={handleCreateTemplate} className="px-4 py-2 bg-black text-white rounded mt-2">
        {t('administration.Add')}
        </Button>
      </div>

     
    </div>
  );
};

export default AddEmailButton;
