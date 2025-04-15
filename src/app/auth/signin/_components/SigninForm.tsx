import React, { FunctionComponent } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Field, Label } from "@headlessui/react";

import { Signing } from "@/types/auth/auth.model";

import InputField from "@/app/components/form/InputField";

type Props = {
  isLoading: boolean;
  haveError: boolean;
  errorMessage?: FetchBaseQueryError | SerializedError | undefined;
  onSubmit: (dataForm: Signing) => void;
};

const signinSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SigninForm: FunctionComponent<Props> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Signing>({
    resolver: yupResolver(signinSchema),
  });

  function submit(data: Signing) {
    props.onSubmit(data);
  }

  return (
    <section className=" login-form w-full">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <Field>
          <Label
            htmlFor="input-email"
            className="text-sm/6 font-medium text-primary-black"
          >
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="input-email"
                disabled={props.isLoading}
                placeholder="email@example.com"
                role="input"
                className={
                  "mt-1 block w-full rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                }
                error={errors.email}
              />
            )}
          />
        </Field>

        <Field>
          <Label
            htmlFor="input-password"
            className="text-sm/6 font-medium text-primary-black"
          >
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="input-email"
                disabled={props.isLoading}
                placeholder="Password"
                role="input"
                type="password"
                className={
                  "mt-1 block w-full rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                }
                error={errors.password}
              />
            )}
          />
        </Field>

        <button
          disabled={props.isLoading}
          className="p-2 bg-primary-blue dark:bg-primary-dark text-white font-bold uppercase rounded-lg mx-0 mt-3"
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
    </section>
  );
};

export default SigninForm;
