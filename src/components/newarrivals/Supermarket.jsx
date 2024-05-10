import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";

//
import ProductCard from "../../common/productcard/ProductCard";
import LoadMore from "../../common/loadmore/LoadMore";

const Supermarket = () => {
  const { all_product } = useSelector((state) => state.product);
  const [visible, setVisible] = useState(12);
  const [load, setLoad] = useState(false);

  const showItems = () => {
    setLoad(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 12);
      setLoad(false);
    }, 2000);
  };

  const supermarket = all_product.filter(
    (item) => item.categories === "62e02b5e832770b3cf617b03"
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals-header">
        <FiShoppingBag className="market-icon" />
        <div className="header">Supermarket</div>
      </div>

      <div className="new-arrivals-bottom">
        {supermarket?.slice(0, visible).map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>

      {visible > supermarket ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default Supermarket;
