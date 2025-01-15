import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LoginCriteria } from "@/types/criterias/auth/login.criteria";

import { AuthToken } from "@/types/models/user/auth.model";

import { getCookie } from "@/lib/jsCookies";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = getCookie("accessToken");
      headers.append("content-type", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: ["login"],
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthToken, LoginCriteria>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
