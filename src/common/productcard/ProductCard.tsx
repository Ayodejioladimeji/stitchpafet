import Link from "next/link";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
//
const ProductCard = ({ item, id = "1" }) => {

  const [favorite, setFavorite] = useState(false);

  return (
    <div className="productcard">
      <Link href={`/product-details/${id}`}>
        <div className="productcard-image">
          <img src={item.image} alt="" />

          <div className="free-delivery">Free delivery</div>
        </div>
      </Link>

      <div className="card-body">
        <h3
          dangerouslySetInnerHTML={{
            __html: item.title?.substring(0, 20).trim() + "...",
          }}
        />
        <div className="productcard-div">
          <div className="price">
            <h1>₦ {item.price}</h1>
          </div>

          <div className="tag">-{item.discount}%</div>
        </div>

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
      </div>
    </div>
  );
};

export default ProductCard;
