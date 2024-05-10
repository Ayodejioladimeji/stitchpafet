import {
  deleteDataAPIS,
  getData,
  getDataAPI,
  postDataAPIS,
} from '../../utils/fetchData';
import { GLOBALTYPES } from './globalTypes';

// Get Categories
export const getCategories = () => async (dispatch) => {
  try {
    const res = await getData('/categories/categories');
    // console.log(res.data);
    dispatch({
      type: GLOBALTYPES.GET_CATEGORIES,
      payload: res.data,
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

// Search Product
export const search_product = (search) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await getData(`/search?search=${search}`);

    dispatch({
      type: GLOBALTYPES.SEARCH,
      payload: res.data.data,
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

// Get Sub Categories
export const subCategories = (category, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const res = await getDataAPI(`/subcategories/all/${category}`);
    // console.log(res.data);
    dispatch({
      type: GLOBALTYPES.SUB_CATEGORIES,
      payload: res.data.data,
    });
    setLoading(false);
  } catch (error) {
    //
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });
    setLoading(false);
  }
};

// Create Product
export const createProduct = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPIS(
      'https://verifibiz.herokuapp.com/api/v1/product/add',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json;charset=UTF-8',
        },
      }
    );
    // console.log(res.data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 6000);
  } catch (error) {
    //
    console.log(error.response);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });
  }
};

// Get All Product
export const all_product = () => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await getData('/products/all');
    // console.log(res.data);
    dispatch({
      type: GLOBALTYPES.ALL_PRODUCT,
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
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  }
};

// Get Vendor Product
export const vendor_product = (id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await getData(`/products/vendor/${id}`);
    // console.log(res.data);

    dispatch({
      type: GLOBALTYPES.VENDOR_PRODUCT,
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
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  }
};

// add to cart
export const addCart = (data, token, cartcallback) => async (dispatch) => {
  try {
    const res = await postDataAPIS('/cart/add', data, token);
    // console.log(res.data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.CARTCALLBACK, payload: !cartcallback });
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
  }
};

// get cart items
export const getCartItems = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('/cart/all', token);
    // console.log(res.data);
    dispatch({ type: GLOBALTYPES.CART, payload: res.data.data });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 6000);
  } catch (error) {
    //
    console.log(error.response);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });
  }
};

// Remove single cart item
export const removeCart = (token, id, cartcallback) => async (dispatch) => {
  try {
    const res = await deleteDataAPIS(`/cart/delete/${id}`, token);
    // console.log(res.data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.CARTCALLBACK, payload: !cartcallback });
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

// Clear all cart items
export const clearAllCart =
  (token, cartcallback, setLoading) => async (dispatch) => {
    try {
      const res = await deleteDataAPIS('/cart/delete/all', token);
      console.log(res.data);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.message,
        },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.CARTCALLBACK, payload: !cartcallback });
        setLoading(false);
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
        setLoading(false);
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      }, 2000);
    }
  };

// Vendor delete product
export const vendorDelete =
  (token, id, callback, setLoading) => async (dispatch) => {
    try {
      setLoading(true);
      const res = await deleteDataAPIS(`/product/${id}`, token);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.message,
        },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
        dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_MODAL, payload: false });
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        setLoading(false);
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
        setLoading(false);
      }, 2000);
    }
  };
