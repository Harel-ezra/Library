import userNameReducer from './userNameReducer';
import { createStore } from 'redux';

export interface StoreState {
  id: string | null;
  name: string;
}

const store = createStore(userNameReducer);
export { store };
export default store;
