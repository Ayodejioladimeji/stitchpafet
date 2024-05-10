import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { addComma } from "comma-separator";

// COMPONENTS
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";

import AddProduct from "./../addproduct/AddProduct";
import Goback from "./../../../common/goback/Goback";
import {
  remove_product,
  edit_product,
  added_Product,
} from "./../../../redux/actions/dashboardAction";

// Initial state
const initialState = {
  product_name: "",
  product_amount: "",
  quantity: "",
  product_image: "",
  product_description: "",
};

const CreateOrder = ({
  navigation,
  handleChangeData,
  handleChangeFee,
  data,
  setData,
}) => {
  const { add_product_modal, added_products, isEdit } = useSelector(
    (state) => state.dashboard
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const [values, setValues] = useState(initialState);
  const [editID, setEditID] = useState(null);

  const {
    product_name,
    product_amount,
    quantity,
    product_image,
    product_description,
  } = values;

  // OnChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // CHANGE ADDED PRODUCT IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setValues((prevState) => ({
      ...prevState,
      product_image: file,
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

    reader.onload = () => {
      setValues((prevState) => ({
        ...prevState,
        product_image: reader.result,
      })); //base64encoded string
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      product_name,
      product_amount: Number(product_amount),
      quantity: Number(quantity),
      product_image,
      product_description,
    };

    if (isEdit) {
      const res = added_products.map((item, index) => {
        if (index === editID) {
          return {
            ...item,
            product_name,
            product_amount: Number(product_amount),
            quantity: Number(quantity),
            product_image,
            product_description,
          };
        }
        return item;
      });

      dispatch(edit_product(res));
    } else {
      dispatch(added_Product(newData));
    }

    setValues(initialState);
    dispatch({ type: GLOBALTYPES.IS_EDIT, payload: false });
    dispatch({ type: GLOBALTYPES.ADD_PRODUCT_MODAL, payload: false });
  };

  // handle delete method
  const handleDelete = (id) => {
    const newData = added_products.filter((item, index) => index !== id);
    dispatch(remove_product(newData));
  };

  const handleEdit = (id) => {
    dispatch({ type: GLOBALTYPES.ADD_PRODUCT_MODAL, payload: true });
    dispatch({ type: GLOBALTYPES.IS_EDIT, payload: true });
    setEditID(id);
    const newData = added_products.find((item, index) => index === id);
    setValues(newData);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Scroll page to top when route changes
  useEffect(() => {
    scrollToTop();
  }, []);

  // continue button
  const continueButton = () => {
    if (!data.address) {
      return setData({ ...data, err: "Address input cannot be empty" });
    }
    if (!data.sellersEmail) {
      return setData({ ...data, err: "Email input cannot be empty" });
    }

    if (!data.deliveryfee) {
      return setData({ ...data, err: "Delivery fee input cannot be empty" });
    }

    if (user.first_name) {
      navigation.next();
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Please update your profile information to continue",
        },
      });
      setTimeout(() => {
        history.push("/dashboard/profile");
      }, 5000);
    }
  };

  return (
    <div className="create-order">
      <div className="create-order-div">
        <div className="create-order-banner">
          <div className="banner-header">
            <h2>Create Order</h2>
            <p>Fill the below information to create your order</p>

            <Goback />
          </div>

          <div className="banner-header-image">
            <img src="/assets/fashion.png" alt="" />
          </div>
        </div>

        <div className="create-order-box">
          <div className="form-group">
            <label>Delivery Address</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChangeData}
              placeholder="Enter delivery address"
            />
          </div>

          <div className="form-group">
            <label>Delivery Fee</label>
            <input
              type="text"
              name="deliveryfee"
              value={data.deliveryfee}
              onChange={handleChangeFee}
              placeholder="Enter delivery fee"
            />
          </div>

          <div className="form-group">
            <label>Seller's Email</label>
            <input
              type="text"
              name="sellersEmail"
              value={data.sellersEmail}
              onChange={handleChangeData}
              placeholder="Enter sellers email"
            />
          </div>

          {data.err && <span className="err">{data.err}</span>}
          <div className="wallet-product">
            {/* <small>click the button below to add product</small> */}
            <button
              onClick={() =>
                dispatch({ type: GLOBALTYPES.ADD_PRODUCT_MODAL, payload: true })
              }
              className="add-product"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="added-product">
          {added_products.length === 0 ? (
            <p className="text-center">No products added yet</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Thumbnails</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Sub-total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody style={{ border: "none" }}>
                {added_products.map((item, index) => {
                  const {
                    product_name,
                    product_amount,
                    product_image,
                    quantity,
                  } = item;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="table-image">
                          <img src={product_image} alt="course-pic" />
                        </div>
                      </td>
                      <td>{product_name}</td>
                      <td>₦{addComma(product_amount)}</td>
                      <td>{quantity}</td>
                      <td>₦{addComma(product_amount * quantity)}</td>

                      <td>
                        <FaEdit
                          onClick={() => handleEdit(index)}
                          className="order-edit-icon"
                        />
                        <FaTrash
                          className="order-delete-icon"
                          onClick={() => handleDelete(index)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {added_products.length !== 0 && (
          <div className="order-buttons">
            <Link to="/dashboard/overview">
              <button>Cancel</button>
            </Link>
            <button
              className={added_products.length === 0 ? "disabled" : ""}
              onClick={continueButton}
              disabled={added_products.length === 0 ? true : false}
            >
              Continue
            </button>
          </div>
        )}
      </div>

      {add_product_modal && (
        <AddProduct
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          convert={convert}
          // data={data}
        />
      )}
    </div>
  );
};

export default CreateOrder;
