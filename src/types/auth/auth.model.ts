import { UserI } from "../user/user.model";

export type AuthToken = {
  accessToken: string;
  user: UserI;
};
