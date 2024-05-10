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
import { addComma } from "comma-separator";

// COMPONENTS
import Dropdown from "../../common/dropdown/Dropdown";

import { GLOBALTYPES } from "./../../redux/actions/globalTypes";

//
import Loading from "./../../common/alert/Loading";
import { search_product } from "../../redux/actions/ProductAction";
import Link from "next/link";

//
const Navbar = () => {
  const { token, user, productcart, cart } = useSelector((state) => state.auth);
  const { walletBalance } = useSelector((state) => state.wallet);
  const { alert } = useSelector((state) => state);
  const { get_categories } = useSelector((state) => state.product);
  const { callback } = useSelector((state) => state.dashboard);
  const [click, setClick] = useState(false);
  const [selectDrop, setSelectDrop] = useState(false);
  const [show, setShow] = useState(false);
  const clickRef = useRef();
  const dispatch = useDispatch();
  const [values, setValues] = useState("");

  // Click outside side effect
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  //   The handleClick outside function
  const handleClickOutside = (e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setClick(false);
      setSelectDrop(false);
    }
  };

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
    history.push("/");
  };

  // The handle search method
  const handleSearch = (e) => {
    e.preventDefault();

    const res = values?.replace(" ", "-");
    const result = res?.replace(" ", "-");

    dispatch(search_product(values));
    setValues("");
    history.push(`/search/${result}`);
  };

  // cat navigate method
  const catNavigate = (response, id) => {
    dispatch({ type: GLOBALTYPES.CAT, payload: id });
    dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
    history.push(`/${response}`);
  };

  // route change based on the last route
  const routeChange = () => {
    dispatch({
      type: GLOBALTYPES.REDIRECT_ROUTE,
      payload: pathname,
    });
    history.push("/auth/login");
  };

  //

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid heading">
        <Link href="/">
          <div className="logo-module">
            <img src="/images/new-logo-light.png" alt="" className="logos" />
          </div>
        </Link>

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
                        // <  to=`}>
                        <div
                          onClick={() => catNavigate(response, category._id)}
                          key={category._id}
                          className="select-dropdown"
                        >
                          <BsUiChecksGrid className="category-icon" />{" "}
                          {category.name}
                        </div>
                        // </>
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

          <div className="nav-div">
            {!token.token && (
              <div className="auth-div">
                <Link href="/auth/register">
                  <button className="sign-up">Sign up</button>
                </Link>

                <button onClick={routeChange}>Sign in</button>
              </div>
            )}

            {token.token && (
              <div className="user" onClick={() => setClick(!click)}>
                <img
                  src={
                    user.profile_pic ? user.profile_pic : "/images/avatar.jpg"
                  }
                  alt="user"
                />
                <FaChevronDown className="user-dropdown" />

                {click && (
                  <Dropdown className="profile-dropdown">
                    <div ref={clickRef}>
                      <Link href="/dashboard/overview">
                        <div className="user-div">
                          <FiGrid className="user-div-icons" />
                          <div className="link">Dashboard</div>
                        </div>
                      </Link>

                      <Link href="/dashboard/profile">
                        <div className="user-div">
                          <FaRegUser className="user-div-icons" />
                          <div className="link">My Profile</div>
                        </div>
                      </Link>

                      <Link href="/market">
                        <div className="user-div">
                          <MdOutlineSell className="user-div-icons seller" />
                          <div className="link">Market Place</div>
                        </div>
                      </Link>

                      {/* {user.userType !== 'vendor' && (
                        <Link to='/register-vendor'>
                          <div className='user-div'>
                            <FiUserCheck className='user-div-icons seller' />
                            <div className='link'>Become a vendor</div>
                          </div>
                        </Link>
                      )} */}

                      <Link href="/dashboard/settings">
                        <div className="user-div">
                          <FiSettings className="user-div-icons" />
                          <div className="link">Settings</div>
                        </div>
                      </Link>

                      <Link href="/dashboard/wallet">
                        <div className="user-div">
                          <BiWalletAlt className="user-div-icons" />
                          <div className="link">My Wallet</div>
                        </div>
                      </Link>

                      <hr className="mb-3" />
                      <div className="user-div" onClick={logoutUser}>
                        <HiOutlineLogout className="user-div-icons logout" />
                        <div className="link">Logout</div>
                      </div>
                    </div>
                  </Dropdown>
                )}
              </div>
            )}

            <div className="cart" onClick={() => history.push("/cart")}>
              {/* <img src='/assets/cart.png' alt='cart' /> */}
              <BsCart4 />
              <div className="carting">Cart</div>
              {token.token ? (
                <div className="count">{cart?.length}</div>
              ) : (
                <div className="count">{productcart?.length}</div>
              )}
            </div>

            {token.token && (
              <div className="balance">
                {show ? (
                  <BsEye
                    onClick={() => setShow(!show)}
                    className="balance-eye"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={() => setShow(!show)}
                    className="balance-eye"
                  />
                )}
                <h4>Balance:</h4> &nbsp;
                {alert.loading ? (
                  <Loading height="15px" width="15px" color="#351590" />
                ) : (
                  <h3>
                    {show ? (
                      <b>₦{addComma(walletBalance)}</b>
                    ) : (
                      <b className="balance-hide">*****</b>
                    )}
                  </h3>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
