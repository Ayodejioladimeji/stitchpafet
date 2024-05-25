import { RatingsIcon } from "@/assets/svg";
import Layout from "@/common/Layout";
import Loading from "@/common/Loading";
import CustomTable from "@/common/customTable";
import Breadcumb from "@/components/Breadcumb";
import CartItem from "@/components/cart/CartItem";
import CartItems from "@/components/cart/CartItems";
import { data } from "@/constants/SecureData";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { calculateTotal, formatMoney, sortCart } from "@/utils/utils";
import cogoToast from "cogo-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

//

const Cart = () => {
  const { productcart, cart } = useSelector((state: any) => state.auth);
  const { datacart, cartcallback } = useSelector((state: any) => state.product);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("one")
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState(null)

  useEffect(() => {
    const res = sortCart(datacart)
    console.log(res)
    setData(res)
    setLoading(false)
  }, [])

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
  // const calculateItems = cart.reduce((prev, item) => {
  //   return prev + item.quantity;
  // }, 0);

  // // calculate total{
  // const total = cart.reduce((prev, item) => {
  //   return prev + item.product.productamount * item.quantity;
  // }, 0);
  // --------------------------------------------------------

  // -----------------------when not logged in---------------------
  // Calculate the number of items bought
  // const calculateItem = productcart.reduce((prev, item) => {
  //   return prev + item.quantity;
  // }, 0);

  // // calculate total{
  // const subtotal = productcart.reduce((prev, item) => {
  //   return prev + item.productamount * item.quantity;
  // }, 0);

  // Clear all cart
  const clearCart = () => {
    if (token) {
      // dispatch(clearAllCart(token, cartcallback, setLoading));
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    } else {
      dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    }
  };

  // handle delete method
  const removeCartItem = (id) => {
    const newData = datacart.filter((item) => item.id !== id);
    dispatch({ type: GLOBALTYPES.DELETE_DATA_CART, payload: newData });
    cogoToast.success("Item removed successfully")
  };

  // // increase cart items
  const increment = (data) => {
    datacart.forEach((item) => {
      if (item.id === data?.id) {
        item.quantity += 1;
      }
    });

    const carting = datacart.find((item) => item.id === data?.id);

    const cartData = {
      ...data,
      quantity: carting?.quantity,
    };

    // const dataCart = {
    //   product_id: carting[0]._id,
    //   quantity: carting[0].quantity,
    // };

    dispatch({ type: GLOBALTYPES.UPDATE_DATA_CART, payload: cartData });
    // dispatch({ type: GLOBALTYPES.DATA_CART, payload: dataCart });
  };

  // // decrease cart items
  const decrement = (data) => {
    datacart.forEach((item) => {
      if (item.id === data.id) {
        if (item.quantity === 1) return;
        item.quantity -= 1;
      }
    });

    const carting = datacart.find((item) => item.id === data.id);

    const cartData = {
      ...data,
      quantity: carting?.quantity,
    };

    // const dataCart = {
    //   product_id: carting[0]._id,
    //   quantity: carting[0].quantity,
    // };

    dispatch({ type: GLOBALTYPES.UPDATE_DATA_CART, payload: cartData });
    // dispatch({ type: GLOBALTYPES.DATA_CART, payload: dataCart });
  };


  //

  return (
    <Layout>
      <div className="main-cart">
        <Breadcumb title="Shopping Cart" />
        <div className="container">
          <div className="main-cart-center">
            {datacart?.length === 0 ? (
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
                      <CustomTable row={5} col={5} />
                    ) : (
                      <tbody>
                        {datacart?.map((item: any, i: number) => {
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

                                    <div className="color" style={{ background: item?.colors }}></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="quantities">
                                  <p>{item.quantity}</p>

                                  <div>
                                    <i className="bi bi-chevron-up" onClick={() => increment(item)}></i>
                                    <i className="bi bi-chevron-down" onClick={() => decrement(item)}></i>
                                  </div>
                                </div>
                              </td>
                              <td>N{formatMoney(Number(item.price) * item.quantity)}</td>
                              <td>
                                <FaTrashAlt className="trash" onClick={() => removeCartItem(item.id)} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}

                    {!loading && data?.length !== 0 && <tfoot>
                      <tr>
                        <td scope="row"></td>
                        <td scope="row"></td>
                        <td scope="row"></td>

                        <td>
                          Total:{" "}
                          <b>N{formatMoney(Number(calculateTotal(datacart)))}</b>
                        </td>
                        <td scope="row"></td>
                      </tr>
                    </tfoot>}
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
