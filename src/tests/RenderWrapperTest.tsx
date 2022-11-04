import store from "../store/store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

export default function RenderWrapperTest({ component }: any) {
  let out = component && <Provider store={store}>{component()}</Provider>;

  return out;
}
