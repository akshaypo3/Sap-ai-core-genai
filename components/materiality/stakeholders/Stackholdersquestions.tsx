import React from "react";
import { DataTable } from "@/components/table/data-table";
import { columns_Stakeholderquestions } from "@/components/table/stakeholderquestionsColumns";
import { Stackholderquestionsdetails } from "@/lib/stakeholders/data";
import { AddStackholderButton } from "../stakeholders/AddStackholderQuestionButton";



export default async function Stackholderquestions(id:any) {
    
    const questions = await Stackholderquestionsdetails();
    
    const questionsWithAssessmentId = questions.map(question => ({
      ...question,
      assessmentId: id.id, // Add the assessmentId from the parameter
  }));
  const Assessementid=id.id;
  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
          Stakeholders Questions
          </h3>
          <AddStackholderButton id={Assessementid}/>
        </div>
            <div className="min-w-full table-auto border-collapse">
            <DataTable columns={columns_Stakeholderquestions} data={questionsWithAssessmentId} filter={'question'} sort={'Created At'}/>
            </div>
            </div>
    </>
  );
}
