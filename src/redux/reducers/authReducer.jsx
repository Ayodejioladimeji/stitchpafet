import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  auth_state: {},
  token: null,
  user: {},
  order_id: "",
  redirect_route: null,
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

    default:
      return state;
  }
};

export default authReducer;
