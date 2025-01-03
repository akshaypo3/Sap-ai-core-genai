"use client";

import { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AnswerButton } from "../reporting/fe_frameworks/Buttons";
import AssignedUserDropdownQuestions from "../reporting/fe_frameworks/AssignedPersonDropdown";
import { useToast } from "@/components/ui/use-toast";

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
  userId
}: QuestionsProps) => {
  const [data, setData] = useState(questionData);
  const [filteredData, setFilteredData] = useState(questionData);
  const [sortOrder, setSortOrder] = useState({
    field: "section_code", // Default sort by section_code
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    is_required: "all",
    question_type: "all",
    question_text: "all",
  });

  const requiredFields = [
    { label: "All", value: "all" },
    { label: "Required", value: "true" },
    { label: "Unrequired", value: "false" },
  ];

  const uniqueTypes = Array.from(
    new Set(questionData.map((item: any) => item.question_type)),
  );

  useEffect(() => {
    filterData(searchQuery, filters);
  }, [questionData]);

  // useEffect(() => {
  //   // Sort data on initial load based on section_code and then order_index
  //   handleSort("section_code", "asc");
  // }, [questionData]);

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value, filters);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    filterData(searchQuery, { ...filters, [name]: value });
  };

  const filterData = (query: string, appliedFilters: any) => {
    let filtered = data;

    if (query) {
      filtered = filtered.filter((item: any) =>
        item.question_text?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (appliedFilters.is_required && appliedFilters.is_required !== "all") {
      filtered = filtered.filter(
        (item: any) =>
          item.is_required === (appliedFilters.is_required === "true"),
      );
    }

    if (
      appliedFilters.question_type &&
      appliedFilters.question_type !== "all"
    ) {
      filtered = filtered.filter(
        (item: any) => item.question_type === appliedFilters.question_type,
      );
    }

    setFilteredData(filtered);
  };

  const handleSort = (field: string) => {
    let newDirection = "asc";
    if (sortOrder.field === field && sortOrder.direction === "asc") {
      newDirection = "desc";
    }
  
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[field]?.toString().toLowerCase() || "";
      const bValue = b[field]?.toString().toLowerCase() || "";
  
      return newDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  
    setFilteredData(sortedData);
    setSortOrder({ field, direction: newDirection });
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

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search questions..."
          className="border p-2 w-1/3"
          value={searchQuery}
          onChange={handleSearch}
        />

        <div className="flex space-x-4 ml-auto">
          <Select
            name="question_type"
            value={filters.question_type !== "all" ? filters.question_type : ""}
            onValueChange={(value) =>
              handleFilterChange({ target: { name: "question_type", value } })
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

          <Select
            name="is_required"
            value={filters.is_required !== "all" ? filters.is_required : ""}
            onValueChange={(value) =>
              handleFilterChange({ target: { name: "is_required", value } })
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

      <div className="p-2 overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                Question Code
              </th>
              <th className="p-2 text-center font-semibold border-b text-zinc-500 text-sm">
                Question Name
                {/* <ArrowUpDown className="ml-2 h-4 w-4 inline"/> */}
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
            {filteredData.map((question: any) => (
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
                          ? "bg-orange-200 text-orange-800"
                          : question.is_required === true ||
                            question.is_required === "true"
                          ? "bg-green-200 text-green-800"
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
                          ? "bg-red-200 text-red-800"
                          : question.answered === true ||
                            question.answered === "true"
                          ? "bg-blue-200 text-blue-800"
                          : ""
                      }
                    >
                      {Answeredstatus(question.answered)}
                    </Badge>
                  )}
                </td>
                <td className="p-3 text-center">
                  <AssignedUserDropdownQuestions items={question} users={users} userId={userId} handleUserAdded={handleUserAdded} FrameworkID={FrameworkID}/>
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
    </>
  );
};

export default AssessmentQuestionsTable;
