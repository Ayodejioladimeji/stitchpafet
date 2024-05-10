import React, { useEffect } from "react";
// import { FaCheckCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { addComma } from "comma-separator";

//
import Loading from "./../../../common/alert/Loading";
import RecentTransactions from "../wallets/RecentTransactions";
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import ProfileToast from "./../../../common/alert/ProfileToast";
import Watch from "./../clock/Watch";
import Calendars from "./../calendar/Calendar";

//

const OverviewPage = () => {
  const { userTransaction, walletBalance } = useSelector(
    (state) => state.wallet
  );
  const { alert } = useSelector((state) => state);
  const { profile_alert } = useSelector((state) => state.other);
  const { user, token } = useSelector((state) => state.auth);
  const { my_orders } = useSelector((state) => state.order);
  const { callback, show_balance } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log(user.first_name);
  // console.log(user.last_name);

  useEffect(() => {
    if (user.first_name === "" && user.last_name === "") {
      dispatch({
        type: GLOBALTYPES.PROFILEALERT,
        payload: {
          error:
            "Please update your profile information to create Wallets and Order transactions",
        },
      });
    }
  }, [dispatch, callback, user.first_name, user.last_name]);

  // completed orders
  const completed_order = my_orders?.filter(
    (item) => item.status === "completed"
  );

  // pending orders
  const pending_order = my_orders?.filter((item) => item.status === "pending");

  // funded orders
  const funded_order = my_orders?.filter((item) => item.status === "funded");

  // Wallet topup
  const wallet_topup = userTransaction?.filter(
    (item) => item.status === "completed"
  );

  // Wallet transfer
  const wallet_transfer = userTransaction?.filter(
    (item) => item.status === "transfer"
  );

  // Get recent sales
  // const recent_sales = my_orders?.filter((item) => item.status === 'delivered');

  // console.log(user);

  return (
    <div className="overview-page">
      {profile_alert.error && <ProfileToast />}
      <div className="overview-top">
        <h1>Hello, {user.first_name ? user.first_name : "User"} </h1>
        <p>Welcome to your Dashboard</p>
      </div>

      <div className="overview-balance">
        <h1>
          <span>Wallet Balance</span> <br /> ₦{" "}
          {show_balance ? addComma(walletBalance) : <span>*******</span>}
          {!show_balance ? (
            <BsEye
              onClick={() =>
                dispatch({ type: GLOBALTYPES.SHOW_BALANCE, payload: true })
              }
              className="balance-eyes"
            />
          ) : (
            <BsEyeSlash
              onClick={() =>
                dispatch({ type: GLOBALTYPES.SHOW_BALANCE, payload: false })
              }
              className="balance-eyes"
            />
          )}
        </h1>
        <button onClick={() => history.push("/dashboard/create-order")}>
          Create Order
        </button>
      </div>

      <div className="overview-center">
        <div
          // className="overview-left"
          className={
            token.userType === "vendor" ? "overview-left" : "overview-lefts"
          }
        >
          <div className="overview-box">
            <div className="overview-box-icon">Total Transactions</div>
            <div className="total-circle">
              <h1>
                {alert.loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : userTransaction?.length ? (
                  userTransaction?.length
                ) : (
                  0
                )}
              </h1>
            </div>
          </div>

          <div className="overview-box">
            <div className="overview-box-icon">Completed Orders</div>
            <div className="complete-circle">
              <h1>
                {" "}
                {alert.loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : completed_order?.length ? (
                  completed_order?.length
                ) : (
                  0
                )}
              </h1>
            </div>
          </div>

          <div className="overview-box">
            <div className="overview-box-icon">Pending Orders</div>
            <div className="pending-circle">
              <h1>
                {" "}
                {alert.loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : pending_order?.length ? (
                  pending_order?.length
                ) : (
                  0
                )}
              </h1>
            </div>
          </div>

          <div className="overview-box">
            <div className="overview-box-icon">Funded Orders</div>
            <div className="funded-circle">
              <h1>
                {" "}
                {alert.loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : funded_order?.length ? (
                  funded_order?.length
                ) : (
                  0
                )}
              </h1>
            </div>
          </div>

          <div className="overview-box">
            <div className="overview-box-icon">Total Topup</div>
            <div className="topup-circle">
              <h1>
                {" "}
                {alert.loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : wallet_topup?.length ? (
                  wallet_topup?.length
                ) : (
                  0
                )}
              </h1>
            </div>
          </div>

          <div className="overview-box">
            <div className="overview-box-icon">Total Transfer</div>
            <div className="transfer-circle">
              <h1>
                {" "}
                {alert.loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : wallet_transfer?.length ? (
                  wallet_transfer.length
                ) : (
                  0
                )}
              </h1>
            </div>
          </div>

          <div className="overview-box">
            <div className="overview-box-icon">Total Withdrawal</div>
            <div className="withdraw-circle">
              <h1>50</h1>
            </div>
          </div>
        </div>

        <div className="overview-right">
          <div className="overview-clock">
            <Watch />
          </div>

          {/* <hr /> */}

          <div className="overview-calendar">
            <Calendars />
          </div>
        </div>

        {/* {user.usertype === "vendor" && (
          <div className="overview-right">
            <div className="overview-right-heading">Recent Sales</div>

            {recent_sales?.length === 0 ? (
              <span className="text-center d-block">No Sales yet</span>
            ) : (
              <div className="overview-right-body">
                {recent_sales?.map((item) => (
                  <div key={item._id} className="overview-card">
                    <div className="overview-card-box">
                      <img src={item.products[0].productimage} alt="" />
                      <div className="overview-card-div">
                        <h4>{item.buyersname}</h4>
                        <h3>${addComma(item.total)}</h3>
                      </div>
                    </div>

                    <FaCheckCircle className="overview-check" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )} */}
      </div>

      <div className="overview-recent-transactions">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default OverviewPage;
