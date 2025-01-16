import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";

import Home from "@/app/page";

describe("Home - tasks", () => {
  it("Load the data from the server", () => {
    const { queryByText } = renderWithProviders(<Home />);

    const task = queryByText("New Task");
    waitFor(() => {
      expect(task).not.toBeNull();
    });
  });

  it("opens CreateOrUpdateTaskDialog when the add task button is clicked", () => {
    const { getByText, queryByText } = renderWithProviders(<Home />);

    // Simulate a click event on the Add Task button.
    const addTaskButton = getByText("Add task");
    fireEvent.click(addTaskButton);

    // Check if CreateOrUpdateTaskDialog is rendered.
    const dialogTitle = queryByText("Create a new task");
    waitFor(() => {
      expect(dialogTitle).not.toBeNull();
    });
  });
});
