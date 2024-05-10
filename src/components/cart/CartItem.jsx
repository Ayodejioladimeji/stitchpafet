import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addComma } from "comma-separator";
import { addCart, removeCart } from "./../../redux/actions/ProductAction";

//

const CartItem = ({ data, ...item }) => {
  const { token, cart } = useSelector((state) => state.auth);
  const { cartcallback } = useSelector((state) => state.product);
  const { _id, quantity, color, size } = data;
  const { productname, productimages, productamount, productoldamount } = item;
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);

  // increase cart items
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    const carting = cart.filter((item) => item._id === id);

    const newCart = [
      {
        product_id: carting[0].productid,
        quantity: carting[0].quantity,
      },
    ];

    dispatch(addCart(newCart, token.token, cartcallback));
  };

  // decrease cart items
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.quantity === 1) return;
        item.quantity -= 1;
      }
    });

    const carting = cart.filter((item) => item._id === id);

    const newCart = [
      {
        product_id: carting[0].productid,
        quantity: carting[0].quantity,
      },
    ];

    dispatch(addCart(newCart, token.token, cartcallback));
  };

  // remove cart item on delete
  const removeCartItem = (id) => {
    if (token.token) {
      dispatch(removeCart(token.token, id, cartcallback));
    }
  };

  return (
    <div className="cart-item">
      <div className="item-left">
        <div className="item-image">
          <img src={productimages[0]} alt="" />
        </div>

        <div className="item-details">
          <h5>{productname}</h5>
          <Link to="/">
            <small>Add by Tohem ventures</small>
          </Link>
          {color !== null && (
            <small>
              color:{" "}
              <span
                style={{
                  height: "20px",
                  width: "50px",
                  background: color,
                  display: "inline-block",
                  marginBottom: "-6px",
                }}
              ></span>
            </small>
          )}
          {size !== null && <small>size: {size}</small>}
          <small className="remove" onClick={() => removeCartItem(_id)}>
            <FaTrashAlt className="trash" /> Remove
          </small>
        </div>
      </div>

      <div className="item-right">
        <h2>₦{addComma(Number(productamount * quantity))}</h2>
        {productoldamount === 0 || productoldamount === null ? (
          ""
        ) : (
          <h3 className="old-price">₦{addComma(Number(productoldamount))}</h3>
        )}
        <div className="quantity">
          <button className="calc" onClick={() => decrement(_id)}>
            <FaMinus />
          </button>
          <div className="counts">{quantity}</div>
          <button className="calc" onClick={() => increment(_id)}>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
