"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { addTemplateContent } from "@/lib/templates/action";
import cardComponent from "./titapCom/Extension";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";

import { TiptapCollabProvider } from "@hocuspocus/provider";

import { HocuspocusProvider } from "@hocuspocus/provider";

const doc = new Y.Doc();

const TiptapTemplate = ({
  templateId,
  templateContent,
  userName,
}: {
  templateId: string;
  templateContent: any;
  userName: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
    const contentWithComponents = editor.getHTML();
    const cleanedContent = contentWithComponents.replace(
      /<card-component\s*\/?>/g,
      "",
    );
    try {
      await addTemplateContent(templateId, cleanedContent);
      console.log("Content saved successfully.");
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      saveContent();
    }, 60000); 

    return () => {
      clearInterval(interval); 
    };
  }, [editor, templateId]);

  useEffect(() => {
    const provider = new TiptapCollabProvider({
      name: "document.name",
      appId: "7j9y6m10",
      token: "notoken",
      document: doc,

      onSynced() {
        editor.commands.setContent(templateContent, true);
      },
    });

    return () => {
      provider.destroy();
    };
  }, [editor, templateContent]);

  return (
    <>
      <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-800 rounded-t-md mb-5">
        <h3 className="text-xl font-bold">Edit Template</h3>
        {/* <div className="flex justify-end mt-4">
          <Button
            onClick={saveContent}
            disabled={isLoading || !editor.can().chain().focus().undo().run()}
          >
            {isLoading ? "Saving Template..." : "Save Template"}
          </Button>
        </div> */}
      </div>
      <div className="control-group">
        <div className="button-group p-5 border rounded d-flex flex-wrap mb-5">
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Bold
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`${
              editor.isActive("italic") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Italic
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`${
              editor.isActive("strike") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Strike
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`${
              editor.isActive("code") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Code
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36"
          >
            Clear marks
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().clearNodes().run()}
            className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36"
          >
            Clear nodes
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`${
              editor.isActive("paragraph") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Paragraph
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 1 }) ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            H1
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 2 }) ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            H2
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 3 }) ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            H3
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 4 }) ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            H4
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 5 }) ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            H5
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 6 }) ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            H6
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${
              editor.isActive("bulletList") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Bullet list
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${
              editor.isActive("orderedList") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Ordered list
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${
              editor.isActive("codeBlock") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Code block
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${
              editor.isActive("blockquote") ? "bg-green-500" : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Blockquote
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36"
          >
            Horizontal rule
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().setHardBreak().run()}
            className="text-black px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36"
          >
            Hard break
          </Button>
          <Button
            variant="outline"
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={`${
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "bg-green-500"
                : ""
            } text-black px-4 py-2 rounded-md hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36`}
          >
            Purple
          </Button>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="text-white px-4 py-2 rounded-md bg-black hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36"
          >
            Undo
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="text-white px-4 py-2 rounded-md bg-black hover:bg-green-600 hover:text-white focus:outline-none m-1 w-36"
          >
            Redo
          </Button>
        </div>
      </div>
    </>
  );
};

export default ({
  templateId,
  templateContent,
  userName,
}: {
  templateId: string;
  templateContent: any;
  userName: string;
}) => {
  const provider = new HocuspocusProvider({
    url: "ws://127.0.0.1:1234",
    name: `document-${templateId}`,
  });

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
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
    // Placeholder.configure({
    //   placeholder:
    //     'Write something … It’ll be shared with everyone else looking at this example.',
    // }),
    cardComponent,
  ];

  const hasCardComponent = templateContent.includes("<card-component />");
  const content = hasCardComponent
    ? templateContent
    : `${templateContent} <card-component /> `;

  return (
    <div className="p-5 border rounded prose max-w-none">
      <EditorProvider
        slotBefore={
          <TiptapTemplate
            templateId={templateId}
            templateContent={templateContent}
            userName={userName}
          />
        }
        extensions={extensions}
        content={content}
        immediatelyRender={false}
      ></EditorProvider>
    </div>
  );
};
