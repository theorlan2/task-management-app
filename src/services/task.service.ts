import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getCookie } from "@/lib/jsCookies";

import { Task } from "@/types/task/task.model";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("accessToken");
      headers.append("content-type", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({
        url: "/tasks",
      }),
      providesTags: ["tasks"],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
      }),
      providesTags: ["tasks"],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: (data) => ({
        url: `/tasks/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
