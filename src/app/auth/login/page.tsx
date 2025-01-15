"use client";
import React from "react";
//

import { LoginCriteria } from "@/types/criterias/auth/login.criteria";
import LoginForm from "@/app/components/auth/login/LoginForm";

import { useAuth } from "@/context/AuthContexts";
import { useCookies } from "@/hooks/useCookie";
import { useLoginUserMutation } from "@/services/auth.service";

const LoginPage = () => {
  const { setAuthData, setUserData } = useAuth();
  const { setTheCookie } = useCookies();
  const [sendLoginUser, { isError, isLoading }] = useLoginUserMutation();

  async function onSubmitLogin(data: LoginCriteria) {
    try {
      const response = await sendLoginUser(data).unwrap();
      setTheCookie("accessToken", response.token);
      setAuthData({ token: response.token });
      if (response.user) {
        setUserData(response.user);
      }
    } catch (error) {
      console.error("Error login:", error);
    }
  }

  return (
    <div className="card-login bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg px-4 py-6 w-80">
      <h4 className="text-center font-bold  text-xl text-gray-600 dark:text-white mt-6 mb-4">
        LOGIN
      </h4>
      <LoginForm
        onSubmit={onSubmitLogin}
        isLoading={isLoading}
        haveError={isError}
      />
    </div>
  );
};

export default LoginPage;
