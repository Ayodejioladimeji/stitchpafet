import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"], // which reducer want to store
  // blacklist: ["auth"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
