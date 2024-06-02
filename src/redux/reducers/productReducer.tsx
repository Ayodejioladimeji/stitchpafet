import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  cartcallback: false,
  productcart: [],
  datacart: [],
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {


    case GLOBALTYPES.SEARCH:
      return {
        ...state,
        search: payload,
      };

    case GLOBALTYPES.CARTCALLBACK:
      return {
        ...state,
        cartcallback: payload,
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

    case GLOBALTYPES.UPDATE_DATA_CART:
      return {
        ...state,
        datacart: [...state.datacart],
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

    default:
      return state;
  }
};

export default productReducer;
