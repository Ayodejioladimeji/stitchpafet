import React, { useState, useRef, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//
import Tabs from "../tab/Tabs";
import LoadMore from "./../../common/loadmore/LoadMore";
import { Link } from "react-router-dom";

import DetailsThumb from "./DetailsThumb";
import { addComma } from "comma-separator";
import Loading from "./../../common/Loading";
import { GLOBALTYPES } from "./../../redux/actions/globalTypes";
import { addCart } from "./../../redux/actions/ProductAction";
import ProductCard from "./../../common/productcard/ProductCard";
import { FaCartPlus } from "react-icons/fa";

//

const Detail = () => {
  const { all_product, cartcallback } = useSelector((state) => state.product);
  const { alert } = useSelector((state) => state);
  const { token, productcart, redirect_route } = useSelector(
    (state) => state.auth
  );
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  // const [count, setCount] = useState(1);
  const [index, setIndex] = useState(0);
  const imgDiv = useRef();
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [detailProduct, setDetailProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(12);
  const [load, setLoad] = useState(false);

  const showItems = () => {
    setLoad(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 6);
      setLoad(false);
    }, 2000);
  };

  //  get detail product
  useEffect(() => {
    if (id) {
      all_product.forEach((item) => {
        if (item._id === id) {
          setDetailProduct(item);
        }
      });
    }
  }, [all_product, id]);

  const {
    _id,
    productname,
    productamount,
    vendor,
    productimages,
    productcolors,
    productsizes,
    productdiscount,
    productdescription,
    productoldamount,
  } = detailProduct;

  // setColor method
  const setColor = (color) => {
    setProductColor(color);
  };

  // Set Size method
  const setSize = (size) => {
    setProductSize(size);
  };

  //   Handle mouse move
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgDiv.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  // add to cart function
  const addToCart = (e) => {
    e.preventDefault();

    // check if the color and size is selected
    if (productcolors?.length >= 1 && productColor === "") {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Select the product color of your choice" },
      });

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {},
        });
      }, 3000);
      return;
    }

    if (productsizes?.length >= 1 && productSize === "") {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Select the product size of your choice" },
      });

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {},
        });
      }, 3000);
      return;
    }

    if (token.token) {
      const cartItems = [
        {
          product_id: _id,
          quantity: 1,
        },
      ];

      dispatch(addCart(cartItems, token.token, cartcallback, setLoading));
    } else {
      const check = productcart.every((item) => {
        return item._id !== _id;
      });

      if (check) {
        setLoading(true);
        const cartData = {
          _id,
          productname,
          productamount,
          productimages,
          productcolors: productColor,
          productsizes: productSize,
          productdiscount,
          productdescription,
          productoldamount,
          quantity: 1,
        };

        const dataCart = {
          product_id: _id,
          quantity: 1,
        };

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: "Item added to cart" },
        });
        dispatch({ type: GLOBALTYPES.PRODUCT_CART, payload: cartData });
        dispatch({ type: GLOBALTYPES.DATA_CART, payload: dataCart });
        setTimeout(() => {
          setLoading(false);
          dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        }, 2500);
      } else {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: "This item already exist in cart" },
        });
        setTimeout(() => {
          dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        }, 2500);
      }
    }
  };

  //similar product
  const similar = all_product.filter(
    (item) => item.categories === detailProduct.categories
  );

  // continue shopping method
  const continueBtn = () => {
    if (redirect_route === pathname) {
      history.push("/market");
    } else {
      history.goBack();
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-center">
        <h1>Product Details</h1>
        {alert.loading ? (
          <div className="detail-loading">
            <Loading width="25px" height="25px" color="#fff" />
          </div>
        ) : (
          <div className="product-detail-div">
            <div className="detail-one">
              <h2>{productname}</h2>
              <h1 className="detail-price">
                ₦{addComma(Number(productamount))}
              </h1>
              {productoldamount !== null && (
                <h2 className="detail-old-price">
                  ₦{addComma(Number(productoldamount))}
                </h2>
              )}
              <Link to={`/vendor/${vendor}`}>
                <p>{vendor}</p>
              </Link>

              <DetailsThumb
                indexs={index}
                images={productimages && productimages}
                setIndex={setIndex}
              />

              <button onClick={continueBtn} className="continue-shopping">
                Continue Shopping
              </button>
            </div>

            {/* detail two */}
            <div className="detail-two">
              <div
                className="detail-two-inside"
                onMouseMove={handleMouseMove}
                style={{
                  backgroundImage:
                    productimages && `url(${productimages[index]})`,
                }}
                ref={imgDiv}
                onMouseLeave={() =>
                  (imgDiv.current.style.backgroundPosition = `center`)
                }
              />
            </div>

            {/* detail three */}
            <div className="detail-three">
              <img src="/assets/products/star.svg" alt="" />

              {productcolors?.length !== 0 && (
                <div className="colors-section">
                  <small>Color</small>
                  <div className="color-div">
                    {productcolors?.map((color, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setColor(color)}
                          className={
                            productColor === color
                              ? "active-color"
                              : "main-color"
                          }
                        >
                          <div
                            className="actual-color"
                            style={{ background: color }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {productsizes?.length !== 0 && (
                <div className="size">
                  <small>Size</small>
                  <div className="size-div">
                    {productsizes?.map((size, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setSize(size)}
                          className={
                            productSize === size ? "active-size" : "main-size"
                          }
                        >
                          {size}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {productdiscount !== null && (
                <div className="size">
                  <small>Discount</small>
                  <span className="discounts">-{productdiscount}%</span>
                </div>
              )}

              <div className="brand-name mt-3">
                <p>
                  Brand : <b>LG</b>
                </p>
              </div>

              <button onClick={addToCart} className="add-cart">
                {loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : (
                  <>
                    <FaCartPlus className="cart-plus" /> Add to cart
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* description section */}
      <div className="description">
        <Tabs productdescription={productdescription} />
      </div>

      {/* more products section */}
      <div className="more-products">
        <h3>Similar Products</h3>
        <div className="more-products-center">
          {similar.slice(0, visible).map((item) => (
            <ProductCard {...item} key={item._id} />
          ))}
        </div>
      </div>

      {/* show more button */}
      {visible > similar.length ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default Detail;
