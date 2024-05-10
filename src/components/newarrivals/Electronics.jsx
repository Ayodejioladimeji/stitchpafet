import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlinePersonalVideo } from "react-icons/md";
//
import ProductCard from "../../common/productcard/ProductCard";
import LoadMore from "./../../common/loadmore/LoadMore";

//
const Electronics = () => {
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

  const electronics = all_product.filter(
    (item) => item.categories === "62e02b9a832770b3cf617b08"
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals-header">
        <MdOutlinePersonalVideo className="market-icon" />
        <div className="header">Electronics</div>
      </div>

      <div className="new-arrivals-bottom">
        {electronics?.slice(0, visible).map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>

      {visible > electronics.length ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default Electronics;
