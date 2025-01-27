"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import AssignedUserDropdownQuestions from "../reporting/fe_frameworks/AssignedPersonDropdown";
import { AnswerButton } from "../reporting/fe_frameworks/Buttons";
import { ChevronDown, ChevronRight } from "lucide-react";
import SectionUserDropdown from "../reporting/fe_frameworks/SectionUserDropdown";
import { addIroUserSectionQuestions } from "@/lib/assessments/action";

interface QuestionsProps {
  questionData: any;
  FrameworkID: string;
  AssessmentID: string;
  users: any;
  userId: any;
  frameworkquestion: any;
}

const AssessmentQuestionsTable = ({
  questionData,
  FrameworkID,
  AssessmentID,
  users,
  userId,
  frameworkquestion
}: QuestionsProps) => {
  const [expandedSections, setExpandedSections] = useState<Map<string, boolean>>(new Map());
  const [hierarchicalData, setHierarchicalData] = useState<any>(null);

  // Render badge counts for questions
  const renderBadgeCounts = (counts: any) => (
    <div className="flex space-x-4">
      <Badge variant="outline" className="bg-blue-50">Questions: {counts.totalQuestions}</Badge>
      <Badge variant="outline" className="bg-green-50">Answered: {counts.answeredQuestions}</Badge>
      <Badge variant="outline" className="bg-orange-50">Pending: {counts.pendingQuestions}</Badge>
    </div>
  );

  const handleSectionUserChange = async (assignments: { questionId: string, userId: string, questionCode: string }[]) => {
    try {
      await addIroUserSectionQuestions(assignments);
      const updatedData = organizeHierarchicalData(questionData);  // Reorganize data with updated assignments
      const organizedSections = organizeSections(updatedData);
      setHierarchicalData(organizedSections);
    } catch (error) {
      console.error("Error assigning user to question:", error);
    }
  };

  // Organizing sections and subsections
  // const organizeSections = (sections: any[]) => {
  //   const sectionMap = {};
  //   const rootSections = [];

  //   Object.keys(sections).forEach((sectionCode) => {
  //     const section = sections[sectionCode];

  //     section.subsections = [];  // Initialize subsections array
  //     sectionMap[section.id] = section;

  //     // Add to root sections if the parentid is null
  //     if (section.parentid === null) {
  //       rootSections.push(section);
  //     } else {
  //       const parentSection = sectionMap[section.parentid];
  //       if (parentSection) {
  //         parentSection.subsections.push(section);  // Add subsections to their parent section
  //       }
  //     }
  //   });

  //   return rootSections;
  // };
  const organizeSections = (sections) => {
    const sectionMap = {};  // To store sections by ID
    const rootSections = [];  // To store root sections (those without a parent)
  
    // First pass: Build the sectionMap with all sections
    Object.keys(sections).forEach((sectionCode) => {
      const section = sections[sectionCode];  // Get section using the key (sectionCode)
      section.subsections = [];  // Initialize subsections array
      sectionMap[section.id] = section;  // Map sections by their ID
    });
  
    // Second pass: Organize subsections under their parent sections
    Object.keys(sections).forEach((sectionCode) => {
      const section = sections[sectionCode];  // Get section using the key (sectionCode)
  
      if (section.parentid === null || section.parentid === undefined) {
        // If no parentid, it's a root section
        rootSections.push(section);
      } else {
        const parentSection = sectionMap[section.parentid];
        if (parentSection) {
          parentSection.subsections.push(section);  // Assign section as a subsector of its parent
        } else {
          console.warn(`No parent found for section ${sectionCode}. Waiting for parent section to be added.`);
        }
      }
  
      console.log(`Organized Section: ${sectionCode} Parent: ${section.parentid}`);
    });
  
    return rootSections;  // Return the root sections
  };
  
  
  
  // Organize hierarchical data for questions and sections
  const organizeHierarchicalData = (questions: any[]) => {
    const hierarchy: any = {};
    const sectionNames = new Map();

    questions.forEach((question) => {
      const sectionCode = question.section_code;
      const sectionid = question.id;
      const parentsectionid = question.parent_section_id;
      const secname = question.name;

      if (question.fe_questions?.length) {
        question.fe_questions.forEach((feQuestion: any) => {
          if (feQuestion.fe_assessment_questions) {
            feQuestion.fe_assessment_questions.forEach((assessmentQuestion: any) => {
              const mainSection = sectionCode;
              if (!hierarchy[mainSection]) {
                hierarchy[mainSection] = {
                  code: mainSection,
                  id: sectionid,
                  parentid: parentsectionid,
                  name: sectionNames.get(mainSection) || `Section  ${secname}`,
                  questions: []
                };
              }
              hierarchy[mainSection].questions.push(assessmentQuestion);
            });
          }
        });
      } else {
        const mainSection = sectionCode;
        if (!hierarchy[mainSection]) {
          hierarchy[mainSection] = {
            code: mainSection,
            id: sectionid,
            parentid: parentsectionid,
            name: sectionNames.get(mainSection) || `Section  ${secname}`,
            questions: []
          };
        }
      }
    });

    Object.keys(hierarchy).forEach((key) => {
      hierarchy[key].questions.sort((a: any, b: any) => a.order_index - b.order_index);
    });
    return hierarchy;
  };

  useEffect(() => {
    const organized = organizeHierarchicalData(questionData);
    const organizedSections = organizeSections(organized);
    console.log(organizedSections);
    setHierarchicalData(organizedSections);
  }, [questionData]);

  const handleSectionAssign = (userId: string, section: any) => {
    const assignments: { questionId: string; userId: string; questionCode: string }[] = [];
    const assignUserRecursively = (sec: any) => {
      sec.questions.forEach((question: any) => {
        question.assigned_to = userId;
        assignments.push({ questionId: question.id, userId, questionCode: question.question_code });
      });
      sec.subsections.forEach((subSection: any) => {
        assignUserRecursively(subSection);
      });
    };
    assignUserRecursively(section);
    handleSectionUserChange(assignments)
  };

  // Calculate total, answered, and pending questions (including nested subsections)
  const calculateCounts = (section: any) => {
    const allQuestions = [
      ...section.questions, // Main section questions
      ...Object.values(section.subsections).flatMap((sub: any) => calculateCounts(sub).allQuestions) // Recursively get all questions from nested subsections
    ];

    const totalQuestions = allQuestions.length;
    const answeredQuestions = allQuestions.filter(
      (q) => q.answered === true || q.answered === "true"
    ).length;
    const pendingQuestions = totalQuestions - answeredQuestions;

    return {
      totalQuestions,
      answeredQuestions,
      pendingQuestions,
      allQuestions
    };
  };

  // Render questions table for each section
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
                <Badge className={question.is_required ? "bg-green-200 text-green-800" : "bg-orange-200 text-orange-800"}>
                  {question.is_required ? "Required" : "Optional"}
                </Badge>
              </td>
              <td className="p-3 text-center">
                <Badge className={question.answered ? "bg-blue-200 text-blue-800" : "bg-red-200 text-red-800"}>
                  {question.answered ? "Yes" : "No"}
                </Badge>
              </td>
              <td className="p-3 text-center">
                <AssignedUserDropdownQuestions
                  items={question}
                  users={users}
                  userId={userId}
                  FrameworkID={FrameworkID}
                />
              </td>
              <td className="p-3 text-center">
                <AnswerButton QuestionData={question} FrameworkID={FrameworkID} AssessmentID={AssessmentID} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render each section and its subsections
  // Toggle handler for both sections and subsections
const handleToggle = (section: any, sectionKey: string, parentKey: string = '') => {
  const uniqueSectionKey = parentKey ? `${parentKey}-${sectionKey}` : sectionKey; // Unique key for section

  setExpandedSections((prev) => {
    const newMap = new Map(prev); // Copy the current state of expanded sections
    const currentState = newMap.get(uniqueSectionKey); // Get current state (expanded/collapsed)
    const newState = !currentState; // Toggle the expanded state of the clicked section

    // Update the section's expanded state
    newMap.set(uniqueSectionKey, newState);

    // If section is being collapsed, collapse all its subsections
    if (!newState) {
      collapseSubsections(section, newMap, uniqueSectionKey);
    }

    return newMap; // Return updated state of sections
  });
};

// Collapse all subsections recursively
const collapseSubsections = (sec: any, expandedState: Map<string, boolean>, parentKey: string) => {
  sec.subsections.forEach((sub: any) => {
    const childKey = `${parentKey}-${sub.code}`;
    expandedState.set(childKey, false); // Collapse the subsections
    collapseSubsections(sub, expandedState, childKey); // Recursively collapse nested subsections
  });
};

// Collapse the parent section, but do not affect its subsections here
const collapseSectionOnly = (sec: any, expandedState: Map<string, boolean>, parentKey: string) => {
  const sectionKey = `${parentKey}-${sec.code}`;
  expandedState.set(sectionKey, false); // Collapse the parent section without affecting subsections
};

// Recursive rendering of each section and its subsections
const renderSection = (section: any, sectionKey: string, parentKey: string = '', depth: number = 1) => {
  const uniqueSectionKey = parentKey ? `${parentKey}-${sectionKey}` : sectionKey; // Unique key for each section
  const isExpanded = expandedSections.get(uniqueSectionKey) || false; // Check if the section is expanded or not
  const totalCounts = calculateCounts(section);
  
  return (
    <div key={uniqueSectionKey} className="mb-6">
      <div
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
        onClick={() => handleToggle(section, sectionKey, parentKey)} // Toggle the section
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-gray-600">{section.code}</span>
            <span>{section.name}</span>
            {isExpanded ? (
              <ChevronDown className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
            )}
          </h2>
          <div className="ml-auto flex items-center gap-4">
              <SectionUserDropdown
                users={users}
                section={section}
                userId={userId}
                FrameworkID={FrameworkID}
                handleUserAdded={(message: string) => console.log(message)}
                handleSectionAssign={handleSectionAssign}
              />
              {renderBadgeCounts(totalCounts)}
            </div>
        </div>
      </div>

      {/* Render the subsections only if the section is expanded */}
      {isExpanded && (
        <div className={`mt-4 pl-${depth * 4}`}> {/* Add padding for nested subsections */}
          {section.questions.length > 0 && renderQuestionTable(section.questions)} {/* Render questions */}

          {section.subsections.map((sub: any) =>
            renderSection(sub, sub.code, uniqueSectionKey, depth + 1)  // Render subsections recursively
          )}
        </div>
      )}
    </div>
  );
};


  return (
    <div className="space-y-4">
      {hierarchicalData &&
        Object.entries(hierarchicalData).map(([key, section]: [string, any]) => renderSection(section, key))}
    </div>
  );
};

export default AssessmentQuestionsTable;
