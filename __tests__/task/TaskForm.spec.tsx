import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TaskForm from "@/app/tasks/_components/TaskForm";
import { Task } from "@/types/task/task.model";

describe("TaskForm", () => {
  const onSubmitMock = jest.fn();
  const setIsOpenMock = jest.fn();

  const renderComponent = (dataTask?: Task, isLoading = false) => {
    const taskFormProps = {
      dataTask,
      isLoading,
      onSubmit: onSubmitMock,
      setIsOpen: setIsOpenMock,
    };

    render(<TaskForm {...taskFormProps} />);
  };

  test("renders the form correctly with initial values", () => {
    const defaultData = {
      title: "Test Task",
      description: "Test Description",
      status: "DONE",
      userId: 1,
    };

    renderComponent(defaultData);

    expect(screen.getByLabelText(/title/i)).toHaveValue(defaultData.title);
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      defaultData.description,
    );
    expect(screen.getByRole("combobox", { value: "DONE" })).toBeInTheDocument();
  });

  test("renders the form correctly with empty values and default status when no data is provided", () => {
    renderComponent();

    expect(screen.getByLabelText(/title/i)).toHaveValue("");
    expect(screen.getByLabelText(/description/i)).toHaveValue("");
    expect(screen.getByRole("combobox", { value: "TODO" })).toBeInTheDocument();
  });

  test("submits the form with valid data and calls onSubmit function", () => {
    const newTask = {
      title: "New Task",
      description: "New Description",
      status: "PROGRESS",
      userId: 2,
    };

    renderComponent(newTask);
    screen.getByRole("form").onsubmit = onSubmitMock;

    waitFor(async () => {
      await userEvent.type(screen.getByLabelText(/Title/i), "New Task");
      userEvent.type(screen.getByLabelText(/Description/i), "New Description");
      userEvent.selectOptions(screen.getByRole("combobox"), "PROGRESS");
    });
    fireEvent.click(screen.getByText("Update"));
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
