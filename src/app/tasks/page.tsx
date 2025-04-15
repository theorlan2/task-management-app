"use client";
import { useState } from "react";
import { toast } from "sonner";

import Link from "next/link";

import { useDeleteTaskMutation } from "@/services/task.service";

import { Task } from "@/types/task/task.model";

import AlertDialog from "@/app/components/generic/AlertDialog";
import TasksTabList from "./_components/TasksTabList";

export default function Home() {
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const [temporalTask, setTemporalTask] = useState<Task>();

  const [sendDeleteTask] = useDeleteTaskMutation();

  async function deleteTask(data?: Task) {
    if (data && data.id) {
      try {
        toast.promise(sendDeleteTask(data.id), {
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
  function openDialogAlert(data: Task) {
    setTemporalTask(data);
    setIsOpenAlertDialog(true);
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-4 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="my-4  w-full">
        <div className="container mx-auto">
          <section className="w-full flex flex-col gap-8 row-start-2 items-center">
            <div className="w-full  max-w-xl">
              <h3 className="text-xl mb-2">Tasks </h3>
              <div className="border border-gray-200 dark:border-white/35 rounded-lg p-2 sm:p-4">
                <TasksTabList onSubmitDelete={openDialogAlert} />
              </div>
            </div>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                href={"/tasks/create"}
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Add task
                <i className="ri-add-line"></i>
              </Link>
            </div>
          </section>
        </div>
        <AlertDialog
          isOpen={isOpenAlertDialog}
          setIsOpen={setIsOpenAlertDialog}
          onIsOk={() => deleteTask(temporalTask)}
        />
      </main>
    </div>
  );
}
