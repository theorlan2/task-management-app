"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@headlessui/react";

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/services/task.service";
import { TaskCriteria } from "@/types/criterias/task/task.criteria";

import CreateOrUpdateTaskDialog from "./components/tasks/crud/CreateOrUpdateTaskDialgo";
import TasksTabList from "./components/tasks/TasksTabList";
import { Task } from "@/types/models/task/task.model";

export default function Home() {
  const [isOpenCreateOrEditDialog, setIsOpenCreateOrEditDialog] =
    useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task>();

  const [
    sendCreateTask,
    { isError: isCreateTaskError, isLoading: isCreateTaskLoading },
  ] = useCreateTaskMutation();
  const [
    sendUpdateTask,
    { isError: isUpdateTaskError, isLoading: isUpdateTaskLoading },
  ] = useUpdateTaskMutation();
  const [sendDeleteTask] = useDeleteTaskMutation();

  async function sendTask(data: TaskCriteria) {
    if (data.id) {
      try {
        await sendUpdateTask(data);
        toast.success("Task updated");
        setIsOpenCreateOrEditDialog(false);
      } catch (e) {
        console.error("Error updating task:", e);
        toast.error("Error updating task");
      }
    } else {
      try {
        await sendCreateTask(data);
        toast.success("Task created");
        setIsOpenCreateOrEditDialog(false);
      } catch (e) {
        console.error("Error creating task:", e);
        toast.error("Error creating task");
      }
    }
  }
  async function deleteTask(data?: Task) {
    if (data) {
      try {
        toast.promise(sendDeleteTask(data.id ?? 0), {
          loading: "Loading...",
          success: () => {
            return `${data.title} toast has been delete`;
          },
          error: "Error deleting task",
        });
      } catch (e) {
        console.error("Error deleting task:", e);
        toast.error("Error deleting task");
      }
    }
  }

  function editTask(data: Task) {
    if (data) {
      setTaskToEdit(data);
      setIsOpenCreateOrEditDialog(true);
    }
  }
  function closeDialogToCreateOrEdit() {
    setTaskToEdit(undefined);
    setIsOpenCreateOrEditDialog(false);
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-4 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="my-4  w-full">
        <div className="container mx-auto">
          <div className="w-full flex flex-col gap-8 row-start-2 items-center">
            <div className="w-full  max-w-xl">
              <h3 className="text-xl mb-2">Tasks </h3>
              <div className="border border-gray-200 dark:border-white/35 rounded-lg p-2 sm:p-4">
                <TasksTabList onSubmitDelete={deleteTask} onEdit={editTask} />
              </div>
            </div>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Button
                onClick={() => setIsOpenCreateOrEditDialog(true)}
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Add task
                <i className="ri-add-line"></i>
              </Button>
            </div>
            <CreateOrUpdateTaskDialog
              dataTask={taskToEdit}
              isError={isCreateTaskError || isUpdateTaskError}
              isOpen={isOpenCreateOrEditDialog}
              isLoading={isCreateTaskLoading || isUpdateTaskLoading}
              setIsOpen={(v: boolean) =>
                v ? setIsOpenCreateOrEditDialog(v) : closeDialogToCreateOrEdit()
              }
              onSubmit={sendTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
