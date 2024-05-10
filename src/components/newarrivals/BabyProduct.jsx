import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GiLargeDress } from "react-icons/gi";

//
import ProductCard from "../../common/productcard/ProductCard";
import LoadMore from "../../common/loadmore/LoadMore";

//
const BabyProduct = () => {
  const { all_product } = useSelector((state) => state.product);
  const [visible, setVisible] = useState(12);
  const [load, setLoad] = useState(false);

  const showItems = () => {
    setLoad(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 6);
      setLoad(false);
    }, 2000);
  };

  const baby = all_product.filter(
    (item) => item.categories === "62e02bb3832770b3cf617b0a"
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals-header">
        <GiLargeDress className="market-icon" />
        <div className="header">Baby Product</div>
      </div>

      {alert.loading ? (
        "loading..."
      ) : (
        <div className="new-arrivals-bottom">
          {baby?.slice(0, visible).map((item) => {
            return <ProductCard key={item._id} {...item} />;
          })}
        </div>
      )}

      {visible > baby.length ? (
        ""
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default BabyProduct;
