import userReducer from "./userReducer";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export interface StoreState {
  user: {
    id: string;
    name: string;
    favoriteBookId: string;
    favoriteBookName: string;
  };
}

const persistConfig = {
  key: "main-root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = createStore(persistedReducer, applyMiddleware());
const persistor=persistStore(store);
export {persistor, store };
export default store;
