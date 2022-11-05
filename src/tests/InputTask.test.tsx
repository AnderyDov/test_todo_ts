import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputTask from "../components/InputTask";
import RenderWrapperTest from "./RenderWrapperTest";

describe("InputTask component", () => {
  test("Should be rendereded", () => {
    render(<RenderWrapperTest component={() => <InputTask />} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("Should be rendereded", async () => {
    render(<RenderWrapperTest component={() => <InputTask />} />);

    expect(screen.queryByDisplayValue("test")).toBeNull();
    await userEvent.type(screen.getByRole("textbox"), "test");
    expect(screen.queryByDisplayValue(/test/)).toBeInTheDocument();
  });
});
