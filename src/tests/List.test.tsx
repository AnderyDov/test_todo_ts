import { render, screen } from "@testing-library/react";
import List from "../components/List";
import RenderWrapperTest from "./RenderWrapperTest";

describe("List component", () => {
  test("Should be rendereded", () => {
    render(<RenderWrapperTest component={() => <List />} />);

    expect(screen.getByTestId("list")).toBeInTheDocument();
  });
});
