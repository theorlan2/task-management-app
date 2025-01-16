import React, { FunctionComponent } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LoginCriteria } from "@/types/criterias/auth/login.criteria";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type Props = {
  isLoading: boolean;
  haveError: boolean;
  errorMessage?: FetchBaseQueryError | SerializedError | undefined;
  onSubmit: (dataForm: LoginCriteria) => void;
};

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm: FunctionComponent<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCriteria>({
    resolver: yupResolver(loginSchema),
  });

  function submit(data: LoginCriteria) {
    props.onSubmit(data);
  }

  return (
    <div className=" login-form w-full">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col">
        <input
          className="p-2 mt-2 mb-1 w-full border-2 rounded-sm border-zinc-500 text-black dark:border-gray-700"
          placeholder="email@example.com"
          id="inputEmail"
          {...register("email")}
        />
        {errors.email && (
          <span id={"errorInputEmail"} className="text-xs text-red-400 ">
            {errors.email.message}
          </span>
        )}

        <input
          className="p-2 mt-2 mb-1 w-full border-2 rounded-sm border-zinc-500 text-black dark:border-gray-700"
          placeholder="Password"
          type="password"
          id={"inputPassword"}
          {...register("password")}
        />
        {errors.password && (
          <span id={"errorInputPassword"} className="text-xs text-red-400 ">
            {errors.password.message}
          </span>
        )}

        <button
          disabled={props.isLoading}
          className="p-2 bg-primary-blue dark:bg-primary-dark text-white font-bold uppercase rounded-sm mx-0 mt-3"
          type="submit"
        >
          Enter
        </button>

        {props.haveError && (
          <div className="mt-2 p-2 bg-red-300 ">
            <p className=" text-black text-xs ">{props.errorMessage?.data}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
