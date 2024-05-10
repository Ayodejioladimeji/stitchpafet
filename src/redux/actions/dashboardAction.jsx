import { GLOBALTYPES } from './globalTypes';

export const added_Product = (data) => (dispatch) => {
  dispatch({ type: GLOBALTYPES.ADDED_PRODUCT, payload: data });
};

export const remove_product = (data) => (dispatch) => {
  dispatch({ type: GLOBALTYPES.REMOVE_PRODUCT, payload: data });
};

export const edit_product = (data) => (dispatch) => {
  dispatch({ type: GLOBALTYPES.EDIT_PRODUCT, payload: data });
};
