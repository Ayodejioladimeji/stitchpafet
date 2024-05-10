import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  auth_state: {},
  token: {},
  user: {},
  order_id: "",
  redirect_route: "",
  productcart: [],
  datacart: [],
  cart: [],
  cat: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.AUTH:
      return {
        ...state,
        auth_state: payload,
      };

    case GLOBALTYPES.TOKEN:
      return {
        ...state,
        token: payload,
      };

    case GLOBALTYPES.ORDER_ID:
      return {
        ...state,
        order_id: payload,
      };

    case GLOBALTYPES.GET_USER:
      return {
        ...state,
        user: payload,
      };
    case GLOBALTYPES.REDIRECT_ROUTE:
      return {
        ...state,
        redirect_route: payload,
      };

    case GLOBALTYPES.PRODUCT_CART:
      return {
        ...state,
        productcart: [payload, ...state.productcart],
      };
    case GLOBALTYPES.UPDATE_PRODUCT_CART:
      return {
        ...state,
        productcart: [...state.productcart],
      };
    case GLOBALTYPES.DELETE_PRODUCT_CART:
      return {
        ...state,
        productcart: payload,
      };
    case GLOBALTYPES.DATA_CART:
      return {
        ...state,
        datacart: [payload, ...state.datacart],
      };

    case GLOBALTYPES.DELETE_DATA_CART:
      return {
        ...state,
        datacart: payload,
      };
    case GLOBALTYPES.CART:
      return {
        ...state,
        cart: payload,
      };
    case GLOBALTYPES.CAT:
      return {
        ...state,
        cat: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
