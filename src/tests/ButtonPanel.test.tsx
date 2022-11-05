import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonsPanel from "../components/ButtonsPanel";
import RenderWrapperTest from "./RenderWrapperTest";

describe("ButtonsPanel component", () => {
  test("Should be rendereded", () => {
    render(<RenderWrapperTest component={() => <ButtonsPanel />} />);
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });

  test("Should be change checheck on radio buttons group", async () => {
    render(<RenderWrapperTest component={() => <ButtonsPanel />} />);
    await userEvent.click(screen.queryByDisplayValue("All"));
    expect(screen.queryByDisplayValue("All")).toBeChecked();
    await userEvent.click(screen.queryByDisplayValue("Active"));
    expect(screen.queryByDisplayValue("Active")).toBeChecked();
    await userEvent.click(screen.queryByDisplayValue("Completed"));
    expect(screen.queryByDisplayValue("Completed")).toBeChecked();
  });
});
