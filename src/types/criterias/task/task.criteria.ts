import { TaskStatusEnum } from "@/types/enums/task.enum";
import { GenericEntity } from "@/types/shared/generic";

export interface TaskCriteria extends GenericEntity {
  title: string;
  description: string | null;
  status: TaskStatusEnum;
  userId?: number | null;
}
