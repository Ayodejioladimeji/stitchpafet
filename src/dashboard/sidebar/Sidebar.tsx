import React from "react";
import { useSelector } from "react-redux";
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

const Sidebar = () => {
  const { topbar_toggle } = useSelector((state: any) => state.home);
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      <div className={topbar_toggle ? "side-menu inactive" : "side-menu"}>
        {/* THE MAIN MENU SECTION  */}
        <div className="main-menu">

          <ul>
            <li>
              <Link href="/dashboard/overview" className="menu-item active">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsUiChecksGrid className="sidebar-icon" />
                </div>
                <div className="menu-texts">Overview</div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/my-orders" className="menu-item ">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCartCheck className="sidebar-icon" />
                </div>
                <div className="menu-texts">My Orders</div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/create-order" className="menu-item ">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCart className="sidebar-icon" />
                </div>
                <div className="menu-texts">Create Order</div>
              </Link>
            </li>

            <li>
              <Link href="/market" className="menu-item ">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsBagPlus className="sidebar-icon" />
                </div>
                <div className="menu-texts">Market Place</div>
              </Link>
            </li>

            {user.usertype === "vendor" && (
              <li>
                <Link href="/dashboard/my-products" className="menu-item ">
                  <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                    <BsBagCheck className="sidebar-icon" />
                  </div>
                  <div className="menu-texts">My Products</div>
                </Link>
              </li>
            )}

            <li>
              <Link href="/dashboard/transactions" className="menu-item ">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <BsCreditCard className="sidebar-icon" />
                </div>
                <div className="menu-texts">Transactions</div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/payment-disputes" className="menu-item ">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <GiTakeMyMoney className="sidebar-icon" />
                </div>
                <div className="menu-texts">Order Disputes</div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/wallet" className="menu-item ">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <FaRegMoneyBillAlt className="sidebar-icon" />
                </div>
                <div className="menu-texts">Wallet</div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/settings" className="menu-item ">
                <div className={topbar_toggle ? "menu-icons" : "menu-icon "}>
                  <FiSettings className="sidebar-icon" />
                </div>
                <div className="menu-texts">Settings</div>
              </Link>
            </li>

            {/* <hr /> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
