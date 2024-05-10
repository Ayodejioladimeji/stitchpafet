import React, { useState, useEffect } from "react";
import {
  strictAddComma,
  strictRemoveComma,
  removeComma,
} from "comma-separator";
import { FaTimesCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import parse from "html-react-parser";

import Loading from "../../../common/alert/Loading";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { subCategories } from "../../../redux/actions/ProductAction";
import EditDescription from "./EditDescription";
import Goback from "./../../../common/goback/Goback";

// initial State
const initialState = {
  product_name: "",
  product_amount: "",
  categories: "",
  sub_categories: "",
  product_old_amount: "",
  product_discount: "",
  product_description: "",
  product_images: [],
  product_colors: [],
  product_sizes: [],
  free_delivery: "",
  product_brand: "",
  err: "",
};

const EditProduct = () => {
  const { token } = useSelector((state) => state.auth);
  const { get_categories, get_sub_categories, vendor_product } = useSelector(
    (state) => state.product
  );
  const { alert } = useSelector((state) => state);
  const { callback } = useSelector((state) => state.dashboard);
  const [values, setValues] = useState(initialState);
  const [stateColor, setStateColor] = useState("#e66465");
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const {
    product_name,
    product_amount,
    categories,
    sub_categories,
    product_old_amount,
    product_discount,
    product_images,
    product_colors,
    product_sizes,
    product_description,
    free_delivery,
    product_brand,
    err,
  } = values;

  // getting the details of the edit product
  useEffect(() => {
    if (id) {
      vendor_product?.data?.forEach((item) => {
        if (item._id === id) {
          const vendorData = {
            product_name: item.productname,
            product_amount: item.productamount,
            categories: item.categories,
            sub_categories: item.subcategories,
            product_old_amount: item.productoldamount,
            product_discount: item.productdiscount,
            product_description: item.productdescription,
            product_images: item.productimages,
            product_colors: item.productcolors,
            product_sizes: item.productsizes,
            free_delivery: item.free_delivery,
            product_brand: item.product_brand,
          };

          setValues(vendorData);
        }
      });
    } else {
      console.log("no data");
      setValues(initialState);
    }
  }, [id, vendor_product]);

  // Get all sub categories
  useEffect(() => {
    if (categories) {
      dispatch(subCategories(categories, setLoading));
    }
  }, [dispatch, categories]);

  // OnChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value, err: "" });
  };

  // handleSize method
  const handleSize = (e) => {
    const res = e.target.value;

    if (product_sizes.includes(res)) {
      return;
    }

    setValues((prevState) => ({
      ...prevState,
      product_sizes: [res, ...product_sizes],
    }));
  };

  // handleColor method
  const handleColor = (e) => {
    setStateColor(e.target.value);
  };

  // handleChoose color for choosing preferred colors
  const handleChooseColor = (e) => {
    e.preventDefault();
    if (product_colors.includes(stateColor)) {
      return;
    }

    setValues((prevState) => ({
      ...prevState,
      product_colors: [stateColor, ...product_colors],
    }));
  };

  // convert image to base64
  const convert = (e) => {
    const file = e.target.files[0];
    if (file > 2000000) {
      console.log("File too large");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    if (product_images.length >= 5) {
      setImageError("You can only add 5 images");
      return;
    }

    reader.onload = () => {
      setValues((prevState) => ({
        ...prevState,
        product_images: [reader.result, ...product_images],
      })); //base64encoded string
      setImageError("");
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  // handleEditor method
  const handleEditor = (event, editor) => {
    const data = editor.getData();
    setValues((prevState) => ({
      ...prevState,
      product_description: data,
    }));
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product_name.length < 30) {
      return setValues({
        ...values,
        err: "Name should be more than 30 letters",
      });
    }

    if (product_name.length > 100) {
      return setValues({
        ...values,
        err: "Name should not be more than 100 letter",
      });
    }

    if (
      !product_amount ||
      !categories ||
      !sub_categories ||
      !product_old_amount ||
      !product_discount ||
      !product_images ||
      !product_colors ||
      !product_sizes ||
      !product_description ||
      !free_delivery ||
      !product_brand
    ) {
      return setValues({
        ...values,
        err: "Value cannot be empty",
      });
    }

    const filtDesc = parse(product_description);

    const newData = {
      product_name,
      product_amount: strictRemoveComma(product_amount),
      categories,
      sub_categories,
      product_old_amount: strictRemoveComma(product_old_amount),
      product_discount: removeComma(product_discount),
      product_description: filtDesc.props.children,
      product_images,
      product_colors,
      product_sizes,
      free_delivery,
      product_brand,
    };

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await axios.patch(
        `https://verifibiz.herokuapp.com/api/v1/product/${id}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });

        setValues(initialState);
        history.push("/dashboard/my-products");
      }, 3000);
      //
    } catch (error) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.error },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }
  };

  // handle delete method
  const handleDeleteSize = (id) => {
    const newData = product_sizes.filter((item, index) => index !== id);
    setValues((prevState) => ({
      ...prevState,
      product_sizes: newData,
    }));
  };

  const handleDeleteImage = (id) => {
    const newImages = product_images.filter((item, index) => index !== id);

    setValues((prevState) => ({
      ...prevState,
      product_images: newImages,
    }));
  };

  // Remove color method
  const handleRemoveColor = (id) => {
    const newColors = product_colors.filter((item, index) => index !== id);

    setValues((prevState) => ({
      ...prevState,
      product_colors: newColors,
    }));
  };

  //

  return (
    <div className="create-product">
      <div className="create-heading">
        <div className="create-header">
          <h2>Vendor Edit Product</h2>
          <p>Fill the form below to edit product</p>
          <Goback />
        </div>

        <div className="create-image">
          <img src="/assets/groceries.png" alt="" />
        </div>
      </div>

      <form>
        <div className="form-div">
          <div className="form-group">
            <label>Product name</label>
            <input
              type="text"
              placeholder="Mens Zipper Comfort Blazers Lightweight Jackets"
              name="product_name"
              value={product_name}
              onChange={handleChange}
              required
            />
            <small className="product-name">
              Product name should be properly specified
            </small>
          </div>

          <div className="form-group">
            <label>Free Delivery ?</label>
            <select
              onChange={handleChange}
              name="free_delivery"
              value={free_delivery}
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="form-div">
          <div className="form-group">
            <label>Product Old Price</label>
            <input
              type="text"
              placeholder="Enter old price"
              name="product_old_amount"
              value={product_old_amount}
              required
              onChange={(e) =>
                setValues({
                  ...values,
                  product_old_amount: strictAddComma(e.target.value),
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Product price</label>
            <input
              type="text"
              placeholder="Enter product amount"
              name="product_amount"
              value={product_amount}
              required
              onChange={(e) =>
                setValues({
                  ...values,
                  product_amount: strictAddComma(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className="form-div">
          <div className="form-group">
            <label>Categories</label>
            <select
              onChange={handleChange}
              name="categories"
              value={categories}
              required
            >
              <option value="">Choose Categories</option>
              {get_categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sub Categories</label>
            {loading ? (
              <small>Loading...</small>
            ) : (
              <select
                onChange={handleChange}
                name="sub_categories"
                value={sub_categories}
                required
              >
                <option value="">Choose sub Categories</option>
                {get_sub_categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Product brand</label>

          <input
            type="text"
            placeholder="LG"
            name="product_brand"
            value={product_brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-groups">
          <label>Product image</label>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={convert}
            required
          />
          <small>You can add maximum of 5 images</small>
          <span>{imageError}</span>

          <div className="product-image-display">
            {product_images.map((image, index) => {
              return (
                <div key={index} className="image-display">
                  <FaTimesCircle
                    className="time-circle"
                    onClick={() => handleDeleteImage(index)}
                  />
                  <img src={image} alt="" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-groups">
          <label>Choose Product Colors (optional)</label>
          <div className="main-color-input">
            <input
              type="color"
              id="favcolor"
              name="stateColor"
              value={stateColor}
              className="color-input"
              onChange={handleColor}
              required
            />
            <button
              className="productcolors-btn"
              onClick={handleChooseColor}
              style={{
                background: stateColor ? stateColor : "var(--primary-color)",
              }}
            >
              Choose color
            </button>
          </div>

          <div className="product-colors">
            {product_colors.map((color, index) => (
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

        {categories === "62e02ba4832770b3cf617b09" && (
          <div className="mt-5 form-groups">
            <label>Select Available Sizes (optional)</label>

            <select onChange={handleSize} name="size">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>

            <div className="product-size-box">
              {product_sizes.map((size, index) => (
                <div key={index} className="size-box">
                  {size}

                  <FaTimesCircle
                    className="time-circles"
                    onClick={() => handleDeleteSize(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 form-groups">
          <label>Product description</label>
          {/* <textarea
            placeholder="Enter product description"
            name="product_description"
            value={product_description}
            onChange={handleChange}
          /> */}

          <EditDescription
            handleEditor={handleEditor}
            value={product_description}
          />
        </div>

        <small className="product-name-error text-center my-3">
          {err ? err : ""}
        </small>

        <button onClick={handleSubmit} className="create-button">
          {alert.loading ? (
            <Loading width="20px" height="20px" color="#fff" />
          ) : (
            "Update Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
