import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Loading from "../../../common/Loading";
import { payWallet } from "../../../redux/actions/walletAction";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

const OrderProcessing = () => {
  const dispatch = useDispatch();
  const { pay } = useSelector((state) => state.wallet);
  const { token, order_id } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let uri = window.location.href;

  // Run the payment if their is params
  useEffect(() => {
    if (uri) {
      // Getting the Params and splitting it
      // -------------------------------------
      let parts = uri.split("?");
      let path2 = parts[1];

      const res = path2.split("&");

      if (res[0] === "status=cancelled") {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: "Transaction Cancelled" },
        });

        // push the user back to the wallet page
        setTimeout(() => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {},
          });
          history.push("/dashboard/create-order");
        }, 3000);
      }
      //
      else {
        const result = res[1].split("-");
        const result2 = res[2].split("=");

        const newData = {
          transaction_id: result2[1].toString(),
          tx_ref: `verifibiz-transaction-${result[2]}`,
          action: "order",
          order_id: order_id,
        };
        // console.log(newData);
        dispatch(payWallet(newData, token.token, setLoading));
      }
    }
  }, [uri, dispatch, order_id, history, token.token]);

  return (
    <div className="processing">
      <div className="processing-div">
        {loading && (
          <>
            <p>Checking your transaction...</p>
            <p>Please wait...</p>
          </>
        )}
        {!loading && <h3>{pay.message}</h3>}

        <div className="pro-load">
          {loading && <Loading />}
          {!loading && <FaCheckCircle className="check-circle" />}
        </div>

        {!loading && (
          <button onClick={() => history.push("/dashboard/my-orders")}>
            My Orders
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderProcessing;
