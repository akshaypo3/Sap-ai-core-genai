"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  PanelRightOpen,
  CircleCheckBig,
  ChevronDown,
  ChevronUp,
  CircleHelp,
} from "lucide-react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const TemplateSidebar = ({
  toggleSidebar,
  questions,
}: {
  toggleSidebar: () => void;
  questions: Record<string, any[]>;
}) => {
  const [openAssessment, setOpenAssessment] = useState<string | null>(null);

  const toggleAssessment = (assessmentName: string) => {
    setOpenAssessment(
      openAssessment === assessmentName ? null : assessmentName,
    );
  };

  const handleDragStart = (
    event: React.DragEvent,
    questionText: string,
    answerValue: any,
  ) => {
    let formattedAnswer = "";

    if (typeof answerValue === "string") {
      try {
        const parsed = JSON.parse(answerValue);
        if (Array.isArray(parsed)) {
          formattedAnswer = generateTableHTML(parsed);
        } else if (typeof parsed === "object" && parsed !== null) {
          formattedAnswer = generateTableHTML([parsed]);
        } else {
          formattedAnswer = `<p>${String(parsed)}</p>`;
        }
      } catch (error) {
        formattedAnswer = `<p>${answerValue}</p>`;
      }
    } else if (Array.isArray(answerValue)) {
      formattedAnswer = generateTableHTML(answerValue);
    } else if (typeof answerValue === "object" && answerValue !== null) {
      formattedAnswer = generateTableHTML([answerValue]);
    } else {
      formattedAnswer = `<p>${String(answerValue)}</p>`;
    }

    const dragData = `
      <p><strong>${questionText}</strong></p>
      ${formattedAnswer}
    `;

    event.dataTransfer.setData("text/html", dragData);
  };

  const generateTableHTML = (data: any[]) => {
    if (!data.length) return "<p>No data available</p>";

    const headers = Object.keys(data[0]);

    let tableHTML = `<table border="1" style="border-collapse: collapse; width: 100%;">`;
    tableHTML +=
      "<tr>" + headers.map((header) => `<th>${header}</th>`).join("") + "</tr>";

    data.forEach((row) => {
      tableHTML +=
        "<tr>" +
        headers.map((header) => `<td>${row[header] || ""}</td>`).join("") +
        "</tr>";
    });

    tableHTML += "</table>";

    return tableHTML;
  };

  return (
    <div className="p-5 border rounded h-full max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Answered Questions</h2>
        <Button
          onClick={toggleSidebar}
          className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
        >
          <PanelRightOpen />
        </Button>
      </div>

      <ul className="space-y-2">
        {questions &&
          Object.entries(questions).map(([assessmentName, questionArray]) => (
            <li key={assessmentName} className="border-b pb-2">
              <button
                onClick={() => toggleAssessment(assessmentName)}
                className="w-full flex items-center justify-between text-lg font-semibold pt-2 pb-2 rounded transition"
              >
                {assessmentName}
                {openAssessment === assessmentName ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {openAssessment === assessmentName && (
                <ul className="space-y-2 mt-2">
                  {questionArray.map((q) => (
                    <li
                      key={q.id}
                      className="border-b pt-3 pb-3 ps-2 hover:bg-gray-100 cursor-move rounded-md"
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(
                          e,
                          q.question_text,
                          JSON.stringify(q.answer_value),
                        )
                      }
                    >
                      <div className="flex items-start space-x-2 mb-3">
                        <CircleHelp className="text-red-500 w-5 h-5 flex-shrink-0" />
                        <span className="text-base font-semibold">
                          {q.question_text}
                        </span>
                      </div>

                      <div className="flex items-start space-x-2 mt-1">
                        <CircleCheckBig className="text-green-500 w-5 h-5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {(() => {
                            if (!q.answer_value) return "No Answer";

                            if (typeof q.answer_value === "string") {
                              if (q.answer_value.startsWith("<p>")) {
                                return (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: q.answer_value,
                                    }}
                                  />
                                );
                              }
                              return q.answer_value;
                            }

                            if (Array.isArray(q.answer_value)) {
                              const headers = Object.keys(
                                q.answer_value[0] || {},
                              );
                              return (
                                <div className="w-full overflow-x-auto">
                                  <div className="max-w-[400px]">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          {headers.map((header) => (
                                            <TableHead
                                              key={header}
                                              className="px-4 py-2 text-black"
                                            >
                                              {header}
                                            </TableHead>
                                          ))}
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {q.answer_value.map(
                                          (row: any, idx: number) => (
                                            <TableRow key={idx}>
                                              {headers.map((header) => (
                                                <TableCell
                                                  key={header}
                                                  className="px-4 py-2"
                                                >
                                                  {row[header]}
                                                </TableCell>
                                              ))}
                                            </TableRow>
                                          ),
                                        )}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              );
                            }

                            if (typeof q.answer_value === "object") {
                              return (
                                <ul className="list-disc list-inside">
                                  {Object.entries(q.answer_value).map(
                                    ([key, value]) => (
                                      <li key={key}>
                                        <strong className="me-1">{key}:</strong>{" "}
                                        {value}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              );
                            }

                            return String(q.answer_value);
                          })()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TemplateSidebar;
