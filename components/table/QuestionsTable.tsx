"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Trash2Icon, CopyIcon } from "lucide-react";
import { deleteQuestion, duplicateQuestion, fetchQuestions } from "@/lib/settings/frameworkEditor/action";
import EditQuestionSectionPage from "../settings/frameworkEditor/EditQuestionButton";
import { DuplicateQuestion } from "../settings/frameworkEditor/Buttons";
import { SE } from "country-flag-icons/react/3x2";

interface CreateQuestionTableFormDialogProps {
  framework_id: string;
  sections:any;
}

const QuestionsTable = ({ framework_id,sections}: CreateQuestionTableFormDialogProps) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>("question_code");
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<any | null>(null);
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);
  const [questionToDuplicate, setQuestionToDuplicate] = useState<any | null>(null);
  const [duplicatedQuestion, setDuplicatedQuestion] = useState<any>({
    question_code: "",
    question_text: "",
    question_type: "text",
    help_text: "",
    order_index: 1,
  });
  useEffect(() => {
   
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(framework_id);
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadQuestions();

  }, []);

  useEffect(() => {
    let filteredData = [...questions];
    if (searchQuery) {
      filteredData = filteredData.filter(
        (question) =>
          question.question_text
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          question.question_code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedStatus && selectedStatus !== "all") {
      filteredData = filteredData.filter(
        (question) => question.status === selectedStatus
      );
    }
    if (selectedType && selectedType !== "all") {
      filteredData = filteredData.filter(
        (question) => question.question_type === selectedType
      );
    }
    if (sortBy) {
      filteredData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }
    setFilteredQuestions(filteredData);
  }, [searchQuery, selectedStatus, selectedType, sortBy, questions]);

  const handleDelete = (question: any) => {
    setQuestionToDelete(question);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (questionToDelete) {
      const { success, error } = await deleteQuestion(questionToDelete.id);
      if (!success) {
        setError("Error deleting question.");
        return;
      }
      const updatedQuestions = questions.filter(
        (question) => question.id !== questionToDelete.id
      );
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
    }
    setIsDeleteDialogOpen(false);
    setQuestionToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setQuestionToDelete(null);
  };

  const handleDuplicate = (question: any) => {
    setQuestionToDuplicate(question);
    setDuplicatedQuestion({
      question_code: `${question.question_code}_copy`,
      question_text: question.question_text,
      question_type: question.question_type,
      help_text: question.help_text,
      order_index: question.order_index,
    });
    setIsDuplicateDialogOpen(true);
  };

  const handleConfirmDuplicate = async () => {
    try {
      const { success, data, error } = await duplicateQuestion(duplicatedQuestion);
      if (!success) {
        setError("Error duplicating question.");
        return;
      }

      setQuestions((prevQuestions) => [...prevQuestions, data]);
      setFilteredQuestions((prevFiltered) => [...prevFiltered, data]);

      setIsDuplicateDialogOpen(false);
      setQuestionToDuplicate(null);
    } catch (error) {
      setError("Error during duplication.");
    }
  };

  const handleCancelDuplicate = () => {
    setIsDuplicateDialogOpen(false);
    setQuestionToDuplicate(null);
    setDuplicatedQuestion({
      question_code: "",
      question_text: "",
      question_type: "text",
      help_text: "",
      order_index: 1,
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <Input
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80"
        />
        <div className="flex space-x-4 ml-auto">
          {/* <Select onValueChange={(value) => setSelectedStatus(value)} className="w-40">
            <SelectTrigger>
              <SelectValue placeholder="Status" />
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select> */}
          <Select onValueChange={(value) => setSelectedType(value)} className="w-40">
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="Checkbox">Checkbox</SelectItem>
              <SelectItem value="Table">Table</SelectItem>
              <SelectItem value="MultipleChoice">MultipleChoice</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSortBy(value)} className="w-40">
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="question_code">Sort by Code</SelectItem>
              <SelectItem value="question_type">Sort by Type</SelectItem>
              <SelectItem value="created_at">Sort by Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="border-collapse table-auto w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border px-4 py-2 text-center bg-gray-100">
                Question
              </TableHead>
              <TableHead className="border px-4 py-2 text-center bg-gray-100">
                Type
              </TableHead>
              <TableHead className="border px-4 py-2 text-center bg-gray-100">
                Question Code
              </TableHead>
              <TableHead className="border px-4 py-2 text-center bg-gray-100">
                Section Name
              </TableHead>
              <TableHead className="border px-4 py-2 text-center bg-gray-100">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="border px-4 py-2 text-center">{question.question_text}</TableCell>
                <TableCell className="border px-4 py-2 text-center">{question.question_type}</TableCell>
                <TableCell className="border px-4 py-2 text-center">{question.question_code}</TableCell>
                <TableCell className="border px-4 py-2 text-center">{question.section?.name}</TableCell>
                <TableCell className="border px-4 py-2 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {/* <Button
                      variant="outline"
                      color="blue"
                      onClick={() => handleDuplicate(question)}
                      className="px-2 bg-blue-600 h-9 hover:bg-blue-900 rounded-md"
                    >
                      <CopyIcon className="w-4 text-white" />
                    </Button> */}
                    <DuplicateQuestion questionData={question} sections={sections}/>
                    <Button
                      variant="outline"
                      color="red"
                      onClick={() => handleDelete(question)}
                      className="px-2 bg-red-600 h-9 hover:bg-red-900 rounded-md"
                    >
                      <Trash2Icon className="w-4 text-white" />
                    </Button>

                    <EditQuestionSectionPage Questiondata={question} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this question?</h3>
            <div className="mt-4 flex space-x-4">
              <div className="flex justify-end w-full space-x-4">
                <Button onClick={handleCancelDelete} className="bg-black text-white hover:bg-gray-700">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} className="bg-red-500 text-white">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDuplicateDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Duplicate Question</h3>
            <form className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Question Code</label>
                  <Input
                    value={duplicatedQuestion.question_code}
                    onChange={(e) =>
                      setDuplicatedQuestion((prev) => ({
                        ...prev,
                        question_code: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Question Text</label>
                  <Input
                    value={duplicatedQuestion.question_text}
                    onChange={(e) =>
                      setDuplicatedQuestion((prev) => ({
                        ...prev,
                        question_text: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Question Type</label>
                  <Select
                    value={duplicatedQuestion.question_type}
                    onValueChange={(value) =>
                      setDuplicatedQuestion((prev) => ({
                        ...prev,
                        question_type: value,
                      }))
                    }
                    className="mt-2"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Text">Text</SelectItem>
                      <SelectItem value="Checkbox">Checkbox</SelectItem>
                      <SelectItem value="MultipleChoice">MultipleChoice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Order Index</label>
                  <Input
                    type="number"
                    value={duplicatedQuestion.order_index}
                    onChange={(e) =>
                      setDuplicatedQuestion((prev) => ({
                        ...prev,
                        order_index: parseInt(e.target.value),
                      }))
                    }
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">

                <Button onClick={handleCancelDuplicate} className="bg-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDuplicate} className="bg-green-500 text-white">
                  Duplicate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default QuestionsTable;
