import React from "react";
import { DataTable } from "@/components/table/data-table";
import { columns_PortalStakeholderquestions } from "@/components/table/PortalStakeholderQuestions";
import { Stackholderquestionsdetails } from "@/lib/stakeholders/data";

export default async function Stackholderquestions() {
  const questions = await Stackholderquestionsdetails();

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">Stakeholders Questions</h3>
        </div>
        <div className="min-w-full table-auto border-collapse">
          <DataTable
            columns={columns_PortalStakeholderquestions}
            data={questions}
            filter={"question"}
            sort={"Created At"}
          />
        </div>
      </div>
    </>
  );
}
