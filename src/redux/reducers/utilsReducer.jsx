import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {
  topbar_toggle: false,
};

const homeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.TOPBAR_TOGGLE:
      return {
        ...state,
        topbar_toggle: payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
