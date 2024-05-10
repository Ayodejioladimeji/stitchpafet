import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  wallet: {},
  pay: {},
  walletBalance: "",
  userTransaction: [],
  walletCallback: false,
  banks: [],
  beneficiaries: [],
};

const walletReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.FUND_WALLET:
      return {
        ...state,
        wallet: payload,
      };

    case GLOBALTYPES.PAY_WALLET:
      return {
        ...state,
        pay: payload,
      };

    case GLOBALTYPES.GET_WALLET_BALANCE:
      return {
        ...state,
        walletBalance: payload,
      };

    case GLOBALTYPES.GET_USER_TRANSACTION:
      return {
        ...state,
        userTransaction: payload,
      };

    case GLOBALTYPES.WALLET_CALLBACK:
      return {
        ...state,
        walletCallback: payload,
      };

    case GLOBALTYPES.GET_BANKS:
      return {
        ...state,
        banks: payload,
      };

    case GLOBALTYPES.BENEFICIARIES:
      return {
        ...state,
        beneficiaries: payload,
      };

    default:
      return state;
  }
};

export default walletReducer;
