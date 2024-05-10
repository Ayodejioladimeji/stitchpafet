import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BiWalletAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";

// COMPONENTS
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import TopupWallet from "./../topupwallet/TopupWallet";
import RecentTransactions from "./RecentTransactions";

const Wallets = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { topup_modal } = useSelector((state) => state.dashboard);

  const history = useHistory();

  return (
    <div className="wallets">
      <div className="wallets-left">
        <div className="wallets-left-img">
          <img
            src="https://res.cloudinary.com/devsource/image/upload/v1657488373/verifibiz/transaction-image_besavb.jpg"
            alt=""
          />
        </div>

        <div className="wallets-center">
          <h2>
            Hi,{" "}
            {user.first_name ? (
              <>
                {user.first_name} {user.last_name}
              </>
            ) : (
              "user"
            )}
          </h2>

          <div className="wallets-left-buttons">
            <button onClick={() => history.push("/dashboard/withdraw")}>
              <FaArrowDown className="wallets-icon" />
              Withdraw
            </button>

            <button onClick={() => history.push("/dashboard/send-money")}>
              <FaArrowUp className="wallets-icon" />
              Transfer
            </button>

            <button
              onClick={() =>
                dispatch({ type: GLOBALTYPES.TOPUP_MODAL, payload: true })
              }
            >
              <BiWalletAlt className="wallets-icon" />
              Top Up Wallet
            </button>
          </div>

          <RecentTransactions />
        </div>
      </div>

      {topup_modal && <TopupWallet />}
    </div>
  );
};

export default Wallets;
