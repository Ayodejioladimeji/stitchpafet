import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { formatMoney, removeNum } from "@/utils/utils";
import { GetRequest, PatchRequest, PostRequest, PutRequest, postDataImages } from "@/utils/request";
import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/dashboard/common/Layout";
import { FaTimesCircle } from "react-icons/fa";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { imageUpload } from "@/utils/imageUpload";
import Goback from "@/common/goback/Goback";

//

const initialValues: any = {
    name: "",
    category: "",
    oldAmount: "",
    newAmount: "",
    description: "",
    product_colors: [],
    colors: null
};

//

const EditProduct = () => {
    const router = useRouter();
    const { slug } = router.query
    const [authLoading, setAuthLoading] = useState(true);
    const [values, setValues] = useState(initialValues);
    const [buttonloading, setButtonloading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state: any) => state.auth)
    const { callback } = useSelector((state: any) => state.utils)
    const [images, setImages] = useState<any>([])
    const [category, setCategory] = useState(null)
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null)


    // get user token from local storage
    useEffect(() => {
        // redirect the user if not logged in
        if (!token) {
            router.push("/");
            return;
        }
        setAuthLoading(false);
    }, [router]);

    //  get detail product
    useEffect(() => {
        if (token && slug) {
            const getProduct = async () => {
                const res = await GetRequest(`/product/${slug}`, token)
                if (res?.status === 200) {
                    setProduct(res.data.product)
                    const newData = {
                        name: res?.data?.product?.name,
                        category: res?.data?.product?.category,
                        oldAmount: res?.data?.product?.old_amount,
                        newAmount: res?.data?.product?.amount,
                        description: res?.data?.product?.description,
                        product_colors: res?.data?.product?.colors,
                        colors: null
                    }

                    setValues(newData)
                    setImages(res?.data?.product?.images)
                }
                setLoading(false)
            }
            getProduct()
        }
    }, [token, slug]);

    // get categories
    useEffect(() => {
        if (token) {
            const getCategories = async () => {
                const res = await GetRequest("/categories")
                if (res?.status === 200) {
                    setCategory(res.data.categories)
                }
                setLoading(false)
            }
            getCategories()
        }
    }, [token])

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };


    // handleChoose color for choosing preferred colors
    const handleChooseColor = (e) => {
        e.preventDefault();
        if (values.product_colors.includes(values.color) || values.product_colors.length >= 6) {
            return;
        }

        setValues((prevState) => ({
            ...prevState,
            product_colors: [values.color, ...values.product_colors],
        }));
    };

    // Remove color method
    const handleRemoveColor = (id) => {
        const newColors = values.product_colors.filter((item, index) => index !== id);

        setValues((prevState) => ({
            ...prevState,
            product_colors: newColors,
        }));
    };

    const handleUploadInput = e => {

        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if (files.length === 0)
            return cogoToast.error('Files does not exist.')

        files.forEach(file => {
            if (file.size > 1024 * 1024)
                return err = 'The largest image size is 1mb'

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return err = 'Image format is incorrect.'

            num += 1;
            if (num <= 6) newImages.push(file)
            return newImages;
        })

        if (err) cogoToast.error(err)

        const imgCount = images.length
        if (imgCount + newImages.length > 6)
            return cogoToast.error('Select up to 6 images.')
        setImages([...images, ...newImages])
    }


    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate item value - item value should not be less than 50naira
        if (removeNum(values?.itemValue) < 50) {
            cogoToast.error("Item value cannot be less than 50 naira");
            return;
        }

        setButtonloading(true)

        // calculate discount
        const discount =
            ((removeNum(values.oldAmount) -
                removeNum(values.newAmount)) *
                100) /
            removeNum(values.oldAmount);

        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if (imgNewURL.length > 0) {
            media = await imageUpload(imgNewURL)
        }


        const payload = {
            name: values.name,
            category: values.category,
            amount: Number(removeNum(values.newAmount)),
            old_amount: Number(removeNum(values.oldAmount)),
            discount,
            description: values.description,
            product_colors: values.product_colors,
            images: [...imgOldURL, ...media],
        };


        const res = await PutRequest(`/product/${slug}`, payload, token);

        if (res?.status === 200) {
            dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback })
            cogoToast.success(res.data.msg)
        }
        setButtonloading(false)
    };



    if (authLoading) return;

    //

    return (
        <Layout>
            <div className="dashboard-container">
                <div className="container">

                    <div className="mb-3">
                        <Goback size="25px" />
                    </div>

                    {loading ? (
                        <div className="form d-flex align-items-center text-center justify-content-center">
                            <Loading
                                height="60px"
                                width="60px"
                                primaryColor="#ffc619"
                                secondaryColor="#ffc619"
                            />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="form row">

                            <div className="form-box col-6">
                                <label className="item-value" htmlFor="value">
                                    Product Name
                                </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    id="value"
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-box col-6">
                                <label className="item-value" htmlFor="value">
                                    Product Category
                                </label>
                                <select className="form-select" value={values.category}
                                    name="category"
                                    onChange={handleChange}>
                                    <option defaultValue="">---</option>
                                    {category?.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="form-box col-6">
                                <label className="item-value" htmlFor="value">
                                    Old Amount
                                </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    id="value"
                                    value={values.oldAmount}
                                    name="oldAmount"
                                    onChange={(e) =>
                                        setValues((prevState) => ({
                                            ...prevState,
                                            oldAmount: formatMoney(e.target.value),
                                        }))
                                    }
                                    maxLength={10}
                                />
                            </div>

                            <div className="form-box col-6">
                                <label className="item-value" htmlFor="value">
                                    New Amount
                                </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    id="value"
                                    value={values.newAmount}
                                    name="newAmount"
                                    onChange={(e) =>
                                        setValues((prevState) => ({
                                            ...prevState,
                                            newAmount: formatMoney(e.target.value),
                                        }))
                                    }
                                    maxLength={10}
                                />
                            </div>

                            <div className="form-box">
                                <label className="item-description" htmlFor="Description">
                                    Product Description
                                </label>
                                <textarea
                                    id="Description"
                                    rows={3}
                                    value={values.description}
                                    name="description"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="form-box">
                                <label className="item-image" htmlFor="Image">
                                    Item Image (maximum of 6 images){" "}
                                </label>

                                {images.length === 0 && !loading ? (
                                    <button type="button" id="img" className="upload-box">
                                        <small className="mb-0">


                                            <input type="file" id="Image" className="file-up"
                                                onChange={handleUploadInput} multiple accept="image/*" />
                                            <svg
                                                className="mb-3"
                                                width="40"
                                                height="36"
                                                viewBox="0 0 40 36"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M31.2756 8.21999V8.21999C30.5296 8.21999 29.8536 7.78999 29.5356 7.11799C28.9616 5.90199 28.2316 4.34799 27.7996 3.50199C27.1616 2.24399 26.1276 1.51199 24.6956 1.50199C24.6716 1.49999 15.3276 1.49999 15.3036 1.50199C13.8716 1.51199 12.8396 2.24399 12.1996 3.50199C11.7696 4.34799 11.0396 5.90199 10.4656 7.11799C10.1476 7.78999 9.4696 8.21999 8.7256 8.21999V8.21999C4.7336 8.21999 1.4996 11.454 1.4996 15.444V27.316C1.4996 31.304 4.7336 34.54 8.7256 34.54H31.2756C35.2656 34.54 38.4996 31.304 38.4996 27.316V15.444C38.4996 11.454 35.2656 8.21999 31.2756 8.21999Z"
                                                    stroke="#333333"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M13.6428 20.6692C13.6408 24.1752 16.5028 27.0432 20.0028 27.0412C23.4968 27.0372 26.3508 24.1812 26.3568 20.6832C26.3628 17.1712 23.5108 14.3092 20.0068 14.3052C16.4828 14.3012 13.6148 17.2112 13.6428 20.6692Z"
                                                    stroke="#333333"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M29.805 15.9902C29.6118 15.9703 29.4209 15.9199 29.2072 15.8339C28.9694 15.7283 28.7636 15.5939 28.5646 15.3917C28.207 15.0114 28 14.5141 28 14.001C28 13.7284 28.0557 13.4583 28.1645 13.2136C28.2736 12.9657 28.4028 12.7566 28.6364 12.5291C28.814 12.3744 28.996 12.2499 29.2448 12.1403C29.9826 11.8479 30.8602 12.0226 31.4087 12.5708C31.573 12.7328 31.7115 12.9282 31.7883 13.093L31.8338 13.2099C31.9443 13.4583 32 13.7284 32 14.001C32 14.5244 31.7956 15.0086 31.4163 15.4115C31.0884 15.7416 30.6578 15.9446 30.1984 15.9902L30 16L29.805 15.9902Z"
                                                    fill="#333333"
                                                />
                                            </svg>
                                            <br />
                                            <i className="bi bi-upload"></i>Click to upload


                                        </small>
                                    </button>
                                ) : (
                                    <div className="image-scroll">
                                        <div className="square-box mb-3">
                                            {images?.map((image, index: number) => {
                                                return (
                                                    <div className="squre-img">
                                                        <div onClick={() => deleteImage(index)}
                                                            className="delete"
                                                        >
                                                            <i
                                                                className="bi bi-x-lg"
                                                            ></i>
                                                        </div>

                                                        <Image
                                                            height={100}
                                                            width={100}
                                                            src={image.url ? image.url : URL.createObjectURL(image)}
                                                            className="img-fluid"
                                                            alt="image"
                                                        />
                                                    </div>
                                                );
                                            })}

                                            {images.length !== 0 &&
                                                images.length !== 6 && (
                                                    <div className="col-3">
                                                        <button
                                                            id="multiple-img"
                                                            className="d-flex upload-box flex-column align-items-center justify-content-center"
                                                        >
                                                            <input
                                                                autoComplete="off"
                                                                type="file"
                                                                id="Image"
                                                                className="file-up"
                                                                onChange={handleUploadInput}
                                                            />

                                                            <i className="bi bi-plus-lg"></i>
                                                            Upload
                                                        </button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-box">
                                <label>Choose Product Colors (maximum of 6)</label>
                                <div className="main-color-input">
                                    <input
                                        type="color"
                                        id="favcolor"
                                        name="color"
                                        value={values.color}
                                        className="color-input"
                                        onChange={handleChange}
                                        required
                                    />


                                    {values?.product_colors?.length < 6 && <button
                                        className="productcolors-btn"
                                        onClick={handleChooseColor}

                                    >
                                        Choose color
                                    </button>}
                                </div>

                                <div className="product-colors">
                                    {values.product_colors?.map((color, index) => (
                                        <div
                                            key={index}
                                            style={{ background: color }}
                                            className="product-colors-box"
                                        >
                                            <FaTimesCircle
                                                className="time-circle2"
                                                onClick={() => handleRemoveColor(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-box">

                                <button
                                    type="submit"
                                    id="next"
                                    className="nexts"
                                    disabled={
                                        !values?.name ||
                                            !values?.category ||
                                            !values?.oldAmount ||
                                            !values?.newAmount ||
                                            !values?.description ||
                                            values?.product_colors?.length === 0 ||
                                            images?.length === 0
                                            ? true
                                            : false
                                    }
                                >
                                    {buttonloading ? (
                                        <Loading
                                            height="25px"
                                            width="25px"
                                            primaryColor="#fff"
                                            secondaryColor="#fff"
                                        />
                                    ) : (
                                        "Update Product"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default EditProduct;
