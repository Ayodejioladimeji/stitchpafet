import { GLOBALTYPES } from "./globalTypes";
import {
  getDataAPI,
  postDataAPI,
  patchDataAPI,
  postImageAPIS,
  postDataAPIS,
} from "./../../utils/fetchData";

export const resetpasswordModal = (data) => (dispatch) => {
  dispatch({ type: GLOBALTYPES.RESETPASSWORD_MODAL, payload: data });
};

// THE AUTHENTICATION SECTION

export const register = (data) => async (dispatch) => {
  const { email } = data;
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataAPI("/auths/register", data);
    console.log(res);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });

    // save the email in the storage for code verification
    sessionStorage.setItem("email", email);

    setTimeout(() => {
      // dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
      window.location.href = "/auth/confirm-code";
    }, 5000);
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
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 6000);
  }
};

// Login
export const login =
  (data, history, redirect_route, datacart, cartcallback) =>
  async (dispatch) => {
    const { email } = data;

    const newData = {
      email: data.email.toLowerCase(),
      password: data.password,
    };

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

      const res = await postDataAPI("/auths/login", newData);

      // console.log(res.data);
      if (res.status === 200) {
        // check if there is item in the cart, if there is add it to the database
        if (datacart.length !== 0) {
          await postDataAPIS("/cart/add", datacart, res.data.token);
          dispatch({ type: GLOBALTYPES.CARTCALLBACK, payload: !cartcallback });
        }
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: "login successful" },
        });
        dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
        dispatch({ type: GLOBALTYPES.DELETE_DATA_CART, payload: [] });
        history.push("/dashboard/overview");
      }

      const newPayload = {
        token: res.data.token,
        refreshtoken: res.data.refreshToken,
        userType: res.data.userType,
      };

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.TOKEN, payload: newPayload });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });

        if (redirect_route === "/") {
          // window.location.href = '/dashboard/overview';
          history.push("/dashboard/overview");
        } else {
          // window.location.href = redirect_route;
          history.push(redirect_route);
        }
      }, 2000);
    } catch (error) {
      //

      if (error.response.status === 403) {
        sessionStorage.setItem("email", email);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: error.response.data.message,
            // error:
            //   'Account not verified yet, Please check your email for verification code',
          },
        });

        setTimeout(() => {
          dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
          window.location.href = "/auth/confirm-code";
        }, 6000);
      }
      //
      else {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: error.response.data.error,
          },
        });
        setTimeout(() => {
          dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { authloading: false },
          });
        }, 6000);
      }
    }
  };

// Vendor create password
export const createPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataAPI("/auths/vendor/create-password", data);
    // console.log(res.data);

    if (res.status === 200) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: "login successful" },
      });
    }

    const newPayload = {
      token: res.data.token,
      refreshtoken: res.data.refreshToken,
      userType: res.data.userType,
    };

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.TOKEN, payload: newPayload });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
      // window.location.href = "/dashboard/my-orders";
    }, 4000);
  } catch (error) {
    // ====================
    // console.log(error.response.data.error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 6000);
  }
};

//
export const confirmCode = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataAPI("/auths/code-validation", data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });
    sessionStorage.removeItem("email");
    setTimeout(() => {
      // dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      window.location.href = "/auth/login";
    }, 4000);
  } catch (error) {
    //
    // console.log(error.response.data.error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 6000);
  }
};

export const resendCode = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataAPI("/auths/resend-code", data);
    console.log(res.data);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });
    setTimeout(() => {
      // dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 5000);
  } catch (error) {
    //
    // console.log(error.response.data);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 6000);
  }
};

// Get user
export const getUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await getDataAPI("/profile/me", token);

    // console.log(res.data);

    dispatch({
      type: GLOBALTYPES.GET_USER,
      payload: res.data,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: "Session expired, Login again",
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.TOKEN, payload: {} });
      dispatch({ type: GLOBALTYPES.GET_USER, payload: {} });
      dispatch({ type: GLOBALTYPES.ORDER_ID, payload: "" });
      dispatch({ type: GLOBALTYPES.GET_WALLET_BALANCE, payload: "" });
      dispatch({ type: GLOBALTYPES.REDIRECT_ROUTE, payload: "" });
      dispatch({ type: GLOBALTYPES.CART, payload: [] });
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
      dispatch({ type: GLOBALTYPES.DELETE_DATA_CART, payload: [] });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });

      window.location.href = "/";
    }, 8000);
  }
};

// update user
export const updateUser =
  (data, token, callback, setLoading) => async (dispatch) => {
    try {
      setLoading(true);

      const res = await patchDataAPI("/profile/update", data, token);
      // console.log(res);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
        setLoading(false);
      }, 2000);
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

// upload image
export const uploadImage =
  (data, token, callback, setLoad) => async (dispatch) => {
    try {
      setLoad(true);
      const res = await postImageAPIS("/profile/update/avatar", data, token);
      // console.log(res);
      dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });

      setLoad(false);
    } catch (error) {
      //
      console.log(error.response);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.error,
        },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoad(false);
      }, 4000);
    }
  };

// Forgot password for both vendor and user
//
export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataAPI("/auths/forgot-password", data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });

    // save the email in the storage for code verification
    sessionStorage.setItem("email", data.email);

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
      window.location.href = "/auth/reset-password";
    }, 4000);
  } catch (error) {
    //
    // console.log(error.response.data.error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 6000);
  }
};

//Reset Password
export const resetPassword = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataAPI("/auths/reset-password", data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });
    sessionStorage.removeItem("email");

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
      window.location.href = "/auth/login";
    }, 3000);
  } catch (error) {
    //
    // console.log(error.response.data.error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 6000);
  }
};

// User change password
export const changePassword = (data, token) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataAPIS("/profile/password/change", data, token);
    console.log(res);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
      dispatch(resetpasswordModal(false));
    }, 5000);
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
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 6000);
  }
};
