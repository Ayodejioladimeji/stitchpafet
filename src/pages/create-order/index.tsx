import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { formatMoney, removeNum } from "@/utils/utils";
import { GetRequest, PostRequest, postDataImages } from "@/utils/request";
import { checkImage } from "@/utils/checkImage";
import cogoToast from "cogo-toast";
import Goback from "@/common/goback/Goback";
import Loading from "@/common/loading";
import { useSelector } from "react-redux";
import Layout from "@/dashboard/common/Layout";
import { FaTimesCircle } from "react-icons/fa";

//

const initialValues: any = {
  itemDescription: "",
  itemSize: "",
  itemValue: "",
  schedule: "now",
  request_images: [],
  order_images: [],
  date: "",
  product_colors: [],
  colors: null
};

//

const CreateOrder = () => {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [values, setValues] = useState(initialValues);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [check, setCheck] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { token } = useSelector((state: any) => state.auth)

  // get user token from local storage
  useEffect(() => {

    // redirect the user if not logged in
    if (!token) {
      router.push("/");
      return;
    }
    setAuthLoading(false);
  }, [router]);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // handle Image --
  const handleImage = async (e: any) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err) {
      cogoToast.error(err);
      return;
    }

    // const newFile = URL.createObjectURL(file);

    const newFile = {
      file: file,
    };

    try {
      setUploading(true);
      const res = await postDataImages(
        "/orders/packages-upload",
        newFile,
        token
      );

      setValues((prevState) => ({
        ...prevState,
        request_images: [...values.request_images, ...res.data.data],
      }));
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }

    e.target.value = "";
  };

  // remove image
  const removeImage = async (id: number) => {
    const newImages = values.request_images.filter(
      (item: any, index: number) => index !== id
    );
    setValues((prevState) => ({
      ...prevState,
      request_images: newImages,
    }));
  };


  // handleChoose color for choosing preferred colors
  const handleChooseColor = (e) => {
    e.preventDefault();
    if (values.product_colors.includes(values.color)) {
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

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate item value - item value should not be less than 50naira
    if (removeNum(values?.itemValue) < 50) {
      cogoToast.error("Item value cannot be less than 50 naira");
      return;
    }

    try {
      setButtonLoading(true);

      const newData = {
        itemDescription: values.itemDescription,
        itemSize: values.itemSize,
        itemValue: values.itemValue,
        schedule: values.schedule,
        request_images: values.request_images,
        date: values.schedule === "now" ? new Date() : values.date,
        isScheduled: values.schedule === "now" ? false : true,
      };

      await PostRequest("/orders/create-order-cache", newData, token);

      // router.push(CREATE_REQUEST_CARRIER);
      setButtonLoading(false);
    } catch (error) {
      if (error?.code === "ERR_NETWORK") {
        cogoToast.error("Something went wrong", { hideAfter: 5 });
      } else {
        cogoToast.error(error?.response?.data?.message, { hideAfter: 5 });
      }
      setButtonLoading(false);
    }
  };

  // open Tour
  const openTour = () => {
    setCheck(true);
  };

  if (authLoading) return;

  //

  return (
    <>
      <Layout>
        <div className="dashboard-container">

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
                  value={values.itemValue}
                  name="itemValue"
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      itemValue: formatMoney(e.target.value),
                    }))
                  }
                  maxLength={10}
                />
              </div>

              <div className="form-box col-6">
                <label className="item-value" htmlFor="value">
                  Product Category
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  id="value"
                  value={values.itemValue}
                  name="itemValue"
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      itemValue: formatMoney(e.target.value),
                    }))
                  }
                  maxLength={10}
                />
              </div>

              <div className="form-box col-6">
                <label className="item-value" htmlFor="value">
                  Product Amount
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  id="value"
                  value={values.itemValue}
                  name="itemValue"
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      itemValue: formatMoney(e.target.value),
                    }))
                  }
                  maxLength={10}
                />
              </div>

              <div className="form-box col-6">
                <label className="item-value" htmlFor="value">
                  Product Discount%
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  id="value"
                  value={values.itemValue}
                  name="itemValue"
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      itemValue: formatMoney(e.target.value),
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
                  value={values.itemDescription}
                  name="itemDescription"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-box">
                <label className="item-image" htmlFor="Image">
                  Item Image (maximum of 6 images){" "}
                </label>

                {values.request_images.length === 0 && !loading ? (
                  <button type="button" id="img" className="upload-box">
                    <small className="mb-0">
                      {uploading ? (
                        <Loading
                          height="30px"
                          width="30px"
                          primaryColor="#888"
                          secondaryColor="#888"
                        />
                      ) : (
                        <>
                          <input
                            autoComplete="off"
                            type="file"
                            accept="image/*"
                            id="Image"
                            className="file-up"
                            onChange={handleImage}
                          />
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
                        </>
                      )}
                    </small>
                  </button>
                ) : (
                  <div className="image-scroll">
                    <div className="square-box row align-items-center mb-3">
                      {values?.request_images?.map((image, index: number) => {
                        return (
                          <div className="col-3" key={index}>
                            <div className="squre-img">
                              <button
                                type="button"
                                className="d-flex justify-content-center align-items-center"
                              >
                                <i
                                  className="bi bi-x-lg"
                                  onClick={() => removeImage(index)}
                                ></i>
                              </button>

                              <Image
                                height={100}
                                width={100}
                                src={image}
                                className="img-fluid"
                                alt="image"
                              />
                            </div>
                          </div>
                        );
                      })}

                      {values.request_images.length !== 0 &&
                        values.request_images.length !== 4 && (
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
                                onChange={handleImage}
                              />
                              {uploading ? (
                                <Loading
                                  height="25px"
                                  width="25px"
                                  primaryColor="#888"
                                  secondaryColor="#888"
                                />
                              ) : (
                                <i className="bi bi-plus-lg"></i>
                              )}
                              Upload
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-box">
                <label>Choose Product Colors</label>
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
                  <button
                    className="productcolors-btn"
                    onClick={handleChooseColor}

                  >
                    Choose color
                  </button>
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


              <button
                type="submit"
                id="next"
                className="nexts"
                disabled={
                  !values.itemDescription ||
                    !values.itemSize ||
                    values.itemSize === "---" ||
                    !values.itemValue ||
                    (values.schedule === "later" && !values.date)
                    ? true
                    : false
                }
              >
                {buttonLoading ? (
                  <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#fff"
                    secondaryColor="#fff"
                  />
                ) : (
                  "Create Product"
                )}
              </button>
            </form>
          )}
        </div>
      </Layout>
    </>
  );
};

export default CreateOrder;
