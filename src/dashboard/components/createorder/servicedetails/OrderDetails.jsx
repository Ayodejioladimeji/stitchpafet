import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import { addComma, removeComma, strictRemoveComma } from "comma-separator";

//
import { fundWallet } from "./../../../../redux/actions/walletAction";
import Loading from "./../../../../common/alert/Loading";
import { payfromwallet } from "../../../../redux/actions/orderAction";

const ServiceDetails = ({
  navigation,
  data,
  subTotal,
  charges,
  flutterCharges,
  user,
  token,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const { order_id } = useSelector((state) => state.auth);
  const { walletCallback } = useSelector((state) => state.wallet);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Scroll page to top when route changes
  useEffect(() => {
    scrollToTop();
  }, []);

  // Pay with card function
  const payCard = (e) => {
    e.preventDefault();

    // generating the transaction referrence with date
    var seconds = new Date().getTime().toString();
    const calAmount = subTotal + charges + removeComma(data.deliveryfee);

    const newData = {
      amount: strictRemoveComma(calAmount),
      tx_ref: `verifibiz-transaction-${seconds}`,
      // redirect_url: "http://localhost:3000/order/processing",
      redirect_url: "https://demo.verifibiz.africa/order/processing",
    };

    // console.log(newData);

    dispatch(fundWallet(newData, token.token, setLoading));
  };

  // Pay from wallet function
  const payWallet = (e) => {
    e.preventDefault();
    const newData = {
      order_id: order_id,
    };

    dispatch(payfromwallet(newData, token.token, setLoad, walletCallback));
  };

  return (
    <div className="service-details">
      <div className="service-details-center ">
        <h1>Order Details</h1>

        {/* <h2>Seller's Information</h2> */}
        <div className="service-box">
          <h3>Seller's Email</h3>
          <p>{data.sellersEmail}</p>
        </div>
        {/* 
        <h2>Buyer's Information</h2> */}
        <div className="service-box">
          <h3>Buyers Name</h3>
          <p>
            {user.first_name} {user.last_name}
          </p>
        </div>
        <div className="service-box">
          <h3>Buyer's Email</h3>
          <p>{user.email}</p>
        </div>
        <div className="service-box">
          <h3>VerifiBiz Id</h3>
          <p>{user.user_id}</p>
        </div>

        <div className="service-box">
          <h3>Delivery Address</h3>
          <p>{data.address}</p>
        </div>

        <div className="service-box">
          <h3>Delivery Fee</h3>
          <p>₦{data.deliveryfee}</p>
        </div>

        <div className="service-box">
          <h3>Sub-Total</h3>
          <p>
            <b>₦{addComma(subTotal)}</b>
          </p>
        </div>

        <div className="service-box">
          <h3>Verifibiz Charges</h3>
          <p>
            <b>₦{addComma(charges)}</b>
          </p>
        </div>

        <div className="service-box">
          <h3>Flutterwave Charges</h3>
          <p>
            <b>₦{addComma(flutterCharges)}</b>
          </p>
        </div>

        <div className="service-box">
          <h3>Grand Total</h3>
          <p>
            <b>
              ₦
              {addComma(
                subTotal +
                  charges +
                  flutterCharges +
                  removeComma(data.deliveryfee)
              )}
            </b>
          </p>
        </div>

        <span className="charge-text">
          NB: Flutterwave charge is only applicable to any payment with card.
        </span>

        <div className="service-buttons">
          <button onClick={payWallet} className="pay-from-wallet-button">
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
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
