import { UserI } from "@/types/models/user/user.model";
import { AuthToken } from "@/types/models/user/auth.model";

export type AuthState = {
  isLogged: boolean;
  dataAuth: AuthToken;
  dataUser: UserI;
};
