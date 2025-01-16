import { UserI } from "./user.model";

export type AuthToken = {
  accessToken: string;
  user: UserI;
};
