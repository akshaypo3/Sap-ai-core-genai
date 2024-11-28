import React from 'react'
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Button } from "@/components/ui/button";
import { Slash, Trash2, Pencil } from "lucide-react";
import { AddQuestion } from "@/components/settings/frameworkEditor/Buttons";
import QuestionsTable from '@/components/table/QuestionsTable';

interface QuestionListProps {
  frameworkId: string; 
}

const QuestionList: React.FC<QuestionListProps> = ({ frameworkId }) => {
  // console.log(frameworkId); 

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
        <h3 className="text-xl font-semibold">Questions</h3>
        <AddQuestion />
      </div>
      <div className="min-w-full pt-2 table-auto border-collapse">
        <QuestionsTable frameworkId={frameworkId} /> 
      </div>
    </>
  );
}

export default QuestionList;
