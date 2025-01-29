"use client";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/services/task.service";

import TaskForm from "../../_components/TaskForm";

import { TaskCriteria } from "@/types/task/task.criteria";

export default function UpdateTaskPage() {
  const { id } = useParams();
  const { data: taskToEdit } = useGetTaskByIdQuery(String(id));

  const [
    sendUpdateTask,
    { isError: isUpdateTaskError, isLoading: isUpdateTaskLoading },
  ] = useUpdateTaskMutation();

  async function sendTask(data: TaskCriteria) {
    if (data.id) {
      try {
        await sendUpdateTask(data);
        toast.success("Task updated");
      } catch (e) {
        console.error("Error updating task:", e);
        toast.error("Error updating task");
      }
    }
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-4 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="my-4  w-full">
        <div className="container mx-auto">
          <div className="w-full flex flex-col gap-8 row-start-2 items-center">
            <h3 className="text-lg font-medium text-white">Update task </h3>
            <div className="mt-2 w-full max-w-md">
              <TaskForm
                dataTask={taskToEdit}
                isLoading={isUpdateTaskLoading}
                isError={isUpdateTaskError}
                onSubmit={sendTask}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
