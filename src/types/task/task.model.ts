import { TaskStatusEnum } from "@/types/task/task.enum";
import { GenericEntity } from "@/types/shared/generic";

export interface Task extends GenericEntity {
  userId: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
}
