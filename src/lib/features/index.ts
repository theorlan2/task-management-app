import { combineReducers } from "@reduxjs/toolkit";
//
import { authApi } from "@/services/auth.service";

import tasks from "./tasks/tasks.slice";
import auth from "./auth/auth.slice";
import { tasksApi } from "@/services/task.service";

export default combineReducers({
  auth,
  tasks,
  [authApi.reducerPath]: authApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
});
