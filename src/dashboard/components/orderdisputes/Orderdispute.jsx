import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addComma } from "comma-separator";

import { getDate } from "../../../utils/utils";
//
import Loading from "./../../../common/alert/Loading";
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import Goback from "./../../../common/goback/Goback";

const Orderdispute = () => {
  const { alert } = useSelector((state) => state);
  const { my_orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect
  useEffect(() => {
    if (my_orders?.length !== 0) {
      setLoading(false);
    }
  }, [my_orders?.length]);

  //   The search handleChange
  const handleChange = (e) => {
    setData(e.target.value);
  };

  // filter for dispute
  const filterDispute = my_orders?.filter((item) => item.status === "dispute");

  //   Filtering for search
  const filteredData = filterDispute?.filter((my_order) => {
    return Object.values(my_order).join(" ").toLowerCase().match(data);
  });

  // order details method
  const orderDetailsMethod = (id) => {
    history.push(`/dashboard/my-orders/details/${id}`);
    dispatch({ type: GLOBALTYPES.ORDER_ID, payload: id });
  };

  //
  return (
    <div className="my-orders">
      <div className="my-orders-heading">
        <div className="order-header">
          <h2>Order Disputes</h2>
          {my_orders === null ? (
            ""
          ) : (
            <div className="orders-sorting">
              <div className="order-search">
                <input
                  type="text"
                  value={data}
                  onChange={handleChange}
                  placeholder="Search orders"
                />
              </div>
            </div>
          )}

          <Goback />
        </div>

        <div className="myorder-image">
          <img src="/assets/best-security.png" alt="" />
        </div>
      </div>

      {alert.loading ? (
        <div className="transaction-loading">
          <Loading width="45px" height="45px" color="#fff" />
        </div>
      ) : (
        <div className="my-orders-table">
          {my_orders === null ? (
            <p className="text-center mt-4">No Disputes Found</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Buyers Name</th>
                  <th scope="col">Sellers Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Charges</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody style={{ border: "0" }}>
                {filteredData?.map((item, index) => {
                  const {
                    _id,
                    buyersname,
                    selleremail,
                    status,
                    total,
                    createdat,
                    verifibizcharge,
                  } = item;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{buyersname}</td>
                      <td className="sellers-email">{selleremail}</td>
                      {(status === "funded") | (status === "delivered") ? (
                        <td style={{ color: "green" }}>{status}</td>
                      ) : status === "pending" ? (
                        <td style={{ color: "orange" }}>{status}</td>
                      ) : (
                        <td style={{ color: "red" }}>{status}</td>
                      )}
                      <td>₦{addComma(verifibizcharge)}</td>
                      <td>₦{addComma(total)}</td>
                      <td>{getDate(createdat)}</td>

                      <td className="action">
                        <button onClick={() => orderDetailsMethod(_id)}>
                          View Order
                        </button>

                        <button>Solve Dispute</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      <p className="text-center mt-5">
        {filteredData?.length === 0 && !loading && !alert.loading
          ? "Disputes not found"
          : ""}{" "}
      </p>
    </div>
  );
};

export default Orderdispute;
