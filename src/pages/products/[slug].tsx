import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//
import LoadMore from "../../common/loadmore/LoadMore";
import Loading from "../../common/Loading";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { formatMoney } from "@/utils/utils";
import DetailsThumb from "../../components/details/DetailsThumb";
import { data } from "@/constants/SecureData";
import Layout from "@/common/Layout";
import { colors } from "@/constants/colors";
import { RatingsIcon } from "@/assets/svg";
import Card from "@/common/card/Card";

//

const ProductDetail = () => {
    const router = useRouter()
    const { slug } = router.query
    const { all_product, cartcallback } = useSelector((state: any) => state.product);
    const { alert } = useSelector((state: any) => state);
    const { token, productcart, redirect_route } = useSelector(
        (state: any) => state.auth
    );
    const [productColor, setProductColor] = useState("");
    const [productSize, setProductSize] = useState("");
    const [index, setIndex] = useState(0);
    const imgDiv = useRef(null);
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(10);
    const [load, setLoad] = useState(false);
    const [count, setCount] = useState(1)

    const showItems = () => {
        setLoad(true);
        setTimeout(() => {
            setVisible((prevState) => prevState + 6);
            setLoad(false);
        }, 2000);
    };

    //  get detail product
    useEffect(() => {

        if (slug) {
            data.forEach((item) => {

                if (item.id === slug) {
                    setProduct(item);
                    console.log(item)
                }
            });
        }
    }, [slug]);


    // setColor method
    const setColor = (color) => {
        setProductColor(color);
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
        if (product?.colors?.length >= 1 && productColor === "") {
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

        if (token.token) {
            const cartItems = [
                {
                    product_id: product?.id,
                    quantity: 1,
                },
            ];

            // dispatch(addCart(cartItems, token.token, cartcallback, setLoading));
        } else {
            const check = productcart.every((item) => {
                return item._id !== product?.id;
            });

            if (check) {
                setLoading(true);
                const cartData = {
                    id: product?.id,
                    productname: product?.title,
                    productamount: product?.price,
                    productimages: product?.images,
                    productcolors: productColor,
                    productsizes: productSize,
                    productdiscount: product?.discount,
                    productdescription: product?.description,
                    quantity: 1,
                };

                const dataCart = {
                    product_id: product?.id,
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
        (item) => item.categories === product?.categories
    );

    // continue shopping method
    const continueBtn = () => {
        if (redirect_route === router.pathname) {
            router.push("/market");
        } else {
            router.back();
        }
    };

    // handle count
    const increase = () => {
        setCount(count + 1)
    }

    const decrease = () => {
        if (count > 1) {
            setCount(count - 1)
        }
        else {
            return
        }

    }

    return (
        <Layout>
            <div className="product-detail">
                <div className="container">

                    {alert.loading ? (
                        <div className="detail-loading">
                            <Loading width="25px" height="25px" color="#fff" />
                        </div>
                    ) : (
                        <div className="row mt-5">
                            <div className="col">

                                <div className="detail-left">
                                    <div
                                        className="detail-image"
                                        onMouseMove={handleMouseMove}
                                        style={{
                                            backgroundImage:
                                                product?.images && `url(${product?.images[index]})`,
                                        }}
                                        ref={imgDiv}
                                        onMouseLeave={() =>
                                            (imgDiv.current.style.backgroundPosition = `center`)
                                        }
                                    />


                                    <DetailsThumb
                                        indexs={index}
                                        images={product?.images && product?.images}
                                        setIndex={setIndex}
                                    />


                                </div>
                            </div>


                            {/* detail three */}
                            <div className="col">

                                <div className="detail-right">
                                    <p>{product?.title}</p>
                                    <h1 className="detail-price">
                                        ₦{formatMoney(Number(product?.price))}
                                    </h1>

                                    <RatingsIcon />

                                    <hr />

                                    {colors?.length !== 0 && (
                                        <div className="colors-section">
                                            <small>Color</small>
                                            <div className="color-div">
                                                {colors?.map((color, index) => {
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

                                    {product?.discount !== null && (
                                        <div className="discount-box">
                                            <p>Discount</p>
                                            <span className="discounts">-{product?.discount}%</span>
                                        </div>
                                    )}

                                    <div className="count-container">
                                        {/* <p>Yard(s)</p> */}
                                        <div className="count-box">
                                            <button onClick={decrease}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                                </svg>
                                            </button>

                                            <p>{count}</p>

                                            <button onClick={increase}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-3">
                                        <button onClick={addToCart} className="add-cart">
                                            {loading ? (
                                                <Loading width="20px" height="20px" color="#fff" />
                                            ) : (
                                                <>
                                                    <FaCartPlus className="cart-plus" /> Add to cart
                                                </>
                                            )}
                                        </button>

                                        <button onClick={continueBtn} className="continue-shopping">
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* description section */}
                    {/* <div className="description">
                        <Tabs productdescription={productdescription} />
                    </div> */}

                    {/* more products section */}
                    <div className="more-products">
                        <h3>Similar Products</h3>
                        <div className="more-products-center">
                            {data?.slice(0, visible).map((item, key) => (
                                <Card item={item} key={key} />
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
            </div>
        </Layout>
    );
};

export default ProductDetail;
