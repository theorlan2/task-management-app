import { TaskStatusEnum } from "@/types/enums/task.enum";

export interface TaskCriteria {
  id?: number;
  title: string;
  description: string | null;
  status: TaskStatusEnum;
  userId?: number | null;
}
