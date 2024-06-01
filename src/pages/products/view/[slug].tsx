import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { useRouter } from "next/router";
import { formatMoney } from "@/utils/utils";
import { data } from "@/constants/SecureData";
import { colors } from "@/constants/colors";
import { RatingsIcon } from "@/assets/svg";
import Card from "@/common/card/Card";
import Breadcumb from "@/components/Breadcumb";
import Tabs from "@/components/Tabs";
import cogoToast from "cogo-toast";
import Layout from "@/dashboard/common/Layout";
import Loading from "@/common/loading";
import DetailsThumb from "@/components/details/DetailsThumb";
import { GetRequest } from "@/utils/request";

//

const DashboardProductDetail = () => {
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
        if (token && slug) {
            const getProduct = async () => {
                const res = await GetRequest(`/product/${slug}`, token)
                if (res?.status === 200) {
                    setProduct(res.data.product)
                }
                setLoading(false)
            }
            getProduct()
        }
    }, [token, slug]);



    // setColor method
    const setColor = (color) => {
        setProductColor(color);
    }

    if (loading) return;
    // 

    return (
        <Layout>
            <div className="dashboard-product-detail">
                <div className="container">

                    {alert.loading ? (
                        <div className="detail-loading">
                            <Loading width="25px" height="25px" primaryColor="#000" secondaryColor="#000" />
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
                                                product?.images && `url(${product?.images[index]?.url})`,
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
                                    <h2>{product?.name}</h2>
                                    <h1 className="detail-price">
                                        ₦{formatMoney(Number(product?.amount))}
                                    </h1>

                                    <RatingsIcon />

                                    <p className="desc">{product?.description}</p>

                                    <div className="ruler" />

                                    {product?.colors?.length !== 0 && (
                                        <div className="colors-section">
                                            <small>Color</small>
                                            <div className="color-div">
                                                {product?.colors?.map((color, index) => {
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
                                            <span className="discounts">-{parseInt(product?.discount)}%</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}


                    {/* description section */}
                    <div className="description">
                        <Tabs productdescription={product.description} />
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default DashboardProductDetail;
