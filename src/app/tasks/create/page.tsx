"use client";
import { toast } from "sonner";

import { useCreateTaskMutation } from "@/services/task.service";

import TaskForm from "../_components/TaskForm";

import { TaskCriteria } from "@/types/task/task.criteria";

export default function CreateTaskPage() {
  const [
    sendCreateTask,
    { isError: isCreateTaskError, isLoading: isCreateTaskLoading },
  ] = useCreateTaskMutation();

  async function sendTask(data: TaskCriteria) {
    try {
      await sendCreateTask(data);
      toast.success("Task created");
    } catch (e) {
      console.error("Error creating task:", e);
      toast.error("Error creating task");
    }
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-4 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="my-4  w-full">
        <div className="container mx-auto">
          <div className="w-full flex flex-col gap-8 row-start-2 items-center">
            <h3 className="text-lg font-medium text-white">Create task </h3>
            <div className="w-full max-w-md mt-2">
              <TaskForm
                isLoading={isCreateTaskLoading}
                isError={isCreateTaskError}
                onSubmit={sendTask}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
