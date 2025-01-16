"use client";
import React from "react";
//
import { useRouter } from "next/navigation";

import { LoginCriteria } from "@/types/criterias/auth/login.criteria";
import LoginForm from "@/app/components/auth/login/LoginForm";

import { useAuth } from "@/context/AuthContexts";
import { useCookies } from "@/hooks/useCookie";
import { useLoginUserMutation } from "@/services/auth.service";

const LoginPage = () => {
  const router = useRouter();
  const { setAuthData, setUserData } = useAuth();
  const { setTheCookie } = useCookies();
  const [sendLoginUser, { isError, error, isLoading }] = useLoginUserMutation();

  async function onSubmitLogin(data: LoginCriteria) {
    try {
      const response = await sendLoginUser(data).unwrap();
      setTheCookie("accessToken", response.accessToken);
      setAuthData(response);
      if (response.user) {
        setUserData(response.user);
      }
      router.push("/");
    } catch (error) {
      console.error("Error login:", error);
    }
  }

  console.log("isError", error);
  return (
    <div className="card-login w-full max-w-md bg-white border border-gray-200 dark:bg-gray-800 dark:text-gray-100 shadow-lg px-4 py-6 ">
      <h4 className="text-center font-bold  text-xl text-gray-600 dark:text-white mt-6 mb-4">
        LOGIN
      </h4>
      <LoginForm
        onSubmit={onSubmitLogin}
        isLoading={isLoading}
        haveError={isError}
        errorMessage={error}
      />
    </div>
  );
};

export default LoginPage;
