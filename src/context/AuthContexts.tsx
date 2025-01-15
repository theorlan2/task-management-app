"use client";
import { createContext, useContext } from "react";

import { AuthToken } from "@/types/models/user/auth.model";
import { UserI } from "@/types/models/user/user.model";

type AuthContextsType = {
  isLogged: boolean;
  token: string;
  userData: UserI;
  setUserData: (value: UserI) => void;
  setAuthData: (value: AuthToken) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextsType);

export const useAuth = () => useContext(AuthContext);
