"use client";

import React, { useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { updateTaskStatus } from "@/lib/task/action";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  status: string;
}

interface SwapyWrapperProps {
  loggedTasksData: Task[];
}

export function SwapyWrapper({ loggedTasksData }: SwapyWrapperProps) {
  const [loggedTasks, setLoggedTasks] = useState<Task[]>(loggedTasksData);

  const handleDrop = async (droppedItems: string[], targetList: string) => {

    const updatedTasks = loggedTasks.map((task) => {
      if (droppedItems.includes(task.title)) {
        return { ...task, status: targetList };
      }

      return task;
    });

    setLoggedTasks(updatedTasks);

    for (const title of droppedItems) {
      const task = updatedTasks.find(task => task.title === title);
      if (task) {
        await updateTaskStatus(task.id, targetList);
      }
    }
  };

  const group = ["todoList", "inProgressList", "clarificationsList", "doneList"];

  const todoItems = loggedTasks.filter((task) => task.status === "TODO");
  const inProgressItems = loggedTasks.filter((task) => task.status === "IN_PROGRESS");
  const clarificationItems = loggedTasks.filter((task) => task.status === "NEEDS_CLARIFICATION");
  const doneItems = loggedTasks.filter((task) => task.status === "DONE");

  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems.map(task => task.title), {
    group,
    onDrop: (droppedItems: string[]) => handleDrop(droppedItems, "TODO"),
    sortable: true,
  });

  const [inProgressList, progresses] = useDragAndDrop<HTMLUListElement, string>(inProgressItems.map(task => task.title), {
    group,
    onDrop: (droppedItems: string[]) => handleDrop(droppedItems, "IN_PROGRESS"),
    sortable: true,
  });

  const [clarificationsList, clarifications] = useDragAndDrop<HTMLUListElement, string>(clarificationItems.map(task => task.title), {
    group,
    onDrop: (droppedItems: string[]) => handleDrop(droppedItems, "NEEDS_CLARIFICATION"),
    sortable: true,
  });

  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneItems.map(task => task.title), {
    group,
    onDrop: (droppedItems: string[]) => handleDrop(droppedItems, "DONE"),
    sortable: true,
  });

  return (
    <div className="kanban-board flex space-x-2">
      <ul ref={todoList} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-1/4">
        <h2 className="text-sm font-semibold mb-4">TODO</h2>
        {todos.map((todo) => {
          const task = todoItems.find(t => t.title === todo);
          return (
            task && (
              <Link href={`/task/${task.id}`} passHref key={todo}>
                <li className="kanban-item bg-white dark:bg-gray-950 rounded-md p-3 mb-2 shadow-sm">
                  {todo}
                </li>
              </Link>
            )
          );
        })}
      </ul>
      <ul ref={inProgressList} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-1/4">
        <h2 className="text-sm font-semibold mb-4">IN PROGRESS</h2>
        {progresses.map((progress) => {
          const task = inProgressItems.find(t => t.title === progress);
          return (
            task && (
              <Link href={`/task/${task.id}`} passHref key={progress}>
                <li className="kanban-item bg-white dark:bg-gray-950 rounded-md p-3 mb-2 shadow-sm">
                  {progress}
                </li>
              </Link>
            )
          );
        })}
      </ul>
      <ul ref={clarificationsList} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-1/4">
        <h2 className="text-sm font-semibold mb-4">NEEDS CLARIFICATION</h2>
        {clarifications.map((clarification) => {
          const task = clarificationItems.find(t => t.title === clarification);
          return (
            task && (
              <Link href={`/task/${task.id}`} passHref key={clarification}>
                <li className="kanban-item bg-white dark:bg-gray-950 rounded-md p-3 mb-2 shadow-sm">
                  {clarification}
                </li>
              </Link>
            )
          );
        })}
      </ul>
      <ul ref={doneList} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-1/4">
        <h2 className="text-sm font-semibold mb-4">DONE</h2>
        {dones.map((done) => {
          const task = doneItems.find(t => t.title === done);
          return (
            task && (
              <Link href={`/task/${task.id}`} passHref key={done}>
                <li className="kanban-item bg-white dark:bg-gray-950 rounded-md p-3 mb-2 shadow-sm">
                  {done}
                </li>
              </Link>
            )
          );
        })}
      </ul>
    </div>
  );
}
