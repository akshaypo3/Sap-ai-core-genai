import React from "react";
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Button } from "@/components/ui/button";
import { Slash, Trash2, Pencil } from "lucide-react";
import {
  AddQuestion,
  RearrangeQuestions,
} from "@/components/settings/frameworkEditor/Buttons";
import QuestionsTable from "@/components/table/QuestionsTable";
import CreateQuestionSectionPage from "./QuestionPage";
import { fetchQuestions } from "@/lib/settings/frameworkEditor/action";

interface QuestionListProps {
  frameworkId: string;
  sections: any;
}

const QuestionList: React.FC<QuestionListProps> = async ({
  frameworkId,
  sections,
}) => {
  // console.log(frameworkId);

  const questionData = await fetchQuestions(frameworkId);
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
        <h3 className="text-xl font-semibold">Questions</h3>
        <div className="flex justify-end space-x-4 p-4">
          <CreateQuestionSectionPage
            framework_id={frameworkId}
            sections={sections}
          />
          <RearrangeQuestions questionData={questionData}  framework_id={frameworkId}/>
        </div>
      </div>

      <div className="min-w-full pt-2 table-auto border-collapse">
        <QuestionsTable
          framework_id={frameworkId}
          sections={sections}
          questionData={questionData}
        />
      </div>
    </>
  );
};

export default QuestionList;
