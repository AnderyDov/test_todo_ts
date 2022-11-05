import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleTheme from "../components/ToggleTheme";
import RenderWrapperTest from "./RenderWrapperTest";

describe("ToggleTheme component", () => {
  test("Should be rendereded", async () => {
    render(<RenderWrapperTest component={() => <ToggleTheme />} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();

    await userEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});
