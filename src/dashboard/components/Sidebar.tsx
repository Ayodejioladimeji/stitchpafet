import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsUiChecksGrid,
  BsCartCheck,
  BsBagCheck,
  BsCreditCard,
  BsCart,
  BsBagPlus,
} from "react-icons/bs";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";

// ASSETS

import Link from "next/link";
import NavLink from "../common/link";
import { HiOutlineLogout } from "react-icons/hi";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { topbar_toggle } = useSelector((state: any) => state.utils);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch()
  const router = useRouter()

  //Logout User
  const logoutUser = () => {
    router.push("/");
    // window.localStorage.clear();
    dispatch({ type: GLOBALTYPES.TOKEN, payload: null });
    dispatch({ type: GLOBALTYPES.REDIRECT_ROUTE, payload: null });

  };

  // 

  return (
    <>
      <div className={topbar_toggle ? "side-menu inactive" : "side-menu"}>
        {/* THE MAIN MENU SECTION  */}
        <div className="main-menu">

          <ul>
            <li>
              <NavLink path="/overview">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsUiChecksGrid className="sidebar-icon" />
                </div>
                <div className="menu-texts">Overview</div>
              </NavLink>
            </li>

            <li>
              <NavLink path="/products" slug>
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCartCheck className="sidebar-icon" />
                </div>
                <div className="menu-texts">Products</div>
              </NavLink>
            </li>

            <li>
              <NavLink path="/create-product">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCart className="sidebar-icon" />
                </div>
                <div className="menu-texts">Create Product</div>
              </NavLink>
            </li>

            <li>
              <NavLink path="/categories">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsBagPlus className="sidebar-icon" />
                </div>
                <div className="menu-texts">Categories</div>
              </NavLink>
            </li>

            {user.usertype === "vendor" && (
              <li>
                <NavLink path="/my-products">
                  <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                    <BsBagCheck className="sidebar-icon" />
                  </div>
                  <div className="menu-texts">My Products</div>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink path="/transactions">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCreditCard className="sidebar-icon" />
                </div>
                <div className="menu-texts">Transactions</div>
              </NavLink>
            </li>

            <li>
              <NavLink path="/payment-disputes">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <GiTakeMyMoney className="sidebar-icon" />
                </div>
                <div className="menu-texts">Order Disputes</div>
              </NavLink>
            </li>

            <li>
              <NavLink path="/settings">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <FiSettings className="sidebar-icon" />
                </div>
                <div className="menu-texts">Settings</div>
              </NavLink>
            </li>
            <li>
              <NavLink path="/settings">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <HiOutlineLogout className='sidebar-icon' />
                </div>
                <div className="menu-texts">Logout</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
