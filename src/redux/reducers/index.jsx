import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import home from "./homeReducer";
import dashboard from "./dashboardReducer";
import wallet from "./walletReducer";
import order from "./orderReducer";
import product from "./productReducer";
import other from "./otheralertReducer";

// =================
export default combineReducers({
  auth,
  home,
  dashboard,
  alert,
  wallet,
  order,
  product,
  other,
});
