import { Dispatch } from 'redux';
import Store from './store';

export type CustomAction = {
  type: string;
  payload: unknown;
};

export type ComponentReduxProps = {
  dispatch: Dispatch<CustomAction>;
  state?: unknown,
  store: typeof Store
}