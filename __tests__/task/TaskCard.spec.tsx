import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import TaskCard from "@/app/tasks/_components/TaskCard";
import { Task } from "@/types/task/task.model";

describe("TasksCard", () => {
  const tasks = [
    { id: "1", title: "To Do", status: "TODO", userId: 1 },
    { id: "2", title: "Progress", status: "PROGRESS", userId: 1 },
    { id: "3", title: "Completed", status: "DONE", userId: 1 },
  ] as Task[];
  const onDelete = jest.fn();

  it("renders TaskCard correctly", () => {
    const { getByText } = render(
      <>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </>,
    );

    tasks.forEach((task) => {
      const taskCard = getByText(task.title);
      expect(taskCard).toBeInTheDocument();
    });
  });
  it("Click on button delete in TaskCard", () => {
    const { getByText } = render(
      <TaskCard task={tasks[0]} onDelete={onDelete} />,
    );
    fireEvent.click(getByText("Edit"));
    waitFor(() => {
      expect(onDelete).toHaveBeenCalledTimes(1);
    });
  });
});
