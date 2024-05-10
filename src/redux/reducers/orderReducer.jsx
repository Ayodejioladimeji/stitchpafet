import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  createdOrder: [],
  my_orders: [],
  order_details: {},
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.CREATED_ORDER:
      return {
        ...state,
        createdOrder: payload,
      };
    case GLOBALTYPES.GET_ORDERS:
      return {
        ...state,
        my_orders: payload,
      };
    case GLOBALTYPES.ORDER_DETAILS:
      return {
        ...state,
        order_details: payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
