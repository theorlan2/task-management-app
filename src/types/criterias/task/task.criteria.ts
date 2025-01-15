import { TaskStatusEnum } from "@/types/enums/task.enum";

export interface TaskCriteria {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
}
