import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Link from "next/link";
import { formatMoney } from "@/utils/utils";

//

const CartItems = ({ item }) => {
  const { productcart } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  // // increase cart items
  const increment = (id) => {
    productcart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    const carting = productcart.filter((item) => item._id === id);

    // const cartData = {
    //   _id: carting[0]._id,
    //   productname,
    //   productamount,
    //   productimages,
    //   productcolors,
    //   productsizes,
    //   productdiscount,
    //   productdescription,
    //   productoldamount,
    //   quantity: carting[0].quantity,
    // };
    const dataCart = {
      product_id: carting[0]._id,
      quantity: carting[0].quantity,
    };

    // dispatch({ type: GLOBALTYPES.UPDATE_PRODUCT_CART, payload: cartData });
    dispatch({ type: GLOBALTYPES.DATA_CART, payload: dataCart });
  };

  // // decrease cart items
  const decrement = (id) => {
    productcart.forEach((item) => {
      if (item._id === id) {
        if (item.quantity === 1) return;
        item.quantity -= 1;
      }
    });

    const carting = productcart.filter((item) => item._id === id);

    // const cartData = {
    //   _id: carting[0]._id,
    //   productname,
    //   productamount,
    //   productimages,
    //   productcolors,
    //   productsizes,
    //   productdiscount,
    //   productdescription,
    //   productoldamount,
    //   quantity: carting[0].quantity,
    // };

    const dataCart = {
      product_id: carting[0]._id,
      quantity: carting[0].quantity,
    };

    // dispatch({ type: GLOBALTYPES.UPDATE_PRODUCT_CART, payload: cartData });
    dispatch({ type: GLOBALTYPES.DATA_CART, payload: dataCart });
  };

  // handle delete method
  const removeCartItem = (id) => {
    const newData = productcart.filter((item) => item._id !== id);
    dispatch({ type: GLOBALTYPES.DELETE_PRODUCT_CART, payload: newData });
  };

  //

  return (
    <div className="cart-item">
      <div className="item-left">
        <div className="item-image">
          <img src={item?.images[0]} alt="" />
        </div>

        <div className="item-details">
          <h5>{item?.title}</h5>
          <Link href="/">
            <small>Add by Tohem ventures</small>
          </Link>
          {item?.colors !== null && (
            <small>
              color:{" "}
              <span
                style={{
                  height: "20px",
                  width: "50px",
                  background: item?.colors,
                  display: "inline-block",
                  marginBottom: "-6px",
                }}
              ></span>
            </small>
          )}
          <small className="remove" onClick={() => removeCartItem(item.id)}>
            <FaTrashAlt className="trash" /> Remove
          </small>
        </div>
      </div>

      <div className="item-right">
        <h2>₦{formatMoney(Number(item?.amount * 1))}</h2>


        <div className="quantity">
          <button className="calc" onClick={() => decrement(item?.id)}>
            <FaMinus />
          </button>
          <div className="counts">{1}</div>
          <button className="calc" onClick={() => increment(item?.id)}>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
