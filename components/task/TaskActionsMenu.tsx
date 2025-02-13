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
import { useTranslations } from 'next-intl';

  export function TaskActionsMenu({ id, title, description,users,assigned_to_username,userid, link }: { id: string,title: string,description: string,users: string,assigned_to_username: string,userid: string, link:string}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showArchiveDialog, setShowArchiveDialog] = useState(false);

  //   const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);  // State to open archive dialog

  // const handleArchiveButtonClick = () => {
  //   setIsArchiveDialogOpen(true);  // Open archive dialog when button is clicked
  // };
    const t = useTranslations("tasks-com");
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger><div className="px-3 border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-md cursor-pointer">...</div></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setTimeout(() => setShowViewDialog(true), 0)} className="hover:cursor-pointer">
              {t("View")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTimeout(() => setShowArchiveDialog(true), 0)} className="hover:cursor-pointer">
              {t("Archive")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTimeout(() => setShowDeleteDialog(true), 0)} className="hover:cursor-pointer">
              {t("Delete")}
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