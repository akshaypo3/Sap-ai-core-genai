"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Grip } from "lucide-react";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Dialog } from "@radix-ui/react-dialog";
import { saveReorderedQuestionsOnServer } from "@/lib/settings/frameworkEditor/action";

const ITEM_TYPE = "QUESTION";

export default function RearrangeQuestionList({ questionData, framework_id, open, setOpen}) {
  const [questions, setQuestions] = useState(questionData);
  const [loading, setLoading] = useState(false);

  const moveRow = (draggedIndex: number, targetIndex: number) => {
    const updatedQuestions = [...questions];
    const draggedQuestion = updatedQuestions.splice(draggedIndex, 1)[0];
    updatedQuestions.splice(targetIndex, 0, draggedQuestion);

    updatedQuestions.forEach((question, index) => {
      question.order_index = index + 1;
    });

    setQuestions(updatedQuestions);
  };

  const saveReorderedQuestions = async () => {
    try {
      setLoading(true);
      await saveReorderedQuestionsOnServer(questions, framework_id);
      setOpen(false); 
      // window.location.href = `/settings/frameworkEditor/${framework_id}`;
    } catch (error) {
      console.error("Error saving questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const DraggableRow = ({ question, index }: any) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ITEM_TYPE,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop(() => ({
      accept: ITEM_TYPE,
      hover: (item: { index: number }) => {
        if (item.index !== index) {
          moveRow(item.index, index);
          item.index = index;  
        }
      },
    }));

    return (
      <TableRow ref={(node) => drag(drop(node))} key={question.id}>
        <TableCell className="border px-4 py-2 text-center cursor-move">
          <Grip className="mx-auto" />
        </TableCell>
        <TableCell className="border px-4 py-2 text-center">
          {question.question_text}
        </TableCell>
        <TableCell className="border px-4 py-2 text-center">
          {question.question_type}
        </TableCell>
        <TableCell className="border px-4 py-2 text-center">
          {question.question_code}
        </TableCell>
        <TableCell className="border px-4 py-2 text-center">
          {question.section?.name}
        </TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    setQuestions([...questions]);
  }, []);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <Dialog open={open} onOpenChange={setOpen}>
      <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
        <Table className="mb-14">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Swap</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Question</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Question Code</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Section Name</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question: any, index: any) => (
              <DraggableRow
                key={question.id}
                question={question}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
        <div className="fixed bottom-0 left-0 right-0 px-6 py-5 bg-white z-10">
          <Button
            className="w-full"
            type="button"
            onClick={saveReorderedQuestions}
            disabled={loading}
          >
            {loading ? "Saving..." : "Rearrange Questions"}
          </Button>
        </div>
      </div>
      </Dialog>
    </DndProvider>
  );
}
