"use client"
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskActionsMenu } from "./TaskActionsMenu"; 
import SendMailForm from "@/components/settings/emailTemp/SendMailForm";

export default function KanbanBoard({ initialTasks, updateTaskStatus, userId, timezone, users }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null); 

  const actualTime = timezone.userWithTimezone.timezone;

  const columns = {
    TODO: tasks.filter((task) => task.status === "TODO"),
    IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
    NEEDS_CLARIFICATION: tasks.filter((task) => task.status === "NEEDS_CLARIFICATION"),
    DONE: tasks.filter((task) => task.status === "DONE"),
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    async (e, newStatus) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("text");
      try {
        const updatedTask = await updateTaskStatus(taskId, newStatus);
        if (updatedTask) {
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
          );
          const assignedUser = users.find((user) => user.id === updatedTask.assigned_to);
          setSelectedTask({
            taskName: updatedTask.title,
            recipientEmail: assignedUser?.userEmail,
            recipientName: assignedUser?.username || "User",
            recipientLink: `http://localhost:3000/task/${taskId}`
          });
        }
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    },
    [updateTaskStatus, users]
  );

  return (
    <>
      <div className="min-w-full table-auto border-collapse">
        <div className="grid grid-cols-4 gap-2 mb-5 rounded">
          {Object.entries(columns).map(([status, tasks]) => (
            <Column
              key={status}
              title={status.replace(/_/g, " ")}
              tasks={tasks}
              onDragOver={handleDragOver}
              actualTime={actualTime}
              onDrop={(e) => handleDrop(e, status)}
              users={users}
            />
          ))}
        </div>
      </div>

      {selectedTask && (
        <SendMailForm
          recipientEmail={selectedTask.recipientEmail}
          placeholders={{
            name: selectedTask.recipientName,
            taskName: selectedTask.taskName,
            taskLink: selectedTask.recipientLink, 
            category:"taskStatusUpdate"
          }}
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </>
  );
}

function Column({ title, tasks, onDragOver, onDrop, actualTime, users }) {
  return (
    <div className="bg-white min-h-96 flex flex-col" onDragOver={onDragOver} onDrop={onDrop}>
      <div className="pt-2 pl-2 text-sm text-zinc-500">{title}</div>
      <div className="flex-grow space-y-2 p-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            userid={task.assigned_to.id}
            actualTime={actualTime}
            users={users}
          />
        ))}
        {tasks.length === 0 && (
          <div className="h-full min-h-[100px] border-2 border-dashed border-gray-200 rounded-lg"></div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ id, title, description, assigned_to_username, userid, status, start_date, due_date, actualTime, users }) {
  return (
    <Card
      className="w-full mt-2 cursor-move"
      draggable="true"
      onDragStart={(e) => handleDragStart(e, id)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge variant="outline" className={`text-${getColorForStatus(status)}-500`}>
          {assigned_to_username}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 opacity-70" />
            <span>
              {new Date(start_date)
                .toLocaleDateString("en-GB", { timeZone: actualTime })
                .replace(/\//g, ".")}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 opacity-70" />
            <span>
              {new Date(due_date)
                .toLocaleDateString("en-GB", { timeZone: actualTime })
                .replace(/\//g, ".")}
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-2"> 
          <TaskActionsMenu id={id} title={title} description={description} users={users} userid={userid} assigned_to_username={assigned_to_username} />
        </div>
      </CardContent>
    </Card>
  );
}

function getColorForStatus(status) {
  const colors = {
    TODO: "blue",
    IN_PROGRESS: "yellow",
    NEEDS_CLARIFICATION: "orange",
    DONE: "green",
  };
  return colors[status] || "gray";
}

function handleDragStart(e, id) {
  e.dataTransfer.setData("text/plain", id);
}
