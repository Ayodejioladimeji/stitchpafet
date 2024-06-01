import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComma } from "comma-separator";

//
import { vendorDelete } from "./../../../redux/actions/ProductAction";
import DeleteProductModal from "./../../../common/confirmmodal/DeleteProductModal";
import Loading from "./../../../common/alert/Loading";

//

const ProductCard = ({ ...item }) => {
  const { _id, productname, productimages, productamount, productdiscount } =
    item;
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);
  const { callback } = useSelector((state) => state.utils);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //

  //handlesubmit
  const handleSubmit = (id) => {
    dispatch(vendorDelete(token.token, id, callback, setLoading));
  };

  return (
    <div className="productcard">
      <>
        <div className="productcard-image">
          <img src={productimages && productimages[0]} alt="" />
        </div>

        <div className="card-body">
          <span
            dangerouslySetInnerHTML={{
              __html: productname.substring(0, 25).trim() + "...",
            }}
          />
          <div className="productcard-div">
            <div className="price">
              <h1>₦ {addComma(Number(productamount))}</h1>
            </div>
            {productdiscount !== 0 && productdiscount !== null && (
              <div className="tag">-{productdiscount}%</div>
            )}
          </div>
          <small>Ad by Teeham Stores</small>

          <div className="shipping">
            <div className="rating">
              <img src="/assets/products/star.svg" alt="" />
            </div>

            {favorite ? (
              <FaHeart className="heart" onClick={() => setFavorite(false)} />
            ) : (
              <FaRegHeart className="heart" onClick={() => setFavorite(true)} />
            )}
          </div>

          <div className="product-buttons">
            <button
              onClick={() =>
                history.push(`/dashboard/my-products/edit-product/${_id}`)
              }
              className="edit"
            >
              Edit
            </button>

            <button onClick={() => handleSubmit(_id)} className="delete">
              {loading ? (
                <Loading width="15px" height="15px" color="#fff" />
              ) : (
                "Delete"
              )}
            </button>

            <DeleteProductModal />
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductCard;
