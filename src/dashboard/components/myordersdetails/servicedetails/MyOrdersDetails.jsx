import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { strictRemoveComma, addComma } from "comma-separator";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//
import {
  orderDetails,
  deliveredOrder,
  payfromwallet,
  rejectOrder,
  confirmDelivery,
  raiseDispute,
} from "./../../../../redux/actions/orderAction";
import Loading from "./../../../../common/alert/Loading";
import { getDate } from "../../../../utils/utils";
import { fundWallet } from "./../../../../redux/actions/walletAction";
import { GLOBALTYPES } from "./../../../../redux/actions/globalTypes";
import ConfirmModal from "./../../../../common/confirmmodal/ConfirmModal";
import ConfirmDeliveryModal from "./../../../../common/confirmmodal/ConfirmDeliveryModal";
import DisputeModal from "./../../../../common/confirmmodal/DisputeModal";
import RejectModal from "./../../../../common/confirmmodal/RejectModal";
import Invoice from "./../../../common/createpdf/Invoice";
import Createpdf from "../../../common/createpdf/Createpdf";
import Goback from "./../../../../common/goback/Goback";

//

const MyOrdersDetails = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { alert } = useSelector((state) => state);
  const { order_details } = useSelector((state) => state.order);
  const { walletCallback } = useSelector((state) => state.wallet);
  const { callback } = useSelector((state) => state.dashboard);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [orderData, setOrderData] = useState({});

  const { sub_total, verifibiz_charge, total } = order_details;

  // getting order details
  useEffect(() => {
    if (id) {
      dispatch(orderDetails(id, token.token, setOrderData));
    }
  }, [dispatch, token.token, callback, id]);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Scroll page to top when route changes
  useEffect(() => {
    scrollToTop();
  }, []);

  // payment from order details
  // Pay with card function
  const payCard = (e) => {
    e.preventDefault();

    // generating the transaction referrence with date
    var seconds = new Date().getTime().toString();

    const newData = {
      amount: strictRemoveComma(order_details.total),
      tx_ref: `verifibiz-transaction-${seconds}`,
      // redirect_url: "http://localhost:3000/order/processing",
      redirect_url: "https://demo.verifibiz.africa/order/processing",
    };

    dispatch(fundWallet(newData, token.token, setLoading));
  };

  // Pay from wallet function
  const payWallet = (e) => {
    e.preventDefault();
    const newData = {
      order_id: order_details.ID,
    };
    dispatch(payfromwallet(newData, token.token, setLoad, walletCallback));
  };

  // handleDelivered method
  const handleDelivered = () => {
    const newValue = {
      orderId: id,
      isAccepted: true,
    };

    dispatch(deliveredOrder(newValue, token.token, callback));
  };

  // handleReject method
  const handleReject = () => {
    const newValue = {
      orderId: id,
      isAccepted: false,
    };

    dispatch(rejectOrder(newValue, token.token, callback));
  };

  // Confirm Delivery method
  const confirmDeliver = () => {
    const newValue = {
      orderId: id,
      isAccepted: true,
    };

    dispatch(confirmDelivery(newValue, token.token, callback));
  };

  //raise Dispute method
  const handleDispute = () => {
    const newValue = {
      orderId: id,
      isAccepted: false,
    };

    dispatch(raiseDispute(newValue, token.token, callback));
  };

  return (
    <div className="order-details">
      {alert.loading ? (
        <div className="transaction-loading">
          <Loading width="45px" height="45px" color="#fff" />
        </div>
      ) : (
        <div className="order-details-center">
          <h1>Order Details</h1>

          <div className="order-arrow-left">
            <Goback />

            <Createpdf order_details={order_details}>
              {({ invoiceref }) => (
                <Invoice
                  order_details={order_details}
                  invoiceref={invoiceref}
                />
              )}
            </Createpdf>
          </div>

          <>
            <div className="orders-buttons">
              {user.email !== order_details.buyersEmail && (
                <>
                  {(orderData.status === "delivered") |
                  (orderData.status === "pending") |
                  (orderData.status === "rejected") |
                  (orderData.status === "awaiting-disbursement") |
                  (orderData.status === "completed") |
                  (orderData.status === "dispute") |
                  (orderData.status === undefined) ? (
                    ""
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          dispatch({
                            type: GLOBALTYPES.CONFIRM_MODAL,
                            payload: true,
                          })
                        }
                        style={{
                          background: "rgba(121, 205, 48, 0.281)",
                          color: "#79cd30",
                        }}
                      >
                        {alert.loading ? (
                          <Loading width="20px" height="20px" color="#fff" />
                        ) : (
                          "I've delivered"
                        )}
                      </button>

                      <button
                        onClick={() =>
                          dispatch({
                            type: GLOBALTYPES.REJECT_MODAL,
                            payload: true,
                          })
                        }
                        style={{
                          background: " rgba(255, 187, 187, 0.5)",
                          color: "#fa4646",
                        }}
                      >
                        {alert.loading ? (
                          <Loading width="20px" height="20px" color="#fff" />
                        ) : (
                          " Reject order"
                        )}
                      </button>
                    </>
                  )}
                </>
              )}

              {user.email === order_details.buyersEmail ? (
                <>
                  {orderData.status === "delivered" ? (
                    <>
                      <button
                        onClick={() =>
                          dispatch({
                            type: GLOBALTYPES.CONFIRM_DELIVERY_MODAL,
                            payload: true,
                          })
                        }
                        style={{
                          background: "rgba(150, 213, 255, 0.5)",
                          color: "#008ae7",
                        }}
                      >
                        {" "}
                        {alert.loading ? (
                          <Loading width="20px" height="20px" color="#fff" />
                        ) : (
                          " Confirm Delivery"
                        )}
                      </button>

                      <button
                        onClick={handleDispute}
                        style={{
                          background: "rgba(252, 164, 0, 0.466)",
                          color: "orangered",
                        }}
                      >
                        {alert.loading ? (
                          <Loading width="20px" height="20px" color="#fff" />
                        ) : (
                          "Raise a dispute"
                        )}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              {user.email === order_details.buyersEmail ? (
                <>
                  {orderData.status === "pending" ? (
                    <>
                      <button
                        onClick={payWallet}
                        className="pay-from-wallet-button"
                      >
                        {load ? (
                          <Loading width="20px" height="20px" color="#fff" />
                        ) : (
                          "Pay from wallet"
                        )}
                      </button>
                      <button onClick={payCard}>
                        {loading ? (
                          <Loading width="20px" height="20px" color="#fff" />
                        ) : (
                          "Pay with card"
                        )}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>

            <div className="order-box">
              <h3>Seller's Email</h3>
              <p>{order_details.sellerEmail}</p>
            </div>

            <div className="order-box">
              <h3>Buyers Name</h3>
              <p>{order_details.buyersName}</p>
            </div>
            <div className="order-box">
              <h3>Buyer's Email</h3>
              <p>{order_details.buyersEmail}</p>
            </div>
            <div className="order-box">
              <h3>VerifiBiz Id</h3>
              <p>{order_details.userid}</p>
            </div>

            <div className="order-box">
              <h3>Delivery Address</h3>
              <p>{order_details.address}</p>
            </div>

            <div className="order-box">
              <h3>Status</h3>
              <p
                style={{
                  color:
                    order_details.status === "pending"
                      ? "orange"
                      : order_details.status === "delivered"
                      ? "green"
                      : "red",
                  textTransform: "capitalize",
                }}
              >
                {order_details.status}
              </p>
            </div>

            <div className="order-box">
              <h3>Transaction Reference</h3>
              <p>{order_details.reference}</p>
            </div>

            <div className="order-box">
              <h3>Date</h3>
              <p>{getDate(order_details.created_at)}</p>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Thumbnails</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Sub-total</th>
                </tr>
              </thead>

              <tbody style={{ border: "0" }}>
                {order_details?.products?.map((item, index) => {
                  const {
                    product_name,
                    product_amount,
                    product_image,
                    quantity,
                  } = item;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="table-image">
                          <img src={product_image} alt="course-pic" />
                        </div>
                      </td>
                      <td>{product_name}</td>
                      <td>₦{addComma(product_amount)}</td>
                      <td>{quantity}</td>
                      <td>₦{addComma(product_amount * quantity)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/*  */}
            <div className="total-order">
              <div className="order-total-box">
                <h3>Sub Total</h3>
                <p>
                  <b>₦{addComma(sub_total ? sub_total : "")}</b>
                </p>
              </div>
              <div className="order-total-box">
                <h3>Verifibiz Charges (2%)</h3>
                <p>
                  <b>₦{addComma(verifibiz_charge ? verifibiz_charge : "")}</b>
                </p>
              </div>
              <div className="order-total-box">
                <h3>Grand Total</h3>
                <p>
                  <b>₦{addComma(total ? total : "")}</b>
                </p>
              </div>
            </div>
          </>
          {/* )} */}
        </div>
      )}

      <Invoice order_details={order_details} />
      <ConfirmModal handleSubmit={handleDelivered} />
      <ConfirmDeliveryModal handleSubmit={confirmDeliver} />
      <RejectModal handleSubmit={handleReject} />
      <DisputeModal handleSubmit={handleDispute} />
    </div>
  );
};

export default MyOrdersDetails;
