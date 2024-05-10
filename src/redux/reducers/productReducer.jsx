import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  product_modal: false,
  get_categories: [],
  get_sub_categories: [],
  all_product: [],
  vendor_product: [],
  search: [],
  cartcallback: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.CREATE_PRODUCT_MODAL:
      return {
        ...state,
        product_modal: payload,
      };

    case GLOBALTYPES.GET_CATEGORIES:
      return {
        ...state,
        get_categories: payload,
      };

    case GLOBALTYPES.SUB_CATEGORIES:
      return {
        ...state,
        get_sub_categories: payload,
      };

    case GLOBALTYPES.ALL_PRODUCT:
      return {
        ...state,
        all_product: payload,
      };
    case GLOBALTYPES.VENDOR_PRODUCT:
      return {
        ...state,
        vendor_product: payload,
      };

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

    default:
      return state;
  }
};

export default productReducer;
