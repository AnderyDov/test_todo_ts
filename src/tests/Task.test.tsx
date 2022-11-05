import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Task from "../components/Task";
import RenderWrapperTest from "./RenderWrapperTest";
import store from "../store/store";

describe("Task component", () => {
  const renderComponent = () =>
    render(
      <RenderWrapperTest
        component={() => (
          <Task id={"11"} text={"target text"} status={false} filter={"all"} />
        )}
      />
    );
  test("Should be rendereded", () => {
    renderComponent();
    expect(screen.getByText("target text")).toBeInTheDocument();
  });

  test("Click to span for add input, call function startChangeTaskText", async () => {
    renderComponent();
    expect(screen.queryByDisplayValue("target text")).toBeNull();
    await userEvent.click(screen.getByText("target text"));
    expect(screen.queryByDisplayValue("target text")).toBeInTheDocument();
  });

  test("Click to button del delete input, call function saveTex", async () => {
    renderComponent();
    expect(screen.getByText("target text")).toBeInTheDocument();
    await userEvent.click(screen.getByText("target text"));
    expect(screen.queryByDisplayValue("target text")).toBeInTheDocument();
    await userEvent.click(screen.getByText("del"));
    expect(screen.queryByDisplayValue("target text")).toBeNull();
  });
});
