import { RatingsIcon } from "@/assets/svg";
import Layout from "@/common/Layout";
import Loading from "@/common/Loading";
import CustomTable from "@/common/customTable";
import Breadcumb from "@/components/Breadcumb";
import CartItem from "@/components/cart/CartItem";
import CartItems from "@/components/cart/CartItems";
import { data } from "@/constants/SecureData";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { formatMoney } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaChevronLeft, FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

//

const Cart = () => {
  const { productcart, cart } = useSelector((state: any) => state.auth);
  const { cartcallback } = useSelector((state: any) => state.product);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("one")

  const router = useRouter();
  const dispatch = useDispatch();

  const checkout = () => {
    if (token) {
      router.push("/checkout");
    } else {
      dispatch({
        type: GLOBALTYPES.REDIRECT_ROUTE,
        payload: "/checkout",
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
  const total = cart.reduce((prev, item) => {
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
    if (token) {
      // dispatch(clearAllCart(token, cartcallback, setLoading));
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    } else {
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    }
  };

  //

  return (
    <Layout>
      <div className="main-cart">
        <Breadcumb title="Shopping Cart" />
        <div className="container">
          <div className="main-cart-center">
            {data?.length === 0 ? (
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
                <div className="cart-table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th scope="col">Product Information</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {loading ? (
                      <CustomTable row={10} col={8} />
                    ) : (
                      <tbody>
                        {data?.map((item: any, i: number) => {
                          return (
                            <tr key={i}>
                              <td>
                                <div className="table-image">
                                  <Image src={item.image} alt="" width={100} height={100} unoptimized />
                                </div>
                              </td>
                              <td>
                                <div className="infor">
                                  <h4>{item.title}</h4>
                                  <RatingsIcon />
                                  <p>N{item.price}</p>

                                  <div className="d-flex gap-2">
                                    <small>Color: </small> {" "}

                                    <div className="color" style={{ background: item?.colors[0] }}></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="quantities">
                                  <p>01</p>

                                  <div>
                                    <i className="bi bi-chevron-up"></i>
                                    <i className="bi bi-chevron-down"></i>
                                  </div>
                                </div>
                              </td>
                              <td>N 50,000</td>
                              <td>
                                <FaTrashAlt className="trash" />
                              </td>
                            </tr>
                          );
                        })}


                      </tbody>
                    )}

                    <tfoot>
                      <tr>
                        <td scope="row"></td>
                        <td scope="row"></td>
                        <td scope="row"></td>

                        <td>
                          Total:{" "}
                          <b>N50,000</b>
                        </td>
                        <td scope="row"></td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="table-footer">
                    <button onClick={() => router.push("/products")}><i className="bi bi-arrow-left"></i>Continue shopping</button>
                    <button onClick={() => router.push("/checkout")}>Checkout</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
