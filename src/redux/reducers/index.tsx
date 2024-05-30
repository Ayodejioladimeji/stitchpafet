import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import utils from "./utilsReducer";
import order from "./orderReducer";
import product from "./productReducer";

// =================
export default combineReducers({
  auth,
  utils,
  alert,
  order,
  product,
});
