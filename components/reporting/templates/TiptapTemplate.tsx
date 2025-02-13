"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { addTemplateContent } from "@/lib/templates/action";
import cardComponent from "./titapCom/CardExtension";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";
import { PDFDocument } from "pdf-lib";
import html2canvas from "html2canvas";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";

import "./titapCom/index.css";

import { TiptapCollabProvider } from "@hocuspocus/provider";

import { HocuspocusProvider } from "@hocuspocus/provider";

import {
  Columns,
  Column,
  ColumnsSideBar,
  ColumnSmall,
  ColumnBig,
} from "./titapCom/ColumnExtension";

import {
  Square,
  Columns2,
  Columns3,
  PanelLeft,
  PanelRight,
  Bold,
  Italic,
  Strikethrough,
  Code,
  SquareMousePointer,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  CodeXml,
  MessageSquareQuote,
  Minus,
  WrapText,
  Brush,
  Undo2,
  Redo2,
  Trash2,
  PanelLeftOpen,
  Type,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TemplateSidebar from "./Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const doc = new Y.Doc();

const TiptapTemplate = ({
  templateId,
  templateContent,
  userName,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  templateId: string;
  templateContent: any;
  userName: string;
  isSidebarOpen: any;
  setIsSidebarOpen: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#676f7a");
  const [selectedFontSize, setSelectedFontSize] = useState("16px");
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const saveContent = async () => {
    if (!editor) {
      console.error("Editor instance not found.");
      return;
    }
    setIsLoading(true);
    const contentWithComponents = editor.getJSON();
    const jsonData = JSON.stringify(contentWithComponents);
    const cleanedContent = jsonData.replace(/<card-component\s*\/?>/g, "");
    try {
      await addTemplateContent(templateId, cleanedContent);
      console.log("Content saved successfully.");
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     saveContent();
  //   }, 60000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [editor, templateId]);

  useEffect(() => {
    if (!editor || !templateContent) return;

    if (editor.storage.hasSetContent) {
      return;
    }

    let parsedContent;
    if (typeof templateContent === "string") {
      try {
        parsedContent = JSON.parse(templateContent);
      } catch (error) {
        console.error("Error parsing template content:", error);
        return;
      }
    } else {
      parsedContent = templateContent;
    }

    const provider = new TiptapCollabProvider({
      name: `document-${templateId}`,
      appId: "7j9y6m10",
      token: "notoken",
      document: doc,

      onSynced() {
        editor.commands.setContent(parsedContent, true);
      },
    });

    return () => {
      provider.destroy();
    };
  }, [editor, templateContent]);

  const handleExportPDF = async () => {
    if (!editor) {
      console.error("Editor not found!");
      return;
    }

    const editorElement = document.querySelector(".ProseMirror");

    if (!editorElement) {
      console.error("Editor element not found in DOM!");
      return;
    }

    const allElements = [
      editorElement,
      ...Array.from(editorElement.querySelectorAll("*")),
    ];
    const elementsWithBorder = allElements.filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.borderWidth === "1px" &&
        style.borderStyle === "solid" &&
        style.borderColor === "rgb(204, 204, 204)"
      );
    });

    const originalBorders = elementsWithBorder.map((el) => ({
      element: el,
      border: el.style.border,
    }));
    elementsWithBorder.forEach((el) => {
      el.style.border = "none";
    });

    try {
      const canvas = await html2canvas(editorElement, {
        scale: 2,
        useCORS: true,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdfDoc = await PDFDocument.create();

      const maxWidth = 600;
      const maxHeight = 800;

      const marginTop = 30;
      const marginRight = 30;
      const marginBottom = 30;
      const marginLeft = 30;

      const usableWidth = maxWidth - marginLeft - marginRight;
      const usableHeight = maxHeight - marginTop - marginBottom;

      const scaleX = usableWidth / canvas.width;
      const scaleY = usableHeight / canvas.height;

      const scale = Math.min(scaleX, scaleY);

      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;

      const page = pdfDoc.addPage([maxWidth, maxHeight]);

      const image = await pdfDoc.embedPng(imageData);

      const yPosition = maxHeight - marginTop - scaledHeight;

      page.drawImage(image, {
        x: marginLeft,
        y: yPosition,
        width: scaledWidth,
        height: scaledHeight,
      });

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Report.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      originalBorders.forEach(({ element, border }) => {
        element.style.border = border;
      });
    }
  };

  const colors = [
    "#000000",
    "#0747a6",
    "#008da6",
    "#006644",
    "#ff991f",
    "#bf2600",
    "#403294",
    "#676f7a",
    "#4c9aff",
    "#00b8d9",
    "#36b37e",
    "#ffc400",
    "#ff5630",
    "#6554c0",
    "#ffffff",
    "#b3d4ff",
    "#b3f5ff",
    "#abf5d1",
    "#fff0b3",
    "#ffbdad",
    "#eae6ff",
  ];

  const applyColor = (color: any) => {
    setSelectedColor(color);
    editor.chain().focus().setColor(color).run();
  };

  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "32px",
    "36px",
    "48px",
    "72px",
  ];

  const applyFontSize = (size: any) => {
    setSelectedFontSize(size);
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-800 rounded-t-md mb-5">
        <h3 className="text-xl font-bold">Edit Template</h3>
        <div className="flex items-center gap-4">
          {/* <Button
            onClick={saveContent}
            disabled={isLoading || !editor.can().chain().focus().undo().run()}
          >
            {isLoading ? "Saving Template..." : "Save Template"}
          </Button> */}
          <Button onClick={handleExportPDF}>Download</Button>
          {!isSidebarOpen && (
            <Button
              onClick={() => setIsSidebarOpen(true)}
              className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
            >
              <PanelLeftOpen />
            </Button>
          )}
        </div>
      </div>
      <div className="control-group">
        <div className="button-group p-5 border rounded d-flex flex-wrap mb-5">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={`${
                    editor.isActive("bold") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Bold />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bold</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={`${
                    editor.isActive("italic") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Italic />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Italic</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={`${
                    editor.isActive("strike") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Strikethrough />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Strike</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  disabled={!editor.can().chain().focus().toggleCode().run()}
                  className={`${
                    editor.isActive("code") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Code />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().clearNodes().run()}
                  className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <SquareMousePointer />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear Nodes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`${
                    editor.isActive("paragraph") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Pilcrow />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Paragraph</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                    >
                      <Type />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {fontSizes.map((size: any) => (
                        <DropdownMenuItem
                          key={size}
                          onClick={() => applyFontSize(size)}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <span className="text-md">{size}</span>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Font Size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setNode("heading", { level: 1 })
                      .run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-green-500"
                      : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Heading1 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>H1</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setNode("heading", { level: 2 })
                      .run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-green-500"
                      : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Heading2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>H2</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setNode("heading", { level: 3 })
                      .run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-green-500"
                      : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Heading3 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>H3</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setNode("heading", { level: 4 })
                      .run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 4 })
                      ? "bg-green-500"
                      : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Heading4 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>H4</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setNode("heading", { level: 5 })
                      .run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 5 })
                      ? "bg-green-500"
                      : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Heading5 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>H5</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setNode("heading", { level: 6 })
                      .run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 6 })
                      ? "bg-green-500"
                      : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Heading6 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>H6</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`${
                    editor.isActive("bulletList") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <List />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bullet List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`${
                    editor.isActive("orderedList") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <ListOrdered />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ordered List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`${
                    editor.isActive("codeBlock") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <CodeXml />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Code Block</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={`${
                    editor.isActive("blockquote") ? "bg-green-500" : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <MessageSquareQuote />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Blockquote</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                  className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <Minus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Horizontal Rule</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => editor.chain().focus().setHardBreak().run()}
                  className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <WrapText />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hard Break</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                    >
                      <Brush style={{ color: selectedColor }} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="grid grid-cols-7">
                      {colors.map((color: any) => (
                        <DropdownMenuItem
                          key={color}
                          onClick={() => applyColor(color)}
                        >
                          <div
                            className="w-8 h-8 rounded border cursor-pointer"
                            style={{ backgroundColor: color }}
                          ></div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Colors</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => {
                    const singleColumn = [
                      {
                        type: "column",
                        content: [{ type: "paragraph", text: "Single Column" }],
                      },
                    ];

                    editor
                      .chain()
                      .focus()
                      .insertContent({
                        type: "columns",
                        content: singleColumn,
                      })
                      .run();
                  }}
                  className="text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <Square />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Single Column Layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => {
                    const twoColumns = [
                      {
                        type: "column",
                        content: [{ type: "paragraph", text: "Column 1" }],
                      },
                      {
                        type: "column",
                        content: [{ type: "paragraph", text: "Column 2" }],
                      },
                    ];

                    editor
                      .chain()
                      .focus()
                      .insertContent({
                        type: "columns",
                        content: twoColumns,
                      })
                      .run();
                  }}
                  className="text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <Columns2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Two Column Layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => {
                    const maxColumns = 3;
                    const columns = Array.from(
                      { length: maxColumns },
                      (_, index) => ({
                        type: "column",
                        content: [
                          { type: "paragraph", text: `Column ${index + 1}` },
                        ],
                      }),
                    );

                    editor
                      .chain()
                      .focus()
                      .insertContent({
                        type: "columns",
                        content: columns,
                      })
                      .run();
                  }}
                  className={`${
                    editor.isActive("textStyle", { color: "#958DF1" })
                      ? "bg-green-500"
                      : ""
                  } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20`}
                >
                  <Columns3 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Three Column Layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => {
                    const leftSidebar = [
                      {
                        type: "columnsmall",
                        content: [{ type: "paragraph", text: "Left Content" }],
                      },
                      {
                        type: "columnbig",
                        content: [{ type: "paragraph", text: "Right Content" }],
                      },
                    ];

                    editor
                      .chain()
                      .focus()
                      .insertContent({
                        type: "columnsbar",
                        content: leftSidebar,
                      })
                      .run();
                  }}
                  className="text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <PanelLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Left Sidebar Layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => {
                    const rightSidebar = [
                      {
                        type: "columnbig",
                        content: [{ type: "paragraph", text: "Left Content" }],
                      },
                      {
                        type: "columnsmall",
                        content: [{ type: "paragraph", text: "Right Content" }],
                      },
                    ];

                    editor
                      .chain()
                      .focus()
                      .insertContent({
                        type: "columnsbar",
                        content: rightSidebar,
                      })
                      .run();
                  }}
                  className="text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <PanelRight />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Right Sidebar Layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => {
                    editor.chain().focus().clearNodes().run();
                  }}
                  className="text-black px-4 py-2 rounded-md hover:bg-red-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                  className="text-white px-4 py-2 rounded-md bg-black hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <Undo2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                  className="text-white px-4 py-2 rounded-md bg-black hover:bg-green-600 hover:text-white focus:outline-none m-1 w-20"
                >
                  <Redo2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};

export default ({
  templateId,
  templateContent,
  userName,
  questions,
}: {
  templateId: string;
  templateContent: any;
  userName: string;
  questions: any;
}) => {
  const provider = new HocuspocusProvider({
    url: "ws://127.0.0.1:1234",
    name: `document-${templateId}`,
    document: doc,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.extend({
      addAttributes() {
        return {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        };
      },
    }),
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
      },
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
      history: false,
    }),
    Collaboration.configure({
      document: provider.document,
    }),
    CollaborationCursor.configure({
      provider: provider,
      user: {
        name: userName,
        color: "#22c55e",
      },
    }),
    Table.configure({
      resizable: false,
    }),
    TableRow,
    TableHeader,
    TableCell,
    // Placeholder.configure({
    //   placeholder:
    //     'Write something … It’ll be shared with everyone else looking at this example.',
    // }),
    Columns,
    Column,
    ColumnsSideBar,
    ColumnSmall,
    ColumnBig,
    cardComponent,
  ];

  const hasCardComponent =
    templateContent?.includes("<card-component />") || false;
  const content = hasCardComponent
    ? templateContent
    : `${templateContent ?? ""} <card-component /> `;

  return (
    <div className="flex gap-4">
      <div
        className={`p-5 border rounded prose transition-all ${
          isSidebarOpen ? "max-w-[65%]" : "max-w-full"
        }`}
      >
        <EditorProvider
          slotBefore={
            <TiptapTemplate
              templateId={templateId}
              templateContent={templateContent}
              userName={userName}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
          extensions={extensions}
          content={content}
          immediatelyRender={false}
        ></EditorProvider>
      </div>

      {isSidebarOpen && (
        <div className="flex-1 max-w-[35%]">
          <TemplateSidebar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            questions={questions}
          />
        </div>
      )}
    </div>
  );
};
