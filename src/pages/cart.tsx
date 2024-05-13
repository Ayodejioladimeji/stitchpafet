import Layout from "@/common/Layout";
import Loading from "@/common/Loading";
import CartItem from "@/components/cart/CartItem";
import CartItems from "@/components/cart/CartItems";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { formatMoney } from "@/utils/utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

//

const Cart = () => {
  const { token, productcart, cart } = useSelector((state: any) => state.auth);
  const { cartcallback } = useSelector((state: any) => state.product);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const checkout = () => {
    if (token.token) {
      router.push("/checkout-product");
    } else {
      dispatch({
        type: GLOBALTYPES.REDIRECT_ROUTE,
        payload: "/checkout-product",
      });
      router.push("/auth/login");
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
      // dispatch(clearAllCart(token.token, cartcallback, setLoading));
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    } else {
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    }
  };

  //

  return (
    <Layout>
      <div className="main-cart">
        <div className="main-cart-center">
          {productcart?.length === 0 && cart?.length === 0 ? (
            <div className="main-cart-empty">
              <div className="cart-empty">
                <div className="cart-bottom-box">
                  <img src="/images/empty-cart.png" alt="" />
                </div>

                <h3>Your cart is empty</h3>
                <button
                  onClick={() => router.push("/products")}
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
                    onClick={() => router.back()}
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
                    <div className="sub-total">₦ {formatMoney(subTotal)}</div>
                  ) : (
                    <div className="sub-total">₦ {formatMoney(subtotal)}</div>
                  )}
                </div>

                <hr />

                {token.token ? (
                  <button onClick={checkout}>
                    Checkout ( ₦ {formatMoney(subTotal)} )
                  </button>
                ) : (
                  <button onClick={checkout}>
                    Checkout ( ₦ {formatMoney(subtotal)} )
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
