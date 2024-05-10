import React, { useState } from "react";
import { useSelector } from "react-redux";

import { BsPhone } from "react-icons/bs";

//
import ProductCard from "../../common/productcard/ProductCard";
import LoadMore from "../../common/loadmore/LoadMore";

//
const Automobile = () => {
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

  const automobile = all_product.filter(
    (item) => item.categories === "62e02bd5832770b3cf617b0d"
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals-header">
        <BsPhone className="market-icon" />
        <div className="header">Automobile</div>
      </div>

      <div className="new-arrivals-bottom">
        {automobile?.slice(0, visible).map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>
      {visible > automobile.length ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default Automobile;
