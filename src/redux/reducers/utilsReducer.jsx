import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  topbar_toggle: false,
  callback: false,
};

const homeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.TOPBAR_TOGGLE:
      return {
        ...state,
        topbar_toggle: payload,
      };

    case GLOBALTYPES.CALLBACK:
      return {
        ...state,
        callback: payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
