import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useRouter } from "next/router";
import Layout from "@/dashboard/common/Layout";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";

//

const Overview = () => {
  const { user, token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

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
  }, [dispatch, user.first_name, user.last_name]);


  return (
    <Layout>
      <div className="dashboard-container">
        <div className="overview-top">
          <h1>Hello, {user.first_name ? user.first_name : "User"} </h1>
          <p>Welcome to your Dashboard</p>
        </div>

        <div className="overview-center">
          <div
            // className="overview-left"
            className={
              "overview-left"
            }
          >
            <div className="overview-box">
              <div className="overview-box-icon">Total Transactions</div>
              <div className="total-circle">
                <h1>

                </h1>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Overview;
