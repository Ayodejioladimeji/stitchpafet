import {
  deleteDataAPIS,
  getDataAPI,
  postDataAPIS,
} from '../../utils/fetchData';
import { GLOBALTYPES } from './globalTypes';

export const fundWallet = (data, token, setLoading) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    setLoading(true);

    const res = await postDataAPIS('/payment/link', data, token);
    const url = res.data.data.link;
    // console.log(res.data);

    // run a condition
    if (res.status === 200) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { notify: 'Processing payment, please wait....' },
      });

      setTimeout(() => {
        window.location.href = url;
      }, 3000);
    }
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
      setLoading(false);
    }, 6000);
  }
};

// Pay wallet
export const payWallet =
  (data, token, setLoading, callback) => async (dispatch) => {
    try {
      setLoading(true);
      const res = await postDataAPIS('/payment/verify_payment', data, token);
      // console.log(res.data);
      dispatch({
        type: GLOBALTYPES.PAY_WALLET,
        payload: res.data,
      });

      dispatch({ type: GLOBALTYPES.WALLET_CALLBACK, payload: !callback });

      setTimeout(() => {
        setLoading(false);
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      }, 4000);

      setLoading(false);
    } catch (error) {
      //
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

// Get wallet balance
export const getWalletBalance = (token, setLoading) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await getDataAPI('/payment/balance', token);
    // console.log(res.data);
    dispatch({
      type: GLOBALTYPES.GET_WALLET_BALANCE,
      payload: res.data.data.balance,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (error) {
    //
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  }
};

// Get All Banks
export const getBanks = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('/auths/banks', token);
    // console.log(res.data.data);

    dispatch({
      type: GLOBALTYPES.GET_BANKS,
      payload: res.data.data,
    });
  } catch (error) {
    //
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });
  }
};

// Get wallet balance
export const getUserTransaction = (token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await getDataAPI('/wallet/transactions/user/me', token);
    // console.log(res.data);
    dispatch({
      type: GLOBALTYPES.GET_USER_TRANSACTION,
      payload: res.data,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (error) {
    //
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

// Send money
export const sendFunds =
  (data, token, setLoading, callback, setEmail, setAmount, setPassword) =>
  async (dispatch) => {
    try {
      setLoading(true);

      const res = await postDataAPIS('/wallet/send-money', data, token);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.WALLET_CALLBACK, payload: !callback });
        setLoading(false);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {},
        });

        setEmail('');
        setAmount('');
        setPassword('');
      }, 5000);
    } catch (error) {
      console.log(error.response);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.error,
        },
      });
      //

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoading(false);
      }, 5000);
    }
  };

// Resolve Account Number

export const resolveAccount =
  (data, token, setLoading, bankname, bankcode, callback) =>
  async (dispatch) => {
    try {
      setLoading(true);

      const res = await postDataAPIS(
        '/auths/bank/resolve-account',
        data,
        token
      );

      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: { success: res.data.message },
      // });

      const newData = {
        accountNumber: res.data.data.data.accountnumber,
        accountName: res.data.data.data.accountname,
        bankName: bankname,
        bankCode: bankcode,
      };

      const result = await postDataAPIS('/beneficiary/add', newData, token);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: result.data.error },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.RECEIVE_MODAL, payload: false });
        dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
        setLoading(false);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {},
        });
      }, 4000);
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          // error: "Bank Account does not exist",
          error: error.response.data.error,
        },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoading(false);
      }, 5000);
    }
  };

// withdraw
export const withdrawMoney =
  (data, token, setLoading, callback) => async (dispatch) => {
    try {
      setLoading(true);

      const res = await postDataAPIS('/fund/withdraw', data, token);
      // console.log(res.data);

      if (res.data.data.status === 'error') {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: res.data.data.message },
        });
      } else {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.data.message },
        });
      }

      setTimeout(() => {
        setLoading(false);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {},
        });
        dispatch({ type: GLOBALTYPES.WALLET_CALLBACK, payload: !callback });
        dispatch({ type: GLOBALTYPES.WITHDRAW_MODAL, payload: false });
      }, 5000);
    } catch (error) {
      console.log(error.response.message);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          // error: "Bank Account does not exist",
          error: error.response.message,
        },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoading(false);
      }, 5000);
    }
  };

// Get Beneficiaries
export const getBeneficiaries = (token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await getDataAPI('/beneficiary/all', token);
    // console.log(res.data.data);

    dispatch({ type: GLOBALTYPES.BENEFICIARIES, payload: res.data.data });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (error) {
    console.log(error);
    //
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  }
};

// Delete Beneficiary account
export const deleteBeneficiary = (token, id, callback) => async (dispatch) => {
  console.log(id);
  try {
    const res = await deleteDataAPIS(`/beneficiary/delete/${id}`, token);
    // console.log(res.data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 1000);
  } catch (error) {
    //
    console.log(error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 2000);
  }
};
