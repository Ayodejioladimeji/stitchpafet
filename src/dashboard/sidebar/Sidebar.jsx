import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

import Navlink from "./../common/Navlink";

const Sidebar = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className={topbar_toggle ? "side-menu inactive" : "side-menu"}>
        {/* THE MAIN MENU SECTION  */}
        <div className="main-menu">
          <Link to="/">
            <div className="sidebar-logos">
              {topbar_toggle && (
                <img src="/assets/fav.png" alt="" className="log" />
              )}

              <img src="/assets/new-logo-light.png" alt="" className="logos" />
            </div>
          </Link>
          {/* <div className='account_id'>Account ID: D431633H98</div> */}
          <ul>
            <li>
              <Navlink to="/dashboard/overview">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsUiChecksGrid className="sidebar-icon" />
                </div>
                <div className="menu-texts">Overview</div>
              </Navlink>
            </li>

            <li>
              <Navlink to="/dashboard/my-orders">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCartCheck className="sidebar-icon" />
                </div>
                <div className="menu-texts">My Orders</div>
              </Navlink>
            </li>

            <li>
              <Navlink to="/dashboard/create-order">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCart className="sidebar-icon" />
                </div>
                <div className="menu-texts">Create Order</div>
              </Navlink>
            </li>

            <li>
              <Navlink to="/market">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsBagPlus className="sidebar-icon" />
                </div>
                <div className="menu-texts">Market Place</div>
              </Navlink>
            </li>

            {user.usertype === "vendor" && (
              <li>
                <Navlink to="/dashboard/my-products">
                  <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                    <BsBagCheck className="sidebar-icon" />
                  </div>
                  <div className="menu-texts">My Products</div>
                </Navlink>
              </li>
            )}

            <li>
              <Navlink to="/dashboard/transactions">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCreditCard className="sidebar-icon" />
                </div>
                <div className="menu-texts">Transactions</div>
              </Navlink>
            </li>

            <li>
              <Navlink to="/dashboard/payment-disputes">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <GiTakeMyMoney className="sidebar-icon" />
                </div>
                <div className="menu-texts">Order Disputes</div>
              </Navlink>
            </li>

            <li>
              <Navlink to="/dashboard/wallet">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <FaRegMoneyBillAlt className="sidebar-icon" />
                </div>
                <div className="menu-texts">Wallet</div>
              </Navlink>
            </li>

            <li>
              <Navlink to="/dashboard/settings">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <FiSettings className="sidebar-icon" />
                </div>
                <div className="menu-texts">Settings</div>
              </Navlink>
            </li>

            {/* <hr /> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
