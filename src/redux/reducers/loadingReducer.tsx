import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {};

const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.LOADING:
      return payload;

    default:
      return state;
  }
};

export default loadingReducer;
