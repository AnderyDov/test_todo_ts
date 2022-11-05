import store from '../store/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RenderWrapperTest({ component }: any) {
  const out = component && <Provider store={store}>{component()}</Provider>;

  return out;
}
