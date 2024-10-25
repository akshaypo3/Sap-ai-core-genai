'use client';
import { useEffect, useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTaskDetails, getComments } from '@/lib/task/action';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { TableBody, TableCell, TableRow } from '../ui/table';
import { getTaskLogs } from '@/lib/task/action';
import { getUserInfo } from '@/lib/settings/users/data';
import { columns_task } from '../table/TasksTableColumns';
import { DataTable } from '../table/data-table';
import { columns_task_log } from '../table/TaskLogsTableColumns';
import { Comments } from './commentdialog';

export function UpdateTaskDialogForm({ taskId, title, description1, users, userid, isOpen, setIsOpen }) {
  const assignedUser = users.find((user) => user.id === userid);
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState(description1 || '');
  const [assignedTo, setAssignedTo] = useState(assignedUser ? assignedUser.id : '');
  const [isLoadingComments, startLoadingComments] = useTransition();
  const [comments, setComments] = useState([]);
  const [Logs, setLogs] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      formData.set('description', description);
      formData.set('assigned_to', assignedTo);
      try {
        await updateTaskDetails(taskId, formData);
        setIsOpen(false);
      } catch (error) {
        console.error("Failed to update task details:", error);
      }
    });
  };

  const fetchtherequireddata = async (open) => {
    if (open) {
      startLoadingComments(async () => {
        try {
          const result = await getComments(taskId);
          setComments(result);
          const Logs1 = await getTaskLogs(taskId);
          setLogs(Logs1);
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      });
    }
  };

  useEffect(() => {
    fetchtherequireddata(isOpen);
  }, [isOpen]); // Fetch comments when dialog opens

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[1000px] max-h-[80vh] overflow-y-auto" aria-labelledby="dialog-title" aria-describedby="dialog-description">
      {/* </DialogContent><DialogContent className="sm:max-w-[1000px]" aria-labelledby="dialog-title" aria-describedby="dialog-description"> */}
        <DialogHeader>
          <DialogTitle id="dialog-title" className="text-left">Task Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
          <div className="flex justify-end w-full pl-2">
  <div className="flex flex-col w-1/3">
    <label className="text-sm font-medium leading-none mb-1">Assigned To</label>
    <Select
      name="assigned_to"
      value={assignedTo}
      onValueChange={setAssignedTo}
      className="w-full mb-1"
    >
      <SelectTrigger>
        <SelectValue placeholder="Select User" />
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
              <div className="flex flex-col w-1/3 pr-2">
                <label className="text-sm font-medium leading-none mb-1">Task Title</label>
                <input
                  className="flex h-9 rounded-md border border-input bg-gray-200 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mb-1"
                  value={title}
                  readOnly
                />
              </div>
              <div className="flex flex-col w-1/3 pl-2">
                <label className="text-sm font-medium leading-none mb-1">Linked</label>
                <Select className="w-full mb-1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        User {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex h-48 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                id="dialog-description"
              />
            </div>

            <div className="flex mt-5">
              <div className="flex-auto">
                <DialogClose asChild>
                  <Button className="w-1/8" type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </form>

        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="activitylog">Activity Log</TabsTrigger>
          </TabsList>
          <div className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 p-5 mt-1 border rounded-lg">
            <TabsContent value="comments">
              <Comments taskId={taskId} isOpen={true}/>
            </TabsContent>
            <TabsContent value="activitylog">
            
            <h2 className="font-semibold text-xl mb-3">Activity Logs</h2>
            <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_task_log} data={Logs} filter={'user'} sort={'Created At'}/>
            </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
