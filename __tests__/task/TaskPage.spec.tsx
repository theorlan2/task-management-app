import React, { ReactElement } from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";

import Home from "@/app/page";
import { expect } from "@playwright/test";

describe("Tasks Page", () => {
  it("Load the data from the server", () => {
    const { queryByText } = renderWithProviders(<Home />);

    const createTaskLink = queryByText("New Task");
    waitFor(() => {
      expect(createTaskLink).not.toBeNull();
    });
    waitFor(() => {
      fireEvent.click(createTaskLink);
    });
    waitFor(() => {
      expect(queryByText(/New Task/)).toHaveFocus();
    });
  });
});
