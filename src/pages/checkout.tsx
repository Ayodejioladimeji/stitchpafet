import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import {
  FaCheckCircle,
  FaMinus,
  FaPlus,
  FaRegAddressCard,
  FaTruck,
  FaUserAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from "@/common/Layout";

const orderItems = [
  {
    id: 1,
    icon: "/assets/products/card-img.svg",
    title: "Unisex Anti Blue Light Protective Computer",
    price: 3400,
    quantity: 1,
  },
  {
    id: 2,
    icon: "/assets/products/card-img.svg",
    title: "Unisex Anti Blue Light Protective Computer",
    price: 3400,
    quantity: 1,
  },
  {
    id: 3,
    icon: "/assets/products/card-img.svg",
    title: "Unisex Anti Blue Light Protective Computer",
    price: 3400,
    quantity: 1,
  },
];

const Checkout = () => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openAddress, setOpenAddress] = useState(false);

  // choose address section
  const chooseAddress = () => {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: "Profile address selected for checkout" },
    });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    }, 3000);
  };

  return (
    <Layout>
      <div className="container">
        <div className="checkout">
          <div className="checkout-left">
            <div className="checkout-address">
              <h2>
                <FaCheckCircle className="check" /> Checkout Order
              </h2>
              <hr />

              <h5>
                <FaUserAlt className="address-icon" /> Profile Address
              </h5>
              <div className="address-box">
                <div>
                  <span>
                    <b>
                      {user?.first_name} {user?.last_name}
                    </b>
                  </span>
                  <small>{user?.address}</small>
                  <small>{user?.phone}</small>
                </div>

                <button onClick={chooseAddress} className="checkout-use">
                  Use Address
                </button>
              </div>
            </div>

            <div className="checkout-delivery">
              <FaTruck className="checkout-truck" />
              Delivery outside Lagos will take place between 3 to 5 working days
            </div>

            {/* <hr /> */}

            <div className="">
              <h5
                className="another-address"
                onClick={() => setOpenAddress(!openAddress)}
              >
                <FaRegAddressCard className="address-icon" /> Use another address{" "}
                {!openAddress ? (
                  <FaPlus
                    onClick={() => setOpenAddress(true)}
                    className="address-icons"
                  />
                ) : (
                  <FaMinus
                    onClick={() => setOpenAddress(false)}
                    className="address-icons"
                  />
                )}
              </h5>

              {openAddress && (
                <div className="shipping-info">
                  <h2 className="address-details">Shipping Information</h2>
                  <CheckoutForm />
                </div>
              )}
            </div>

            <div className="form-group pay-buttons">
              <button>Pay from wallet</button>
              <button>Pay with card</button>
            </div>
          </div>

          {/* checkout right */}
          <div className="checkout-right">
            <h3>
              Your order{" "}
              <span>
                ({orderItems.length} {orderItems.length > 1 ? "items" : "item"})
              </span>
            </h3>
            <hr />

            <div className={orderItems.length > 1 ? "order-sect" : "order-section"}>

              {orderItems.map((item) => {
                const { id, icon, title, price } = item;
                return (
                  <React.Fragment key={id}>
                    <div className="orders">
                      <div className="order-image">
                        <img src={icon} alt="" />
                      </div>

                      <div className="order-detail">
                        <h5>{title}</h5>
                        <p>
                          <b>₦{price}</b>
                        </p>
                        <p>Qty: {2}</p>
                      </div>
                    </div>
                    {orderItems.length > 1 && <hr />}
                  </React.Fragment>
                );
              })}
            </div>

            <hr />

            <div className="order-calculation">
              <div className="calculate">
                <small>Subtotal</small>
                <small>
                  <b>₦3,134</b>
                </small>
              </div>

              <hr />

              <div className="calculate">
                <small>Total</small>
                <small>
                  <strong>₦3,134</strong>
                </small>
              </div>

              <hr />
              <h4 onClick={() => router.push("/cart")}>MODIFY CART</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
