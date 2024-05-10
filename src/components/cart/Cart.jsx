import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//

import CartItem from "./CartItem";
import { GLOBALTYPES } from "./../../redux/actions/globalTypes";
import { FaChevronLeft } from "react-icons/fa";
import { addComma } from "comma-separator";
import CartItems from "./CartItems";
import { clearAllCart } from "./../../redux/actions/ProductAction";
import Loading from "./../../common/alert/Loading";

const Cart = () => {
  const { token, productcart, cart } = useSelector((state) => state.auth);
  const { cartcallback } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const checkout = () => {
    if (token.token) {
      history.push("/checkout-product");
    } else {
      dispatch({
        type: GLOBALTYPES.REDIRECT_ROUTE,
        payload: "/checkout-product",
      });
      history.push("/auth/login");
    }
  };

  // --------------when logged in----------------
  // Calculate the number of items bought
  const calculateItems = cart.reduce((prev, item) => {
    return prev + item.quantity;
  }, 0);

  // calculate total{
  const subTotal = cart.reduce((prev, item) => {
    return prev + item.product.productamount * item.quantity;
  }, 0);
  // --------------------------------------------------------

  // -----------------------when not logged in---------------------
  // Calculate the number of items bought
  const calculateItem = productcart.reduce((prev, item) => {
    return prev + item.quantity;
  }, 0);

  // calculate total{
  const subtotal = productcart.reduce((prev, item) => {
    return prev + item.productamount * item.quantity;
  }, 0);

  // Clear all cart
  const clearCart = () => {
    if (token.token) {
      dispatch(clearAllCart(token.token, cartcallback, setLoading));
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    } else {
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    }
  };

  //

  return (
    <div className="main-cart">
      <div className="main-cart-center">
        {productcart?.length === 0 && cart?.length === 0 ? (
          <div className="main-cart-empty">
            <div className="cart-empty">
              <div className="cart-bottom-box">
                <img src="/assets/empty-cart.svg" alt="" />
              </div>

              <h3>Your cart is empty</h3>
              <button
                onClick={() => history.push("/market")}
                className="start-shopping"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="main-cart-left">
              <h2>
                <FaChevronLeft
                  onClick={() => history.goBack()}
                  className="chevron-back"
                />{" "}
                Product Cart ({token.token ? cart.length : productcart.length})
              </h2>

              <hr />

              {token.token ? (
                <div className="cart-bottom">
                  {cart.map((item) => {
                    console.log(item);
                    return (
                      <CartItem data={item} {...item.product} key={item._id} />
                    );
                  })}
                </div>
              ) : (
                <div className="cart-bottom">
                  {productcart.map((item) => {
                    return <CartItems {...item} key={item._id} />;
                  })}
                </div>
              )}

              {cart.length === 0 ? (
                ""
              ) : (
                <button className="clear-cart" onClick={clearCart}>
                  {loading ? (
                    <Loading width="20px" height="20px" color="#fff" />
                  ) : (
                    " Clear cart"
                  )}
                </button>
              )}

              {productcart.length === 0 ? (
                ""
              ) : (
                <button className="clear-cart" onClick={clearCart}>
                  {loading ? (
                    <Loading width="20px" height="20px" color="#fff" />
                  ) : (
                    " Clear cart"
                  )}
                </button>
              )}
            </div>

            <div className="main-cart-right">
              <h3>Order Summary</h3>
              <hr />

              <div className="order-details">
                <div>items: </div>
                {token.token ? (
                  <div className="sub-total">{calculateItems} Items</div>
                ) : (
                  <div className="sub-total">{calculateItem} Items</div>
                )}
              </div>

              <hr />

              <div className="order-details">
                <div>Sub-total: </div>

                {token.token ? (
                  <div className="sub-total">₦ {addComma(subTotal)}</div>
                ) : (
                  <div className="sub-total">₦ {addComma(subtotal)}</div>
                )}
              </div>

              <hr />

              {token.token ? (
                <button onClick={checkout}>
                  Checkout ( ₦ {addComma(subTotal)} )
                </button>
              ) : (
                <button onClick={checkout}>
                  Checkout ( ₦ {addComma(subtotal)} )
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
