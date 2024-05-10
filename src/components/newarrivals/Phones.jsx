import React, { useState } from "react";
import { useSelector } from "react-redux";

import { BsPhone } from "react-icons/bs";

//
import ProductCard from "../../common/productcard/ProductCard";
import LoadMore from "./../../common/loadmore/LoadMore";

//
const Phones = () => {
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

  const phones = all_product.filter(
    (item) => item.categories === "62e02b86832770b3cf617b06"
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals-header">
        <BsPhone className="market-icon" />
        <div className="header">Phones & Tablets</div>
      </div>

      <div className="new-arrivals-bottom">
        {phones?.slice(0, visible).map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>
      {visible > phones.length ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default Phones;
