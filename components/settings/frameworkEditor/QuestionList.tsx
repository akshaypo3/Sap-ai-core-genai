import React from 'react'
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Button } from "@/components/ui/button";
import { Slash, Trash2, Pencil } from "lucide-react";
import { AddQuestion } from "@/components/settings/frameworkEditor/Buttons";
import QuestionsTable from '@/components/table/QuestionsTable';
import CreateQuestionSectionPage from './QuestionPage';

interface QuestionListProps {
  frameworkId: string;
  sections:any; 
}

const QuestionList: React.FC<QuestionListProps> = ({ frameworkId ,sections}) => {
  // console.log(frameworkId); 

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
        <h3 className="text-xl font-semibold">Questions</h3>
        {/* <AddQuestion /> */}
        <CreateQuestionSectionPage framework_id={frameworkId} sections={sections} />
      </div>
      <div className="min-w-full pt-2 table-auto border-collapse">
        <QuestionsTable frameworkId={frameworkId} sections={sections}/> 
      </div>
    </>
  );
}

export default QuestionList;
