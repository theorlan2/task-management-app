"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import TaskForm from "./TaskForm";

import { Task } from "@/types/task/task.model";

type Props = {
  isOpen: boolean;
  dataTask?: Task;
  isLoading: boolean;
  isError?: boolean;
  setIsOpen: (v: boolean) => void;
  onSubmit?: (v: Partial<Task>) => void;
};

const CreateOrUpdateTaskDialog = ({
  isOpen,
  setIsOpen,
  onSubmit,
  dataTask,
  isLoading,
  isError,
}: Props) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center bg-black/50 p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white dark:bg-gray-700 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-medium text-white">
                {dataTask ? ` Update task` : `Create a new task`}
              </DialogTitle>

              <div className="mt-2">
                <TaskForm
                  dataTask={dataTask}
                  isLoading={isLoading}
                  isError={isError}
                  onSubmit={onSubmit}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateOrUpdateTaskDialog;
