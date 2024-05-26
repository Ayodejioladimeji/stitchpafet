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
import Breadcumb from "@/components/Breadcumb";
import { data } from "@/constants/SecureData";

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
  const { datacart } = useSelector((state: any) => state?.product)
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
      <div className="checkout">
        <Breadcumb title="Checkout" />
        <div className="container">
          <div className="row mt-5">
            <div className="col-7">
              <div className="checkout-left">
                <div className="checkout-address">
                  <h2>
                    Delivery Information
                  </h2>
                  <hr />

                  {/* <div className="address-box">
                    <div>
                      <span>
                        <b>
                          {"Ayodeji"} {"Oladimeji"}
                        </b>
                      </span>
                      <small>{"22b iwalesin street mosalashi alagbado lagos state"}</small>
                      <small>{"08053838074"}</small>
                    </div>

                    <button onClick={chooseAddress} className="checkout-use">
                      Use Address
                    </button>
                  </div> */}
                </div>

                {/* <hr /> */}

                <div className="shipping-info">
                  {/* <h2 className="address-details">User another address</h2> */}
                  <h2 className="address-details">Provide address</h2>
                  <CheckoutForm />
                </div>
              </div>
            </div>

            {/* checkout right */}
            <div className="col-5">
              <div className="checkout-right">
                <h3>
                  Your order{" "}
                  <span>
                    ({datacart?.length} {datacart?.length > 1 ? "items" : "item"})
                  </span>
                </h3>
                <hr />

                <div className={orderItems.length > 1 ? "order-sect" : "order-section"}>

                  {datacart?.map((item) => {
                    const { id, image, title, price } = item;
                    return (
                      <React.Fragment key={id}>
                        <div className="orders">
                          <div className="order-image">
                            <img src={image} alt="" />
                          </div>

                          <div className="order-detail">
                            <h5>{title}</h5>
                            <p>
                              ₦{price}
                            </p>
                            <p>Qty: {item.quantity}</p>
                          </div>
                        </div>
                        {/* {data?.length > 1 && <hr />} */}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="rule my-3" />

                <div className="order-calculation">
                  <div className="calculate">
                    <small>Subtotal</small>
                    <small>
                      ₦3,134
                    </small>
                  </div>

                  <div className="rule my-3" />

                  <div className="calculate">
                    <small>Total</small>
                    <small>
                      ₦3,134
                    </small>
                  </div>

                  <div className="rule my-3" />

                  <button className="modify-cart" onClick={() => router.push("/cart")}>Modify cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
