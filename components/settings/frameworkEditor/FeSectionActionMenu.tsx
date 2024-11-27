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

export function SectionActionMenu({sectionData, frameworkId, parentSections}) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

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
        </DropdownMenuContent>
      </DropdownMenu>
      <AddSectionButton frameworkId={frameworkId} parentSections={parentSections} isOpen={showCreateDialog}
        setIsOpen={setShowCreateDialog}/>
      <EditSectionButton sectionData={sectionData} isOpen={showEditDialog}
        setIsOpen={setShowEditDialog}/>
    </>
  );
}
