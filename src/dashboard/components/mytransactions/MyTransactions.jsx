import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinusCircle } from "react-icons/fa";

// import { getDate } from "../../../utils/utils";
import { getUserTransaction } from "../../../redux/actions/walletAction";
import { strictAddComma } from "comma-separator";
import Loading from "../../../common/alert/Loading";
// import { format } from 'timeago.js';
import { getDate } from "../../../utils/utils";
import Goback from "../../../common/goback/Goback";

//

const MyTransactions = () => {
  const { token } = useSelector((state) => state.auth);
  const { alert } = useSelector((state) => state);
  const { userTransaction } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [visible, setVisible] = useState(5);
  const [loading, setLoading] = useState(false);

  //   Filtering for search
  const filteredData = userTransaction?.filter((my_order) => {
    return Object.values(my_order).join(" ").toLowerCase().match(data);
  });

  useEffect(() => {
    if (token.token) {
      dispatch(getUserTransaction(token.token));
    }
  }, [token.token, dispatch]);

  // show more items
  const showItems = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 5);
      setLoading(false);
    }, 1500);
  };

  //   The search handleChange
  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="my-transactions">
      <div className="transaction-banner">
        <div className="transaction-banner-header">
          <h2>My Transactions</h2>

          {userTransaction === null ? (
            ""
          ) : (
            <div className="transactions-sorting">
              <div className="order-search">
                <input
                  type="text"
                  value={data}
                  onChange={handleChange}
                  placeholder="Search transactions"
                />
              </div>
            </div>
          )}

          <Goback />
        </div>

        <div className="transaction-banner-image">
          <img src="/assets/transaction-one.png" alt="" />
        </div>
      </div>

      {userTransaction === null ? (
        <p className="no-trans text-center mt-5 text-secondary">
          No Transaction yet
        </p>
      ) : (
        <>
          {" "}
          {alert.loading ? (
            <div className="transaction-loading">
              <Loading width="25px" height="25px" color="#fff" />
            </div>
          ) : (
            <div className="recent-transaction">
              <h3>All Transactions</h3>
              {filteredData.slice(0, visible).map((item, index) => {
                const { _id, amount, description, status, updated_at } = item;

                return (
                  <React.Fragment key={_id}>
                    <div className="recent-div">
                      <div className="recent-div-left">
                        <p className="recent-count">{index + 1}</p>

                        {description === "Wallet topup" ? (
                          <FaMinusCircle className="recent-blue-icon" />
                        ) : description === "Money received" ? (
                          <FaMinusCircle className="recent-green-icon" />
                        ) : (
                          <FaMinusCircle className="recent-icon" />
                        )}
                        <div className="recent-left-details">
                          <h3>{description}</h3>
                          <small>{getDate(updated_at)}</small>{" "}
                          {/* <span className='ml-4'>{format(updated_at)}</span> */}
                        </div>
                      </div>

                      <div className="recent-div-right">
                        <h3 className="transaction-price">
                          ₦{strictAddComma(amount)}
                        </h3>
                        {status === "completed" ? (
                          <small className="recent-blue-icon">{status}</small>
                        ) : status === "incoming" ? (
                          <small className="recent-green-icon">{status}</small>
                        ) : (
                          <small className="recent-icon">{status}</small>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              {visible > userTransaction.length ? (
                ""
              ) : (
                <button onClick={showItems}>
                  {loading ? (
                    <Loading width="20px" height="20px" color="#fff" />
                  ) : (
                    "Load More"
                  )}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTransactions;
