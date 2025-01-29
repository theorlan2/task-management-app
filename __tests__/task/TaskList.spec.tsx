import React, { useId } from "react";

import { renderWithProviders } from "@/test/test-utils";

import TasksTabList from "@/app/tasks/_components/TasksTabList";

describe("TasksTabList", () => {
  const tasks = [
    { id: 1, title: "To Do", status: "TODO", userId: 1 },
    { id: 2, title: "Progress", status: "PROGRESS", userId: 1 },
    { id: 3, title: "Completed", status: "DONE", userId: 1 },
  ];
  const onEdit = jest.fn();
  const onSubmitDelete = jest.fn();

  it("renders the TabGroup correctly", () => {
    const { getByText } = renderWithProviders(
      <TasksTabList onSubmitDelete={onSubmitDelete} onEdit={onEdit} />,
    );

    tasks.forEach((task) => {
      const tab = getByText(task.title);
      expect(tab).toBeInTheDocument();
    });
  });
});
