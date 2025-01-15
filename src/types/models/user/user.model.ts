import { GenericEntity } from "@/types/shared/generic";

export interface UserI extends GenericEntity {
  name: string;
  email: string;
}
