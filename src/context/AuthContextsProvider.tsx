"use client";
import { FunctionComponent, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

//
import { useRouter } from "next/navigation";
//
import {
  clearAuth,
  saveAuth,
  saveUserData,
  setIsLogged,
} from "@/lib/features/auth/auth.slice";

import { useCookies } from "@/hooks/useCookie";

import { RootState } from "@/lib/store";

import { UserI } from "@/types/models/user/user.model";
import { AuthToken } from "@/types/models/user/auth.model";
import { AuthContext } from "./AuthContexts";

type Props = {
  children: ReactElement;
};

export const AuthProvider: FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const { getCookie, setTheCookie, deleteCookie } = useCookies();
  const userData = useSelector((state: RootState) => state.auth.dataUser);
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const token = getCookie("accessToken");
  const dispatch = useDispatch();

  function setAuthData(data: AuthToken) {
    setTheCookie("accessToken", data.accessToken);
    dispatch(saveAuth(data));
    dispatch(setIsLogged(true));
  }

  function setUserData(data: UserI) {
    dispatch(saveUserData(data));
  }

  function logout() {
    dispatch(clearAuth());
    deleteCookie("accessToken");
    router.push("/auth/signin");
    // window.localStorage.removeItem("persist:tasksApp");
    // window.localStorage.setItem("persist:tasksApp", "");
  }

  const defaultAuthData = {
    isLogged,
    userData,
    token,
    logout,
    setAuthData: (data: AuthToken) => setAuthData(data),
    setUserData: (data: UserI) => setUserData(data),
  };

  return (
    <AuthContext.Provider value={defaultAuthData}>
      {props.children}
    </AuthContext.Provider>
  );
};
