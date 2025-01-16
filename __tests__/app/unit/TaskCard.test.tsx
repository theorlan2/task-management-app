import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import TaskCard from "@/app/components/tasks/TaskCard";
import { Task } from "@/types/models/task/task.model";

describe("TasksCard", () => {
  const tasks = [
    { id: 1, title: "To Do", status: "TODO", userId: 1 },
    { id: 2, title: "Progress", status: "PROGRESS", userId: 1 },
    { id: 3, title: "Completed", status: "DONE", userId: 1 },
  ] as Task[];
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  it("renders TaskCard correctly", () => {
    const { getByText } = render(
      <>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </>,
    );

    tasks.forEach((task) => {
      const taskCard = getByText(task.title);
      expect(taskCard).toBeInTheDocument();
    });
  });
  it("Click on button edit in TaskCard", () => {
    const { getByText } = render(
      <TaskCard task={tasks[0]} onEdit={onEdit} onDelete={onDelete} />,
    );
    fireEvent.click(getByText("Edit"));
    waitFor(() => {
      expect(onEdit).toHaveBeenCalledTimes(1);
    });
  });
});
