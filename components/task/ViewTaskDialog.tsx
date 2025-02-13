'use client';
import { useState, useEffect, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTaskDetails, getComments } from '@/lib/task/action';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { TableBody, TableCell, TableRow } from '../ui/table';
import { getTaskLogs } from '@/lib/task/action';
import { columns_task } from '../table/TasksTableColumns';
import { DataTable } from '../table/data-table';
import { columns_task_log } from '../table/TaskLogsTableColumns';
import { Comments } from './commentdialog';
import { ArchiveTaskButtonDialog } from './ArchieveTaskButton';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function UpdateTaskDialogForm({
  taskId,
  title,
  description1,
  users,
  userid,
  isOpen,
  setIsOpen,
  link
}: {
  taskId: string;
  title: string;
  description1: string;
  users: { id: string; username: string }[];
  userid: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  link: string
}) {
  const assignedUser = users.find((user) => user.id === userid);
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState(description1 || '');
  const [title1, settitle] = useState(title || '');
  const [assignedTo, setAssignedTo] = useState(assignedUser ? assignedUser.id : '');
  const [isLoadingComments, startLoadingComments] = useTransition();
  const [comments, setComments] = useState([]);
  const [Logs, setLogs] = useState([]);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'comments' | 'activitylog'>('comments');

  // Prevent continuous API calls by adding checks
  const fetchComments = async () => {
    try {
      const result = await getComments(taskId);
      setComments(result);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const Logs1 = await getTaskLogs(taskId);
      setLogs(Logs1);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  // Fetch comments and logs only when the active tab changes
  useEffect(() => {
    if (isOpen) {
      fetchComments();
      fetchLogs();
    }
  }, [isOpen]); // Run only when the dialog opens // Watch for changes in activeTab, comments, and logs

  const handleArchiveButtonClick = (event) => {
    event.preventDefault();
    setIsArchiveDialogOpen(true); // Open the archive dialog independently
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPending) return; // Prevent submitting if the form is pending

    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      formData.set('description', description);
      formData.set('assigned_to', assignedTo);
      formData.set('title', title1);
      
      try {
        await updateTaskDetails(taskId, formData);
        setIsOpen(false); // Close the main task dialog after the update
      } catch (error) {
        console.error("Failed to update task details:", error);
      }
    });
  };

  // Close the Archive Dialog
  const closeChildDialog = () => {
    setIsArchiveDialogOpen(false);
  };

  // Close both dialogs
  const closeBothDialogs = () => {
    setIsArchiveDialogOpen(false);
    setIsOpen(false); // Close the main task dialog
  };

  const t = useTranslations("tasks-com");
  return (
    <>
      {/* Main Task Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[1000px] max-h-[80vh] overflow-y-auto" aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle className="text-left">{t("Task Details")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="flex justify-end w-full pl-2">
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-medium leading-none mb-1">{t("Assigned To")}</label>
                  <Select
                    name="assigned_to"
                    value={assignedTo}
                    onValueChange={setAssignedTo}
                    className="w-full mb-1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select User")} />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.username || "NA"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-medium leading-none mb-1">{t("Task Title")}</label>
                  <input
                    className="flex h-9 rounded-md border border-input bg-gray-200 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mb-1"
                    value={title}
                    readOnly
                  />
                </div>
                {/* {link && (    
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-medium leading-none mb-1">Linked To</label>     
                  <Link href={link}>
                    <Button variant="outline" className='w-full'>
                      <span>{t("View Linked Section")}</span>
                    </Button>
                  </Link>
                </div>
                )}  */}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">{t("Description")}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex h-48 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  id="dialog-description"
                  aria-labelledby="dialog-title"
                />
              </div>

              <div className="flex mt-5 justify-between items-center">
                <DialogClose asChild>
                  <Button className="w-1/8" type="submit" disabled={isPending}>
                    {isPending ? t('Saving') : t('Save')}
                  </Button>
                </DialogClose>

                <Button 
                  className="w-1/8 bg-red-500 hover:bg-red-600"
                  onClick={handleArchiveButtonClick}
                >
                  {t("Archive")}
                </Button>
              </div>
            </div>
          </form>

          <Tabs defaultValue="comments" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">{t("Comments")}</TabsTrigger>
              <TabsTrigger value="activitylog">{t("Activity Logs")}</TabsTrigger>
            </TabsList>
            <div className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 p-5 mt-1 border rounded-lg">
              <TabsContent value="comments">
                <Comments taskId={taskId} isOpen={true} />
              </TabsContent>
              <TabsContent value="activitylog">
                <h2 className="font-semibold text-xl mb-3">{t("Activity Logs")}</h2>
                <div className="min-w-full table-auto border-collapse">
                  <DataTable columns={columns_task_log} data={Logs} filter={'user'} sort={'Created At'} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Archive Dialog - Independent Control */}
      <ArchiveTaskButtonDialog
        taskId={taskId}
        isOpen={isArchiveDialogOpen}
        setIsOpen={(open) => {
          if (open) {
            setIsArchiveDialogOpen(open); // Open the child dialog
          } else {
            closeChildDialog(); // Close only the child dialog
          }
        }} // Only close child dialog
        handleCloseBoth={closeBothDialogs} // Pass down function to close both dialogs
      />
    </>
  );
}
