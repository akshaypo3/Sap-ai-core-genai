"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddSectionButton, EditSectionButton } from "@/components/settings/frameworkEditor/Buttons";
import { Button } from "@/components/ui/button";
import { QuestionFormDialog } from "./CreateQuestionForm";

export function SectionActionMenu({sectionData, frameworkId, parentSections}) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCreateQDialog, setShowCreateQDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="px-3 border-none">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowCreateDialog(true)}
            className="hover:cursor-pointer"
          >
            Create
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowEditDialog(true)}
            className="hover:cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowCreateQDialog(true)}
            className="hover:cursor-pointer"
          >
            Add Question
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddSectionButton frameworkId={frameworkId} parentSections={parentSections} isOpen={showCreateDialog}
        setIsOpen={setShowCreateDialog}/>
      <EditSectionButton sectionData={sectionData} isOpen={showEditDialog}
        setIsOpen={setShowEditDialog}/>
      <QuestionFormDialog open={showCreateQDialog} setOpen={setShowCreateQDialog} framework_id={frameworkId} section_id={sectionData.id} section_code={sectionData.section_code}/>
    </>
  );
}
