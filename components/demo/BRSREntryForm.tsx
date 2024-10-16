"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from 'next-intl';

type BRSREntryFormProps = {
  id: string;
  question: string;
  section: string;
  principle: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Under Review';
  assignedUser: {
    name: string;
    avatar: string;
  };
};

const BRSREntryForm: React.FC<BRSREntryFormProps> = ({ 
  id, 
  question, 
  section, 
  principle, 
  status, 
  assignedUser 
}) => {
  const [response, setResponse] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("demo")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log('Saving data:', { id, response });
    
    toast({
      title: t("Success"),
      description: t("Data saved successfully"),
      duration: 3000,
    });

    // Navigate back to the main table
    router.push('/brsr-table');
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{t("Edit BRSR Entry")}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="section">{t("Section")}</Label>
          <Input id="section" value={section} readOnly />
        </div>
        <div>
          <Label htmlFor="principle">{t("Principle")}</Label>
          <Input id="principle" value={principle} readOnly />
        </div>
        <div>
          <Label htmlFor="question">{t("Question")}</Label>
          <Input id="question" value={question} readOnly />
        </div>
        <div>
          <Label htmlFor="status">{t("Status")}</Label>
          <div>
            <Badge className={getStatusColor(status)}>{status}</Badge>
          </div>
        </div>
        <div>
          <Label htmlFor="assignedUser">{t("Assigned User")}</Label>
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={assignedUser.avatar} alt={assignedUser.name} />
              <AvatarFallback>{assignedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span>{assignedUser.name}</span>
          </div>
        </div>
        <div>
          <Label htmlFor="response">{t("Response")}</Label>
          <Textarea 
            id="response" 
            value={response} 
            onChange={(e) => setResponse(e.target.value)}
            placeholder={t("Enter your response here...")}
            rows={5}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push('/brsr-table')}>
            {t("Cancel")}
          </Button>
          <Button type="submit">{t("Save Changes")}</Button>
        </div>
      </form>
    </div>
  );
};

export default BRSREntryForm;

function getStatusColor(status: BRSREntryFormProps['status']) {
  switch (status) {
    case 'Not Started':
      return 'bg-gray-100 text-gray-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Under Review':
      return 'bg-yellow-100 text-yellow-800';
  }
}