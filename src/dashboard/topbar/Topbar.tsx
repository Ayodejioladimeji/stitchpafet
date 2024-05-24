import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiUserCheck, FiSettings } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { FaSun, FaRegUser, FaChevronDown } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineSell } from "react-icons/md";
import { BiWalletAlt } from "react-icons/bi";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import TopbarDropdown from "../../common/dropdown/TopbarDropdown";
import { getWalletBalance } from "../../redux/actions/walletAction";
import Loading from "../../common/alert/Loading";

//
import { useRouter } from "next/router";
import Link from "next/link";
import { formatMoney } from "@/utils/utils";

//
const Topbar = () => {
  const { topbar_toggle } = useSelector((state: any) => state.home);
  const { token, user } = useSelector((state: any) => state.auth);
  const { show_balance } = useSelector((state: any) => state.dashboard);
  const { walletBalance, walletCallback } = useSelector(
    (state: any) => state.wallet
  );
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const clickRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const walletBalance = 0;

  // Get user balance
  useEffect(() => {
    if (token.token) {
      // dispatch(getWalletBalance(token.token, setLoading));
    }
  }, [dispatch, token.token, walletCallback]);

  // Click outside side effect,
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  //   The handleClick outside function
  const handleClickOutside = (e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setClick(false);
    }
  };

  //Logout User
  const logoutUser = () => {
    window.localStorage.clear();
    dispatch({ type: GLOBALTYPES.TOKEN, payload: {} });
    dispatch({ type: GLOBALTYPES.GET_USER, payload: {} });
    dispatch({ type: GLOBALTYPES.ORDER_ID, payload: "" });
    dispatch({ type: GLOBALTYPES.GET_WALLET_BALANCE, payload: "" });
    dispatch({ type: GLOBALTYPES.REDIRECT_ROUTE, payload: "" });
    dispatch({ type: GLOBALTYPES.CART, payload: [] });
    dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: [] });
    dispatch({ type: GLOBALTYPES.DELETE_DATA_CART, payload: [] });
    router.push("/");
  };

  // 

  return (
    <div className={topbar_toggle ? "response" : "responsive"}>
      <FiMenu
        onClick={() =>
          dispatch({ type: GLOBALTYPES.TOPBAR_TOGGLE, payload: !topbar_toggle })
        }
        className="topbar-menu"
      />

      <div className="user-box">
        <FaSun className="user-box-icon" />
        <div className="user-box-name">
          <>
            Balance :{" "}
            {loading ? (
              <Loading height="15px" width="15px" color="#351590" />
            ) : (
              <>
                {show_balance ? (
                  <b>₦{formatMoney(walletBalance)}</b>
                ) : (
                  <b className="balance-hide">*****</b>
                )}
              </>
            )}
          </>

          <div
            onClick={() => setClick(!click)}
            className="user-box-image d-flex align-items-center ml-3"
          >
            <img src={user.profile_pic ? user.profile_pic : ""} alt="" />
            <FaChevronDown />
          </div>
        </div>

        {click && (
          <TopbarDropdown >
            <div ref={clickRef}>
              <small className="profile-email">{user.email}</small>

              <Link href="/dashboard/profile">
                <div className="user-div">
                  <FaRegUser className="user-div-icons" />
                  <div className="link">My Profile</div>
                </div>
              </Link>

              {user.usertype !== "vendor" && (
                <Link href="/dashboard/become-vendor">
                  <div className="user-div">
                    <FiUserCheck className="user-div-icons seller" />
                    <div className="link">Become a vendor</div>
                  </div>
                </Link>
              )}

              <Link href="/market">
                <div className="user-div">
                  <MdOutlineSell className="user-div-icons seller" />
                  <div className="link">Market place</div>
                </div>
              </Link>

              <Link href="/dashboard/settings">
                <div className="user-div">
                  <FiSettings className="user-div-icons" />
                  <div className="link">Settings</div>
                </div>
              </Link>

              <Link href="/dashboard/wallet">
                <div className="user-div">
                  <BiWalletAlt className="user-div-icons" />
                  <div className="link">My wallet</div>
                </div>
              </Link>

              <hr className="mb-3" />
              <div className="user-div" onClick={logoutUser}>
                <HiOutlineLogout className="user-div-icons logout" />
                <div className="link">Logout</div>
              </div>
            </div>
          </TopbarDropdown>
        )}
      </div>
    </div>
  );
};

export default Topbar;