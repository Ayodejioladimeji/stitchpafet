import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Loading from "../../../common/Loading";
import { payWallet } from "../../../redux/actions/walletAction";
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";

const Processing = () => {
  const dispatch = useDispatch();
  const { pay, walletCallback } = useSelector((state) => state.wallet);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [cancelled, setCancelled] = useState(false);
  const history = useHistory();
  let uri = window.location.href;

  // Run the payment if their is params
  useEffect(() => {
    // Getting the Params and splitting it
    // -------------------------------------
    let parts = uri.split("?");
    let path2 = parts[1];

    const res = path2.split("&");

    if (res[0] === "status=cancelled") {
      // push the user back to the wallet page
      setLoading(false);
      setCancelled(true);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Transaction Cancelled" },
      });
    }
    //
    else {
      const result = res[1].split("-");
      const result2 = res[2].split("=");

      const newData = {
        transaction_id: result2[1].toString(),
        tx_ref: `verifibiz-transaction-${result[2]}`,
        action: "wallet",
      };

      dispatch(payWallet(newData, token.token, setLoading, walletCallback));
    }
  }, [uri, dispatch, history, token.token, walletCallback]);

  //

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
        {!loading && cancelled && (
          <h3 style={{ color: "red" }}>Transaction Cancelled</h3>
        )}

        <div className="pro-load">
          {loading && <Loading />}
          {!loading && !cancelled && <FaCheckCircle className="check-circle" />}
          {!loading && cancelled && <FaTimesCircle className="times-circle" />}
        </div>

        {!loading && (
          <button onClick={() => history.push("/dashboard/wallet")}>
            Go to wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Processing;
