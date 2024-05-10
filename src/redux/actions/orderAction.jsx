import { postDataAPIS } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "./../../utils/fetchData";

export const createdOrder =
  (data, token, setLoading, navigation, callback) => async (dispatch) => {
    try {
      setLoading(true);

      const res = await postDataAPIS("/order/vendor/main", data, token);
      // console.log(res.data.message);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });
      dispatch({ type: GLOBALTYPES.ORDER_ID, payload: res.data.order_id });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoading(false);
        navigation.next();
      }, 5000);
      // ===========================
    } catch (error) {
      // console.log(error.response.data.error);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.error,
        },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoading(false);
      }, 3000);
    }
  };

// my orders
export const myOrders = (data, token, setLoading) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await getDataAPI("/order/", data, token);
    // console.log(res.data);

    dispatch({ type: GLOBALTYPES.GET_ORDERS, payload: res.data });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    // ===========================
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      setLoading(false);
    }, 6000);
  }
};

// my orders details
export const orderDetails = (_id, token, setOrderData) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await getDataAPI(`/order/${_id}`, token);
    // console.log(res.data);
    setOrderData(res.data);
    dispatch({ type: GLOBALTYPES.ORDER_DETAILS, payload: res.data });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    // ===========================
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 6000);
  }
};

// pay from wallet
export const payfromwallet =
  (data, token, setLoad, walletCallback) => async (dispatch) => {
    try {
      setLoad(true);

      const res = await postDataAPIS("/payment/payfromwallet", data, token);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.WALLET_CALLBACK,
          payload: !walletCallback,
        });
        // dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoad(false);
        window.location.href = "/dashboard/my-orders";
      }, 5000);
      // ===========================
    } catch (error) {
      // console.log(error.response.data.error);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.error,
        },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoad(false);
      }, 6000);
    }
  };

// Delivered Order (vendor)
export const deliveredOrder = (data, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPIS("/order/update/vendor", data, token);
    // console.log(res.data.message);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });

    dispatch({ type: GLOBALTYPES.CONFIRM_MODAL, payload: false });
    dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 5000);
    // ===========================
  } catch (error) {
    console.log(error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 3000);
  }
};

// Reject Order (vendor)
export const rejectOrder = (data, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPIS("/order/update/vendor", data, token);
    // console.log(res.data.message);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });

    dispatch({ type: GLOBALTYPES.REJECT_MODAL, payload: false });
    dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 5000);
    // ===========================
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: GLOBALTYPES.ALERT,
    //   payload: {
    //     error: error.response.data.error,
    //   },
    // });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 3000);
  }
};

// Confirm Order (user)
export const confirmDelivery = (data, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPIS("/order/update/user", data, token);
    // console.log(res.data.message);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });

    dispatch({ type: GLOBALTYPES.CONFIRM_DELIVERY_MODAL, payload: false });
    dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 3000);
    // ===========================
  } catch (error) {
    console.log(error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 3000);
  }
};

// Dispute Order (vendor)
export const raiseDispute = (data, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPIS("/order/update/user", data, token);
    // console.log(res.data.message);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });
    dispatch({ type: GLOBALTYPES.DISPUTE_MODAL, payload: false });
    dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.CONFIRM_MODAL, payload: false });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 5000);
    // ===========================
  } catch (error) {
    console.log(error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }, 3000);
  }
};
