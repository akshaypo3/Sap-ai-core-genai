"use client"

import { useTransition } from 'react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { Button } from '@/components/ui/button';
import { DeleteTaskDialog } from './DeleteTaskDialog';
import { UpdateTaskDialogForm } from './ViewTaskDialog';
import { ArchiveTaskDialog } from './ArchieveTaskDialog';

  export function TaskActionsMenu({ id, title, description,users,assigned_to_username,userid, link }: { id: string,title: string,description: string,users: string,assigned_to_username: string,userid: string, link:string}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showArchiveDialog, setShowArchiveDialog] = useState(false);

  //   const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);  // State to open archive dialog

  // const handleArchiveButtonClick = () => {
  //   setIsArchiveDialogOpen(true);  // Open archive dialog when button is clicked
  // };
     
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant="outline" className="px-3 border-none">...</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setShowViewDialog(true)} className="hover:cursor-pointer">
              View
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowArchiveDialog(true)} className="hover:cursor-pointer">
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="hover:cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteTaskDialog 
          taskId={id} 
          isOpen={showDeleteDialog} 
          setIsOpen={setShowDeleteDialog}
        />
        <ArchiveTaskDialog 
          taskId={id} 
          isOpen={showArchiveDialog} 
          setIsOpen={setShowArchiveDialog}
        />
        <UpdateTaskDialogForm
         taskId={id}
         title={title}
         description1={description}
         users={users}
         userid={userid}
         isOpen={showViewDialog} 
          setIsOpen={setShowViewDialog}
          link={link}
         />
         
      </>
    );
  }