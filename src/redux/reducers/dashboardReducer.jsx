import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {
  add_beneficiary_modal: false,
  receive_modal: false,
  withdraw_modal: false,
  send_modal: false,
  topup_modal: false,
  add_product_modal: false,
  added_products: [],
  isEdit: false,
  callback: false,
  resetpassword_modal: false,
  confirm_modal: false,
  confirm_delivery_modal: false,
  reject_modal: false,
  dispute_modal: false,
  show_balance: false,
  delete_account_modal: false,
  delete_product_modal: false,
  camera: '',
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.ADD_BENEFICIARY_MODAL:
      return {
        ...state,
        add_beneficiary_modal: payload,
      };

    case GLOBALTYPES.RECEIVE_MODAL:
      return {
        ...state,
        receive_modal: payload,
      };

    case GLOBALTYPES.WITHDRAW_MODAL:
      return {
        ...state,
        withdraw_modal: payload,
      };

    case GLOBALTYPES.SEND_MODAL:
      return {
        ...state,
        send_modal: payload,
      };

    case GLOBALTYPES.TOPUP_MODAL:
      return {
        ...state,
        topup_modal: payload,
      };

    case GLOBALTYPES.ADD_PRODUCT_MODAL:
      return {
        ...state,
        add_product_modal: payload,
      };

    case GLOBALTYPES.ADDED_PRODUCT:
      return {
        ...state,
        added_products: [payload, ...state.added_products],
      };

    case GLOBALTYPES.REMOVE_PRODUCT:
      return {
        ...state,
        added_products: payload,
      };

    case GLOBALTYPES.EDIT_PRODUCT:
      return {
        ...state,
        added_products: payload,
      };

    case GLOBALTYPES.IS_EDIT:
      return {
        ...state,
        isEdit: payload,
      };
    case GLOBALTYPES.CALLBACK:
      return {
        ...state,
        callback: payload,
      };

    case GLOBALTYPES.RESETPASSWORD_MODAL:
      return {
        ...state,
        resetpassword_modal: payload,
      };

    case GLOBALTYPES.CONFIRM_MODAL:
      return {
        ...state,
        confirm_modal: payload,
      };

    case GLOBALTYPES.CONFIRM_DELIVERY_MODAL:
      return {
        ...state,
        confirm_delivery_modal: payload,
      };

    case GLOBALTYPES.REJECT_MODAL:
      return {
        ...state,
        reject_modal: payload,
      };

    case GLOBALTYPES.DELETE_ACCOUNT_MODAL:
      return {
        ...state,
        delete_account_modal: payload,
      };

    case GLOBALTYPES.DELETE_PRODUCT_MODAL:
      return {
        ...state,
        delete_product_modal: payload,
      };

    case GLOBALTYPES.DISPUTE_MODAL:
      return {
        ...state,
        dispute_modal: payload,
      };
    case GLOBALTYPES.SHOW_BALANCE:
      return {
        ...state,
        show_balance: payload,
      };

    case GLOBALTYPES.CAMERA:
      return {
        ...state,
        camera: payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
