"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { useGetTasksQuery } from "@/services/task.service";
import useFilterTaskByStatus from "@/hooks/useFilterTaskByStatus";

import TaskCard from "./TaskCard";

import { TaskStatusEnum } from "@/types/enums/task.enum";
import AlertDialog from "../generic/AlertDialog";
import { Task } from "@/types/models/task/task.model";
import { useState } from "react";

type Props = {
  onSubmitDelete: (task?: Task) => void;
  onEdit: (task: Task) => void;
};

const TasksTabList = ({ onSubmitDelete, onEdit }: Props) => {
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const [temporalTask, setTemporalTask] = useState<Task>();
  const { data, isFetching } = useGetTasksQuery();

  const taskInTodo = useFilterTaskByStatus(data, TaskStatusEnum.TODO);
  const taskInProgress = useFilterTaskByStatus(data, TaskStatusEnum.PROGRESS);
  const taskDone = useFilterTaskByStatus(data, TaskStatusEnum.DONE);

  function openDialogAlert(data: Task) {
    setTemporalTask(data);
    setIsOpenAlertDialog(true);
  }

  return (
    <div className="w-full">
      <TabGroup>
        <TabList className="flex gap-4 justify-between w-full bg-black dark:bg-white/5 rounded-full p-1">
          <Tab className="flex justify-center w-full rounded-full py-1 px-3 text-sm/6 font-semibold text-white data-[selected]:border border-white dark:border-0 focus:outline-none data-[selected]:bg-white data-[selected]:text-black data-[selected]:bg-white/10 data-[hover]:bg-white/20 data-[selected]:data-[hover]:bg-white/70  data-[focus]:outline-1 data-[focus]:outline-white">
            To Do
          </Tab>
          <Tab className="flex justify-center w-full rounded-full py-1 px-3 text-sm/6 font-semibold text-white data-[selected]:border border-white dark:border-0 focus:outline-none data-[selected]:bg-white data-[selected]:text-black data-[selected]:bg-white/10 data-[hover]:bg-white/20 data-[selected]:data-[hover]:bg-white/70  data-[focus]:outline-1 data-[focus]:outline-white">
            Progress
          </Tab>
          <Tab className="flex justify-center w-full rounded-full py-1 px-3 text-sm/6 font-semibold text-white data-[selected]:border border-white dark:border-0 focus:outline-none data-[selected]:bg-white data-[selected]:text-black data-[selected]:bg-white/10 data-[hover]:bg-white/20 data-[selected]:data-[hover]:bg-white/70  data-[focus]:outline-1 data-[focus]:outline-white">
            Completed
          </Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel className="rounded-xl bg-white/5 sm:p-3">
            <ul>
              {taskInTodo &&
                taskInTodo.map((task) => (
                  <li key={task.id} className="relative ">
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={openDialogAlert}
                    />
                  </li>
                ))}
            </ul>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 sm:p-3">
            <ul>
              {taskInProgress &&
                taskInProgress.map((task) => (
                  <li key={task.id} className="relative">
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={openDialogAlert}
                    />
                  </li>
                ))}
            </ul>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 sm:p-3">
            <ul>
              {taskDone &&
                taskDone.map((task) => (
                  <li key={task.id} className="relative">
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={openDialogAlert}
                    />
                  </li>
                ))}
            </ul>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {isFetching && (
        <div role="status" className="w-full flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600 dark:fill-blue-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div className="w-full text-center ">
        {!data && (
          <div className="relative  p-3 text-sm/6 transition  ">
            <p>No data available</p>
          </div>
        )}
      </div>
      <AlertDialog
        isOpen={isOpenAlertDialog}
        setIsOpen={setIsOpenAlertDialog}
        onIsOk={() => onSubmitDelete(temporalTask)}
      />
    </div>
  );
};

export default TasksTabList;
