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
import { GetRequest } from "@/utils/request";

//
const Navbar = () => {
  const { token, user } = useSelector((state: any) => state.auth);
  const { datacart } = useSelector((state: any) => state.product);
  const { callback } = useSelector((state: any) => state.utils);
  const [click, setClick] = useState(false);
  const [selectDrop, setSelectDrop] = useState(false);
  const [categories, setCategories] = useState(false);
  const clickRef = useRef(null);
  const dispatch = useDispatch();
  const [values, setValues] = useState("");
  const router = useRouter()
  const { pathname } = router.query
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState(0)
  const [usertoken, setUsertoken] = useState(null)

  // get the cart length
  useEffect(() => {
    setCart(datacart?.length)
    setUsertoken(token)
  }, [])

  // get categories
  useEffect(() => {
    if (token) {
      const getCategories = async () => {
        const res = await GetRequest("/categories")
        if (res?.status === 200) {
          setCategories(res.data.categories)
        }
        setLoading(false)
      }
      getCategories()
    }
  }, [token, callback])


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
            src="/images/logo.svg"
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
                    .concat(categories)
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
            {!usertoken && (
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

              {usertoken && (
                <div className='user' onClick={() => router.push("/overview")}>
                  <img
                    src={user.profile_pic ? user.profile_pic : "/images/avatar.jpg"}
                    alt='user'
                  />
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
