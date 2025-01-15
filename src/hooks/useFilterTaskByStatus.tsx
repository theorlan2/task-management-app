import { TaskStatusEnum } from "@/types/enums/task.enum";
import { Task } from "@/types/models/task/task.model";
import { useEffect, useState } from "react";

const useFilterTaskByStatus = (
  tasks: Task[] | undefined,
  status: TaskStatusEnum,
) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([] as Task[]);

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const filteredTasks = tasks.filter((task) => task.status === status);
      setFilteredTasks(filteredTasks);
    }
  }, [tasks, status]);

  return filteredTasks;
};

export default useFilterTaskByStatus;
