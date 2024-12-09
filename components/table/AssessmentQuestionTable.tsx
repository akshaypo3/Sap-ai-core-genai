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
interface QuestionsProps {
  questionData: any;
  FrameworkID: string;
  AssessmentID: string;
}

const AssessmentQuestionsTable = ({ questionData,FrameworkID,AssessmentID }:QuestionsProps) => {
  const [data, setData] = useState(questionData);
  const [filteredData, setFilteredData] = useState(questionData);
  const [sortOrder, setSortOrder] = useState({
    field: "name",
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
    new Set(questionData.map((item:any) => item.question_type)),
  );

  useEffect(() => {
    filterData(searchQuery, filters);
  }, [questionData]);

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value, filters);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    filterData(searchQuery, { ...filters, [name]: value });
  };

  const filterData = (query, appliedFilters) => {
    let filtered = data;
  
    if (query) {
      filtered = filtered.filter((item:any) =>
        item.question_text?.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    if (appliedFilters.is_required && appliedFilters.is_required !== "all") {
      filtered = filtered.filter(
        (item:any) => item.is_required === (appliedFilters.is_required === "true")
      );
    }

    if (appliedFilters.question_type && appliedFilters.question_type !== "all") {
      filtered = filtered.filter((item:any) => item.question_type === appliedFilters.question_type);
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

  const reuiredStatus = (is_required: any) => {
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

        <div className="ml-auto flex gap-4 w-1/5">
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

      <div className="overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
        <table className="min-w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th
                className="bg-gray-100 dark:bg-neutral-800 cursor-pointer p-3 text-center"
                onClick={() => handleSort("question_text")}
              >
                Question Name
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Question Code
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Help Text
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Question Type
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Required
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Answered
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((question: any) => (
              <tr key={question.id}>
                <td className="border p-3 text-center">
                  {question.question_text}
                </td>
                <td className="border p-3 text-center">{question.question_code}</td>
                <td className="border p-3 text-center">{question.help_text}</td>
                <td className="border p-3 text-center">
                  {question.question_type}
                </td>
                <td className="border p-3 text-center">
                  {question.is_required !== undefined && (
                    <Badge
                      className={
                        question.is_required === false ||
                        question.is_required === "false"
                          ? "bg-orange-400"
                          : question.is_required === true ||
                            question.is_required === "true"
                          ? "bg-green-400"
                          : ""
                      }
                    >
                      {reuiredStatus(question.is_required)}
                    </Badge>
                  )}
                </td>
                <td className="border p-3 text-center">
                  {question.answered !== undefined && (
                    <Badge
                      className={
                        question.answered === false ||
                        question.answered === "false"
                          ? "bg-red-400"
                          : question.answered === true ||
                            question.answered === "true"
                          ? "bg-green-400"
                          : ""
                      }
                    >
                      {Answeredstatus(question.answered)}
                    </Badge>
                  )}
                </td>
                <td className="border p-3 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <AnswerButton QuestionData={question} FrameworkID={FrameworkID} AssessmentID={AssessmentID}/>
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
