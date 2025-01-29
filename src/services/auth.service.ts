import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getCookie } from "@/lib/jsCookies";

import { SigningCriteria } from "@/types/auth/signing.criteria";
import { AuthToken } from "@/types/auth/auth.model";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("accessToken");
      headers.append("content-type", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: [""],
  endpoints: (builder) => ({
    signinUser: builder.mutation<AuthToken, SigningCriteria>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSigninUserMutation } = authApi;
