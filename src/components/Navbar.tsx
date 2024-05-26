import React, { useState, useRef, useEffect } from "react";
// PACKAGES
import { useSelector, useDispatch } from "react-redux";
import { CgMenu } from "react-icons/cg";
import { FaChevronDown, FaRegUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FiSettings, FiGrid } from "react-icons/fi";
import { BsCart4, BsUiChecksGrid, BsEyeSlash, BsEye } from "react-icons/bs";
import { BiWalletAlt } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";

// COMPONENTS
import Dropdown from "../common/dropdown/Dropdown";

import { GLOBALTYPES } from "../redux/actions/globalTypes";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

//
const Navbar = () => {
  const { user, productcart } = useSelector((state: any) => state.auth);
  const { walletBalance } = useSelector((state: any) => state.wallet);
  const { datacart, get_categories } = useSelector((state: any) => state.product);
  const { callback } = useSelector((state: any) => state.dashboard);
  const [click, setClick] = useState(false);
  const [selectDrop, setSelectDrop] = useState(false);
  const [show, setShow] = useState(false);
  const clickRef = useRef(null);
  const dispatch = useDispatch();
  const [values, setValues] = useState("");
  const router = useRouter()
  const { pathname } = router.query
  const [token, setToken] = useState(null)
  const [cart, setCart] = useState(0)

  useEffect(() => {
    setCart(datacart?.length)
  }, [datacart])

  //Logout User
  const logoutUser = () => {
    // window.localStorage.clear();
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

  // The handle search method
  const handleSearch = (e) => {
    e.preventDefault();

    const res = values?.replace(" ", "-");
    const result = res?.replace(" ", "-");

    // dispatch(search_product(values));
    setValues("");
    router.push(`/search/${result}`);
  };

  // cat navigate method
  const catNavigate = (response, id) => {
    dispatch({ type: GLOBALTYPES.CAT, payload: id });
    dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
    router.push(`/${response}`);
  };

  // route change based on the last route
  const routeChange = () => {
    dispatch({
      type: GLOBALTYPES.REDIRECT_ROUTE,
      payload: pathname,
    });
    router.push("/auth/login");
  };


  //

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container heading">
        <div className="logo-module" onClick={() => router.push("/")}>
          <Image
            src="/images/logos.svg"
            alt=""
            unoptimized
            width={100}
            height={100}
          />
        </div>

        <div className="display-menu">
          <button
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="menu-btn"
          >
            <CgMenu className="open-btn" />
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="nav-box">
            <div
              className="nav-select"
              onClick={() => setSelectDrop(!selectDrop)}
            >
              <span onClick={() => setSelectDrop(!selectDrop)}>Categories</span>
              <FaChevronDown className="arrow-down" />

              {selectDrop && (
                <div className="search-dropdown" ref={clickRef}>
                  {[]
                    .concat(get_categories)
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((category) => {
                      const res = category.name.replace(" ", "-");
                      const result = res.replace("&", "");
                      const response = result.replace(" ", "");

                      return (

                        <div
                          onClick={() => catNavigate(response, category._id)}
                          key={category._id}
                          className="select-dropdown"
                        >
                          <BsUiChecksGrid className="category-icon" />{" "}
                          {category.name}
                        </div>

                      );
                    })}
                </div>
              )}
            </div>

            {/* The nav search */}
            <div className="nav-search">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products, categories & brands"
                  value={values}
                  onChange={(e) => setValues(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className={`nav-div ${!token ? "no-auth" : ""}`}>
            {!token && (
              <div className="auth-div">
                <button className="sign-up" onClick={() => router.push("/auth/register")}>Sign up</button>
                <button onClick={routeChange}>Sign in</button>
              </div>
            )}


            <div className="d-flex align-item-center gap-4">
              <div className="cart" onClick={() => router.push("/cart")}>
                <BsCart4 />
                <div className="carting">Cart</div>
                <small className="count">{cart}</small>
              </div>

              {token && (
                <div className="user" onClick={() => setClick(!click)}>
                  <img
                    src={
                      user.profile_pic ? user.profile_pic : "/images/avatar.jpg"
                    }
                    alt="user"
                  />

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
