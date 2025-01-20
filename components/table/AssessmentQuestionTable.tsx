"use client"
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import AssignedUserDropdownQuestions from "../reporting/fe_frameworks/AssignedPersonDropdown";
import { AnswerButton } from "../reporting/fe_frameworks/Buttons";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronRight } from "lucide-react";

interface QuestionsProps {
  questionData: any;
  FrameworkID: string;
  AssessmentID: string;
  users: any;
  userId: any;
}

const AssessmentQuestionsTable = ({
  questionData,
  FrameworkID,
  AssessmentID,
  users,
  userId,
}: QuestionsProps) => {
  const [data, setData] = useState(questionData);
  const [filteredData, setFilteredData] = useState<any>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [filtersBySection, setFiltersBySection] = useState<any>({});
  const [searchQueries, setSearchQueries] = useState<any>({});
  const [hierarchicalData, setHierarchicalData] = useState<any>(null);

  const requiredFields = [
    { label: "All", value: "all" },
    { label: "Required", value: "true" },
    { label: "Unrequired", value: "false" },
  ];

  const uniqueTypes = Array.from(
    new Set(questionData.map((item: any) => item.question_type))
  );


  const organizeHierarchicalData = (questions: any[]) => {
    const hierarchy: any = {};
    

    const sectionNames = new Map();
    questions.forEach(question => {
      if (question.original_question_id?.section_id?.name) {
        sectionNames.set(question.section_code, question.original_question_id.section_id.name);
      }
    });
    
    questions.forEach(question => {
      const sectionCode = question.section_code;
      const parts = sectionCode.split('.');
      

      const mainSection = parts[0];
      

      const parentSectionName = sectionNames.get(mainSection) || `Section ${mainSection}`;
      const currentSectionName = sectionNames.get(sectionCode) || 
                               question.original_question_id?.section_id?.name || 
                               `Section ${sectionCode}`;
      

      if (!hierarchy[mainSection]) {
        hierarchy[mainSection] = {
          code: mainSection,
          name: parentSectionName,
          subsections: {},
          questions: []
        };
      }
      
      if (parts.length === 1) {

        hierarchy[mainSection].questions.push(question);
      } else {

        const subsectionKey = `${parts[0]}.${parts[1]}`;
        const subsectionName = sectionNames.get(subsectionKey) || 
                             question.original_question_id?.section_id?.name;
        
        if (!hierarchy[mainSection].subsections[subsectionKey]) {
          hierarchy[mainSection].subsections[subsectionKey] = {
            code: subsectionKey,
            name: subsectionName,
            parentName: parentSectionName,
            questions: [],
            subsubsections: {}
          };
        }
        
        if (parts.length === 2) {

          hierarchy[mainSection].subsections[subsectionKey].questions.push(question);
        } else {

          const subsubKey = sectionCode;
          const subsubName = sectionNames.get(subsubKey) || 
                           question.original_question_id?.section_id?.name;
          
          if (!hierarchy[mainSection].subsections[subsectionKey].subsubsections[subsubKey]) {
            hierarchy[mainSection].subsections[subsectionKey].subsubsections[subsubKey] = {
              code: subsubKey,
              name: subsubName,
              parentName: subsectionName,
              questions: []
            };
          }
          hierarchy[mainSection].subsections[subsectionKey].subsubsections[subsubKey].questions.push(question);
        }
      }
    });
    
    return hierarchy;
  };

  useEffect(() => {
    const organized = organizeHierarchicalData(questionData);
    setHierarchicalData(organized);
  }, [questionData]);

  const calculateCounts = (questions: any[]) => {
    const totalQuestions = questions.length;
    const answeredQuestions = questions.filter(q => q.answered === true || q.answered === "true").length;
    const pendingQuestions = totalQuestions - answeredQuestions;
    return { totalQuestions, answeredQuestions, pendingQuestions };
  };

  const requiredStatus = (is_required: any) => {
    if (is_required === true || is_required === "true") {
      return "Required";
    }
    if (is_required === false || is_required === "false") {
      return "Optional";
    }
    return is_required;
  };

  const answeredStatus = (answered: any) => {
    if (answered === true || answered === "true") {
      return "Yes";
    }
    if (answered === false || answered === "false") {
      return "No";
    }
    return answered;
  };

  const renderQuestionTable = (questions: any[]) => (
    <div className="p-2 overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">Question Code</th>
            <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">Question Name</th>
            <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">Type</th>
            <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">Required</th>
            <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">Answered</th>
            <th className="p-2 w-[155px] text-center font-semibold border-b text-zinc-500 text-sm">Assigned Person</th>
            <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question: any) => (
            <tr key={question.id} className="border-b border-gray-300 text-sm">
              <td className="p-3 text-center">{question.question_code}</td>
              <td className="p-3 text-left">{question.question_text}</td>
              <td className="p-3 text-center">{question.question_type}</td>
              <td className="p-3 text-center">
                <Badge
                  className={
                    question.is_required ? "bg-green-200 text-green-800 hover:bg-green-200"
                    : "bg-orange-200 text-orange-800 hover:bg-orange-200"
                  }
                >
                  {requiredStatus(question.is_required)}
                </Badge>
              </td>
              <td className="p-3 text-center">
                <Badge
                  className={
                    question.answered ? "bg-blue-200 text-blue-800 hover:bg-blue-200"
                    : "bg-red-200 text-red-800 hover:bg-red-200"
                  }
                >
                  {answeredStatus(question.answered)}
                </Badge>
              </td>
              <td className="p-3 text-center">
                <AssignedUserDropdownQuestions
                  items={question}
                  users={users}
                  userId={userId}
                  handleUserAdded={() => {}}
                  FrameworkID={FrameworkID}
                />
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <AnswerButton
                    QuestionData={question}
                    FrameworkID={FrameworkID}
                    AssessmentID={AssessmentID}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSubSubSection = (subsubsection: any, subsubKey: string) => {
    const counts = calculateCounts(subsubsection.questions);
    return (
      <div key={subsubKey} className="ml-8 mb-4 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-medium">{subsubsection.name || subsubKey}</h4>
            <p className="text-sm text-gray-600">Sub-section of {subsubsection.parentName}</p>
          </div>
          <div className="flex space-x-4">
            <Badge variant="outline" className="bg-blue-50">Questions: {counts.totalQuestions}</Badge>
            <Badge variant="outline" className="bg-green-50">Answered: {counts.answeredQuestions}</Badge>
            <Badge variant="outline" className="bg-orange-50">Pending: {counts.pendingQuestions}</Badge>
          </div>
        </div>
        {renderQuestionTable(subsubsection.questions)}
      </div>
    );
  };

  const renderSubSection = (subsection: any, subsectionKey: string) => {
    const counts = calculateCounts(subsection.questions);
    const subsubsectionQuestions = Object.values(subsection.subsubsections).flatMap((s: any) => s.questions);
    const totalCounts = calculateCounts([...subsection.questions, ...subsubsectionQuestions]);

    return (
      <div key={subsectionKey} className="ml-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium">{subsection.name || subsectionKey}</h3>
              <p className="text-sm text-gray-600">Sub-section of {subsection.parentName}</p>
            </div>
            <div className="flex space-x-4">
              <Badge variant="outline" className="bg-blue-50">Questions: {totalCounts.totalQuestions}</Badge>
              <Badge variant="outline" className="bg-green-50">Answered: {totalCounts.answeredQuestions}</Badge>
              <Badge variant="outline" className="bg-orange-50">Pending: {totalCounts.pendingQuestions}</Badge>
            </div>
          </div>
        </div>
        
        {subsection.questions.length > 0 && (
          <div className="mb-4">
            {renderQuestionTable(subsection.questions)}
          </div>
        )}
        
        {Object.entries(subsection.subsubsections).map(([key, subsubsection]: [string, any]) => 
          renderSubSubSection(subsubsection, key)
        )}
      </div>
    );
  };

  const renderMainSection = (section: any, sectionKey: string) => {
    const mainSectionQuestions = section.questions;
    const subsectionQuestions = Object.values(section.subsections).flatMap((s: any) => {
      const subQuestions = s.questions;
      const subsubQuestions = Object.values(s.subsubsections).flatMap((ss: any) => ss.questions);
      return [...subQuestions, ...subsubQuestions];
    });
    
    const totalCounts = calculateCounts([...mainSectionQuestions, ...subsectionQuestions]);

    return (
      <div key={sectionKey} className="mb-6">
        <div 
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
          onClick={() => {
            setExpandedSections(prev => {
              const newSet = new Set(prev);
              if (newSet.has(sectionKey)) {
                newSet.delete(sectionKey);
              } else {
                newSet.add(sectionKey);
              }
              return newSet;
            });
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <span className="text-gray-600">{section.code}</span>
                <span>{section.name}</span>
                {expandedSections.has(sectionKey) ? (
                  <ChevronDown className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </h2>
            </div>
            <div className="flex space-x-4">
              <Badge variant="outline" className="bg-blue-50">Questions: {totalCounts.totalQuestions}</Badge>
              <Badge variant="outline" className="bg-green-50">Answered: {totalCounts.answeredQuestions}</Badge>
              <Badge variant="outline" className="bg-orange-50">Pending: {totalCounts.pendingQuestions}</Badge>
            </div>
          </div>
        </div>

        {expandedSections.has(sectionKey) && (
          <div className="mt-4">
            {mainSectionQuestions.length > 0 && (
              <div className="mb-4">
                {renderQuestionTable(mainSectionQuestions)}
              </div>
            )}
            
            {Object.entries(section.subsections).map(([key, subsection]: [string, any]) => 
              renderSubSection(subsection, key)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {hierarchicalData && Object.entries(hierarchicalData).map(([key, section]: [string, any]) => 
        renderMainSection(section, key)
      )}
    </div>
  );
};

export default AssessmentQuestionsTable;