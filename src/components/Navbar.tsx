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
  const { token, user, productcart } = useSelector((state: any) => state.auth);
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


  // Click outside side effect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
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
    router.push("/");
    // window.localStorage.clear();
    dispatch({ type: GLOBALTYPES.TOKEN, payload: null });
    dispatch({ type: GLOBALTYPES.REDIRECT_ROUTE, payload: null });

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
    <div className="navbar navbar-expand-lg">
      <div className="container heading">
        <div className="logo-module" onClick={() => router.push("/")}>
          <Image
            src="/images/logo.jpeg"
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
                <small className="count">{datacart?.length || 0}</small>
              </div>

              {token && (
                <div className='user' onClick={() => setClick(!click)}>
                  <img
                    src={user.profile_pic ? user.profile_pic : "/images/avatar.jpg"}
                    alt='user'
                  />
                  <FaChevronDown className='user-dropdown' />

                  {click && (
                    <Dropdown>
                      <div ref={clickRef}>
                        <Link href='/overview'>
                          <div className='user-div'>
                            <FiGrid className='user-div-icons' />
                            <div className='link'>Dashboard</div>
                          </div>
                        </Link>

                        <Link href='/profile'>
                          <div className='user-div'>
                            <FaRegUser className='user-div-icons' />
                            <div className='link'>My Profile</div>
                          </div>
                        </Link>

                        <Link href='/market'>
                          <div className='user-div'>
                            <MdOutlineSell className='user-div-icons seller' />
                            <div className='link'>Market Place</div>
                          </div>
                        </Link>

                        {/* {user.userType !== 'vendor' && (
                        <Link href='/register-vendor'>
                          <div className='user-div'>
                            <FiUserCheck className='user-div-icons seller' />
                            <div className='link'>Become a vendor</div>
                          </div>
                        </Link>
                      )} */}

                        <Link href='/settings'>
                          <div className='user-div'>
                            <FiSettings className='user-div-icons' />
                            <div className='link'>Settings</div>
                          </div>
                        </Link>

                        <Link href='/wallet'>
                          <div className='user-div'>
                            <BiWalletAlt className='user-div-icons' />
                            <div className='link'>My Wallet</div>
                          </div>
                        </Link>

                        <hr className='mb-3' />
                        <div className='user-div' onClick={logoutUser}>
                          <HiOutlineLogout className='user-div-icons logout' />
                          <div className='link'>Logout</div>
                        </div>
                      </div>
                    </Dropdown>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
