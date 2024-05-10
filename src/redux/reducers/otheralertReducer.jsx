import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {
  profile_alert: {},
  productcart: [],
};

const otheralertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.PROFILEALERT:
      return {
        ...state,
        profile_alert: payload,
      };

    case GLOBALTYPES.CART:
      return {
        ...state,
        productcart: [payload, ...state.productcart],
      };

    default:
      return state;
  }
};

export default otheralertReducer;
