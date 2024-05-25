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
import Breadcumb from "@/components/Breadcumb";
import Tabs from "@/components/Tabs";
import cogoToast from "cogo-toast";

//

const ProductDetail = () => {
    const router = useRouter()
    const { slug } = router.query
    const { all_product, datacart, cartcallback } = useSelector((state: any) => state.product);
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
    const [loading, setLoading] = useState(true);
    const [buttonloading, setButtonloading] = useState(false);
    const [visible, setVisible] = useState(10);
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
        if (slug) {
            data.find((item) => {

                if (item.id === slug) {
                    setProduct(item);
                    console.log(item)
                    setLoading(false)
                }
            });
        }
    }, [slug]);


    // setColor method
    const setColor = (color) => {
        setProductColor(color);
    }

    // add to cart function
    const addToCart = (e) => {
        e.preventDefault();

        // check if the color and size is selected
        if (product?.colors?.length >= 1 && productColor === "") {
            cogoToast.error("Select the fabric color of your choice")
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
            const check = datacart.every((item) => {
                return item.id !== product?.id;
            });

            if (check) {
                setLoading(true);
                const cartData = {
                    ...product,
                    colors: productColor,
                    quantity: 1,
                };

                // const dataCart = {
                //     product_id: product?.id,
                //     quantity: 1,
                // };

                cogoToast.success("Item added to cart")
                // dispatch({ type: GLOBALTYPES.PRODUCT_CART, payload: cartData });
                dispatch({ type: GLOBALTYPES.DATA_CART, payload: cartData });
                setLoading(false)

            } else {
                cogoToast.error("This item already exist in cart")
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

    if (loading) return;
    // 

    return (
        <Layout>
            <div className="product-detail">
                <Breadcumb title={product?.title} />
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
                                        // onMouseMove={handleMouseMove}
                                        style={{
                                            backgroundImage:
                                                product?.images && `url(${product?.images[index]})`,
                                        }}
                                    // ref={imgDiv}
                                    // onMouseLeave={() =>
                                    //     (imgDiv.current.style.backgroundPosition = `center`)
                                    // }
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
                                    <p>Category: {product?.category}</p>
                                    <h2>{product?.title}</h2>
                                    <h1 className="detail-price">
                                        ₦{formatMoney(Number(product?.price))}
                                    </h1>

                                    <RatingsIcon />

                                    <p className="desc">This is the category for the item you just ordered, the order can get to you today or tomorrow</p>

                                    <div className="ruler" />

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



                                    <div className="d-flex align-items-center gap-3">
                                        <button onClick={addToCart} className="add-cart">
                                            {buttonloading ? (
                                                <Loading width="20px" height="20px" color="#fff" />
                                            ) : (
                                                <>
                                                    Add to cart
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
                    <div className="description">
                        <Tabs productdescription={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis purus sit amet volutpat consequat mauris nunc. Sed viverra tellus in hac. Sodales neque sodales ut etiam. Sed blandit libero volutpat sed. Enim facilisis gravida neque convallis a. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Vulputate mi sit amet mauris commodo quis. Nulla facilisi cras fermentum odio eu. Tincidunt dui ut ornare lectus sit amet. Ac turpis egestas maecenas pharetra convallis. Amet commodo nulla facilisi nullam vehicula ipsum. Orci a scelerisque purus semper eget duis at tellus at. Nisi vitae suscipit tellus mauris a. Ipsum a arcu cursus vitae congue mauris rhoncus. In eu mi bibendum neque.
Tincidunt ornare massa eget egestas purus viverra accumsan in. Mattis enim ut tellus elementum sagittis vitae. Varius vel pharetra vel turpis nunc. Pretium viverra suspendisse potenti nullam ac. Quisque egestas diam in arcu cursus euismod quis viverra. Suspendisse in est ante in nibh mauris. Fames ac turpis egestas integer eget. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Egestas egestas fringilla phasellus faucibus scelerisque. Gravida cum sociis natoque penatibus et magnis dis. Interdum velit laoreet id donec ultrices tincidunt. Morbi tincidunt ornare massa eget egestas. Vulputate odio ut enim blandit. Lectus urna duis convallis convallis tellus id interdum. Proin libero nunc consequat interdum varius sit amet mattis vulputate. Tellus molestie nunc non blandit massa enim nec.
Gravida in fermentum et sollicitudin ac orci. Porttitor eget dolor morbi non. Elementum nibh tellus molestie nunc non blandit massa enim nec. Id cursus metus aliquam eleifend mi in nulla posuere. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Et netus et malesuada fames ac. Enim blandit volutpat maecenas volutpat blandit. Egestas erat imperdiet sed euismod nisi porta lorem mollis. Consequat interdum varius sit amet mattis. Blandit libero volutpat sed cras.`} />
                    </div>

                    <div className="rule" />

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
