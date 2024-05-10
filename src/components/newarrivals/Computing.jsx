import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsLaptop } from "react-icons/bs";

//
import ProductCard from "../../common/productcard/ProductCard";
import LoadMore from "../../common/loadmore/LoadMore";

//
const Groceries = () => {
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

  const computing = all_product.filter(
    (item) => item.categories === "62e02b91832770b3cf617b07"
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals-header">
        <BsLaptop className="market-icon" />
        <div className="header">Computing</div>
      </div>

      <div className="new-arrivals-bottom">
        {computing.slice(0, visible)?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>

      {visible > computing.length ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default Groceries;
