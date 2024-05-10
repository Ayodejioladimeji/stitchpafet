import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdHealthAndSafety } from "react-icons/md";
//
import ProductCard from "../../common/productcard/ProductCard";
import LoadMore from "./../../common/loadmore/LoadMore";

//
const Health = () => {
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

  const health = all_product.filter(
    (item) => item.categories === "62e02b6c832770b3cf617b04"
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals-header">
        <MdHealthAndSafety className="market-icon" />
        <div className="header">Health & Beauty</div>
      </div>

      <div className="new-arrivals-bottom">
        {health?.slice(0, visible).map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>

      {visible > health.legnth ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default Health;
