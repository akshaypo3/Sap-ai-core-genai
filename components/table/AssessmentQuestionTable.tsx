"use client";

import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import AssignedUserDropdownQuestions from "../reporting/fe_frameworks/AssignedPersonDropdown";
import { AnswerButton } from "../reporting/fe_frameworks/Buttons";
import { Input } from "../ui/input";
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

  const requiredFields = [
    { label: "All", value: "all" },
    { label: "Required", value: "true" },
    { label: "Unrequired", value: "false" },
  ];

  const uniqueTypes = Array.from(
    new Set(questionData.map((item: any) => item.question_type)),
  );

  useEffect(() => {
    // Initialize filter and search state for each section
    const initialFilters: any = {};
    const initialSearchQueries: any = {};
    const sections = [
      ...new Set(questionData.map((item: any) => item.original_question_id?.section_id?.name || "N/A")),
    ];
    sections.forEach((section) => {
      initialFilters[section] = {
        is_required: "all",
        question_type: "all",
      };
      initialSearchQueries[section] = ""; // Initialize search query for each section
    });
    setFiltersBySection(initialFilters);
    setSearchQueries(initialSearchQueries);

    filterData(initialSearchQueries, initialFilters);
  }, [questionData]);

  const handleSearch = (section: string, e: any) => {
    const query = e.target.value;
    const updatedSearchQueries = { ...searchQueries, [section]: query };
    setSearchQueries(updatedSearchQueries);
    filterData(updatedSearchQueries, filtersBySection);
  };

  const handleFilterChange = (section: string, e: any) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filtersBySection[section], [name]: value };
    setFiltersBySection((prev: any) => ({
      ...prev,
      [section]: updatedFilters,
    }));
    filterData(searchQueries, { ...filtersBySection, [section]: updatedFilters });
  };

  const filterData = (searchQueries: any, appliedFilters: any) => {
    const filteredBySection: any = {};

    Object.keys(appliedFilters).forEach((sectionName) => {
      let filtered = data.filter(
        (item: any) =>
          item.original_question_id?.section_id?.name === sectionName
      );

      const sectionFilters = appliedFilters[sectionName];
      const searchQuery = searchQueries[sectionName];

      // Apply search query
      if (searchQuery) {
        filtered = filtered.filter((item: any) =>
          item.question_text?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply filters for this section
      if (sectionFilters.is_required && sectionFilters.is_required !== "all") {
        filtered = filtered.filter(
          (item: any) =>
            item.is_required === (sectionFilters.is_required === "true")
        );
      }

      if (sectionFilters.question_type && sectionFilters.question_type !== "all") {
        filtered = filtered.filter(
          (item: any) => item.question_type === sectionFilters.question_type
        );
      }

      filteredBySection[sectionName] = filtered;
    });

    setFilteredData(filteredBySection);
  };

  const handleSectionToggle = (sectionName: string) => {
    setExpandedSections((prev) => {
      const newExpandedSections = new Set(prev);
      if (newExpandedSections.has(sectionName)) {
        newExpandedSections.delete(sectionName);
      } else {
        newExpandedSections.add(sectionName);
      }
      return newExpandedSections;
    });
  };

  const requiredStatus = (is_required: any) => {
    if (is_required === true || is_required === "true") {
      return "Required";
    }
    if (is_required === false || is_required === "false") {
      return "Unrequired";
    }
    return is_required;
  };

  const Answeredstatus = (answered: any) => {
    if (answered === true || answered === "true") {
      return "Yes";
    }
    if (answered === false || answered === "false") {
      return "No";
    }
    return answered;
  };

  const { toast } = useToast();
  const handleUserAdded = (message: string) => {
    toast({
      variant: "success",
      title: message,
    });
  };

  // Calculate Question, Answered, and Pending counts for each section
  const calculateCounts = (sectionName: string) => {
    const sectionData = filteredData[sectionName] || [];
    const totalQuestions = sectionData.length;
    const answeredQuestions = sectionData.filter((q: any) => q.answered === true || q.answered === "true").length;
    const pendingQuestions = totalQuestions - answeredQuestions;
    return { totalQuestions, answeredQuestions, pendingQuestions };
  };

  return (
    <>
      {/* Render tables for each section */}
      {Object.keys(filteredData).map((sectionName) => (
        <div key={sectionName} className="bg-white rounded-lg shadow-md overflow-hidden mb-2">
          {/* Section Name as a Toggle */}
          <div
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => handleSectionToggle(sectionName)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">{sectionName}</h3>
              {expandedSections.has(sectionName) ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </div>

            {/* Display Question, Answered, and Pending Badge */}
            <div className="flex space-x-4">
              {(() => {
                const { totalQuestions, answeredQuestions, pendingQuestions } = calculateCounts(sectionName);
                return (
                  <>
                    <Badge variant="outline" className="bg-blue-50">
                      Question: {totalQuestions}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50">
                      Answered: {answeredQuestions}
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50">
                      Pending: {pendingQuestions}
                    </Badge>
                  </>
                );
              })()}
            </div>
          </div>

          {/* If section is expanded, show the filters, search, and table */}
          {expandedSections.has(sectionName) && (
            <div>
              {/* Search and Filters aligned as in your example */}
              <div className="mb-4 flex items-center gap-4">
                {/* Search Input for the Section */}
                <Input
                  type="text"
                  placeholder={`Search questions in ${sectionName}...`}
                  className="border p-2 w-1/3"
                  value={searchQueries[sectionName]}
                  onChange={(e) => handleSearch(sectionName, e)}
                />

                <div className="flex space-x-4 ml-auto">
                  {/* Question Type Filter */}
                  <Select
                    name="question_type"
                    value={filtersBySection[sectionName]?.question_type !== "all" ? filtersBySection[sectionName]?.question_type : ""}
                    onValueChange={(value) =>
                      handleFilterChange(sectionName, { target: { name: "question_type", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {uniqueTypes.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Required Filter */}
                  <Select
                    name="is_required"
                    value={filtersBySection[sectionName]?.is_required !== "all" ? filtersBySection[sectionName]?.is_required : ""}
                    onValueChange={(value) =>
                      handleFilterChange(sectionName, { target: { name: "is_required", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Question" />
                    </SelectTrigger>
                    <SelectContent>
                      {requiredFields.map((required) => (
                        <SelectItem key={required.value} value={required.value}>
                          {required.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Render the table */}
              <div className="p-2 overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                        Question Code
                      </th>
                      <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                        Question Name
                      </th>
                      <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                        Section
                      </th>
                      <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                        Type
                      </th>
                      <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                        Required
                      </th>
                      <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                        Answered
                      </th>
                      <th className="p-2 w-[155px] text-center font-semibold border-b text-zinc-500 text-sm">
                        Assigned Person
                      </th>
                      <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                        Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData[sectionName].map((question: any) => (
                      <tr key={question.id} className="border-b border-gray-300 text-sm">
                        <td className="p-3 text-center">{question.question_code}</td>
                        <td className="p-3 text-center">{question.question_text}</td>
                        <td className="p-3 text-center">{question.original_question_id?.section_id?.name || "N/A"}</td>
                        <td className="p-3 text-center">{question.question_type}</td>
                        <td className="p-3 text-center">
                          {question.is_required !== undefined && (
                            <Badge
                              className={
                                question.is_required === false ||
                                question.is_required === "false"
                                  ? "bg-orange-200 text-orange-800 hover:bg-orange-200"
                                  : question.is_required === true ||
                                    question.is_required === "true"
                                  ? "bg-green-200 text-green-800 hover:bg-green-200"
                                  : ""
                              }
                            >
                              {requiredStatus(question.is_required)}
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {question.answered !== undefined && (
                            <Badge
                              className={
                                question.answered === false ||
                                question.answered === "false"
                                  ? "bg-red-200 text-red-800 hover:bg-red-200"
                                  : question.answered === true ||
                                    question.answered === "true"
                                  ? "bg-blue-200 text-blue-800 hover:bg-blue-200"
                                  : ""
                              }
                            >
                              {Answeredstatus(question.answered)}
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <AssignedUserDropdownQuestions
                            items={question}
                            users={users}
                            userId={userId}
                            handleUserAdded={handleUserAdded}
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
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AssessmentQuestionsTable;
