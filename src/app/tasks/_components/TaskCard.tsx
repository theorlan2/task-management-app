import { Task } from "@/types/task/task.model";
import { Button } from "@headlessui/react";
import Link from "next/link";

type Props = {
  task: Task;
  onDelete: (task: Task) => void;
};

const TaskCard = ({ task, onDelete }: Props) => {
  return (
    <div className="relative rounded-md p-3 text-sm/6 transition border border-gray-200 hover:bg-gray-400/20 dark:hover:bg-white/10 my-2">
      <p className="font-semibold text-lg text-black dark:text-white">
        {task.title}
      </p>
      <div className="w-full border-b border-gray-100 my-2"></div>
      <span className="text-xs text-gray-500 dark:text-white ">
        Description:
      </span>
      <p className="text-sm opacity-70">{task.description}</p>

      <div className="flex mt-2 sm:justify-end gap-2">
        <Link
          href={`/tasks/update/${task.id}`}
          className="rounded-full w-full sm:w-auto border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-10 px-2 sm:px-3"
        >
          Edit
          <i className="ri-pencil-line"></i>
        </Link>

        <Button
          onClick={() => onDelete(task)}
          className="rounded-full w-full sm:w-auto border border-solid border-transparent transition-colors flex items-center justify-center bg-red-400 text-background gap-2 hover:bg-red-500 dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-10 px-2 sm:px-3"
        >
          Delete
          <i className="ri-delete-bin-line"></i>
        </Button>
      </div>
    </div>
  );
};
export default TaskCard;
